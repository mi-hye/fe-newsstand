import { GRID } from "../../utils/Constants.js";
import { getJson } from "../../utils/fetchJson.js";

const Grid = {
	//TODO refactoring
	totalJson: await getJson("totalGrid"),
	subJson: await getJson("subGrid"),
	totalRender: (idx) => {
		const gridWrap = document.querySelector(".press__grid-wrap__grid");
		const startIdx = idx * GRID.cellCount;
		const totalJson = Grid.totalJson.sort(() => Math.random() - 0.5);

		gridWrap.innerHTML = Array.from({ length: GRID.cellCount }).reduce((prev, _, i) => {
			prev += `
			<div>
				<img src="${totalJson[startIdx + i].src}" alt="${totalJson[startIdx + i].alt}"/>
			<button>${totalJson[startIdx + i].subscription ? "구독해지" : "+ 구독하기"}</button>
			</div>`;
			return prev;
		}, "");
	},
	subRender: (idx) => {
		const gridWrap = document.querySelector(".press__grid-wrap__grid");
		const startIdx = idx * GRID.cellCount;

		gridWrap.innerHTML = Array.from({ length: GRID.cellCount }).reduce((prev, curr, i) => {
			curr = Grid.subJson[startIdx + i];
			if (curr)
				prev += `
			<div>
				<img src="${curr.src}" alt="${curr.alt}"/>
			<button>${curr.subscription ? "구독해지" : "+ 구독하기"}</button>
			</div>`;
			else prev += "<div></div>";
			return prev;
		}, "");

		return Math.floor(Grid.subJson.length / 24);
	},
};

export default Grid;
