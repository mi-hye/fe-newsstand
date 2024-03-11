import newsHeader from "./components/newsHeader/newsHeader.js";
import initLatestNews from "./components/latest-news/latestNews.js";
import Grid from "./components/press/Grid.js";

newsHeader.newsHeaderReload();
newsHeader.initDate();
initLatestNews();
await Grid.init();
