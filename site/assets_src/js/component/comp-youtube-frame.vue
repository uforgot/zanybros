/**
* -----------------------------------------------------
* Created by uforgot on 2017. 9. 1.
* zanybros
* -----------------------------------------------------
*/


<template>
    <div class="comp-youtube-frame"
         :style="{
             width: frameWidth + 'px',
             height: frameHeight + 'px',
             transform : 'scale(' + videoScale + ')'
         }
    ">
        <div class="container"
             :class="[{show:isReady}]"
             :style="{
                         'margin-left':videoFrameMarginLeft,
                         'margin-top': videoFrameMarginTop
                    }"
        >
            <youtube :video-id="videoId"
                     @ready="setYoutubeReady"
                     :player-vars="{
                         autoplay: 1,
                         loop: 1,
                         controls: 0,
                         rel: 0,
                         fs:1,
                         modestbranding:0,
                         showinfo:0
                     }"
                     :mute="true"
                     @ended="handlePlayEnd"
            ></youtube>
        </div>
        <div class="din"></div>
    </div>
</template>

<style scoped lang="scss">
    @import "~scssMixin";

    .comp-youtube-frame {
        display:block;
        overflow:hidden;
        position:absolute;
        left:0;
        top:0;

        .container {
            visibility: hidden;
            position:absolute;
            display: block;
            left:50%;
            top:50%;

            &.show {
                visibility: visible;
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
    }
</style>

<script>
    import {EventBus} from "../events/event-bus";
    export default {
        components:{},

        props : {
            'video-Id': {
                Type : String,
                Required : true
            },
            'video-width': {
                Type : Number
            },
            'video-height': {
                Type : Number
            },
            'video-scale' : {
                Type : Number
            },
            'video-play' : {
                Type : Boolean
            }
        },
        data: function() {
            return {
                isReady:false,
                player:null,

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
            setYoutubeReady : function($player) {
                this.player = $player;
                this.handleWindowResize();
                this.isReady = true;
            },
            handleWindowResize: function() {
                this.windowW = window.windowWidth;
                this.windowH = window.windowHeight;

                let size = this.getSizeByFrameSize(
                    {width:this.videoWidth, height:this.videoHeight},
                    {width:this.frameWidth, height:this.frameHeight},
                );


                this.videoFrameWidth = size.width;
                this.videoFrameHeight = size.height;

                if (this.player !== null) {
                    this.player.setSize(this.videoFrameWidth, this.videoFrameHeight);
                }
            },
            handlePlayEnd : function($player) {
                $player.playVideo();
            }
        },
        watch : {
            videoPlay : function($newValue, $oldValue) {
                if (this.player === null) return;
                if($newValue === false) {
                    this.player.pauseVideo();
                } else {
                    this.player.playVideo();
                }
            }
        },

        //life cycle
        //beforeCreate : function() {},
        //created : function() {},
        //beforeMount : function() {},
        mounted() {
            EventBus.$on(EventBus.WINDOW_RESIZE, this.handleWindowResize);
            this.handleWindowResize();
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


