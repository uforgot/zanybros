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
    import mixinResizeEvent from '../mixin/mixin-control-resize.vue';

    export default {
        mixins: [mixinResizeEvent],
        components:{},

        props : {
            'json-data': {
                Type : Object
            }
        },
        data: function() {
            return {
            };
        },

        computed:{
            frameWidth : function () {
                if (this.isPercentValue(this.jsonData.width)) {
                    return this.getPixelValueByPercentValue(this.getPercentValue(this.jsonData.width), this.windowWidth);
                }
                return this.jsonData.width;
            },

            frameHeight : function () {
                if (this.jsonData.height === 'auto') {
                    return this.frameWidth();
                }
                if (this.isPercentValue(this.jsonData.height)) {
                    return this.getPixelValueByPercentValue(this.getPercentValue(this.jsonData.height), this.windowHeight);
                }
                return this.jsonData.height;
            },

            frameImageSrc : function() {
                return this.jsonData.backgroundImg;
            }
        },

        methods : {},
        watch : {},

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
        //destroyed : function() {}
        dummy : {}
    }
</script>
