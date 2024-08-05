import { GRID } from "../../utils/Constants.js";
import { getJson } from "../../utils/fetchJson.js";
import handleSubscribe from "../../components/subscribeHandler.js";

const Grid = {
	//TODO refactoring
	$gridWrap: document.querySelector(".press__grid-wrap__grid"),
	async totalRender(idx) {
		const startIdx = idx * GRID.cellCount;
		const totalJson = await getJson("totalGrid");

		Grid.$gridWrap.innerHTML = Array.from({ length: GRID.cellCount }).reduce((prev, curr, i) => {
			curr = totalJson[startIdx + i];
			prev += `
			<div>
				<img src="${curr.src}" alt="${curr.alt}"/>
			<button class="${curr.id}">${curr.subscription ? "구독해지" : "+ 구독하기"}</button>
			</div>`;
			return prev;
		}, "");
	},
	async subRender(idx) {
		const startIdx = idx * GRID.cellCount;
		const total = await getJson("subGrid");
		Grid.$gridWrap.innerHTML = Array.from({ length: GRID.cellCount }).reduce((prev, curr, i) => {
			curr = total[startIdx + i];
			if (curr)
				prev += `
			<div>
				<img src="${curr.src}" alt="${curr.alt}"/>
			<button class="${curr.id}">구독해지</button>
			</div>`;
			else prev += "<div></div>";
			return prev;
		}, "");

		return Math.floor(total.length / GRID.cellCount);
	},
	clickSubscribe() {
		Grid.$gridWrap.addEventListener("click", ({ target }) => handleSubscribe(target, "Grid"));
	},
};

export default Grid;
