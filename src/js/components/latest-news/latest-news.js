import readJSON from "../../utils/readJson.js";

async function initLatestNews() {
	const newsJson = await readJSON("news");

	const leftNews = newsJson.slice(0, ROLLING.newsCount);
	const rightNews = newsJson.slice(ROLLING.newsCount, ROLLING.newsCount + 5);
	const [leftArea, rightArea] = document.querySelectorAll(".latest-news__rolling");

	addLatestNews(leftArea, leftNews, ROLLING.fourSec);
	addLatestNews(rightArea, rightNews, ROLLING.fiveSec);
}

function addLatestNews(rollingArea, newsJson, delay) {
	let interval;
	let idx = ROLLING.firstNewsIdx;

	const createLatestNews = (idx) => {
		rollingArea.innerHTML = `
		<a href="${newsJson[idx].href}" class="latest-news__rolling--befor-hover">
		${newsJson[idx].text}
		</a>
		`;
	};

	const startNewsRolling = () => {
		interval = setInterval(() => {
			if (idx === ROLLING.lastNewsIdx) idx = ROLLING.firstNewsIdx;
			else idx += 1;
			createLatestNews(idx);
		}, delay);
	};

	const stopNewsRolling = () => {
		clearInterval(interval);
		const currentNews = rollingArea.querySelector("a");
		currentNews.classList = "latest-news__rolling--stop";
	};

	rollingArea.addEventListener("mouseleave", () => {
		const currentNews = rollingArea.querySelector("a");
		currentNews.classList = "latest-news__rolling--after-hover";
		startNewsRolling();
	});
	rollingArea.addEventListener("mouseenter", stopNewsRolling);

	createLatestNews(idx);
	startNewsRolling();
}

initLatestNews();
