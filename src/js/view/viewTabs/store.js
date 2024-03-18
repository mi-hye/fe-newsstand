import { STATE } from "../../utils/Constants";

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

const dispatch = (currentView) => {
	if (currentView === STATE.total || currentView === STATE.sub) {
		viewState.currentPressView = currentView;
	}
	if (currentView === STATE.grid || currentView === STATE.list) {
		viewState.currentPressView = currentView;
	}
};

export default dispatch;
