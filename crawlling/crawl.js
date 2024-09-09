import puppeteer from "puppeteer";
import saveJSON from "./helper/File.js";
import getAllImgs from "./modules/getImgs.js";
import getLatestNews from "./modules/getLatestNews.js";
import getAllListNews from "./modules/list/getAllListNews.js";

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
