/**
 * Created by uforgot on 2017. 7. 11..
 */
import Axios from 'axios'
import Vue from 'vue';

//vue plugins
import VueYouTubeEmbed from 'vue-youtube-embed';
Vue.use(VueYouTubeEmbed);



import Router from './vendor/routie';

//전역 유틸 mixin
import './mixin/mixin-utils-common';
import App from './view/view-app.vue'
import {EventBus} from "./events/event-bus"

function init() {
    Axios({
        method:'get',
        url: ZanyBrosDataUrl,
        responseType:'json'
    }).then(
        ($response) => {
            //컨텐츠 데이터 셋팅
            Window.ZanyBrosData = $response;
            Window.app = new Vue({
                el: '#app',
                render: h => h(App)
            });

            //라우터 셋팅
            Router({
                '': function() {
                    window.location.href = '#about';
                },
                'about': function() {
                    EventBus.$emit(EventBus.MENU_CLICK_EVENT, 1);
                },
                'works': function() {
                    EventBus.$emit(EventBus.MENU_CLICK_EVENT, 2);
                },
                'contact' : function() {
                    EventBus.$emit(EventBus.MENU_CLICK_EVENT, 3);
                }
            });
            console.log('---> router setting');
        }
    ).catch(
        ($error) => console.log($error)
    );
}

window.onLoad = init();

