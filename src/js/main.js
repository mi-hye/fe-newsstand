import newsHeader from "./components/newsHeader/newsHeader.js";
import initLatestNews from "./components/latest-news/latestNews.js";
import Grid from "./components/press/Grid.js";
import togglePressNaviTab from "./components/press/pressNavigation.js";

newsHeader.newsHeaderReload();
newsHeader.initDate();
initLatestNews();
Grid.init();
togglePressNaviTab();
