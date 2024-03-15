import readJSON from "../../../utils/readJSON.js";
import renderTab from "./listTab.js";

const List = {
	allNewsJson: await readJSON("allListNews"),
	init: () => {
		renderTab(List.allNewsJson);

		const firstCategory = document.querySelector(".press__list__nav__item");
		firstCategory.click();
	},
};

export default List;
