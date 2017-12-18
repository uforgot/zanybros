/**
* -----------------------------------------------------
* Created by uforgot on 2017. 8. 22.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div class="content-video"
         :class="[{show:isReady}]"
    >
        <div
                class="video"
                :style="{
                height: videoHeight + 'px',
                'margin-top' : (videoHeight/2 * -1) + 'px',
                'margin-left' : (videoWidth/2 * -1) + 'px'
             }"
        >
        <youtube :video-id="jsonData.videoId"
                 @ready="setYoutubeReady"
                 :player-vars="{
                         autoplay: 0,
                         loop: 0,
                         controls: 1,
                         rel: 0,
                         fs:0,
                         modestbranding:1,
                         showinfo:0
                     }"
                 :mute="isMute"
                 @ended="handlePlayEnd"
        ></youtube>
        </div>
    </div>
</template>


<style scoped lang="scss">
    @import "~scssMixin";

    .content-video {
        visibility: hidden;
        &.show {
            visibility: visible;
        }
    }

</style>

<script>
    import MixinContent from '../mixin/mixin-content.vue';
    import {EventBus} from "../events/event-bus";
    export default {
        mixins: [MixinContent],
        components:{},

        props: {},
        data: function () {
            return {
                isMute:false,
                player:null,
                isReady:false,
                windowW:window.windowWidth,
                videoW:this.videoWidthGet(),
                videoH:this.videoHeightGet()
            }
        },

        computed: {
            videoWidth : function () {
                return this.videoWidthGet();
            },

            videoHeight : function () {
                return this.videoHeightSet();
            }
        },

        methods: {
            setYoutubeReady : function($player) {
                this.player = $player;
                this.handleWindowResize();
                this.isReady = true;
            },
            videoWidthSet : function(){
                this.videoW = this.getPixelValueByPercentValue(this.getPercentValue(this.jsonData.width),this.windowW);
            },
            videoWidthGet : function(){
                return this.videoW;
            },
            videoHeightSet : function(){
                this.videoH = (this.videoWidth /16) * 9;
            },
            videoHeightGet : function(){
                return this.videoH;
            },
            handleWindowResize: function() {
                if (this.player !== null) {
                    this.windowW = window.windowWidth;
                    this.videoWidthSet();
                    this.videoHeightSet();
                    this.player.setSize(this.videoWidthGet(), this.videoHeightGet());
                }
            },
            handlePlayEnd : function($player) {
                $player.playVideo();
            }
        },
        watch : {},

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
        //destroyed : function() {},
        dummy : {}
    }
</script>
