/**
* -----------------------------------------------------
* Created by uforgot on 2017. 9. 1.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div class="frame-container">
        <div class="logo"
             :class="{'black':isViewShow}"
        ><router-link :to="{name:'about'}" >ZANYBROS&nbsp;</router-link></div>

        <div class="language-container">
            <div>EN</div>
            <div>CH</div>
        </div>

        <menu class="title">
            <comp-navigation-txt
                    :data-index="currentIndex"
            ></comp-navigation-txt>
        </menu>

        <div class="btn-menu"
            @click="menuShowClickHandler"
             :class="{'hide':isMenuShow}"
        >
            <img src="/site/assets/images/svg/menu.svg" alt="">
        </div>

        <menu class="navigation-container">
            <div class="navigation left"
                 :class="{'focus':leftNavigationFocus}"
            >
                <div class="bar"
                     :class="{
                        'focus':leftNavigationFocus,
                        'black':isViewShow
                    }"
                ></div>
                <comp-navigation-txt
                        :class="{'black':isViewShow}"
                        :data-index="leftNavigationIndex"
                ></comp-navigation-txt>
            </div>
            <div class="button left"
                 @mouseover="leftNavigationOverHandler"
                 @mouseout="leftNavigationOutHandler"
                 @click="leftNavigationClickHandler"
            ></div>
            <div class="navigation right"
                 :class="{'focus':rightNavigationFocus,}"
            >
                <div class="bar"
                     :class="{'focus':rightNavigationFocus,
                         'black':isViewShow}"
                ></div>
                <comp-navigation-txt
                        :class="{'black':isViewShow}"
                        :data-index="rightNavigationIndex"
                ></comp-navigation-txt>
            </div>
            <div class="button right"
                 @mouseover="rightNavigationOverHandler"
                 @mouseout="rightNavigationOutHandler"
                 @click="rightNavigationClickHandler"
            ></div>
        </menu>

        <content-menu></content-menu>

        <div class="btn-close"
             @click="menuCloseClickHandler"
             :class="{'show':(isMenuShow || isViewShow)}">
            <img src="/site/assets/images/svg/close.svg" alt="">
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import "~scssMixin";

    /*.router-link-active {*/
        /*color:red;*/
    /*}*/
    .btn-close{
        &.show{
            top:25px;
            @include css-value-transition('opacity 0.1s 0.3s');
            @include opacity(1);
        }
    }

    .hide {
        display:none;
    }

    .logo {
        @include css-value-transition('color 0.5s ease-out 0.2s');
        &.black {
            color:#000;
        }
    }

    .txt {
        @include css-value-transition('color 0.5s ease-out 0.2s');
        &.black {
            color:#000;
        }
    }

    .bar {
        &.black {
            background-color:#000;
        }
    }

    menu {
        ul {
            @include css-value-transition('margin-top 0.2s ease-out 0s');
        }

        .left {
            @include css-value-transition('left 0.2s ease-out 0s');
            &.focus {
                left:20px;

                .txt {
                    @include css-value-transition('opacity 0.2s ease-out 0.0s');
                    opacity:1;
                }
            }

            .bar {
                @include css-value-transition('width 0.2s ease-out 0.0s, height 0.2s ease-out 0.2s, margin-top 0.2s ease-out 0.2s, margin-left 0.2s ease-out 0.0s');

                &.focus {
                    @include css-value-transition('width 0.2s ease-out 0.2s, height 0.2s ease-out 0.0s, margin-top 0.2s ease-out 0.0s, margin-left 0.2s ease-out 0.2s');
                    width       : 25px;
                    height      : 4px;
                    margin-top  : 50px;
                    margin-left : -25px;
                }
            }
        }

        .right {
            @include css-value-transition('right 0.2s ease-out 0s');
            &.focus {
                right:20px;

                .txt {
                    @include css-value-transition('opacity 0.2s ease-out 0.0s');
                    opacity:1;
                }
            }
            .bar {
                @include css-value-transition('width 0.2s ease-out 0.0s, height 0.2s ease-out 0.2s, margin-top 0.2s ease-out 0.2s, margin-right 0.2s ease-out 0.0s');

                &.focus {
                    @include css-value-transition('width 0.2s ease-out 0.2s, height 0.2s ease-out 0.0s, margin-top 0.2s ease-out 0.0s, margin-right 0.2s ease-out 0.2s');
                    width       : 25px;
                    height      : 4px;
                    margin-top  : 50px;
                    margin-right : -25px;
                }
            }
        }
        .navigation {

        }
    }


</style>

<script>
    import {EventBus} from "../events/event-bus";
    import CompNavigationTxt from "../component/comp-navigation-txt.vue";
    import ContentMenu from "../content/content-menu.vue";
    import ContentWorksView from "./view-works-view.vue";

    export default {
        mixins:[],
        components:{
            CompNavigationTxt,
            ContentMenu,
            ContentWorksView
        },

        props: {},
        data: function() {
            return {
                isViewShow:false,
                isMenuShow:false,
                currentIndex:-1,
                leftNavigationFocus : false,
                rightNavigationFocus : false,
                leftNavigationIndex:-1,
                rightNavigationIndex:-1
            };
        },

        computed : {

        },

        methods : {
            menuCloseClickHandler : function($e) {
                if (this.isViewShow) {
                    this.$router.go(-1);
//                    this.$router.push({name:'ourworks'});
                }
                EventBus.$emit(EventBus.MENU_HIDE);
            },
            menuShowClickHandler : function($e) {
                EventBus.$emit(EventBus.MENU_SHOW);
            },
            setMenuShow : function($e) {
                this.isMenuShow = true;
            },
            setMenuHide : function($e) {
                this.isMenuShow = false;
            },
            leftNavigationOverHandler : function($e) {
                this.leftNavigationFocus = true;
            },
            leftNavigationOutHandler : function($e) {
                this.leftNavigationFocus = false;
            },
            rightNavigationOverHandler : function($e) {
                this.rightNavigationFocus = true;
            },
            rightNavigationOutHandler : function($e) {
                this.rightNavigationFocus = false;
            },

            rightNavigationClickHandler : function($e) {
                this.$router.push(
                    {name:this.getRouterNameByIndex(this.getNextIndex(this.currentIndex))}
                    );
            },

            leftNavigationClickHandler : function($e) {
                this.$router.push(
                    {name:this.getRouterNameByIndex(this.getPrevIndex(this.currentIndex))}
                    );
            },

            setCurrentIndex : function($e) {
                this.currentIndex = this.getCurrentIndex($e);
                this.leftNavigationIndex = this.getPrevIndex(this.currentIndex);
                this.rightNavigationIndex = this.getNextIndex(this.currentIndex);
            },
        },

        watch : {
            '$route'(to, from) {
                //console.log(to.name + ':');
                if(to.name == 'works-view') {
                    this.isViewShow = true;
                } else {
                    this.isViewShow = false;
                }
            }
        },

        //life cycle
        //beforeCreate : function() {},
        //created : function() {},
        //beforeMount : function() {},
        mounted : function() {
            if (this.$route.name == 'works-view') {
                this.isViewShow = true;
            }
            EventBus.$on(EventBus.MENU_CLICK, this.setCurrentIndex);
            EventBus.$on(EventBus.MENU_SHOW,this.setMenuShow);
            EventBus.$on(EventBus.MENU_HIDE,this.setMenuHide);
            this.setCurrentIndex(this.$route.name);
        },
        //beforeUpdate : function() {},
        //updated : function() {},
        //activated : function() {},
        //deactivated : function() {},
        beforeDestroy : function () {
            EventBus.$off(EventBus.MENU_CLICK, this.setCurrentIndex);
            EventBus.$off(EventBus.MENU_SHOW,this.setMenuShow);
            EventBus.$off(EventBus.MENU_HIDE,this.setMenuHide);
        },
        //destroyed : function() {},
        dummy : {}
    }
</script>