/**
* -----------------------------------------------------
* Created by uforgot on 2017. 8. 22.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div class="content-video"
         :class="[{show:isReady}]"
         :style="{
             height: videoHeight + 'px'
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
</template>


<style scoped lang="scss">
    @import "~scssMixin";

    .video-holder {
        visibility: hidden;
        display: block;
        position:relative;

        &.show {
            visibility: visible;
        }
    }

</style>

<script>
    import MixinContent from '../mixin/mixin-content.vue';
    import MixinResizeEvent from '../mixin/mixin-control-resize.vue';

    export default {
        mixins: [MixinContent, MixinResizeEvent],
        components:{},

        props: {},
        data: function () {
            return {
                isMute:false,
                player:null,
                isReady:false
            }
        },

        computed: {
            videoWidth : function () {
                return this.getPixelValueByPercentValue(this.getPercentValue(this.jsonData.width), this.windowWidth);
            },

            videoHeight : function () {
                return (this.videoWidth /16) * 9;
            }
        },

        methods: {
            setYoutubeReady : function($player) {
                this.player = $player;
                this.handleWindowResize();
                this.isReady = true;
            },
            handleWindowResize: function() {
                if (this.player !== null) {
                    //console.log(this.videoWidth);
                    this.player.setSize(this.videoWidth, this.videoHeight);
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
            window.addEventListener('resize', this.handleWindowResize);
        },
        //beforeUpdate : function() {},
        //updated : function() {},
        //activated : function() {},
        //deactivated : function() {},
        beforeDestroy: function () {
            window.removeEventListener('resize', this.handleWindowResize);
        },
        //destroyed : function() {},
        dummy : {}
    }
</script>
