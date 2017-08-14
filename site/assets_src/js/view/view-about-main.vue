<!-- template -->
<template>
    <!-- 페이지 본문 컨텐츠 영역 -->
    <div class="content main about"
         :style="{
             width: frameWidth,
             height: frameHeight
         }"
    >
        <comp-video-frame
                :video-url="jsonData.videoUrl"
                :video-width="jsonData.videoWidth"
                :video-height="jsonData.videoHeight"
        ></comp-video-frame>
        <div class="title"
             :style="{
             width: frameWidth,
             height: frameHeight
         }"
        >
            <h1>
                <p>WIDEN</p>
                <p>THE VIEW OF</p>
                <p>CREATIVE</p>
            </h1>
        </div>
        <comp-main-scroll></comp-main-scroll>
    </div>
</template>


<!-- script -->
<script>
    import MixinResizeEvent from '../mixin/mixin-control-resize.vue';
    import CompVideoFrame from '../component/comp-video-frame.vue';
    import CompMainScroll from '../component/comp-main-scroll.vue';

    export default {
        mixins: [MixinResizeEvent],

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
        },

        components:{
            "comp-video-frame": CompVideoFrame,
            "comp-main-scroll" : CompMainScroll
        },

        methods:{

        },


        beforeDestroy: function () {

        },

        mounted() {

        },
    }
</script>


<style scoped lang="scss">
    @import "~scssMixin";
</style>