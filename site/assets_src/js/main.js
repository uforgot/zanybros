/**
 * Created by uforgot on 2017. 7. 11..
 */
import Axios from 'axios'
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

//vue plugins
import VueYouTubeEmbed from 'vue-youtube-embed';
Vue.use(VueYouTubeEmbed);

//전역 유틸 mixin
import './mixin/mixin-utils-common';
import App from './view/view-app.vue'

function init() {
    Axios({
        method:'get',
        url: ZanyBrosDataUrl,
        responseType:'json'
    }).then(
        ($response) => {
            console.log('>> data loaded');

            //컨텐츠 데이터 셋팅
            Window.ZanyBrosData = $response;
            Window.app = new Vue({
                render: h => h(App)
            }).$mount('#app');
        }
    ).catch(
        ($error) => console.log($error)
    );
}

window.onLoad = init();

