/**
 * Created by uforgot on 2017. 7. 20..
 */

import Vue from 'vue'
export const EventBus = new Vue();

EventBus.MENU_CLICK_EVENT = "menu_click_event";
EventBus.CONTENTS_FOLDING_EVENT = "contents_folding_event";

