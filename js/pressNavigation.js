const [listIcon, gridIcon] = document.querySelectorAll(
	".press__nav__icons-column i"
);
const [gridWrap, listWrap] =
	document.querySelectorAll(".press > div");

listIcon.addEventListener("click", () => {
	listIcon.classList.add("active");
	listWrap.classList.add("active");
	gridIcon.classList.remove("active");
	gridWrap.classList.remove("active");
});

gridIcon.addEventListener("click", () => {
	gridIcon.classList.add("active");
	gridWrap.classList.add("active");
    listIcon.classList.remove("active");
	listWrap.classList.remove("active");
});
