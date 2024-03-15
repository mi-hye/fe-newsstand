import SwiperVisibility from "./SwiperVisibility.js";

function controlSwiper(firstPageIdx, lastPageIdx, render) {
	const desc = document.querySelector(".press__desc");
	let currIdx = firstPageIdx;
	desc.addEventListener("click", (e) => {
		if (e.target.id === "right" && currIdx !== lastPageIdx) currIdx += 1;
		if (e.target.id === "left" && currIdx) currIdx -= 1;

		isList()
			? swipeList(currIdx, firstPageIdx, lastPageIdx, render)
			: swipeGrid(currIdx, firstPageIdx, lastPageIdx, render);
	});
}

function isList() {
	const [listIcon, _] = document.querySelectorAll(".press__nav__icons-column i");
	return Array.from(listIcon.classList).find((cls) => cls === "active") ? true : false;
}

function swipeGrid(currIdx, firstPageIdx, lastPageIdx, render) {
	render(currIdx);
	SwiperVisibility.set(currIdx, firstPageIdx, lastPageIdx);
}

function swipeList(currIdx, firstPageIdx, lastPageIdx, render) {
	const currSwiper = d.target.id;
	const listTabs = document.querySelectorAll(".press__list__nav__item");
	const currTabIdx = Array.from(listTabs)
		.map((v) => v.ariaSelected)
		.indexOf("true");

	if (currIdx === firstPageIdx && currSwiper === "left") {
		//0일때 왼쪽이면 탭변경
		clickNextListTab(currTabIdx, listTabs);
	}

	if (currIdx === lastPageIdx && currSwiper === "right") {
		//마지막일때 오른쪽이면 탭변경
		clickNextListTab(currTabIdx, listTabs);
	}
	render(currIdx);
}

function clickNextListTab(currTabIdx, listTabs) {
	let nextTabIdx = currTabIdx + 1;
	if (currTabIdx === 0) nextTabIdx = 6;
	if (currTabIdx === 6) nextTabIdx = 0;
	listTabs[nextTabIdx].click();
}

export default controlSwiper;
