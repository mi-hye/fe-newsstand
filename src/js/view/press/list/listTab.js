import controlSwiper from "../../../components/swiper.js";
import { LIST_TAB, LIST } from "../../../utils/Constants.js";
import renderCategoryNews from "./renderCategoryNews.js";

function renderTab(allNewsJson) {
	const tabList = document.querySelector(".press__list__nav");
	tabList.innerHTML = LIST_TAB.reduce((prev, curr) => {
		const length = allNewsJson[curr].length.toString().padEnd(2, " ").replace(" ", "&nbsp;&nbsp;");
		prev += `<li class="press__list__nav__item" role="tab" tabindex="0">
					<span>${curr}</span>
					<span class="press__list__nav__item__new-count curr">1</span>
					<span class="press__list__nav__item__new-count total">/ ${length}</span>
					<li class="press__list__nav__item--animation"></li>
				</li>`;

		return prev;
	}, "");
	addClickEvent(tabList, allNewsJson);
}

function addClickEvent(tabList, allNewsJson) {
	const intervalBox = ["dumy"];
	tabList.addEventListener("click", (e) => {
		clearInterval(intervalBox[0]);
		const current = handleProgressEvent(e);
		const { currNews, renderNextNews } = renderCategoryNews(current, allNewsJson, intervalBox);
		controlSwiper(LIST.firstPageIdx, LIST.lastPageIdx(currNews), renderNextNews);
	});
}

function handleProgressEvent(e) {
	const tabs = document.querySelectorAll(".press__list__nav__item");
	tabs.forEach((tab) => (tab.ariaSelected = false));
	const currentTab = e.target;
	const li = currentTab.closest("li");
	li.ariaSelected = true;
	return li;
}

export default renderTab;
