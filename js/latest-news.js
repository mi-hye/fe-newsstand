import readJSON from "./utils/readJSON.js";

const news = await readJSON("news");

const firstNews = news.slice(0, 5);
const secondNews = news.slice(5, 10);

const [firstArea, secondArea] = document.querySelectorAll(
	".latest-news__rolling"
);

// <a href="${firstNews[0].href}" class="latest-news__rolling--prev">
// ${firstNews[0].text}
// </a>

let idx = 0;
setInterval(() => {
	if (idx === 5) idx = 0;
	console.log(idx);
	aaa(idx);
	idx += 1;
}, 4000);

function aaa(idx) {
	firstArea.innerHTML = `
    <a href="${firstNews[idx].href}" class="latest-news__rolling--current">
    ${firstNews[idx].text}
    </a>
    `;
}
