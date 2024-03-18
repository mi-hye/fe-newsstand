import { STATE } from "../../utils/Constants.js";
import dispatch from "./store.js";

const removeActive = (icon, wrap) => {
	icon.classList.remove("active");
	wrap.classList.remove("active");
};

const addActive = (icon, wrap) => {
	icon.classList.add("active");
	wrap.classList.add("active");
};

function toggleDisplayTabs() {
	const [listIcon, gridIcon] = document.querySelectorAll(".press__nav__icons-column i");
	const [gridWrap, listWrap] = document.querySelectorAll(".press__desc > div");

	listIcon.addEventListener("click", () => {
		addActive(listIcon, listWrap);
		removeActive(gridIcon, gridWrap);
		dispatch(STATE.list);
	});

	gridIcon.addEventListener("click", () => {
		addActive(gridIcon, gridWrap);
		removeActive(listIcon, listWrap);
		dispatch(STATE.grid);
	});
}

export default toggleDisplayTabs;
