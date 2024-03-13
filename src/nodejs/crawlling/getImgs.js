const NEWS_LOGO = ".news_logo";
const GRID_BUTTON = ".ContentPagingView-module__btn_next___ZBhby";
const GRID_PAGE_COUNT = 4;

const getImgElements = async (page) =>
	await page.evaluate((NEWS_LOGO) => {
		const imgNodes = document.querySelectorAll(NEWS_LOGO);
		return Array.from(imgNodes).map((img) => {
			return { src: img.src, alt: img.alt };
		});
	}, NEWS_LOGO);

async function getAllImgs(page) {
	return Array.from({ length: GRID_PAGE_COUNT }).reduce(async (prevPromise, _, idx) => {
		const prev = await prevPromise;
		const singlePageImgs = await getImgElements(page);
		prev.push(singlePageImgs);
		if (idx < 3) await page.click(GRID_BUTTON);
		return prev;
	}, []);
}

export default getAllImgs;
