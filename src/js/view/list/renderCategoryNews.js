import { LIST } from "../../utils/Constants.js";

const rederHeader = (headerJson) => {
	const { aHref, imgSrc, spanText } = headerJson;
	return `<a href=${aHref}>
				<img src=${imgSrc} />
			</a>
			<span>${spanText}</span>
			<button>+ 구독하기</button>`;
};

const rederDescLeft = (descLeftJson) => {
	const { aHref, aText, imgSrc } = descLeftJson;
	return `<a href=${aHref}>
				<img src="${imgSrc}"/>
			</a>
			<a href=${aHref}>${aText}</a>`;
};

const rederDescRight = (descRightArr) => {
	const innerElements = descRightArr.reduce((prev, curr) => {
		prev += `<li><a href=${curr.href}>${curr.text}</a></li>`;
		return prev;
	}, "<ul>");

	return `${innerElements}</ul>`;
};

const setInnerHTML = (area, renderer, json) => (area.innerHTML = renderer(json));

function resetAnimation(current) {
	const animation = current.querySelector(".press__list__nav__item--animation");
	animation.classList.remove("active");
	void animation.offsetWidth;
	animation.classList.add("active");
}

function resetInterval(intervalBox) {
	clearInterval(intervalBox[0]);
	const interval = setInterval(() => {
		const [, right] = document.querySelectorAll(".swiper");
		right.click();
	}, LIST.progressDelay);
	intervalBox.pop();
	intervalBox.push(interval);
}

function renderCategoryNews(current, allNewsJson, intervalBox) {
	const currText = current.querySelector("span").innerHTML;
	const currNews = allNewsJson[currText];

	const headerArea = document.querySelector(".press__list__news-top");
	const [desLeft, desRight] = headerArea.nextElementSibling.children;

	const renderNextNews = (currIdx) => {
		resetInterval(intervalBox);
		resetAnimation(current);
		const currSpan = current.querySelector(".curr");
		const { header, descriptionLeft, descriptionRight } = currNews[currIdx];

		setInnerHTML(headerArea, rederHeader, header);
		setInnerHTML(desLeft, rederDescLeft, descriptionLeft);
		setInnerHTML(desRight, rederDescRight, descriptionRight);
		currSpan.innerHTML = currIdx + 1;
	};
	renderNextNews(LIST.firstPageIdx);

	return { currNews, renderNextNews };
}

export default renderCategoryNews;
