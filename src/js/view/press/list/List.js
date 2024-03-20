import { LIST } from "../../../utils/Constants.js";
import { getJson } from "../../../utils/fetchJson.js";
import ListRenderer from "./renderer/ListRenderer.js";

const List = {
	// allNewsJson: await readJSON("allListNews"),
	// init() {
	// 	renderTab(List.allNewsJson);

	// 	const firstCategory = document.querySelector(".press__list__nav__item");
	// 	firstCategory.click();
	// },
	async totalRender() {
		const totalList = await getJson("totalList");
		const $tabList = document.querySelector(".press__list__nav");
		const a = totalList.totalNews; // 246개뉴스
		ListRenderer.totalTab($tabList);
		List.clickTab(totalList, $tabList);
	},
	clickTab(totalList, $tabList) {
		// const intervalBox = ["dumy"];
		$tabList.addEventListener("click", ({ target }) => {
			// clearInterval(intervalBox[0]);
			const $currTab = List.handleProgressEvent(target);
			ListRenderer.totalTabInfo(totalList, $currTab);
			// const current = handleProgressEvent(target);
			// const { currNews, renderNextNews } = renderCategoryNews(current, allNewsJson, intervalBox);
			// controlSwiper(LIST.firstPageIdx, LIST.lastPageIdx(currNews), renderNextNews);
		});
	},
	handleProgressEvent(target) {
		const tabs = document.querySelectorAll(".press__list__nav__item");
		tabs.forEach((tab) => (tab.ariaSelected = false));
		const currentTab = target;
		const li = currentTab.closest("li");
		li.ariaSelected = true;
		return li;
	},
};

export default List;
