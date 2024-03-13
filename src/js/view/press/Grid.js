import { GRID } from "../../utils/Constants.js";
import readJSON from "../../utils/readJSON.js";
import handlePressSwiper from "./pressSwiper.js";

const Grid = {
	imagesJson: await readJSON("gridImages"),
	init: () => {
		Grid.render(GRID.firstPageIdx);
		handlePressSwiper();
	},
	render: (idx) => {
		const gridWrap = document.querySelector(".press__grid-wrap__grid");
		const startIdx = idx * GRID.cellCount;
		const randomImages = Grid.imagesJson.sort(() => Math.random() - 0.5);

		gridWrap.innerHTML = Array.from({ length: GRID.cellCount }).reduce((prev, _, i) => {
			prev += `
			<div>
				<img src="${randomImages[startIdx + i].src}" alt="${randomImages[startIdx + i].alt}"/>
			<button>+ 구독하기</button>
			</div>`;
			return prev;
		}, "");
	},
};

export default Grid;
