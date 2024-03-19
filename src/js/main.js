import NewsHeader from "./view/newsHeader/NewsHeader.js";
import initLatestNews from "./view/latestNews/latestNews.js";
import toggleDisplayTabs from "./view/viewTabs/display.js";
import togglePressViewTabs from "./view/viewTabs/pressView.js";
import { changeView } from "./view/viewTabs/store.js";
import Grid from "./view/press/Grid.js";

NewsHeader.reload();
NewsHeader.initDate();
initLatestNews();
toggleDisplayTabs();
togglePressViewTabs();
changeView();
Grid.clickSubscribe();
