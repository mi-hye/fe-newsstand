const NEWS_LOGO = ".news_logo";
const GRID_BUTTON = ".ContentPagingView-module__btn_next___ZBhby";
const GRID_PAGE_COUNT = 4;

const getImgElements = async (page, id) =>
	await page.evaluate(
		(NEWS_LOGO, id) => {
			const imgNodes = document.querySelectorAll(NEWS_LOGO);
			return Array.from(imgNodes).map((img, idx) => {
				return { id: id + idx, src: img.src, alt: img.alt, subscription: false };
			});
		},
		NEWS_LOGO,
		id
	);

async function getAllImgs(page) {
	let id = 0;
	return Array.from({ length: GRID_PAGE_COUNT }).reduce(async (prevPromise, _, idx) => {
		const prev = await prevPromise;
		const singlePageImgs = await getImgElements(page, id);
		id += singlePageImgs.length;
		prev.push(singlePageImgs);
		if (idx < 3) await page.click(GRID_BUTTON);
		return prev;
	}, []);
}

export default getAllImgs;
