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
window.rootPath = '';
window.windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
window.windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

window.addEventListener('popstate', function (e) {
    //console.log('popstate');
})

function init() {
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
            window.MobieWidth = 767;

            window.app = new Vue({
                render: h => h(App)
            }).$mount('#app');

            document.addEventListener('scroll', ($e) => {
                EventBus.$emit(EventBus.SCROLL_MOVE, $e);
            }, true);

            window.addEventListener('resize', ($e) => {
                let currentWindowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                let currentWindowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

                // if (_isMobile) {
                //     if (currentWindowWidth < currentWindowHeight) {
                //         if(currentWindowHeight < window.windowHeight) {
                //             currentWindowHeight = window.windowHeight;
                //         }
                //     }
                // }

                window.windowWidth = currentWindowWidth;
                window.windowHeight = currentWindowHeight;
                EventBus.$emit(EventBus.WINDOW_RESIZE, $e);
            }, true);
        }
    ).catch (
        ($error) => console.log($error)
    );
}

window.onLoad = init();

