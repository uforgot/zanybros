/**
* -----------------------------------------------------
* Created by uforgot on 2017. 9. 1.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div class="main-scroll">SCROLL DOWN</div>
</template>

<style scoped lang="scss">
    @import "~scssMixin";

    .img-frame {
        float:left;
        display:inline-block;

        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }
</style>

<script>
    import {EventBus} from "../events/event-bus";
    export default {
        components:{},

        props : {
            'json-data': {
                Type : Object
            }
        },
        data: function() {
            return {
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
            },

            frameImageSrc : function() {
                return this.jsonData.backgroundImg;
            }
        },

        methods : {
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
            EventBus.$on(EventBus.WINDOW_RESIZE, this.handleWindowResize);
        },
        //beforeUpdate : function() {},
        //updated : function() {},
        //activated : function() {},
        //deactivated : function() {},
        beforeDestroy: function () {
            EventBus.$off(EventBus.WINDOW_RESIZE, this.handleWindowResize);
        },
        //destroyed : function() {}
        dummy : {}
    }
</script>
