import { VISIBILITY } from "../utils/Constants.js";

const visible = (el) => {
	el.visibility = "visible";
	el.opacity = "100";
};

const hidden = (el) => {
	el.visibility = "hidden";
	el.opacity = "0";
};

function controlSwiper(firstPageIdx, lastPageIdx, render) {
	const [left, right] = document.querySelectorAll(".swiper");
	let idx = firstPageIdx;
	left.addEventListener("click", () => {
		if (!idx) idx = firstPageIdx;
		else idx -= 1;
		render(idx);
		setVisibility(idx, { left, right }, { firstPageIdx, lastPageIdx });
	});
	right.addEventListener("click", () => {
		if (idx > lastPageIdx - 1) idx = lastPageIdx;
		else idx += 1;
		render(idx);
		setVisibility(idx, { left, right }, { firstPageIdx, lastPageIdx });
	});

	setVisibility(firstPageIdx, { left, right }, { firstPageIdx, lastPageIdx });
}

function setVisibility(idx, { left, right }, { firstPageIdx, lastPageIdx }) {
	toggleVisibility(right, VISIBILITY.visible);
	toggleVisibility(left, VISIBILITY.visible);
	if (idx === firstPageIdx) {
		toggleVisibility(left, VISIBILITY.hidden);
	}
	if (idx === lastPageIdx) {
		toggleVisibility(right, VISIBILITY.hidden);
	}
}

function toggleVisibility(direction, flag) {
	if (flag === VISIBILITY.hidden) {
		hidden(direction.style);
		return;
	}
	if (flag === VISIBILITY.visible) {
		visible(direction.style);
		return;
	}
}

export default controlSwiper;
