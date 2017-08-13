<!-- template -->
<template>
    <!-- 페이지 본문 컨텐츠 영역 -->
    <div class="content about-main"
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
        <div class="title">
            <h1>
                WIDEN<br>
                THE VIEW OF<br>
                CREATIVE
            </h1>
        </div>
    </div>
</template>


<!-- script -->
<script>
    import mixinResizeEvent from '../mixin/mixin-control-resize.vue';
    import compVideoFrame from '../component/comp-video-frame.vue';

    export default {
        mixins: [mixinResizeEvent],

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
            "comp-video-frame": compVideoFrame,
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