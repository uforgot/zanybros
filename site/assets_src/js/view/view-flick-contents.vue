/**
 * Created by uforgot on 2017. 7. 18..
 */

<template>
    <section
             :style="{
                 height: frameHeight,
                 transform : computedPositionX
             }"
    >
        <comp-image-frame
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
        </comp-image-frame>
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
            "comp-image-frame": require('../component/comp-image-frame.vue')
        },


        computed:{
            frameHeight : function () {
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