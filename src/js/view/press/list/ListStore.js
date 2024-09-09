import controlSwiper from "../../../components/swiper.js";
import { LIST, STATE } from "../../../helper/Constants.js";
import fetchJSON from "../../../helper/fetchJSON.js";
import List from "./List.js";

const ListState = {
	currPressViewJson: "",
	currDisplay: "",
	$currTab: "",
};

function addDefineProperty() {
	let _value = ListState.currPressViewJson;
	Object.defineProperty(ListState, "currPressViewJson", {
		get() {
			return _value;
		},
		async set(value) {
			_value = value;
			render(value);
		},
	});

	let _$tabValue = ListState.$currTab;
	Object.defineProperty(ListState, "$currTab", {
		get() {
			return _$tabValue;
		},
		async set(value) {
			_$tabValue = value;
			changeCurrTab(value);
		},
	});
}

function render(currNewsJson) {
	const isTotal = ListState.currDisplay === STATE.total;
	List.tabRender(currNewsJson, isTotal);
	const firstCategory = document.querySelector(".press__list__nav__item");
	firstCategory.click();
}

function changeCurrTab($currTab) {
	const isTotal = ListState.currDisplay === STATE.total;
	const currTabStartIdx = List.renderTabInfo($currTab, isTotal);
	const nextRender = List.newsRender(
		ListState.currPressViewJson,
		currTabStartIdx,
		isTotal,
		$currTab
	);
	controlSwiper(currTabStartIdx, LIST.lastPageIdx, nextRender, false);
}

async function listDispatch(state) {
	if (state === STATE.total) {
		ListState.currDisplay = "total";
		ListState.currPressViewJson = await fetchJSON("totalList");
		return;
	}
	if (state === STATE.sub) {
		ListState.currDisplay = "sub";
		ListState.currPressViewJson = await fetchJSON("subList");
		return;
	}
	if (typeof state === "object") {
		ListState.$currTab = state;
		return;
	}
}

addDefineProperty();
export default listDispatch;
