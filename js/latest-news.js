import readJSON from "./utils/readJSON.js";

const news = await readJSON("news");

const firstNews = news.slice(0, 5);
const secondNews = news.slice(5, 10);

const [firstArea, secondArea] = document.querySelectorAll(
	".latest-news__rolling"
);

function createLatestNews(idx) {
	firstArea.innerHTML = `
    <a href="${firstNews[idx].href}" class="latest-news__rolling--befor-hover">
    ${firstNews[idx].text}
    </a>
    `;
}

function startNewChanging() {
	interval = setInterval(() => {
		if (idx === 4) idx = 0;
		else idx += 1;
		createLatestNews(idx);
	}, 4000);
}

function stopNewChanging() {
	clearInterval(interval);
	const currentNews = document.querySelector(
		".latest-news__rolling > a"
	);
	currentNews.classList = "latest-news__rolling--stop";
}

firstArea.addEventListener("mouseleave", () => {
	console.log("아웃");
	const currentNews = document.querySelector(
		".latest-news__rolling--stop"
	);
	currentNews.classList = "latest-news__rolling--after-hover";
	startNewChanging();
});
firstArea.addEventListener("mouseenter", stopNewChanging);

let interval;
let idx = 0;

createLatestNews(idx);
startNewChanging();
