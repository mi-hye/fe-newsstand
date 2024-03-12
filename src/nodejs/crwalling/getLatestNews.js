import { setInterval } from "timers/promises";

const WAIT_TIME = 33000;
const INTERVAL_TIME = 3000;

const getLatestNews = async (page, latestNews) => {
	for await (const startTime of setInterval(INTERVAL_TIME, Date.now())) {
		const now = Date.now();
		const news = await page.evaluate(() => {
			const a = document.querySelector(".ContentHeaderSubView-module__news_title___wuetX > a");
			return { text: a.text, href: a.href };
		});

		latestNews.push(news);
		if (now - startTime >= WAIT_TIME) {
			break;
		}
	}
};

export default getLatestNews;
