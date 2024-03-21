import { STATE, GRID } from "../utils/Constants.js";
import Grid from "./press/Grid.js";
import controlSwiper from "../components/swiper.js";
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

//TODO refaactor
async function changeView() {
	if (viewState.currentDisplay === "grid" && viewState.currentPressView === "total") {
		await Grid.totalRender(GRID.firstPageIdx);
		controlSwiper(GRID.firstPageIdx, GRID.lastPageIdx, Grid.totalRender, true);
	}
	if (viewState.currentDisplay === "grid" && viewState.currentPressView === "sub") {
		const lastPageIdx = await Grid.subRender(GRID.firstPageIdx);
		controlSwiper(GRID.firstPageIdx, lastPageIdx, Grid.subRender, true);
	}
	if (viewState.currentDisplay === "list" && viewState.currentPressView === "total")
		listDispatch(STATE.total);
	if (viewState.currentDisplay === "list" && viewState.currentPressView === "sub")
		listDispatch(STATE.sub);
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
