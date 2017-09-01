/**
* -----------------------------------------------------
* Created by uforgot on 2017. 9. 1.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div id="app">
        <view-background></view-background>
        <router-view class="view-container"></router-view>
        <view-frame></view-frame>
    </div>
</template>

<style scoped lang="scss">
    @import "~scssMixin";
</style>

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
        mixins:[],
        components:{
            ViewFrame,
            ViewBackground
        },

        props: {},
        data: function() {
            return {
                dataVideo:Object
            }
        },

        computed : {},
        methods : {},
        watch : {},

        //life cycle
        //beforeCreate : function() {},
        //created : function() {},
        //beforeMount : function() {},
        //mounted : function() {},
        //beforeUpdate : function() {},
        //updated : function() {},
        //activated : function() {},
        //deactivated : function() {},
        //beforeDestroy : function () {},
        //destroyed : function() {},
        dummy : {}
    }
</script>

