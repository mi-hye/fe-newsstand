import readJSON from "../../utils/readJSON.js";
import renderTab from "./listTab.js";

async function initListNews() {
	const allNewsJson = await readJSON("allListNews");
	renderTab(allNewsJson);
}

export default initListNews;
