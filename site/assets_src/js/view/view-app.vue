/**
* -----------------------------------------------------
* Created by uforgot on 2017. 9. 1.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div id="app">
        <!--<view-background></view-background>-->
        <transition :name="transitionDirection" mode="out-in">
            <!--<keep-alive>-->
                <router-view
                        :current-index="getCurrentIndex($route.name)"
                        :key="getCurrentIndex($route.name)"
                        class="view-container">
                </router-view>
            <!--</keep-alive>-->
        </transition>
        <view-frame></view-frame>
    </div>
</template>

<style scoped lang="scss">
    @import "~scssMixin";

    .view-container {
        transition:transform 0.3s ease-out;
    }

    .slide-left-enter {
        transition:transform 0.3s ease-out;
        transform: translate3d(0px,0px,0px);
    }

    .slide-left-leave-active {
        transition:transform 0.3s ease-out;
        transform: translate3d(-100%,0px,0px);
    }

    .slide-right-enter {
        transition:transform 0.3s ease-out;
        transform: translate3d(0px,0px,0px);
    }

    .slide-right-leave-active {
        transition:transform 0.3s ease-out;
        transform: translate3d(100%,0px,0px);
    }

    .none-enter{
        transition:transform 0.0s ease-out;
    }
    .none-leave-active{
        transition:transform 0.0s ease-out;
    }
</style>

<script>
    import { EventBus } from '../events/event-bus.js';
    import ViewFrame from './view-frame.vue';
    import ViewBackground from './view-background.vue';

    import VueRouter from 'vue-router';
    import ViewWorksView from './view-works-view.vue';
    import ViewContainer from './view-container.vue';

//    console.log('-------v 5');

    window.routerMode = 'history';
    //window.routerMode = 'hash';

    if (window.routerMode==='hash') {
        window.rootPath = '';
    } else {
        window.rootPath = '/site';
    }

    const routes = [
        { path: '*',redirect:window.rootPath+'/about'},
        { path: window.rootPath, redirect:window.rootPath+'/about'},
        { name:'about', path: window.rootPath+'/about', component: ViewContainer },
        { name:'whatwedo', path: window.rootPath+'/whatwedo', component: ViewContainer},
        { name:'ourworks', path: window.rootPath+'/ourworks', component: ViewContainer,
            children : [{
                name:'works-view',
                path:'view/:id',
                component:ViewWorksView
            }]
        }
    ];
//    mode:'history',
    const router = new VueRouter({
        mode:window.routerMode,
        routes: routes,
        scrollBehavior (to, from, savedPosition) {
            if (savedPosition) {
                return savedPosition
            } else {
                return { x: 0, y: 0 }
            }
        }
    });

    router.beforeEach((to, from, next) => {
//        console.log('--> router before each');
        next();
    });

    router.afterEach((to, from) => {
//        console.log('--> router after each')
//        console.log(to.path);
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
                transitionDirection: 'slide-right',
                dataVideo:Object
            }
        },

        computed : {},
        methods : {},
        watch: {
            '$route' (to, from) {
//                get route depth based on path
//                const toDepth = to.path.split('/').length;
//                const fromDepth = from.path.split('/').length;
//                this.transitionDirection = toDepth < fromDepth ? 'slide-right' : 'slide-left';
//                this.transitionDirection = 'slide-left';

                console.log('notransition : ' + window.noTransition);

                if (window.noTransition===true) {
                    this.transitionDirection = 'none';
                    window.noTransition = false;
                } else {
                    this.transitionDirection = this.getRouterFlowDirection(
                        this.getCurrentIndex(from.name),
                        this.getCurrentIndex(to.name)
                    );
                }
                EventBus.$emit(EventBus.MENU_CLICK, to.name);
            }
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

