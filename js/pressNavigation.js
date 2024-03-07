const [listIcon, gridIcon] = document.querySelectorAll(
	".press__nav__icons-column i"
);
const [gridWrap, listWrap] =
	document.querySelectorAll(".press > div");

listIcon.addEventListener("click", () => {
	listIcon.classList.add("active");
	gridIcon.classList.remove("active");

	listWrap.classList.add("active");
	gridWrap.classList.remove("active");
});

gridIcon.addEventListener("click", () => {
	listIcon.classList.remove("active");
	gridIcon.classList.add("active");

	listWrap.classList.remove("active");
	gridWrap.classList.add("active");
});
