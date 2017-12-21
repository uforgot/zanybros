/**
* -----------------------------------------------------
* Created by uforgot on 2017. 9. 1.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div class="comp-video-frame"
         :style="{
             width: frameWidth + 'px',
             height: frameHeight + 'px'

         }
    ">
        <div class="container"
             :style="{
                         'margin-left':videoFrameMarginLeft,
                         'margin-top': videoFrameMarginTop
                    }"
        >
            <video  playsinline autoplay loop muted
                    :width="videoFrameWidth"
                    :height="videoFrameHeight"
                    :src="videoUrl"
            ></video>

        </div>
        <div class="din"></div>
    </div>
</template>

<style scoped lang="scss">
    @import "~scssMixin";

    .comp-video-frame {
        display:block;
        overflow:hidden;
        position:absolute;
        left:0;
        top:0;

        .container {
            position:absolute;
            display: block;
            left:50%;
            top:50%;
        }
    }

    .din  {
        position:absolute;
        left:0;
        top:0;
        background: #000 ;
        width:100%;
        height:100%;
        @include opacity($video-Din-Opacity);
    }
</style>

<script>
    import {EventBus} from "../events/event-bus";
    export default {
        components:{},

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
            },
            'video-play' : {
                Type : Boolean
            }
        },
        data: function() {
            return {
                videoFrameWidth:0,
                videoFrameHeight:0,
                windowW:window.windowWidth,
                windowH:window.windowHeight
            };
        },

        computed:{
            frameWidth : function () {
                return this.windowW;
            },

            frameHeight : function () {
                return this.windowH;
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
                this.windowW = window.windowWidth;
                this.windowH = window.windowHeight;

                let size = this.getSizeByFrameSize(
                    {width:this.videoWidth, height:this.videoHeight},
                    {width:this.frameWidth, height:this.frameHeight},
                );

                this.videoFrameWidth = size.width;
                this.videoFrameHeight = size.height;
            }
        },

        watch : {
            videoPlay : function($newValue, $oldValue) {
                if($newValue === false) {
                    //this.player.pauseVideo();
                } else {
                    //this.player.playVideo();
                }
            }
        },

        //life cycle
        //beforeCreate : function() {},
        //created : function() {},
        //beforeMount : function() {},
        mounted() {
            this.handleWindowResize();
            EventBus.$on(EventBus.WINDOW_RESIZE, this.handleWindowResize);
        },
        //beforeUpdate : function() {},
        //updated : function() {},
        //activated : function() {},
        //deactivated : function() {},
        beforeDestroy: function () {
            EventBus.$off(EventBus.WINDOW_RESIZE, this.handleWindowResize);
        },
        //destroyed : function() {}
        dummy : {}
    }
</script>
