import { LIST_TAB } from "../../utils/Constants.js";

function renderTab(allNewsJson) {
	const tabList = document.querySelector(".press__list__nav");
	tabList.innerHTML = LIST_TAB.reduce((prev, curr) => {
		prev += `<li class="press__list__nav__item" role="tab" tabindex="0">
		<span>${curr}</span>
		<span class="press__list__nav__item__new-count curr">1&nbsp;</span>
		<span class="press__list__nav__item__new-count total">&nbsp;/ 81</span>
	</li>
`;
		return prev;
	}, "");

	addProgressEventListTab(tabList);
}

function addProgressEventListTab(tabList) {
	tabList.addEventListener("click", (e) => {
		const tabs = document.querySelectorAll(".press__list__nav__item");
		tabs.forEach((tab) => {
			tab.ariaSelected = false;
		});
		const currentTab = e.target;
		const li = currentTab.closest("li");
		li.ariaSelected = true;
	});
}

export default renderTab;
