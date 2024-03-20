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
		const a = totalList.totalNews; // 246개뉴스
		ListRenderer.totalTab();
		// ListRenderer.totalTabInfo(totalList);
	},
	clickTab( allNewsJson) {
		const tabList = document.querySelector(".press__list__nav");
		const intervalBox = ["dumy"];
		tabList.addEventListener("click", (e) => {
			clearInterval(intervalBox[0]);
			const current = handleProgressEvent(e);
			const { currNews, renderNextNews } = renderCategoryNews(current, allNewsJson, intervalBox);
			controlSwiper(LIST.firstPageIdx, LIST.lastPageIdx(currNews), renderNextNews);
		});
	},
	handleProgressEvent(e) {
		const tabs = document.querySelectorAll(".press__list__nav__item");
		tabs.forEach((tab) => (tab.ariaSelected = false));
		const currentTab = e.target;
		const li = currentTab.closest("li");
		li.ariaSelected = true;
		return li;
	}
};

export default List;
