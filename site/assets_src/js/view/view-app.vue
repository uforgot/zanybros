/**
* Created by uforgot on 2017. 7. 18..
*/

<template>
    <div id="app">
        <view-background></view-background>
        <router-view class="content-container"></router-view>
        <view-frame></view-frame>
    </div>
</template>


<script>
    import { EventBus } from '../events/event-bus.js';
    import ViewFrame from './view-frame.vue';
    import ViewBackground from './view-background.vue';

    import VueRouter from 'vue-router';
    import ViewAbout from './view-about.vue';
    import ViewWorks from './view-works.vue';
    import ViewContact from './view-contact.vue';

    const routes = [
        { path: '/' , redirect:'/about'},
        { path: '/about', component: ViewAbout },
        { path: '/works', component: ViewWorks },
        { path: '/contact', component: ViewContact }
    ];

    const router = new VueRouter({
        mode:'hash',
        routes
        }
    );

    export default {
        router,
        data: function() {
            return {
                dataVideo:Object
            }
        },

        components:{
            ViewFrame,
            ViewBackground
        },

        methods : {

        },

        beforeDestroy: function () {

        },

        mounted : function() {

        },

        created:function(){

        }
    }
</script>

