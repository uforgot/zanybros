/**
 * Created by uforgot on 2017. 7. 18..
 */

<template>
    <section class="rect"
             :class="{ 'zoom-out' : dataDrag, 'animation-zoom-in' : dataDrag, 'animation-zoom-out' : !dataDrag}"
             :style="{
                 height: frameHeight,
                 left:computedPositionX
             }"
    >
        <comp-imageFrame
                v-for="item in dataContents"
                :key ="item.id"
                :data-width ="item.dataWidth"
                :data-height="item.dataHeight"
                :data-img="item.dataBackgroundImg"
        >
            <div class="content"
                :style="{
                    'background-image': 'url(' + item.dataImg + ')',
                    'background-position' : item.dataAlign
                }"
            >
            </div>
        </comp-imageFrame>
    </section>
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
            "comp-imageFrame": require('../component/imageFrame.vue')
        },


        computed:{
            frameHeight : function () {
                return this.getPixelValueByPercentValue(100,this.windowHeight);
            },

            computedPositionX: function() {
//                console.log(this.dataIndex + " " + this.dataLeft);
                return ((this.dataIndex * this.windowWidth) +  this.dataLeft) + 'px';
//                return 'translateX(' + ((this.dataIndex * this.windowWidth) +  this.dataLeft) + 'px' + ')';
            },
            computedScale: function() {
                return 'scale(' + this.dataScale + ')';
            },

            dataContents : function() {
                return this.data.contents;
            }
        },

        created() {

        }
    }
</script>

<style scoped lang="scss">
    @import "~scssMixin";

    .rect {
        clip: rect(0, 100vw, 100vh, 0);
    }

    .animation-zoom-out {
        @include css-transition-out(clip, 0.4, 0.2);
    }

    .animation-zoom-in {
        @include css-transition-out(clip, 0.2, 0);
    }

    .zoom-out {
        clip: rect(50vh, 80vw, 50vh, 20vw);
    }


</style>