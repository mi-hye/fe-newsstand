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
	const [desLeftArea, desRightArea] = headerArea.nextElementSibling.children;

	const headerJson = currNews[0].header;
	const descLeftJson = currNews[0].descriptionLeft;
	const descRightArr = currNews[0].descriptionRight;

	headerArea.innerHTML = header(headerJson);
	desLeftArea.innerHTML = descriptionLeft(descLeftJson);
	desRightArea.innerHTML = descriptionRight(descRightArr);
}

export default renderCategoryNews;
