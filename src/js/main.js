import NewsHeader from "./view/newsHeader/NewsHeader.js";
import initLatestNews from "./view/latestNews/latestNews.js";
import toggleDisplayTabs from "./view/viewTabs/display.js";
import togglePressViewTabs from "./view/viewTabs/pressView.js";
import { changeView } from "./view/viewTabs/store.js";

NewsHeader.reload();
NewsHeader.initDate();
initLatestNews();
toggleDisplayTabs();
togglePressViewTabs();
changeView();
