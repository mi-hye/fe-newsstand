import { GRID } from "../../utils/Constants.js";
import { getJson } from "../../utils/fetchJson.js";
import handleSubscrible from "../../components/subscribeHandler.js";

const Grid = {
	//TODO refactoring
	//TODO 렌더 바꿔야해 구독하기 버튼 누르면 다시 렌더 시켜야해
	// totalJson: (await getJson("totalGrid")).sort(() => Math.random() - 0.5),
	// subJson: await getJson("subGrid"),
	$gridWrap: document.querySelector(".press__grid-wrap__grid"),
	async totalRender(idx) {
		const startIdx = idx * GRID.cellCount;
		const totalJson = await getJson("totalGrid");

		Grid.$gridWrap.innerHTML = Array.from({ length: GRID.cellCount }).reduce((prev, curr, i) => {
			curr = totalJson[startIdx + i];
			prev += `
			<div>
				<img src="${curr.src}" alt="${curr.alt}"/>
			<button id="${curr.id}">${curr.subscription ? "구독해지" : "+ 구독하기"}</button>
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
			<button id="${curr.id}">구독해지</button>
			</div>`;
			else prev += "<div></div>";
			return prev;
		}, "");

		return Math.floor(total.length / GRID.cellCount);
	},
	clickSubscribe() {
		Grid.$gridWrap.addEventListener("click", ({ target }) => {
			handleSubscrible(target, "Grid");
		});
	},
};

export default Grid;
