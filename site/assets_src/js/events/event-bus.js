/**
 * Created by uforgot on 2017. 7. 20..
 */

import Vue from 'vue'
export const EventBus = new Vue();

EventBus.WINDOW_RESIZE = "window_resize";
EventBus.SCROLL_MOVE = "scroll_move";
EventBus.CONTENTS_FOLDING = "contents_folding";
EventBus.MENU_CLICK = "menu_click";

EventBus.MENU_SHOW = "menu_show";
EventBus.MENU_HIDE = "menu_hide";

EventBus.WORK_ITEM_CLICK = "work_item_click";

EventBus.WORK_VIEW_SHOW = "work_view_hide";
EventBus.WORK_VIEW_HIDE = "work_view_hide";

EventBus.MENU_CLICK_EVENT = 'menu_click_event';