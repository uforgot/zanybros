/**
 * Created by uforgot on 2017. 7. 18..
 */

<template>
    <div class="background"
             :style="{
                 left:computedPositionX
             }"
    >
        <div class="bar animation"
             :class="{ 'show' : dataDrag, 'hide' : !dataDrag}"
        ></div>
        <div class="txt animation"
             :class="{ 'show' : dataDrag, 'hide' : !dataDrag}"
             v-text="computedTitle"></div>
    </div>
</template>

<script>
    let mixinResizeEvent = require('../mixin/resizeEvent.vue');

    export default {
        mixins: [mixinResizeEvent],

        props : {
            'data-drag' : {
                type: Boolean,
                default :false
            },
            'data-index' : {
                type: Number
            },
            'data-left':{
                type: Number
            },
            'data': {
                type: Object
            }
        },

        components:{

        },


        computed:{
            frameHeight : function () {
                return this.getPixelValueByPercentValue(100,this.windowHeight);
            },

            computedPositionX: function() {
                return ((this.dataIndex * this.windowWidth) +  this.dataLeft) + 'px';
            },
            computedScale: function() {
                return 'scale(' + this.dataScale + ')';
            },
            computedTitle: function() {
                return this.data.title;
            }
        },

        created() {

        }
    }
</script>

<style scoped lang="scss">
    @import "~scssMixin";

    .animation {

    }

    .show {
        @include css-transition-out(opacity, 0.2, 0.0);
        @include transform(scale(1.0));
    }

    .hide {
        @include css-transition-out(opacity, 0.3, 0.2);
        @include transform(scale(0));
    }


</style>