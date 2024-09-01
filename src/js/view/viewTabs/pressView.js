import { STATE } from "../../utils/Constants.js";
import { dispatch } from "../ViewStore.js";

function togglePressViewTabs() {
	const [totalView, subView] = document.querySelectorAll(".press__nav__press-column > div");
	const [listIcon, gridIcon] = document.querySelectorAll(".press__nav__icons-column i");

	totalView.addEventListener("click", () => {
		totalView.classList.add("active");
		subView.classList.remove("active");
		dispatch(STATE.total);
	});

	subView.addEventListener("click", () => {
		subView.classList.add("active");
		totalView.classList.remove("active");
		dispatch(STATE.sub);
	});
}

export default togglePressViewTabs;
