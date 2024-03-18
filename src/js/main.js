import NewsHeader from "./view/newsHeader/NewsHeader.js";
import initLatestNews from "./view/latestNews/latestNews.js";
import Grid from "./view/press/Grid.js";
import toggleDisplayTabs from "./view/viewTabs/display.js";
import togglePressViewTabs from "./view/viewTabs/pressView.js";

NewsHeader.reload();
NewsHeader.initDate();
initLatestNews();
Grid.init();
toggleDisplayTabs();
togglePressViewTabs();
