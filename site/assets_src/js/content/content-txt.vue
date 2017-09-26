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
            class="scroll-animation hide"
            :class="{'last':index == (jsonData.title.length-1) }"
            >{{item}}</span>
        </h2>
        <p>
            <span  v-for="item in jsonData.comment"
                class="scroll-animation hide"
            >{{item}}</span>
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
                marginLeft:0
            };
        },

        computed : {},
        methods : {},
        watch : {},

        //life cycle
        //beforeCreate : function() {},
        //created : function() {},
        //beforeMount : function() {},
        mounted : function() {
            if (this.jsonData.class === 'left') {
                if (this.isPercentValue(this.parentData.jsonData.width)) {
                    let percentLeft = this.getPercentValue(this.parentData.jsonData.width);
                    this.leftPosition =  ((100/percentLeft) * 10) +'%';
                    this.rightPosition =  'auto';
                }
            } else if (this.jsonData.class === 'right') {
                if (this.isPercentValue(this.parentData.jsonData.width)) {
                    let percentRight = this.getPercentValue(this.parentData.jsonData.width);
                    this.leftPosition = 'auto';
                    this.rightPosition =  ((100/percentRight) * 10) +'%';
                }
            } else {
                this.leftPosition = '50%';
                this.marginLeft = '-20vw';
            }
        },
        //beforeUpdate : function() {},
        //updated : function() {},
        //activated : function() {},
        //deactivated : function() {},
        //beforeDestroy : function () {},
        //destroyed : function() {},
        dummy : {}
    }
</script>
