function togglePressViewTabs() {
	const [totalView, subView] = document.querySelectorAll(".press__nav__press-column > div");

	totalView.addEventListener("click", () => {
		totalView.classList.add("active");
		subView.classList.remove("active");
	});

	subView.addEventListener("click", () => {
		subView.classList.add("active");
		totalView.classList.remove("active");
	});
}

export default togglePressViewTabs;
