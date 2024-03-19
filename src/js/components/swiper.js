import SwiperVisibility from "./SwiperVisibility.js";

function controlSwiper(firstPageIdx, lastPageIdx, render, display) {
	const swiper = document.querySelector(".press__swiper");
	SwiperVisibility.init(display,firstPageIdx,lastPageIdx);
	let currIdx = firstPageIdx;

	swiper.addEventListener("click", (e) => {
		if (e.target.id === "right" && currIdx !== lastPageIdx) currIdx += 1;
		if (e.target.id === "left" && currIdx) currIdx -= 1;

		display === "grid"
			? swipeGrid(currIdx, firstPageIdx, lastPageIdx, render)
			: swipeList(e, currIdx, firstPageIdx, lastPageIdx, render);
	});
}

function swipeGrid(currIdx, firstPageIdx, lastPageIdx, render) {
	render(currIdx);
	SwiperVisibility.set(currIdx, firstPageIdx, lastPageIdx);
}

function swipeList(e, currIdx, firstPageIdx, lastPageIdx, render) {
	// 	const currSwiper = e.target.id;
	// 	const listTabs = document.querySelectorAll(".press__list__nav__item");
	// 	const currTabIdx = Array.from(listTabs)
	// 		.map((v) => v.ariaSelected)
	// 		.indexOf("true");
	// 	if (currIdx === firstPageIdx && currSwiper === "left") {
	// 		//0일때 왼쪽이면 탭변경
	// 		clickNextListTab(currTabIdx, listTabs);
	// 	}
	// 	if (currIdx === lastPageIdx && currSwiper === "right") {
	// 		//마지막일때 오른쪽이면 탭변경
	// 		clickNextListTab(currTabIdx, listTabs);
	// 	}
	// 	render(currIdx);
}

// function clickNextListTab(currTabIdx, listTabs) {
// 	let nextTabIdx = currTabIdx + 1;
// 	if (currTabIdx === 0) nextTabIdx = 6;
// 	if (currTabIdx === 6) nextTabIdx = 0;
// 	listTabs[nextTabIdx].click();
// }

export default controlSwiper;
