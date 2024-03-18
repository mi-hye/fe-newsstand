const NEWS_TOP = ".MediaNewsView-module__news_top___KTy0M *";
const NEWS_DESCRIPTION_LEFT = ".MediaNewsView-module__desc_left___jU94v *";
const NEWS_DESCRIPTION_RIGHT = ".MediaNewsView-module__desc_right___xZQJb a";

const getHeader = async (page) =>
	await page.evaluate((NEWS_TOP) => {
		const [a, img, span] = document.querySelectorAll(NEWS_TOP);
		return { pressTitle: img.alt, aHref: a.href, imgSrc: img.src, spanText: span.innerText };
	}, NEWS_TOP);

const getDescriptionLeft = async (page) =>
	await page.evaluate((NEWS_DESCRIPTION_LEFT) => {
		const [, , img, a] = document.querySelectorAll(NEWS_DESCRIPTION_LEFT);
		return {
			imgSrc: img.src,
			aHref: a.href,
			aText: a.innerHTML,
		};
	}, NEWS_DESCRIPTION_LEFT);

const getDescriptionRight = async (page) =>
	await page.evaluate((NEWS_DESCRIPTION_RIGHT) => {
		const lists = document.querySelectorAll(NEWS_DESCRIPTION_RIGHT);
		return Array.from(lists).map((a) => {
			return { href: a.href, text: a.innerHTML };
		});
	}, NEWS_DESCRIPTION_RIGHT);

async function getSingleNews(page, id) {
	await page.waitForSelector(NEWS_TOP);
	await page.waitForSelector(NEWS_DESCRIPTION_LEFT);
	await page.waitForSelector(NEWS_DESCRIPTION_RIGHT);

	const header = await getHeader(page);
	const descriptionLeft = await getDescriptionLeft(page);
	const descriptionRight = await getDescriptionRight(page);

	return {
		id,
		header,
		descriptionLeft,
		descriptionRight,
		subscription: false,
	};
}

export default getSingleNews;
