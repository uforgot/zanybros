/**
 * Created by uforgot on 2017. 7. 18..
 */

<template>
    <section
             :style="{
                 width: frameWidth,
                 height: frameHeight,
                 transform : computedPositionX
             }"
    >
        <div
                v-for="item in dataContents"
                :is="item.component"
                :key ="item.id"
                :json-data = "item.data"
        >
        </div>
    </section>
</template>

<script>
    import MixinControlResize from '../mixin/mixin-control-resize.vue';

    export default {
        mixins: [ MixinControlResize ],

        props : {
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
            "comp-image-frame": require('../component/comp-image-frame.vue'),
            "comp-video-frame": require('../component/comp-video-frame.vue'),

            "view-main-about": require('./view-main-about.vue')
        },


        computed:{
            frameWidth : function () {
                return this.windowWidth;
            },

            frameHeight : function () {
                // todo : contents 내부 내용의 height 값을 나타내도록 해야함
                return this.getPixelValueByPercentValue(100,this.windowHeight);
            },

            computedPositionX: function() {
                let x = ((this.dataIndex * this.windowWidth) +  this.dataLeft) + 'px';
                return 'translate3d(' + x + ',0,0)';

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
</style>