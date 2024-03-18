import Grid from "./Grid.js";
import List from "../list/List.js";

const removeActive = (icon, wrap) => {
	icon.classList.remove("active");
	wrap.classList.remove("active");
};

const addActive = (icon, wrap) => {
	icon.classList.add("active");
	wrap.classList.add("active");
};

function addClickPressNaviTab() {
	const [listIcon, gridIcon] = document.querySelectorAll(".press__nav__icons-column i");
	const [gridWrap, listWrap] = document.querySelectorAll(".press__desc > div");

	listIcon.addEventListener("click", () => {
		addActive(listIcon, listWrap);
		removeActive(gridIcon, gridWrap);
		List.init();
	});

	gridIcon.addEventListener("click", () => {
		addActive(gridIcon, gridWrap);
		removeActive(listIcon, listWrap);
		Grid.init();
	});
}

export default addClickPressNaviTab;
