import readJSON from "../../utils/readJson.js";

const imagesJson = await readJSON("images");
const gridWrap = document.querySelector(".press__grid-wrap__grid");
const [left, right] = document.querySelectorAll(".press__grid-wrap__button > i");
let idx = GRID.firstPageIdx;

left.addEventListener("click", () => {
	if (!idx) idx = GRID.firstPageIdx;
	else idx -= 1;
	renderPress(idx);
	controlVisibility();
});
right.addEventListener("click", () => {
	if (idx > 2) idx = GRID.lastPageIdx;
	else idx += 1;
	renderPress(idx);
	controlVisibility();
});

function controlVisibility() {
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

function renderPress(idx) {
	const startIdx = idx * GRID.cellCount;
	const randomImages = imagesJson.sort(() => Math.random() - 0.5);

	gridWrap.innerHTML = Array.from({ length: GRID.cellCount }).reduce((prev, _, i) => {
		prev += `
		<div>
			<img src="${randomImages[startIdx + i].src}" alt="${randomImages[startIdx + i].alt}"/>
		<button>+ 구독하기</button>
		</div>`;
		return prev;
	}, "");
}

renderPress(GRID.firstPageIdx);
controlVisibility();
