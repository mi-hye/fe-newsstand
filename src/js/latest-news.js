import readJSON from "./utils/readJSON.js";

const news = await readJSON("news");

const firstNews = news.slice(0, 5);
const secondNews = news.slice(5, 10);
const [firstArea, secondArea] = document.querySelectorAll(
	".latest-news__rolling"
);

AddLatestNews(firstArea, firstNews, 4000);
AddLatestNews(secondArea, secondNews, 5000);

function AddLatestNews(rollingArea, news, delay) {
	let interval;
	let idx = 0;

	const createLatestNews = (idx) => {
		rollingArea.innerHTML = `
		<a href="${news[idx].href}" class="latest-news__rolling--befor-hover">
		${news[idx].text}
		</a>
		`;
	};

	const startNewChanging = () => {
		interval = setInterval(() => {
			if (idx === 4) idx = 0;
			else idx += 1;
			createLatestNews(idx);
		}, delay);
	};

	const stopNewChanging = () => {
		clearInterval(interval);
		const currentNews = rollingArea.querySelector("a");
		currentNews.classList = "latest-news__rolling--stop";
	};

	rollingArea.addEventListener("mouseleave", () => {
		const currentNews = rollingArea.querySelector("a");
		currentNews.classList = "latest-news__rolling--after-hover";
		startNewChanging();
	});
	rollingArea.addEventListener("mouseenter", stopNewChanging);

	createLatestNews(idx);
	startNewChanging();
}
