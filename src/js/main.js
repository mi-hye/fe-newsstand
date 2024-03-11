import NewsHeader from "./components/newsHeader/NewsHeader.js";
import initLatestNews from "./components/latestNews/latestNews.js";
import Grid from "./components/press/Grid.js";
import togglePressNaviTab from "./components/press/pressNavigation.js";

NewsHeader.reload();
NewsHeader.initDate();
initLatestNews();
Grid.init();
togglePressNaviTab();
