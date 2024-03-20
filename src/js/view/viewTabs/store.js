import { STATE, GRID } from "../../utils/Constants.js";
import Grid from "../press/Grid.js";
import controlSwiper from "../../components/swiper.js";
import List from "../press/list/List.js";

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
		set(value) {
			_value = value;
			changeView();
		},
	});
}

function changeView() {
	if (viewState.currentDisplay === "grid" && viewState.currentPressView === "total") {
		Grid.totalRender(GRID.firstPageIdx);
		controlSwiper(GRID.firstPageIdx, GRID.lastPageIdx, Grid.totalRender, "grid");
	}
	if (viewState.currentDisplay === "grid" && viewState.currentPressView === "sub") {
		const lastPageIdx = Grid.subRender(GRID.firstPageIdx);
		controlSwiper(GRID.firstPageIdx, lastPageIdx, Grid.subRender, "grid");
	}
	if (viewState.currentDisplay === "list" && viewState.currentPressView === "total") {
		List.totalRender();
	}
	// if(viewState.currentPressView)
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
