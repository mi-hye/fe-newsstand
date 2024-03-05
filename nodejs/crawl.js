import puppeteer from "puppeteer";
import { setInterval } from "timers/promises";
import saveJSON from "./File.js";

const getImgElements = async (page) =>
	await page.evaluate(() => {
		const imgNodes = document.querySelectorAll(".news_logo");
		return Array.from(imgNodes).map((img) => {
			return { src: img.src, alt: img.alt };
		});
	});

const getLatestNews = async (page, latestNews) => {
	for await (const startTime of setInterval(3000, Date.now())) {
		const now = Date.now();
		const news = await page.evaluate(() => {
			const a = document.querySelector(
				".ContentHeaderSubView-module__news_title___wuetX > a"
			);
			return { text: a.text, href: a.href };
		});

		latestNews.push(news);
		if (now - startTime >= 33000) {
			break;
		}
	}
};

async function crawl() {
	const latestNews = [];
	const imgs = [];
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	await page.goto("https://www.naver.com/");

	for (let i = 0; i < 4; i++) {
		imgs.push(await getImgElements(page, imgs));
		await page.click(".ContentPagingView-module__btn_next___ZBhby");
	}
	await getLatestNews(page, latestNews);
	browser.close();

	latestNews.shift();
	return [latestNews, imgs];
}

const [latestNews, imgs] = await crawl();
saveJSON("news", latestNews);
saveJSON("images", imgs.flat());
