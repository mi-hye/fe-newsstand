import { ROLLING } from "../../helper/Constants.js";

class Rolling {
	#interval;
	idx;

	constructor() {
		this.idx = ROLLING.firstNewsIdx;
	}
	startNewsRolling(delay, createLatestNews) {
		this.#interval = setInterval(() => {
			if (this.idx === ROLLING.lastNewsIdx) this.idx = ROLLING.firstNewsIdx;
			else this.idx += 1;
			createLatestNews();
		}, delay);
	}
	stopNewsRolling(area) {
		clearInterval(this.#interval);
		const currentNews = area.querySelector("a");
		currentNews.classList = "latest-news__rolling--stop";
	}
}

export default Rolling;
