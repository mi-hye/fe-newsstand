import NewsHeader from "./view/newsHeader/NewsHeader.js";
import initLatestNews from "./view/latestNews/latestNews.js";
import Grid from "./view/press/Grid.js";
import togglePressNaviTab from "./view/press/pressNavigation.js";
import addEventListTab from "./view/list/listTab.js";

NewsHeader.reload();
NewsHeader.initDate();
initLatestNews();
Grid.init();
togglePressNaviTab();
addEventListTab();
