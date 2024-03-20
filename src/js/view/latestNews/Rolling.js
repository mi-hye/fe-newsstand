import { ROLLING } from "../../utils/Constants.js";

//TODO class Rolling 은 constructor 에서 interval 이라도 파라미터로 받아서 범용성 올리기.
class Rolling {
	#interval;
	idx;

	constructor() {
		this.#interval = "";
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
