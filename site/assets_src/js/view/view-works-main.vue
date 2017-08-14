<!-- template -->
<template>
    <!-- 페이지 본문 컨텐츠 영역 -->
    <div class="content main works"
         :style="{
             width: frameWidth,
             height: frameHeight
         }"
    >
        <comp-youtube-frame
                :video-id="jsonData.videoId"
                :video-width="jsonData.videoWidth"
                :video-height="jsonData.videoHeight"
        ></comp-youtube-frame>
        <div class="title"
             :style="{
             width: frameWidth,
             height: frameHeight
         }"
>
            <h1>
                <p>SOMETHING M.V Prodcution</p>
                <p>TVXQ</p>
            </h1>
        </div>
    </div>
</template>


<!-- script -->
<script>
    import MixinResizeEvent from '../mixin/mixin-control-resize.vue';
    import CompYoutubeFrame from '../component/comp-youtube-frame.vue';

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
            CompYoutubeFrame,
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