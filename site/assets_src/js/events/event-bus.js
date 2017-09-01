/**
 * Created by uforgot on 2017. 7. 20..
 */

import Vue from 'vue'
export const EventBus = new Vue();

EventBus.WINDOW_RESIZE = "window_resize";
EventBus.SCROLL_MOVE = "scroll_move";
EventBus.MENU_CLICK = "menu_click";
EventBus.CONTENTS_FOLDING = "contents_folding";

