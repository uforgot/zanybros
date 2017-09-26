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
        transition:transform 0.2s ease-out;
    }

    .slide-left-enter {
        transition:transform 0.2s ease-out;
        transform: translate3d(0px,0px,0px);
    }

    .slide-left-leave-active {
        transition:transform 0.2s ease-out;
        transform: translate3d(-100%,0px,0px);
    }

    .slide-right-enter {
        transition:transform 0.2s ease-out;
        transform: translate3d(0px,0px,0px);
    }

    .slide-right-leave-active {
        transition:transform 0.2s ease-out;
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
    import ViewAbout from './backup/view-about.vue';
    import ViewWorks from './backup/view-works.vue';
    import ViewContact from './backup/view-contact.vue';
    import ViewWorksView from './view-works-view.vue';
    import ViewContainer from './view-container.vue';

    const routes = [
        { path: '/' , redirect:'/about'},
        { name:'about', path: '/about', component: ViewContainer },
        { name:'works', path: '/works', component: ViewContainer,
            children : [{
                name:'works-view',
                path:'view/:id',
                component:ViewWorksView
            }]
        },
        { name:'contact', path: '/contact', component: ViewContainer}
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
        console.log(to.path);
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
            '$route'(to, from) {
//                 get route depth based on path
//                const toDepth = to.path.split('/').length;
//                const fromDepth = from.path.split('/').length;
//                this.transitionDirection = toDepth < fromDepth ? 'slide-right' : 'slide-left';
//                this.transitionDirection = 'slide-left';

                if (Window.noTransition===true) {
                    this.transitionDirection = 'none';
                    Window.noTransition = false;
                } else {
                    this.transitionDirection = this.getRouterFlowDirection(
                        this.getCurrentIndex(from.name),
                        this.getCurrentIndex(to.name)
                    );
                }
                console.log(this.transitionDirection);
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

