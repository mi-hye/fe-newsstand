import { STATE } from "../../utils/Constants.js";
import Grid from "../press/Grid.js";

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
		},
	});
}

function changeView() {
	if (viewState.currentDisplay === "grid") Grid.init();
	// if(viewState.currentPressView)
	// if(viewState.currentPressView)
	// if(viewState.currentPressView)
}

const dispatch = (currentView) => {
	if (currentView === STATE.total || currentView === STATE.sub) {
		viewState.currentPressView = currentView;
	}
	if (currentView === STATE.grid || currentView === STATE.list) {
		viewState.currentPressView = currentView;
	}
};

export { dispatch, changeView };
