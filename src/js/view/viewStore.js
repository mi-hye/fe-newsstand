import { STATE, GRID, LIST } from "../utils/Constants.js";
import Grid from "./press/Grid.js";
import controlSwiper from "../components/swiper.js";
import List from "./press/list/List.js";
import listDispatch from "./press/list/listStore.js";

const viewState = {
	currentPressView: "total",
	currentDisplay: "grid",
};

for (const key in viewState) {
	let _value = viewState[key];
	Object.defineProperty(viewState, key, {
		get() {
			return _value;
		},
		async set(value) {
			_value = value;
			await changeView();
		},
	});
}

async function changeView() {
	if (viewState.currentDisplay === "grid" && viewState.currentPressView === "total") {
		await Grid.totalRender(GRID.firstPageIdx);
		controlSwiper(GRID.firstPageIdx, GRID.lastPageIdx, Grid.totalRender, true);
	}
	if (viewState.currentDisplay === "grid" && viewState.currentPressView === "sub") {
		const lastPageIdx = await Grid.subRender(GRID.firstPageIdx);
		controlSwiper(GRID.firstPageIdx, lastPageIdx, Grid.subRender, true);
	}
	if (viewState.currentDisplay === "list" && viewState.currentPressView === "total") {
		//여기서 렌더하는게 아니라 listStore를 부르자
		//liststore.currview = total
		listDispatch(STATE.total);

		// await List.totalRender();
		// controlSwiper(LIST.firstPageIdx, LIST.lastPageIdx, List.nextNewsRender, false);
	}
	if (viewState.currentDisplay === "list" && viewState.currentPressView === "sub") {
		//liststore.currview = sub
		listDispatch(STATE.sub);

		// const lastPageIdx = await List.subRender();
		// controlSwiper(LIST.firstPageIdx, lastPageIdx, List.nextNewsRender, false);
	}
}

const dispatch = (currentView) => {
	if (currentView === STATE.total || currentView === STATE.sub) {
		viewState.currentPressView = currentView;
	}
	if (currentView === STATE.grid || currentView === STATE.list) {
		viewState.currentDisplay = currentView;
	}
};

export { dispatch, changeView };
