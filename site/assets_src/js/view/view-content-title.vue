/**
* -----------------------------------------------------
* Created by uforgot on 2017. 8. 22.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div class="view-content-title"
         :style="{
            'background-color': backgroundColor,
            height : titleHeight,
            'color' : color
         }"
    >
        <h3 class="scroll-animation hide"
            animation-offset="-20"
            v-html="jsonData.title"
        ></h3>
    </div>
</template>

<style scoped lang="scss">
    @import "~scssMixin";

    .hide {
        @include css-value-transition('opacity 0.2s ease-out 0s, transform 0.2s ease-out 0s, left 0.2s ease-out 0s');
        @include opacity(0);
        @include transform(translate(0px, 100%));
    }

    .show {
        @include css-value-transition('opacity 0.5s ease-out 0s, transform 0.5s ease-out 0s');
        @include opacity(1.0);
        @include transform(translate(0px, -50%));
    }
</style>

<script>
    import {EventBus} from "../events/event-bus";
    import MixinControlScrollAnimation from '../mixin/mixin-control-scroll-animation.vue';

    export default {
        mixins:[MixinControlScrollAnimation],
        components:{},

        props : {
            'json-data': {
                Type : Object
            }
        },
        data: function () {
            return {
                titleHeight : String
            }
        },

        components: {},

        computed : {
            backgroundColor : function() {
                return (this.jsonData.backgroundColor)?this.jsonData.backgroundColor:"#000";
            },
            color : function() {
                return (this.jsonData.color)?this.jsonData.color:"#fff";
            }
        },
        methods: {
            handleWindowResize: function() {
                if (window.windowWidth  < window.MobileWidth ) {
                    this.titleHeight = '15vw';
                } else {
                    this.titleHeight = this.jsonData.height;
                }
            }
        },
        watch : {},

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