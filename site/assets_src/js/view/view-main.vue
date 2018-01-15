/**
* -----------------------------------------------------
* Created by uforgot on 2017. 9. 1.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div class="view-main"
         :style="{
             width: frameWidth + 'px',
             height: frameHeight + 'px'
         }"
    >
        <div class="title"
             :style="{
             width: frameWidth + 'px',
             height: frameHeight + 'px'
         }"
        >
            <ul>
                <li v-for="item in titleArray">
                    <div class="container"
                      :class="{'din':item.isDin}">
                        <div class="focus-bar"
                             :class="{'focus':item.isFocus}"
                        ></div>
                        <h1 v-html="item.menu"
                            :class="{'focus':item.isFocus}"
                        ></h1>
                        <div class="button"
                             @mouseover="titleMouseOverHandler(item.index)"
                             @mouseout="titleMouseOutHandler"
                             @click="scrollToTitle(item.anchor)"
                        ></div>
                    </div>
                </li>
            </ul>
        </div>
        <comp-scroll
                :data-width="frameWidth"
                :data-height="frameHeight"
            :data-top="frameHeight"
        ></comp-scroll>
    </div>
</template>

<style scoped lang="scss">
    @import "~scssMixin";
    .view-main{
        .title{
            ul{
                li{
                    .container {
                        @include css-value-transition('opacity 0.2s ease-out 0s');
                        &.din {
                            opacity:0.1;

                            @media only screen and (max-width : 767px) {
                                opacity:1.0;
                            }
                        }
                    }

                    .focus-bar {
                        @include css-value-transition('left 0.2s ease-out 0s, width 0.2s ease-out 0s');

                        &.focus {
                            /*border:2vw solid #fff;*/
                            left:0%;
                            width:100%;

                            @media only screen and (max-width : 767px) {
                                width:0%;
                            }
                        }
                    }

                    h1 {
                        @include css-value-transition('color 0.2s ease-out 0s');
                        &.focus{
                            color:#fff;
                        }
                    }

                }
            }
        }
    }
</style>

<script>
    import CompYoutubeFrame from '../component/comp-youtube-frame.vue';
    import CompScroll from '../component/comp-scroll.vue';
    import {EventBus} from "../events/event-bus";

    export default {
        components:{
            CompYoutubeFrame,
            CompScroll
        },

        props : {
            'json-data': {
                Type : Object
            },
            'data-index' : {
                Type : Number
            }
        },
        data: function() {
            return {
                titleArray:Array,
                windowW:window.windowWidth,
                windowH:window.windowHeight
            };
        },

        computed:{
            frameWidth : function () {
                if (this.isPercentValue(this.jsonData.width)) {
                    return this.getPixelValueByPercentValue(this.getPercentValue(this.jsonData.width), this.windowW);
                }
                return this.jsonData.width;
            },

            frameHeight : function () {
                if (this.jsonData.height === 'auto') {
                    return this.frameWidth();
                }
                if (this.isPercentValue(this.jsonData.height)) {
                    return this.getPixelValueByPercentValue(this.getPercentValue(this.jsonData.height), this.windowH);
                }
                return this.jsonData.height;
            }
        },

        methods : {
            titleMouseOverHandler : function($e) {
                this.setTitleOver($e);
            },
            titleMouseOutHandler : function($e) {
                let i;
                for (i=0;i<this.titleArray.length;i++) {
                        this.titleArray[i].isFocus = false;
                        this.titleArray[i].isDin = false;
                }
            },
            setTitleOver : function($e) {
                let i;
                for (i=0;i<this.titleArray.length;i++) {
                    if (i===$e) {
                        this.titleArray[i].isFocus = true;
                        this.titleArray[i].isDin = false;
                    } else {
                        this.titleArray[i].isFocus = false;
                        this.titleArray[i].isDin = true;
                    }
                }
            },
            handleWindowResize: function() {
                this.windowW = window.windowWidth;
                this.windowH = window.windowHeight;
            }

        },
        watch : {},

        //life cycle
        //beforeCreate : function() {},
        //created : function() {},
        //beforeMount : function() {},
        mounted : function() {
            let i;
            let targetArray = window.ZanyBrosTitlaArray[this.dataIndex];
            this.titleArray = [];
            for (i=0;i<targetArray.length;i++) {
                this.titleArray.push(
                    {
                        index:i,
                        isFocus:false,
                        isDin:false,
                        menu:targetArray[i].menu,
                        anchor:targetArray[i].anchor
                    }
                )
            }
//            this.titleArray = Window.ZanyBrosTitlaArray[this.dataIndex];
            EventBus.$on(EventBus.WINDOW_RESIZE, this.handleWindowResize);
        },
        //beforeUpdate : function() {},
        //updated : function() {},
        //activated : function() {},
        //deactivated : function() {},
        beforeDestroy: function () {
            EventBus.$off(EventBus.WINDOW_RESIZE, this.handleWindowResize);
        },
        //destroyed : function() {},
        dummy : {}
    }
</script>
