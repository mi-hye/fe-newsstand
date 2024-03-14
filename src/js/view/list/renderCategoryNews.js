const header = (headerJson) => {
	const { aHref, imgSrc, spanText } = headerJson;
	return `<a href=${aHref}>
				<img src=${imgSrc} />
			</a>
			<span>${spanText}</span>
			<button>+ 구독하기</button>`;
};

const descriptionLeft = (descLeftJson) => {
	const { aHref, aText, imgSrc } = descLeftJson;
	return `<a href=${aHref}>
				<img src="${imgSrc}"/>
			</a>
			<a href=${aHref}>${aText}</a>`;
};

const descriptionRight = (descRightArr) => {
	const innerElements = descRightArr.reduce((prev, curr) => {
		prev += `<li><a href=${curr.href}>${curr.text}</a></li>`;
		return prev;
	}, "<ul>");

	return `${innerElements}</ul>`;
};

function renderCategoryNews(current, allNewsJson) {
	const currText = current.querySelector("span").innerHTML;
	const currNews = allNewsJson[currText];

	const headerArea = document.querySelector(".press__list__news-top");
	const [desLeft, desRight] = headerArea.nextElementSibling.children;

	const renderNextNews = (currIdx) => {
		const currSpan = current.querySelector(".curr");
		const animation = current.querySelector(".press__list__nav__item--animation");

		const headerJson = currNews[currIdx].header;
		const descLeftJson = currNews[currIdx].descriptionLeft;
		const descRightArr = currNews[currIdx].descriptionRight;

		headerArea.innerHTML = header(headerJson);
		desLeft.innerHTML = descriptionLeft(descLeftJson);
		desRight.innerHTML = descriptionRight(descRightArr);
		currSpan.innerHTML = currIdx + 1;

		animation.classList.remove("active");
		void animation.offsetWidth;
		animation.classList.add("active");
	};

	renderNextNews(0);

	return { currNews, renderNextNews };
}

export default renderCategoryNews;
