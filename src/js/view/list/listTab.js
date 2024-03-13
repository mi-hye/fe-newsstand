function addEventListTab() {
	const tabList = document.querySelector(".press__list__nav");
	tabList.addEventListener("click", handleTabClick);
}

function handleTabClick(e) {
	const tabs = document.querySelectorAll(".press__list__nav__item");
	tabs.forEach((tab) => {
		tab.ariaSelected = false;
	});
	const currentTab = e.target;
	const li = currentTab.closest("li");
	li.ariaSelected = true;
}

export default addEventListTab;
