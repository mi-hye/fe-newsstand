import readJSON from "../../utils/readJSON.js";
import renderTab from "./listTab.js";

const LIST = {
	allNewsJson: await readJSON("allListNews"),
	init: () => {
		renderTab(LIST.allNewsJson);
	},
};

export default LIST;
