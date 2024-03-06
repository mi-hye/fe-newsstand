import readJSON from "./utils/readJSON.js";

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
		left.style.opacity = "0";
		return;
	}
	if (idx === 3) {
		right.style.visibility = "hidden";
		right.style.opacity = "0";
		return;
	}
	right.style.visibility = "visible";
	left.style.visibility = "visible";
	left.style.opacity = "100";
	right.style.opacity = "100";
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
