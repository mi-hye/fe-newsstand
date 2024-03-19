import { GRID } from "../../utils/Constants.js";
import { getJson } from "../../utils/fetchJson.js";
import handleSubscrible from "../../components/subscribeHandler.js";

const Grid = {
	//TODO refactoring
	//TODO 렌더 바꿔야해 구독하기 버튼 누르면 다시 렌더 시켜야해
	totalJson: (await getJson("totalGrid")).sort(() => Math.random() - 0.5),
	subJson: await getJson("subGrid"),
	$gridWrap: document.querySelector(".press__grid-wrap__grid"),
	totalRender: (idx) => {
		const startIdx = idx * GRID.cellCount;
		const totalJson = Grid.totalJson;

		Grid.$gridWrap.innerHTML = Array.from({ length: GRID.cellCount }).reduce((prev, _, i) => {
			prev += `
			<div>
				<img src="${totalJson[startIdx + i].src}" alt="${totalJson[startIdx + i].alt}"/>
			<button id="${totalJson[startIdx + i].id}">${
				totalJson[startIdx + i].subscription ? "구독해지" : "+ 구독하기"
			}</button>
			</div>`;
			return prev;
		}, "");
	},
	subRender: (idx) => {
		const startIdx = idx * GRID.cellCount;

		Grid.$gridWrap.innerHTML = Array.from({ length: GRID.cellCount }).reduce((prev, curr, i) => {
			curr = Grid.subJson[startIdx + i];
			if (curr)
				prev += `
			<div>
				<img src="${curr.src}" alt="${curr.alt}"/>
			<button id="${curr.id}">구독해지</button>
			</div>`;
			else prev += "<div></div>";
			return prev;
		}, "");

		return Math.floor(Grid.subJson.length / 24);
	},
	clickSubscribe() {
		Grid.$gridWrap.addEventListener("click", ({ target }) => {
			handleSubscrible(target, "Grid");
		});
	},
};

export default Grid;
