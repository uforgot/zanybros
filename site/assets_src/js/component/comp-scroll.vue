/**
* -----------------------------------------------------
* Created by uforgot on 2018. 1. 9.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div class="comp-scroll"
         :style="{
             top: computedTop + 'px',
         }"
    >
        <div class="bar"
             :class="{'focus':scrollFocus}"
        ></div>
        <div class="txt"
             :class="{'focus':scrollFocus}"
        ><menu>SCROLL</menu></div>
        <div class="bt"
             @mouseover="scrollOverHandler"
             @mouseout="scrollOutHandler"
             @click="scrollClickHandler"
        ></div>
    </div>
</template>

<style scoped lang="scss">
    @import "~scssMixin";

    .comp-scroll {
        display:block;
        position:absolute;
        bottom:0;
        left:50%;

        .bar {
            position:absolute;
            height:50px;
            margin-top:-25px;
            margin-left:-2px;
            width:4px;
            background-color:#fff;
            z-index:200;

            @media only screen and (max-width : 767px) {
                z-index:0;
            }


            @include css-value-transition('margin-top 0.2s ease-out 0.2s, margin-left 0.2s ease-out 0s, height 0.2s ease-out 0.2s, width 0.2s ease-out 0s');

            &.focus {
                @include css-value-transition('margin-top 0.2s ease-out 0s, margin-left 0.2s ease-out 0.2s, height 0.2s ease-out 0s, width 0.2s ease-out 0.2s');

                width:50px;
                height:4px;

                margin-left:-25px;
                margin-top:-40px;
            }
        }

        .txt {
            position:absolute;
            text-align:center;
            width:100px;
            margin-top:-50px;
            margin-left:-50px;
            text-align : center;

            @include css-value-transition('margin-top 0.2s ease-out 0.2s');

            menu {
                display:block;
                position:relative;

                list-style-type: 0;
                -webkit-margin-before: 0;
                -webkit-margin-after: 0;
                -webkit-margin-start: 0;
                -webkit-margin-end: 0;
                -webkit-padding-start: 0;
            }

            &.focus {
                @include css-value-transition('margin-top 0.2s ease-out 0s');
                margin-top:-60px;
            }
        }

        .bt {
            position:absolute;
            width:100px;
            height:35px;

            cursor:pointer;
            margin-top:-60px;
            margin-left:-50px;

        }
    }

</style>

<script>
    export default {
        mixins: [],
        components: {},

        props: {
            'data-width' : {},

            'data-height' : {
            },
            'data-top' : {}
        },
        data: function () {
            return {
                scrollFocus : false,
            };
        },

        computed: {
            computedTop : function() {
                if (this.dataWidth < window.MobileWidth) {
                    return this.dataHeight +15;
                }
                return this.dataHeight;
            }
        },
        methods: {
            scrollOverHandler : function() {
                if (_isMobile) {
                    this.scrollClickHandler();
                    return;
                }
                this.scrollFocus = true;
            },
            scrollOutHandler : function() {
                this.scrollFocus = false;
            },
            scrollClickHandler : function() {
                this.scrollTo(document.body, this.dataTop, 500);
            },

        },
        watch: {},

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
