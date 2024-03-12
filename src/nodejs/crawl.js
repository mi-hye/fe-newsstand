import puppeteer from "puppeteer";
import saveJSON from "./File.js";
import getAllImgs from "./crwalling/getImgs.js";
import getLatestNews from "./crwalling/getLatestNews.js";
import getAllListNews from "./crwalling/list/getAllListNews.js";

async function crawl() {
	const latestNews = [];
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	await page.goto("https://www.naver.com/");

	const gridImages = await getAllImgs(page);
	const allListNews = await getAllListNews(page);
	latestNews.push(await getLatestNews(page, latestNews));
	browser.close();

	latestNews.shift();
	return [latestNews, gridImages, allListNews];
}

const [latestNews, gridImages, allListNews] = await crawl();
saveJSON("latestNews", latestNews);
saveJSON("gridImages", gridImages.flat());
saveJSON("allListNews", allListNews);
