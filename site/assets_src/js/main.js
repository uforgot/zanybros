/**
 * Created by uforgot on 2017. 7. 11..
 */

import es6Promise from 'es6-promise';
es6Promise.polyfill();

require("babel-polyfill");


import Axios from 'axios'
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

//vue plugins
import VueYouTubeEmbed from 'vue-youtube-embed';
Vue.use(VueYouTubeEmbed);

//전역 유틸 mixin
import './mixin/mixin-utils-common';
import './mixin/mixin-utils-routes';
import { UtilsData } from './utils/utils-data';
import App from './view/view-app.vue'
import Frame from './view/view-frame.vue'
import {EventBus} from "./events/event-bus";

window.noTransition = false;
window.currentContentsX = 0;
window.windowWidth = 0;
window.windowHeight = 0;
window.mobileRatio = 16/9.5;
window.MobileWidth = 767;

let WINDOW_MODE_NONE = 'none';
let WINDOW_MODE_LANDSCAPE = 'landscape';
let WINDOW_MODE_PORTRAIT = 'portarit';
window.windowMode = WINDOW_MODE_NONE;

window.addEventListener('popstate', function (e) {
    //console.log('popstate');
});

function init() {
    resizeHandler();

    Axios({
        method:'get',
        url: ZanyBrosDataUrl,
        responseType:'json'
    }).then(
        ($response) => {
            console.log('>> data loaded -------- ');

            //컨텐츠 데이터 셋팅
            window.ZanyBrosData = $response;
            window.ZanyBrosWorksData = UtilsData.getWorksDatafromJson(window.ZanyBrosData);
            window.ZanyBrosTitlaArray = UtilsData.getTitleArray(window.ZanyBrosData);

            window.app = new Vue({
                render: h => h(App)
            }).$mount('#app');

            window.addEventListener('resize',resizeHandler, true);
            document.addEventListener('scroll', scrollHandler, true);

            resizeHandler(null);
            scrollHandler(null);
        }
    ).catch (
        ($error) => console.log($error)
    );
}

function resizeHandler($e){
    let currentWindowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let currentWindowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    let windowMode;

    // console.log('resize');

    if ( _isMobile) {
        // console.log('currentWindowWidth');
        // currentWindowHeight = currentWindowWidth * window.mobileRatio;
        currentWindowHeight = 600;
    }

    if (_isMobile) {
        if(window.windowWidth > window.windowHeight) {
            windowMode = WINDOW_MODE_LANDSCAPE;
        } else {
            windowMode = WINDOW_MODE_PORTRAIT;
        }

        if (windowMode != window.windowMode) {
            window.windowMode = windowMode;
        }

    }

    window.windowWidth = currentWindowWidth;
    window.windowHeight = Math.round(currentWindowHeight);
    EventBus.$emit(EventBus.WINDOW_RESIZE, $e);
}

function scrollHandler($e){
    EventBus.$emit(EventBus.SCROLL_MOVE, $e);
}

window.onLoad = init();

