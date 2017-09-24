/**
* -----------------------------------------------------
* Created by uforgot on 2017. 8. 30.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div class="view-background"
         :class="{'hide':!isVideoPlay}"
    >
        <comp-youtube-frame
                :video-id="dataVideo.videoId"
                :video-width="dataVideo.videoWidth"
                :video-height="dataVideo.videoHeight"
                :video-scale="currentScale"
                :video-play="isVideoPlay"
        ></comp-youtube-frame>
    </div>
</template>

<style scoped lang="scss">
    @import "~scssMixin";

    .hide {
        /*display:none;*/
    }
</style>

<script>
    import mixinResizeEvent from '../mixin/mixin-control-resize.vue';
    import CompYoutubeFrame from '../component/comp-youtube-frame.vue';
    import {EventBus} from "../events/event-bus";

    export default {
        mixins: [mixinResizeEvent],
        components: {
            CompYoutubeFrame
        },

        props: {},
        data: function () {
            return {
                currentScale:1,
                isVideoPlay:true
            }
        },

        computed : {
            videoScale : function() {
                return "scale(" + this.currentScale + ");";
            }
        },
        methods : {
            onResizeHandler :function($e) {
//                this.setElArray();
            },
            onScrollHandler : function($e) {
//                let scrollTop = 1 + ((1-(this.windowHeight - window.pageYOffset)/this.windowHeight) * 3);
//                this.currentScale = scrollTop;
//                console.log(scrollTop);
                if ( window.pageYOffset > this.windowHeight) {
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
            this.dataVideo = Window.ZanyBrosData.data.mainData.video[0];
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
