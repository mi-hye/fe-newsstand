const NewsHeader = {
	initDate() {
		const date = document.querySelector(".news-header__date");
		date.innerHTML = new Intl.DateTimeFormat("ko-KR", {
			year: "numeric",
			month: "numeric",
			day: "numeric",
			weekday: "long",
		}).format(new Date());
	},
	reload() {
		const a = document.querySelector(".news-header > a");
		a.addEventListener("click", () => window.location.reload());
	},
	changeDark() {
		const $dark = document.querySelector(".dark-mode");
		$dark.addEventListener("click", () => {
			const theme = document.body.getAttribute("data-theme");
			if (!theme) document.body.setAttribute("data-theme", "dark");
			else document.body.removeAttribute("data-theme");
		});
	},
};

export default NewsHeader;
