const removeActive = (icon, wrap) => {
	icon.classList.remove("active");
	wrap.classList.remove("active");
};

const addActive = (icon, wrap) => {
	icon.classList.add("active");
	wrap.classList.add("active");
};

function togglePressNaviTab() {
	const [listIcon, gridIcon] = document.querySelectorAll(".press__nav__icons-column i");
	const [gridWrap, listWrap] = document.querySelectorAll(".press > div");

	listIcon.addEventListener("click", () => {
		addActive(listIcon, listWrap);
		removeActive(gridIcon, gridWrap);
	});

	gridIcon.addEventListener("click", () => {
		addActive(gridIcon, gridWrap);
		removeActive(listIcon, listWrap);
	});
}

export default togglePressNaviTab;
