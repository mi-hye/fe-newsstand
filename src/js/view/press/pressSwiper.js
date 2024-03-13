import { GRID, VISIBILITY } from "../../utils/Constants.js";
import Grid from "./Grid.js";

function handlePressSwiper() {
	const [left, right] = document.querySelectorAll(".press__grid-wrap__button > i");
	let idx = GRID.firstPageIdx;

	left.addEventListener("click", () => {
		if (!idx) idx = GRID.firstPageIdx;
		else idx -= 1;
		Grid.render(idx);
		controlVisibility(idx, { left, right });
	});
	right.addEventListener("click", () => {
		if (idx > 2) idx = GRID.lastPageIdx;
		else idx += 1;
		Grid.render(idx);
		controlVisibility(idx, { left, right });
	});

	controlVisibility(GRID.firstPageIdx, { left, right });
}

function controlVisibility(idx, { left, right }) {
	if (idx === GRID.firstPageIdx) {
		toggleVisibility(left, VISIBILITY.hidden);
		return;
	}
	if (idx === GRID.lastPageIdx) {
		toggleVisibility(right, VISIBILITY.hidden);
		return;
	}
	toggleVisibility(right, VISIBILITY.visible);
	toggleVisibility(left, VISIBILITY.visible);
}

function toggleVisibility(direction, flag) {
	if (flag === VISIBILITY.hidden) {
		direction.style.visibility = "hidden";
		direction.style.opacity = "0";
		return;
	}
	if (flag === VISIBILITY.visible) {
		direction.style.visibility = "visible";
		direction.style.opacity = "100";
		return;
	}
}

export default handlePressSwiper;
