import readJSON from "./readJSON.js";

const images = await readJSON("images");
const gridWrap = document.querySelector(".press__grid-wrap__grid");
const [left, right] = document.querySelectorAll(
	".press__grid-wrap__button > i"
);
let idx = 0;

left.addEventListener("click", () => {
	if (!idx) idx = 0;
	else idx -= 1;
	renderPress(idx);
	controlVisibility();
});

right.addEventListener("click", () => {
	if (idx > 2) idx = 3;
	else idx += 1;
	renderPress(idx);
	controlVisibility();
});

function controlVisibility() {
	if (idx === 0) {
		left.style.visibility = "hidden";
		right.style.visibility = "visible"; // idx 1,2일떄  해줘야함!!!
	}

	if (idx === 3) {
		left.style.visibility = "visible";
		right.style.visibility = "hidden";
	}

	//idx === 0 이면 left의 vi이게 히든
	// idx === 3이면 rigt의 vi가 히든
}

function renderPress(idx) {
	let nodes = "";
	const startIdx = idx * 24;

	Array.from({ length: 24 }).forEach((_, i) => {
		nodes += `
		<div>
			<img src="${images[startIdx + i].src}" alt="${
			images[startIdx + i].alt
		}"/>
		</div>`;
	});

	gridWrap.innerHTML = nodes;
}

renderPress(0);
controlVisibility();
