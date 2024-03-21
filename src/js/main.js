import NewsHeader from "./view/newsHeader/NewsHeader.js";
import initLatestNews from "./view/latestNews/latestNews.js";
import toggleDisplayTabs from "./view/viewTabs/display.js";
import togglePressViewTabs from "./view/viewTabs/pressView.js";
import { changeView } from "./view/viewStore.js";
import Grid from "./view/press/Grid.js";
import List from "./view/press/list/List.js";

NewsHeader.reload();
NewsHeader.initDate();
initLatestNews();
toggleDisplayTabs();
togglePressViewTabs();
changeView();
Grid.clickSubscribe();
List.clickTab();
List.clickSubscribe();
