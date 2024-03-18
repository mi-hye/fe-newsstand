import NewsHeader from "./view/newsHeader/NewsHeader.js";
import initLatestNews from "./view/latestNews/latestNews.js";
import Grid from "./view/press/Grid.js";
import addClickPressNaviTab from "./view/press/pressNavigation.js";

NewsHeader.reload();
NewsHeader.initDate();
initLatestNews();
Grid.init();
addClickPressNaviTab();
