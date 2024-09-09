import { VISIBILITY } from "../helper/Constants.js";

const SwiperVisibility = {
	left: document.querySelector("#left").style,
	right: document.querySelector("#right").style,
	init(isGrid, firstPageIdx, lastPageIdx) {
		if (isGrid) {
			SwiperVisibility.set(0, firstPageIdx, lastPageIdx);
			return;
		}
		SwiperVisibility.visible(SwiperVisibility.right);
		SwiperVisibility.visible(SwiperVisibility.left);
	},
	set(idx, firstPageIdx, lastPageIdx) {
		SwiperVisibility.init(false, firstPageIdx, lastPageIdx);
		if (idx === firstPageIdx) SwiperVisibility.toggle(SwiperVisibility.left, VISIBILITY.hidden);
		if (idx === lastPageIdx) SwiperVisibility.toggle(SwiperVisibility.right, VISIBILITY.hidden);
	},
	toggle(direction, flag) {
		if (flag === VISIBILITY.hidden) SwiperVisibility.hidden(direction);
		if (flag === VISIBILITY.visible) SwiperVisibility.visible(direction);
	},
	visible(style) {
		style.visibility = "visible";
		style.opacity = "100";
	},
	hidden(style) {
		style.visibility = "hidden";
		style.opacity = "0";
	},
};

export default SwiperVisibility;
