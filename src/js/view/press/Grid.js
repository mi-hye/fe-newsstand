import { renderModal, deleteModal } from "../../components/modal.js";
import { GRID } from "../../utils/Constants.js";
import { getJson } from "../../utils/fetchJson.js";

const Grid = {
	//TODO refactoring
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
		Grid.$gridWrap.addEventListener("click", Grid.handleSubscrible);
	},
	async handleSubscrible({ target }) {
		// console.dir(target);
		// console.log(target.parentElement.children[0].alt);
		// const modal = document.querySelector(".modal");
		// modal.classList.add("active");
		// console.dir(modal);

		if (target.tagName === "BUTTON") {
			const title = target.parentElement.children[0].alt;
			const id = target.id;
			const targetBtn = await fetch(`http://localhost:3000/totalGrid/${id}`);
			const targetBtnJson = await targetBtn.json();

			if (target.innerText === "+ 구독하기") {
				renderModal(title, true);
				setTimeout(deleteModal, 3000);
			} else {
				renderModal(title, false);
			}
			// ? Grid.subscribe(targetBtnJson, id)
			// : Grid.unsubscribe(targetBtnJson, id);
		}
	},
	subscribe(targetBtnJson, id) {
		targetBtnJson.subscription = true;
		Grid.updateNews(targetBtnJson, id);

		fetch(`http://localhost:3000/subGrid`, {
			method: "POST",
			body: JSON.stringify(targetBtnJson),
		});
	},
	unsubscribe(targetBtnJson, id) {
		targetBtnJson.subscription = false;
		Grid.updateNews(targetBtnJson, id);

		fetch(`http://localhost:3000/subGrid/${id}`, {
			method: "DELETE",
			body: JSON.stringify(targetBtnJson),
		});
	},
	updateNews(targetBtnJson, id) {
		fetch(`http://localhost:3000/totalGrid/${id}`, {
			method: "PUT",
			body: JSON.stringify(targetBtnJson),
		});
	},
};

export default Grid;
