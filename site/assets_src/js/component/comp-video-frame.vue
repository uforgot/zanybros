<!-- template -->
<template>
    <!-- 페이지 본문 컨텐츠 영역 -->
    <div class="comp-video-frame"
         :style="{
             width: frameWidth,
             height: frameHeight
         }
    ">
        <div class="container"
             :style="{
                         'margin-left':videoFrameMarginLeft,
                         'margin-top': videoFrameMarginTop
                    }"
        >
            <video  autoplay loop
                    :src="videoUrl"
                    :width="videoFrameWidth"
                    :height="videoFrameHeight"
            ></video>
        </div>
    </div>
</template>


<!-- script -->
<script>
    import mixinResizeEvent from '../mixin/mixin-control-resize.vue';

    export default {
        mixins: [mixinResizeEvent],

        props : {
            'video-url': {
                Type : String,
                Required : true
            },
            'video-width': {
                Type : Number
            },
            'video-height': {
                Type : Number
            }
        },

        data: function() {
            return {
                videoFrameWidth:0,
                videoFrameHeight:0
            };
        },

        computed:{
            frameWidth : function () {
                return this.windowWidth;
            },

            frameHeight : function () {
                return this.windowHeight;
            },

            videoFrameMarginLeft: function () {
                return (this.videoFrameWidth/2) * -1 + 'px';
            },

            videoFrameMarginTop: function () {
                return (this.videoFrameHeight/2) * -1 + 'px';
            }
        },

        methods:{
            handleWindowResize: function() {
                let size = this.getSizeByFrameSize(
                    {width:this.videoWidth, height:this.videoHeight},
                    {width:this.frameWidth, height:this.frameHeight},
                );

                this.videoFrameWidth = size.width;
                this.videoFrameHeight = size.height;
            }
        },


        components:{

        },

        beforeDestroy: function () {
            window.removeEventListener('resize', this.handleWindowResize);
        },

        mounted() {
            this.handleWindowResize();
            window.addEventListener('resize', this.handleWindowResize);
        },
    }
</script>


<style scoped lang="scss">
    @import "~scssMixin";
</style>