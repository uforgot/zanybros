/**
 * Created by uforgot on 2017. 7. 11..
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './router';

Vue.use(VueRouter);

const app = new Vue({
    el: '#app',
    router,

    components:{
        "navigation": require('./component/navigation.vue'),
    },

    mounted : function() {

    },

    created:function(){

    }
});