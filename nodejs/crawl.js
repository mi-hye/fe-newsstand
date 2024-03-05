import puppeteer from "puppeteer";
import { setInterval } from "timers/promises";

const getImgElements = async (page) =>
	await page.evaluate(() => {
		const imgNodes = document.querySelectorAll(".news_logo");
		return Array.from(imgNodes).map((img) => img.src);
	});

const getLatestNews = async (page, latestNews) => {
	for await (const startTime of setInterval(3000, Date.now())) {
		const now = Date.now();
		const el = await page.waitForSelector(
			".ContentHeaderSubView-module__news_title___wuetX",
			{ timeout: 500 }
		);
		const text = await el.$eval("a", (el) => el.innerText);
		const href = await el.$eval("a", (el) => el.href);
		latestNews.push({ text, href });

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
		imgs.push(await getImgElements(page));
		await page.click(".ContentPagingView-module__btn_next___ZBhby");
	}

	//nodejs에서는 dom엘리먼트에 접근을 못한다
	//함수를 만들어서 브라우저에게 전달
	//브라우저가 함수를 실행시켜서 그 결과를 node에서 사용
	await getLatestNews(page, latestNews);
	browser.close();

	latestNews.shift();
	return [latestNews, imgs];
}

const [a, b] = await crawl();
console.log("출력", a);
console.log("출력", b);
