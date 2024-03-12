import puppeteer from "puppeteer";
import getSingleNews from "./getSingleNews.js";
import saveJSON from "../../File.js";

const LIST_BUTTON_TRIGGER = ".ContentPagingView-module__btn_view_list___j7eNR";
const NEXT_NEWS_TRIGGER = ".ContentPagingView-module__btn_next___ZBhby";
const LIST_TABS = ".MediaOptionView-module__link_item___thVcT";
const TOTAL_NEWS_SPAN = ".ContentPagingView-module__total___HUvt2";
const CATEGORY_COUNT = 7;

const getTotalNewsCount = async (page) =>
	await page.evaluate((TOTAL_NEWS_SPAN) => {
		const span = document.querySelector(TOTAL_NEWS_SPAN);
		const [totalCount] = span.innerText.match(/\d+/g);
		return parseInt(totalCount);
	}, TOTAL_NEWS_SPAN);

async function getCategoryTotalNews(page, totalCount) {
	await page.waitForSelector(NEXT_NEWS_TRIGGER);

	const categoryNews = await Array.from({ length: totalCount }).reduce(
		async (prevPromise, curr) => {
			const prev = await prevPromise;
			curr = await getSingleNews(page);
			prev.push(curr);
			await page.click(NEXT_NEWS_TRIGGER);
			return prev;
		},
		[]
	);

	return categoryNews;
}

const getCategory = async (page) => {
	await page.waitForSelector(LIST_TABS);
	const category = await page.evaluate((LIST_TABS) => {
		const categoryTabs = document.querySelectorAll(LIST_TABS);
		return Array.from(categoryTabs).filter((category) => category.ariaSelected === "true")[0]
			.innerText;
	}, LIST_TABS);
	return category;
};

async function getAllNews(page) {
	return Array.from({ length: CATEGORY_COUNT }).reduce(async (prevPromise, _) => {
		const prev = await prevPromise;
		const totalCount = await getTotalNewsCount(page);
		const category = await getCategory(page);
		const categoryNews = await getCategoryTotalNews(page, totalCount);
		prev.push({ [`${category}`]: categoryNews });
		return prev;
	}, []);
}
async function crawlListNews() {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	await page.goto("https://www.naver.com/");
	await page.click(LIST_BUTTON_TRIGGER);

	const allListNews = await getAllNews(page);
	browser.close();
	return allListNews;
}

const allListNews = await crawlListNews();
saveJSON("allListNews", allListNews);
