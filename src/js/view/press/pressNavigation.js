import Grid from "./Grid.js";

const removeActive = (icon, wrap) => {
	icon.classList.remove("active");
	wrap.classList.remove("active");
};

const addActive = (icon, wrap) => {
	icon.classList.add("active");
	wrap.classList.add("active");
};

const clickFirstCategory = () => {
	const firstCategory = document.querySelector(".press__list__nav__item");
	firstCategory.click();
};

function addClickPressNaviTab() {
	const [listIcon, gridIcon] = document.querySelectorAll(".press__nav__icons-column i");
	const [gridWrap, listWrap] = document.querySelectorAll(".press > div");

	listIcon.addEventListener("click", () => {
		addActive(listIcon, listWrap);
		removeActive(gridIcon, gridWrap);
		clickFirstCategory();
	});

	gridIcon.addEventListener("click", () => {
		addActive(gridIcon, gridWrap);
		removeActive(listIcon, listWrap);
		Grid.init();
	});
}

export default addClickPressNaviTab;
