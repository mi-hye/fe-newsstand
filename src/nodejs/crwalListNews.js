import puppeteer from "puppeteer";

const LIST_BUTTON_TRIGGER = ".ContentPagingView-module__btn_view_list___j7eNR";
const NEXT_NEWS_TRIGGER = ".ContentPagingView-module__btn_next___ZBhby";
const LIST_TABS = ".MediaOptionView-module__link_item___thVcT";

const getTotalNewsCount = async (page) =>
	await page.evaluate(() => {
		const TOTAL_NEWS_SPAN = ".ContentPagingView-module__total___HUvt2";
		const span = document.querySelector(TOTAL_NEWS_SPAN);
		const [total] = span.innerText.match(/\d+/g);
		return parseInt(total);
	});

async function getTotalNews(page,count){
}

async function crawlListNews() {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	await page.goto("https://www.naver.com/");

	await page.click(LIST_BUTTON_TRIGGER);
	const total = await getTotalNewsCount(page);
	console.log(total);
	// browser.close();
}

await crawlListNews();
