import { ROLLING } from "../../helper/Constants.js";
import fetchJSON from "../../helper/fetchJSON.js";
import Rolling from "./rolling.js";

async function initLatestNews() {
	const newsJson = await fetchJSON("latestNews");

	const leftNews = newsJson.slice(ROLLING.zero, ROLLING.newsCount);
	const rightNews = newsJson.slice(ROLLING.newsCount, ROLLING.newsCount + ROLLING.newsCount);
	const [leftArea, rightArea] = document.querySelectorAll(".latest-news__rolling");

	addLatestNews(leftArea, leftNews, ROLLING.fourSec);
	addLatestNews(rightArea, rightNews, ROLLING.fiveSec);
}

function createLatestNews(area, news, idx) {
	area.innerHTML = `
	<a href="${news[idx].href}" class="latest-news__rolling--befor-hover">
	${news[idx].text}
	</a>
	`;
}

function addLatestNews(area, news, delay) {
	const rolling = new Rolling();
	area.addEventListener("mouseleave", () => {
		const currentNews = area.querySelector("a");
		currentNews.classList = "latest-news__rolling--after-hover";
		rolling.startNewsRolling(delay, () => createLatestNews(area, news, rolling.idx));
	});
	area.addEventListener("mouseenter", () => rolling.stopNewsRolling(area));

	createLatestNews(area, news, ROLLING.firstNewsIdx);
	rolling.startNewsRolling(delay, () => createLatestNews(area, news, rolling.idx));
}

export default initLatestNews;
