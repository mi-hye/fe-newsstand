const date = document.querySelector(".news-header__date");
date.innerHTML = new Intl.DateTimeFormat("ko-KR", {
	year: "numeric",
	month: "numeric",
	day: "numeric",
	weekday: "long",
}).format(new Date());
