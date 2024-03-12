import puppeteer from "puppeteer";
import getSingleNews from "./getSingleNews.js";

const LIST_BUTTON_TRIGGER = ".ContentPagingView-module__btn_view_list___j7eNR";
const NEXT_NEWS_TRIGGER = ".ContentPagingView-module__btn_next___ZBhby";
// const LIST_TABS = ".MediaO+ptionView-module__link_item___thVcT";

const TOTAL_NEWS_SPAN = ".ContentPagingView-module__total___HUvt2";

const getTotalNewsCount = async (page) =>
	await page.evaluate((TOTAL_NEWS_SPAN) => {
		const span = document.querySelector(TOTAL_NEWS_SPAN);
		const [totalCount] = span.innerText.match(/\d+/g);
		return parseInt(totalCount);
	}, TOTAL_NEWS_SPAN);

async function getCategoryTotalNews(page, totalCount) {
	await page.waitForSelector(NEXT_NEWS_TRIGGER);

	const arr = [];
	for (let i = 0; i < totalCount; i++) {
		const news = await getSingleNews(page);
		arr.push(news);
		await page.click(NEXT_NEWS_TRIGGER);
	}

	console.log(arr);
	// const result = await Array.from({ length: totalCount - 1 }).reduce(async (prevPromise, curr) => {
	// 	const prev = await prevPromise;
	// 	curr = await getSingleNews(page);
	// 	prev.push(curr);
	// 	await page.click(NEXT_NEWS_TRIGGER);
	// 	return prev;
	// }, []);
	// console.log(result.length);
}

async function crawlListNews() {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	await page.goto("https://www.naver.com/");

	await page.click(LIST_BUTTON_TRIGGER);
	const totalCount = await getTotalNewsCount(page);
	const total = await getCategoryTotalNews(page, totalCount);
	// console.log(total);
	// browser.close();
}

await crawlListNews();
