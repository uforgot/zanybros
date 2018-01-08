/**
* -----------------------------------------------------
* Created by uforgot on 2017. 8. 30.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div class="view-background"
         :class="{'hide':!isVideoPlay}"
         :style="{
             width: windowW + 'px',
             height: windowH + 'px'
        }"
    >
        <comp-video-frame
                video-url="/assets/images/mp4/showreel.mp4"
                video-width="640"
                video-height="640"
                :video-play="isVideoPlay"
        >

        </comp-video-frame>
        <!--<comp-youtube-frame-->
                <!--:video-id="dataVideo.videoId"-->
                <!--:video-width="dataVideo.videoWidth"-->
                <!--:video-height="dataVideo.videoHeight"-->
                <!--:video-scale="currentScale"-->
                <!--:video-play="isVideoPlay"-->
        <!--&gt;</comp-youtube-frame>-->

    </div>
</template>

<style scoped lang="scss">
    @import "~scssMixin";

    .hide {
        /*display:none;*/
    }
</style>

<script>
    import CompYoutubeFrame from '../component/comp-youtube-frame.vue';
    import CompVideoFrame from '../component/comp-video-frame.vue';
    import {EventBus} from "../events/event-bus";

    export default {
        components: {
            CompYoutubeFrame,
            CompVideoFrame
        },

        props: {},
        data: function () {
            return {
                currentScale:1,
                isVideoPlay:true,
                windowW:window.windowWidth,
                windowH:window.windowHeight
            }
        },

        computed : {
            videoScale : function() {
                return "scale(" + this.currentScale + ");";
            }
        },
        methods : {
            onResizeHandler :function($e) {
                this.windowW = window.windowWidth;
                this.windowH = window.windowHeight;
            },
            onScrollHandler : function($e) {
                if ( window.pageYOffset > this.windowH) {
                    this.isVideoPlay = false;
                } else {
                    this.isVideoPlay = true;
                }

            }
        },
        watch : {},

        //life cycle
        //beforeCreate : function() {},
        created: function () {
            this.dataVideo = window.ZanyBrosData.data.mainData.video[0];
        },
        //beforeMount : function() {},
        mounted : function() {
            EventBus.$on(EventBus.WINDOW_RESIZE, this.onResizeHandler);
            EventBus.$on(EventBus.SCROLL_MOVE, this.onScrollHandler);
            this.onResizeHandler();
        },
        //beforeUpdate : function() {},
        //updated : function() {},
        //activated : function() {},
        //deactivated : function() {},
        beforeDestroy : function () {
            EventBus.$off(EventBus.WINDOW_RESIZE, this.onResizeHandler);
            EventBus.$off(EventBus.SCROLL_MOVE, this.onScrollHandler);
        },
        //destroyed : function() {},
        dummy : {}
    }
</script>
