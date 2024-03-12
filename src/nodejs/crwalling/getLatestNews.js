import { setInterval } from "timers/promises";

const getLatestNews = async (page, latestNews) => {
	for await (const startTime of setInterval(3000, Date.now())) {
		const now = Date.now();
		const news = await page.evaluate(() => {
			const a = document.querySelector(".ContentHeaderSubView-module__news_title___wuetX > a");
			return { text: a.text, href: a.href };
		});

		latestNews.push(news);
		if (now - startTime >= 33000) {
			break;
		}
	}
};

export default getLatestNews;
