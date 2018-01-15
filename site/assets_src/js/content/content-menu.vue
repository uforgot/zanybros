/**
* -----------------------------------------------------
* Created by uforgot on 2017. 9. 23.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div class="menu-container"
        :class="{'show':isMenuShow}"
    >
        <div class="background">
            <div class="frame">
                <div class="bar left"></div>
                <div class="bar right"></div>
                <div class="bar top"></div>
                <div class="bar bottom"></div>
            </div>
            <div class="frame-fix">
                <div class="bar left"></div>
                <div class="bar right"></div>
                <div class="bar top"></div>
                <div class="bar bottom"></div>
            </div>
            <div class="txt">
                <h1>
                    <div class="left holder">&nbsp;ZANY&nbsp;</div>
                    <div class="right holder">&nbsp;BROS&nbsp;</div>
                </h1>
            </div>
        </div>
        <ul>
            <li>
                <h1><router-link :to="{ name: 'about'}">
                    <div @click="menuCloseClickHandler">ABOUT US</div>
                </router-link></h1>
            </li>
            <li>
                <h1><router-link :to="{ name: 'whatwedo'}">
                    <div @click="menuCloseClickHandler">WHAT WE DO</div>
                </router-link></h1>
            </li>
            <li>
                <h1><router-link :to="{ name: 'ourworks'}">
                    <div @click="menuCloseClickHandler">OUR WORKS</div>
                </router-link></h1>
            </li>
            <li>
                <div class="language-container">
                    <menu
                            :class="{'focus':languageEn}"
                    ><a href="http://www.zanybros.com/">ENGLISH</a></menu>
                    <menu
                            :class="{'focus':languageCh}"
                    ><a href="http://www.zanybros.com/cn/">CHINESE</a></menu>
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
    @import "~scssMixin";


    .menu-container {
        .frame {
            .bar {
                @include css-value-transition('width 0.3s ease-out 0s, height 0.3s ease-out 0.2s');
            }
        }
        .holder {
            @include css-value-transition('transform 0.3s ease-out 0.2s');
        }

        h1 {
            @include css-value-transition('margin-top 0.2s ease-out 0.0s, opacity 0.2s ease-out 0s');
        }

        &.show {
            pointer-events:auto;
            .frame {
                .bar {
                    @include css-value-transition('width 0.3s ease-out 0s, height 0.3s ease-out 0s');
                }
            }
            .holder {
                @include css-value-transition('transform 0.3s ease-out 0s');
            }

            h1 {
                @include css-value-transition('margin-top 0.2s ease-out 0.3s, opacity 0.2s ease-out 0.3s');
            }

            .language-container {
                @include css-value-transition('margin-top 0.2s ease-out 0.3s, opacity 0.2s ease-out 0.3s');
            }

            ul {
                li {
                    h1 {
                        margin-top:1vw;
                        opacity:1;
                    }

                    .language-container {
                        margin-top:1vw;
                        opacity:1;
                    }
                }
            }

            .background {
                .frame {
                    .left { width : 50vw; }
                    .right { width : 50vw; }
                    .top { height : 50vh; }
                    .bottom { height : 50vh; }
                }
                .txt {
                    .left {
                        transform:translateX(-42%) translateY(-100%) rotate(90deg);
                    }
                    .right {
                        transform:translateX(44%) translateY(-100%) rotate(90deg);
                    }

                }

            }
        }
    }
</style>

<script>
    import {EventBus} from "../events/event-bus";

    export default {
        mixins: [],
        components: {},

        props: {
            'language-en':{},
            'language-ch':{}
        },
        data: function () {
            return {
                isMenuShow:false
            };
        },

        computed: {},
        methods: {
            setMenuShow : function($e) {
                this.isMenuShow = true;
            },
            setMenuHide : function($e) {
                this.isMenuShow = false;
            },
            menuCloseClickHandler : function($e) {
                EventBus.$emit(EventBus.MENU_HIDE);
            }
        },
        watch: {

        },

        //life cycle
        //beforeCreate : function() {},
        //created : function() {},
        //beforeMount : function() {},
        mounted : function() {
            EventBus.$on(EventBus.MENU_SHOW,this.setMenuShow);
            EventBus.$on(EventBus.MENU_HIDE,this.setMenuHide);
        },
        //beforeUpdate : function() {},
        //updated : function() {},
        //activated : function() {},
        //deactivated : function() {},
        beforeDestroy : function () {
            EventBus.$off(EventBus.MENU_SHOW,this.setMenuShow);
            EventBus.$off(EventBus.MENU_HIDE,this.setMenuHide);
        },
        //destroyed : function() {},
        dummy: {}
    }
</script>
