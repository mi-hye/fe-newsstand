import handleSubscribe from "../../../components/subscribeHandler.js";
import controlSwiper from "../../../components/swiper.js";
import { LIST, LIST_TAB } from "../../../utils/Constants.js";
import { getJson } from "../../../utils/fetchJson.js";
import ListRenderer from "./ListRenderer.js";

const List = {
	binding: () => {},
	totalList: await getJson("totalList"), //TODO
	listInfo: await getJson("listInfo"), //TODO return 함수로 바꾸자
	$tabList: document.querySelector(".press__list__nav"), // TODO
	$currTab: "",
	interval: "",
	async totalRender() {
		const totalList = await getJson("totalList"); //TODO
		ListRenderer.tabs(List.$tabList, LIST_TAB.category);
		List.clickTab(); // TODO 나중에 main으로 빼야함
		const firstCategory = document.querySelector(".press__list__nav__item");
		firstCategory.click();
		ListRenderer.totalNews(totalList, List.listInfo, LIST.firstPageIdx, List.$currTab); // 이거 바꿔
	},
	async nextNewsRender(idx) {
		const totalList = await getJson("totalList");
		const [lastIdx, _] = List.getCurrTabInfo();
		if (idx === lastIdx) {
			List.findNextTab().click(); //TODO 왼쪽버튼가능..?
			return;
		}
		ListRenderer.totalNews(totalList, List.listInfo, idx, List.$currTab);
		List.resetAnimation(List.$currTab);
		List.resetInterval();
	},
	clickTab() {
		const callback = ({ target }) => {
			List.$currTab = List.handleProgressEvent(target);
			ListRenderer.totalTabInfo(List.listInfo, List.$currTab);
			List.resetAnimation(List.$currTab);
			const [_, currTabStartIdx] = List.getCurrTabInfo();
			List.nextNewsRender(currTabStartIdx);
			controlSwiper(currTabStartIdx, LIST.lastPageIdx, List.nextNewsRender, false);
		};
		List.$tabList.removeEventListener("click", List.binding);
		List.binding = callback;
		List.$tabList.addEventListener("click", List.binding);
	},
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
	getCurrTabInfo() {
		const currTabText = List.$currTab.children[0].innerText;
		const currTabStartIdx = List.listInfo[currTabText].startIdx;
		const currTabTotalCount = List.listInfo[currTabText].totalCount;
		const lastIdx = currTabStartIdx + currTabTotalCount;
		return [lastIdx, currTabStartIdx];
	},
	findNextTab() {
		const tabs = document.querySelectorAll(".press__list__nav__item");
		const currTab = Array.from(tabs).find((tab) => tab.ariaSelected === "true");
		if (currTab.nextElementSibling) return currTab.nextElementSibling;
		else return tabs[0];
	},
	findPreviousTab() {}, //TODO
	clickSubscribe() {
		const $newTopWrap = document.querySelector(".press__list__news-top");
		$newTopWrap.addEventListener("click", ({ target }) => handleSubscribe(target, "List"));
	},
	async subRender() {
		const subList = await getJson("subList");
		const newsTitles = subList.map((news) => news.header.pressTitle);
		ListRenderer.tabs(List.$tabList, newsTitles);
		// List.clickTab(); // TODO 나중에 main으로 빼야함
		const firstCategory = document.querySelector(".press__list__nav__item");
		firstCategory.click();
		ListRenderer.subNews(subList, LIST.firstPageIdx);
	},
};

export default List;
