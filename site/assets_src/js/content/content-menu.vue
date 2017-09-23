/**
* -----------------------------------------------------
* Created by uforgot on 2017. 9. 23.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div class="menu-container"
        :class="{'show':dataIsMenuShow}"
    >
        <div class="background">
            <div class="frame">
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
                <h1><router-link to="/about">
                    <div @click="menuCloseClickHandler">ABOUT US</div>
                </router-link></h1>
            </li>
            <li>
                <h1><router-link to="/works">
                    <div @click="menuCloseClickHandler">OUR WORKS</div>
                </router-link></h1>
            </li>
            <li>
                <h1><router-link to="/contact">
                    <div @click="menuCloseClickHandler">CONTACT US</div>
                </router-link></h1>
            </li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
    @import "~scssMixin";

    .menu-container {
        .bar {
            @include css-value-transition('width 0.3s ease-out 0s, height 0.3s ease-out 0.2s');
        }
        .holder {
            @include css-value-transition('transform 0.3s ease-out 0.2s');
        }

        h1 {
            @include css-value-transition('margin-top 0.2s ease-out 0.0s, opacity 0.2s ease-out 0s');
        }

        &.show {
            pointer-events:auto;
            .bar {
                @include css-value-transition('width 0.3s ease-out 0s, height 0.3s ease-out 0s');
            }
            .holder {
                @include css-value-transition('transform 0.3s ease-out 0s');
            }

            h1 {
                @include css-value-transition('margin-top 0.2s ease-out 0.3s, opacity 0.2s ease-out 0.3s');
            }


            ul {
                li {
                    h1 {
                        margin-top:0;
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
    export default {
        mixins: [],
        components: {},

        props: {
            'data-is-menu-show':{}
        },
        data: function () {
            return {};
        },

        computed: {},
        methods: {
            menuCloseClickHandler : function($e) {
                console.log('ssss')
                this.$emit('menuClose');
            }
        },
        watch: {

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
        dummy: {}
    }
</script>
