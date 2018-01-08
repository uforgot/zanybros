/**
* -----------------------------------------------------
* Created by uforgot on 2017. 9. 1.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div class="content-txt" :class="jsonData.class"
         :style="{
            'left':leftPosition,
            'right':rightPosition,
            'margin-left':marginLeft
        }"
    >
        <h2>
            <span v-for="(item, index) in jsonData.title"
                  v-html="item"
            class="scroll-animation hide"
            :class="{'last':index == (jsonData.title.length-1) }"
            ></span>
        </h2>
        <p class="txt">
            <span  v-for="item in jsonData.comment"
                class="scroll-animation hide"
                   v-html="item"
            ></span>
        </p>
        <p class="image-frame">
            <span v-for="(item, index) in jsonData.images"
                  class="scroll-animation hide"
                  :class="{'last':index == (jsonData.images.length-1) }"
            ><div class="image"><img :src="item.imageUrl"
                  :style="{
                    'max-width':imageWidth + 'vw'
                  }"
            ></div><div class="title" v-html="item.title"></div>
            </span>
        </p>
    </div>
</template>

<style scoped lang="scss">
    @import "~scssMixin";

    span {display:block;}

    h2 {
        span {
            &.hide {
                @include css-value-transition('opacity 0.2s ease-out 0s, transform 0.2s ease-out 0s');
                @include opacity(0);
                @include transform(translate(0px, 40px));
            }
            &.show {
                @include css-value-transition('opacity 0.4s ease-out 0.2s, transform 0.4s ease-out 0.2s');
                @include opacity(1);
                @include transform(translate(0px, 0px));
            }
        }
    }

    p {
        span {
            &.hide {
                @include css-value-transition('opacity 0.2s ease-out 0s, transform 0.2s ease-out 0s');
                @include opacity(0);
                @include transform(translate(0px, 40px));
            }
            &.show {
                @include css-value-transition('opacity 0.5s ease-out 0.2s, transform 0.5s ease-out 0.2s');
                @include opacity(1);
                @include transform(translate(0px, 0px));
            }
        }
    }
</style>

<script>
    import {EventBus} from "../events/event-bus";
    import MixinControlScrollAnimation from '../mixin/mixin-control-scroll-animation.vue';
    import MixinContent from '../mixin/mixin-content.vue';

    export default {
        mixins: [MixinControlScrollAnimation, MixinContent],
        components: {},

        props : {},
        data: function() {
            return {
                leftPosition:0,
                rightPosition:0,
                marginLeft:0,
                windowW:window.windowWidth,
                windowH:window.windowHeight
            };
        },

        computed : {
            imageWidth : function() {
                if (this.jsonData.images) {
                    if (this.windowW < window.MobieWidth ) {
                        return 80;
                    }

                    return (80 - (2 * (this.jsonData.images.length-1))) / (this.jsonData.images.length);
                }
                return 0;
            }
        },
        methods : {
            handleWindowResize: function() {
                // console.log(this.windowW + ' : ' + window.MobieWidth);
                this.windowW = window.windowWidth;
                this.windowH = window.windowHeight;

                if (this.jsonData.class === 'left') {
                    if (this.isPercentValue(this.parentData.jsonData.width)) {
                        let percentLeft = this.getPercentValue(this.parentData.jsonData.width);
                        this.leftPosition =  ((100/percentLeft) * 10) +'%';
                        this.rightPosition =  'auto';
                    }

                    if (this.windowW < window.MobileWidth ) {
                        this.leftPosition = 0;
                    }
                } else if (this.jsonData.class === 'right') {
                    if (this.isPercentValue(this.parentData.jsonData.width)) {
                        let percentRight = this.getPercentValue(this.parentData.jsonData.width);
                        this.leftPosition = 'auto';
                        this.rightPosition =  ((100/percentRight) * 10) +'%';

                        if (this.windowW < window.MobileWidth ) {
                            this.rightPosition = 0;
                        }
                    }
                } else {
//                this.leftPosition = '50%';
//                this.marginLeft = '-20vw';
                }
            }
        },
        watch : { },

        //life cycle
        //beforeCreate : function() {},
        //created : function() {},
        //beforeMount : function() {},
        mounted : function() {
            EventBus.$on(EventBus.WINDOW_RESIZE, this.handleWindowResize);

            this.handleWindowResize();
        },
        //beforeUpdate : function() {},
        //updated : function() {},
        //activated : function() {},
        //deactivated : function() {},
        beforeDestroy : function () {
            EventBus.$off(EventBus.WINDOW_RESIZE, this.handleWindowResize);
        },
        //destroyed : function() {},
        dummy : {}
    }
</script>
