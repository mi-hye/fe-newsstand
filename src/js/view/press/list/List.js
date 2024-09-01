import handleSubscribe from "../../../components/subscribeHandler.js";
import { LIST, LIST_TAB, STATE } from "../../../utils/Constants.js";
import { getJson } from "../../../utils/fetchJson.js";
import ListRenderer from "./ListRenderer.js";
import listDispatch from "./ListStore.js";

const List = {
	interval: "",
	listInfo: await getJson("listInfo"),
	handleProgressEvent(target) {
		const tabs = document.querySelectorAll(".press__list__nav__item");
		tabs.forEach((tab) => (tab.ariaSelected = false));
		const currentTab = target;
		const li = currentTab.closest("li");
		li.ariaSelected = true;
		return li;
	},
	resetAnimation($currTab) {
		const animation = $currTab.querySelector(".press__list__nav__item--animation");
		animation.classList.remove("active");
		void animation.offsetWidth;
		animation.classList.add("active");
	},
	resetInterval() {
		clearInterval(List.interval);
		List.interval = setInterval(() => {
			const right = document.querySelector("#right");
			right.click();
		}, LIST.progressDelay);
	},
	getCurrTabInfo($currTab, isTotal) {
		let currTabidx;
		let lastIdx;

		if (isTotal) {
			const currTabText = $currTab.children[0].innerText;
			currTabidx = List.listInfo[currTabText].startIdx;
			const currTabTotalCount = List.listInfo[currTabText].totalCount;
			lastIdx = currTabidx + currTabTotalCount;
			return [lastIdx, currTabidx];
		}
		const tabs = document.querySelectorAll(".press__list__nav__item");
		currTabidx = Array.from(tabs)
			.map((tab) => tab.ariaSelected)
			.indexOf("true");
		lastIdx = tabs.length;
		return [lastIdx, currTabidx];
	},
	findNextTab() {
		const tabs = document.querySelectorAll(".press__list__nav__item");
		const currTab = Array.from(tabs).find((tab) => tab.ariaSelected === "true");
		if (currTab.nextElementSibling) return currTab.nextElementSibling;
		else return tabs[0];
	},
	findPreviousTab() {
		const tabs = document.querySelectorAll(".press__list__nav__item");
		const currTabidx = Array.from(tabs)
			.map((tab) => tab.ariaSelected)
			.indexOf("true");

		if (currTabidx) return tabs[currTabidx - 1];
		return tabs[tabs.length - 1];
	},
	clickSubscribe() {
		const $newTopWrap = document.querySelector(".press__list__news-top");
		$newTopWrap.addEventListener("click", ({ target }) => handleSubscribe(target, "List"));
	},
	newsRender(currNewsJson, idx, isTotal, $currTab) {
		//TODO 뉴스없을때처리
		ListRenderer.news(currNewsJson, idx, false);
		const [lastIdx, startIdx] = List.getCurrTabInfo($currTab, isTotal);
		List.resetAnimation($currTab);
		List.resetInterval();

		const nextRender = (idx) => {
			if (isTotal) {
				ListRenderer.currNum(idx, List.listInfo, $currTab);
				if (idx === lastIdx) {
					List.findNextTab().click();
					return;
				}
				if (idx === startIdx - 1) {
					List.findPreviousTab().click();
					return;
				}
			} else List.findNextTab().click(); //FIXME 왼쪽은 못간다...
			ListRenderer.news(currNewsJson, idx, false);
		};
		return nextRender;
	},
	tabRender(currNewsJson, isTotal) {
		const $tabList = document.querySelector(".press__list__nav");
		if (isTotal) {
			ListRenderer.tabs($tabList, LIST_TAB.category);
			return;
		}
		const newsTitles = currNewsJson.map((news) => news.header.pressTitle);
		ListRenderer.tabs($tabList, newsTitles);
		//TODO 뉴스가 아무것도 없을때 처리
	},
	clickTab() {
		const $tabList = document.querySelector(".press__list__nav");
		$tabList.addEventListener("click", ({ target }) => {
			const $currTab = List.handleProgressEvent(target);
			listDispatch($currTab);
		});
	},
	renderTabInfo($currTab, isTotal) {
		const [_, currTabidx] = List.getCurrTabInfo($currTab, isTotal);
		if (isTotal) {
			ListRenderer.totalTabInfo(List.listInfo, $currTab);
			return currTabidx;
		}
		ListRenderer.subTabInfo($currTab);
		return currTabidx;
	},
	addScroll() {
		const $tabList = document.querySelector(".press__list__nav");
		console.dir($tabList);
		$tabList.addEventListener("wheel", (e) => {
			e.preventDefault();
			$tabList.scrollLeft += e.deltaY > 0 ? e.deltaY - LIST.wheelSpeed : e.deltaY + LIST.wheelSpeed;
		});
	},
};

export default List;
