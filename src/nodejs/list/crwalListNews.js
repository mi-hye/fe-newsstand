import puppeteer from "puppeteer";
import getSingleNews from "./getSingleNews.js";

const LIST_BUTTON_TRIGGER = ".ContentPagingView-module__btn_view_list___j7eNR";
// const NEXT_NEWS_TRIGGER = ".ContentPagingView-module__btn_next___ZBhby";
// const LIST_TABS = ".MediaO+ptionView-module__link_item___thVcT";

const TOTAL_NEWS_SPAN = ".ContentPagingView-module__total___HUvt2";

const getTotalNewsCount = async (page) =>
	await page.evaluate((TOTAL_NEWS_SPAN) => {
		const span = document.querySelector(TOTAL_NEWS_SPAN);
		const [totalCount] = span.innerText.match(/\d+/g);
		return parseInt(totalCount);
	}, TOTAL_NEWS_SPAN);

async function crawlListNews() {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	await page.goto("https://www.naver.com/");

	await page.click(LIST_BUTTON_TRIGGER);
	const totalCount = await getTotalNewsCount(page);
	const singlenews = await getSingleNews(page);
	console.log(singlenews);

	// browser.close();
}

await crawlListNews();
