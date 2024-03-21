import controlSwiper from "../../../components/swiper.js";
import { LIST, STATE } from "../../../utils/Constants.js";
import { getJson } from "../../../utils/fetchJson.js";
import List from "./List.js";

const ListState = {
	currPressViewJson: "",
	currPressView: "",
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
	const isTotal = ListState.currPressView === STATE.total;
	List.tabRender(currNewsJson, isTotal);
	const firstCategory = document.querySelector(".press__list__nav__item");
	firstCategory.click();
}

function changeCurrTab($currTab) {
	const isTotal = ListState.currPressView === STATE.total;
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
	//TODO refactor 프롱트꺼 참고
	if (state === STATE.total) {
		ListState.currPressView = "total";
		ListState.currPressViewJson = await getJson("totalList");
		return;
	}
	if (state === STATE.sub) {
		ListState.currPressView = "sub";
		ListState.currPressViewJson = await getJson("subList");
		return;
	}
	if (typeof state === "object") {
		ListState.$currTab = state;
		return;
	}
}

addDefineProperty();
export default listDispatch;
