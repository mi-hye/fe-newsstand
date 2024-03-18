import { STATE } from "../../utils/Constants.js";
import dispatch from "./store.js";

function togglePressViewTabs() {
	const [totalView, subView] = document.querySelectorAll(".press__nav__press-column > div");

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
