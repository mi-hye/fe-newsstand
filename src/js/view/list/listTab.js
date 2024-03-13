function addEventListTab() {
	const tabs = document.querySelector(".press__list__nav");
	tabs.addEventListener("click", handleTabClick);
}

function handleTabClick(e) {
	const currentTab = e.target;
	const li = currentTab.closest("li");
	li.ariaSelected = true;
}

export default addEventListTab;
