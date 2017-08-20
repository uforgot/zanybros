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
    import CompImageFrame from '../component/comp-image-frame.vue';
    import CompVideoFrame from '../component/comp-video-frame.vue';

    import ViewAboutMain from '../view/view-about-main.vue';
    import ViewWorksMain from '../view/view-works-main.vue';
    import ViewContactMain from '../view/view-contact-main.vue';

    import ViewAboutSub from '../view/view-about-sub.vue';

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
            CompImageFrame,
            CompVideoFrame,
            ViewAboutMain,
            ViewWorksMain,
            ViewContactMain,
            ViewAboutSub
        },


        computed:{
            frameWidth : function () {
                return this.windowWidth + 'px';
            },

            frameHeight : function () {
                // todo : contents 내부 내용의 height 값을 나타내도록 해야함
                return this.windowHeight + 'px';
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