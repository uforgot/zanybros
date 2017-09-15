/**
* -----------------------------------------------------
* Created by uforgot on 2017. 9. 1.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div id="app">
        <view-background></view-background>
        <transition :name="transitionDirection" mode="out-in">
                <router-view class="view-container"></router-view>
        </transition>
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
        routes,
    });

    router.beforeEach((to, from, next) => {
//        console.log('--> router before each');
        next();
    });

    router.afterEach((to, from) => {
//        console.log('--> router after each')
    });
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
                transitionDirection: 'slide-left',
                dataVideo:Object
            }
        },

        computed : {},
        methods : {},
        watch: {
//            '$route'(to, from) {
                // get route depth based on path
//                const toDepth = to.path.split('/').length;
//                const fromDepth = from.path.split('/').length;
//                this.transitionDirection = toDepth < fromDepth ? 'slide-right' : 'slide-left';
//                this.transitionDirection = 'slide-left';
//            }
        },

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

