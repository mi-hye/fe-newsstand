import puppeteer from "puppeteer";
import saveJSON from "./File.js";
import getAllImgs from "./crwalling/getImgs.js";
import getLatestNews from "./crwalling/getLatestNews.js";


async function crawl() {
	const latestNews = [];
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	await page.goto("https://www.naver.com/");

	const gridImages = await getAllImgs(page);
	latestNews.push(await getLatestNews(page, latestNews));
	browser.close();

	latestNews.shift();
	return [latestNews, gridImages];
}

const [latestNews, gridImages] = await crawl();
saveJSON("latestNews", latestNews);
saveJSON("gridImages", gridImages.flat());
