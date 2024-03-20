import { LIST_TAB, LIST } from "../../../../utils/Constants.js";

const ListRenderer = {
	totalTab() {
		const $tabList = document.querySelector(".press__list__nav");
		$tabList.innerHTML = LIST_TAB.category.reduce((prev, curr) => {
			prev += `<li class="press__list__nav__item" role="tab" tabindex="0">
                        <span>${curr}</span>
						<span class="press__list__nav__item__info"></span>
                        <li class="press__list__nav__item--animation"></li>
                    </li>`;
			return prev;
		}, "");
	},
	totalTabInfo(totalList) {
		const $span = document.querySelector(".press__list__nav__item__info");
		$span.innerHTML = LIST_TAB.category.reduce((prev, curr) => {
			const length = totalList[curr].totalCount
				.toString()
				.padEnd(LIST_TAB.charNum, " ")
				.replace(" ", "&nbsp;&nbsp;");
			prev += `
			<span class="press__list__nav__item__new-count curr">1</span>
			<span class="press__list__nav__item__new-count total">/ ${length}</span>
					`;
		}, "");
	},
};

export default ListRenderer;
