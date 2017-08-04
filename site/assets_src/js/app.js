/**
 * Created by uforgot on 2017. 7. 11..
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import router from './router';

require('./util');


const app = new Vue({
    el: '#app',
    router,

    components:{
        "view-background" : require('./view/background.vue'),
        "view-root" : require('./view/root.vue'),
        "view-frame" : require('./view/frame.vue')
    },

    data: function() {
        return {
            isDrag:false
        }
    },

    methods : {
        dragHandler:function (e) {
            this.isDrag = e;
        }
    },

    mounted : function() {

    },

    created:function(){
        // this.$on('drag-start', () => {console.log('sss')} ); //this.onDragStartHandler);
        // this.$on('drag-end', () => this.onDragEndHandler);
    }
});