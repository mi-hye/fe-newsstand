import { LIST_TAB } from "../../utils/Constants.js";

function renderTab(allNewsJson) {
	const tabList = document.querySelector(".press__list__nav");
	tabList.innerHTML = LIST_TAB.reduce((prev, curr) => {
		const length = allNewsJson[curr].length.toString().padEnd(2, " ").replace(" ", "&nbsp;&nbsp;");
		prev += `<li class="press__list__nav__item" role="tab" tabindex="0">
		<span>${curr}</span>
		<span class="press__list__nav__item__new-count curr">1</span>
		<span class="press__list__nav__item__new-count total">/ ${length}</span>
	</li>
`;
		return prev;
	}, "");

	addProgressEvent(tabList);
}

function addProgressEvent(tabList) {
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
