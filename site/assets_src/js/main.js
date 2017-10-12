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
import './mixin/mixin-utils-routes';
import App from './view/view-app.vue'
import {EventBus} from "./events/event-bus";

window.noTransition = false;
window.currentContentsX = 0;
window.rootPath = '';

window.addEventListener('popstate', function (e) {
    console.log('popstate');
    // window.noTransition = true;
})

function getWorksDatafromJson($data) {
    let returnArray = [];
    let tmpNode = $data.data.contentsData;
    let i,j,k,l;

    for (i=0;i<tmpNode.length;i++) {

        if (!tmpNode[i]) {
            continue;
        }
        if (!tmpNode[i].hasOwnProperty('contents')) {
            continue;
        }

        let tmpNode3 = tmpNode[i].contents;

        for (k = 0; k < tmpNode3.length; k++) {
            let tmpNode4 = tmpNode3[k];

            if (tmpNode4.component === 'view-works-holder') {
                let tmpNode5 = tmpNode4.data.content;

                for (l = 0; l < tmpNode5.length; l++) {
                    let tmpNode6 = tmpNode5[l];

                    if (tmpNode6.component === 'content-works-item') {
                        returnArray.push(tmpNode6);
                    }

                }
            }
        }
        // }
    }

    return returnArray;
}

function getTitleArray($data) {
    let returnArray = [];
    let tmpNode = $data.data.contentsData;
    let i;

    for (i=0;i<tmpNode.length;i++) {
        returnArray.push(getTitleArrayInContents(tmpNode[i]));
    }
    return returnArray;
}

function getTitleArrayInContents($data) {
    let i;
    let returnArray = [];

    for (i=0;i<$data.contents.length;i++) {
        let tmpData = $data.contents[i];
        if (tmpData.component === 'view-content-title') {
            returnArray.push(
                {
                    title: tmpData.data.title,
                    menu: tmpData.data.menu
                }
            );
        }
    }
    return returnArray;
}

function init() {
    Axios({
        method:'get',
        url: ZanyBrosDataUrl,
        responseType:'json'
    }).then(
        ($response) => {
            console.log('>> data loaded');

            //컨텐츠 데이터 셋팅
            window.ZanyBrosData = $response;
            window.ZanyBrosWorksData = getWorksDatafromJson(window.ZanyBrosData);
            window.ZanyBrosTitlaArray = getTitleArray(window.ZanyBrosData);

            // console.log(window.ZanyBrosTitlaArray);

            window.app = new Vue({
                render: h => h(App)
            }).$mount('#app');

            document.addEventListener('scroll', ($e) => {
                EventBus.$emit(EventBus.SCROLL_MOVE, $e);
            }, true);

            window.addEventListener('resize', ($e) => {
                EventBus.$emit(EventBus.WINDOW_RESIZE, $e);
            }, true);

        }
    ).catch(
        ($error) => console.log($error)
    );
}

window.onLoad = init();

