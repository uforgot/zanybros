/**
 * Created by uforgot on 2017. 7. 11..
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './router';

require('./bootstrap');
require('./util');

Vue.use(VueRouter);

const app = new Vue({
    el: '#app',
    router,

    components:{
        "comp-navigation": require('./component/navigation.vue'),
        "view-root" : require('./view/root.vue')
    },

    mounted : function() {
        this.$on('customMouseDown', function (msg) {
            console.log('app caught in parent', msg)
        });
    },

    created:function(){

    }
});