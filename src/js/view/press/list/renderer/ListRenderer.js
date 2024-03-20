import { LIST_TAB, LIST } from "../../../../utils/Constants.js";

const ListRenderer = {
	totalTab($tabList) {
		$tabList.innerHTML = LIST_TAB.category.reduce((prev, curr) => {
			prev += `<li class="press__list__nav__item" role="tab" tabindex="0">
                        <span>${curr}</span>
						<div class="press__list__nav__item__info"></div>
                        <li class="press__list__nav__item--animation"></li>
                    </li>`;
			return prev;
		}, "");
	},
	totalTabInfo(totalList, $currTab) {
		const $div = $currTab.querySelector(".press__list__nav__item__info");
		const length = totalList[$currTab.innerText].totalCount
			.toString()
			.padEnd(LIST_TAB.charNum, " ")
			.replace(" ", "&nbsp;&nbsp;");

		$div.innerHTML = `
				<span class="press__list__nav__item__new-count curr">1</span>
				<span class="press__list__nav__item__new-count total">/ ${length}</span>`;
	},
};

export default ListRenderer;
