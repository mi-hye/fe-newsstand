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
	if (currentView === "total" || currentView === "sub") {
		viewState.currentPressView = currentView;
	}
	if (currentView === "grid" || currentView === "list") {
		viewState.currentPressView = currentView;
	}
};

export default dispatch;
