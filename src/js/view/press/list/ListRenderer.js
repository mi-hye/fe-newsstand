import { LIST_TAB } from "../../../utils/Constants.js";

const ListRenderer = {
	tabs($tabList, tabs) {
		$tabList.innerHTML = tabs.reduce((prev, curr) => {
			prev += `<li class="press__list__nav__item" role="tab" tabindex="0">
                        <span>${curr}</span>
						<div class="press__list__nav__item__info"></div>
                        <li class="press__list__nav__item--animation"></li>
                    </li>`;
			return prev;
		}, "");
	},
	totalTabInfo(listInfo, $currTab) {
		const $div = $currTab.querySelector(".press__list__nav__item__info");
		const currTabText = $currTab.children[0].innerText;
		const length = listInfo[currTabText].totalCount
			.toString()
			.padEnd(LIST_TAB.charNum, " ")
			.replace(" ", "&nbsp;&nbsp;");

		$div.innerHTML = `
				<span class="press__list__nav__item__new-count curr">1</span>
				<span class="press__list__nav__item__new-count total">/ ${length}</span>`;
	},
	subTabInfo($currTab) {
		const $div = $currTab.querySelector(".press__list__nav__item__info");
		$div.innerHTML = `<span class="press__list__nav__item__new-count curr"> 〉 </span>`;
	},
	top({ id, header, subscription }) {
		const { aHref, imgSrc, spanText } = header;
		return `<a href=${aHref}>
					<img src=${imgSrc} />
				</a>
				<span>${spanText}</span>
				<button class="${id}">${subscription ? "X" : "+ 구독하기"}</button>`;
	},
	descLeft(descLeftJson) {
		const { aHref, aText, imgSrc } = descLeftJson;
		return `<a href=${aHref}>
					<img src="${imgSrc}"/>
				</a>
				<a href=${aHref}>${aText}</a>`;
	},

	descRight(descRightArr) {
		const innerElements = descRightArr.reduce((prev, curr) => {
			prev += `<li><a href=${curr.href}>${curr.text}</a></li>`;
			return prev;
		}, "<ul>");

		return `${innerElements}</ul>`;
	},
	setInnerHTML: (area, renderer, json) => (area.innerHTML = renderer(json)),
	currNum(currIdx, listInfo, $currTab) {
		const $currNum = $currTab.querySelector(".curr");
		const currTabText = $currTab.children[0].innerText;
		$currNum.innerHTML = currIdx - listInfo[currTabText].startIdx + 1;
	},
	getRenderArea() {
		const headerArea = document.querySelector(".press__list__news-top");
		const [desLeft, desRight] = headerArea.nextElementSibling.children;
		return { headerArea, desLeft, desRight };
	},
	news(newsJson, currIdx, isEmpty) {
		//TODO 뉴스 비어있을때
		const { headerArea, desLeft, desRight } = ListRenderer.getRenderArea();
		const { id, header, descriptionLeft, descriptionRight, subscription } = newsJson[currIdx];
		ListRenderer.setInnerHTML(headerArea, ListRenderer.top, { id, header, subscription });
		ListRenderer.setInnerHTML(desLeft, ListRenderer.descLeft, descriptionLeft);
		ListRenderer.setInnerHTML(desRight, ListRenderer.descRight, descriptionRight);
	},
};

export default ListRenderer;
