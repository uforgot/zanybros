/**
* -----------------------------------------------------
* Created by uforgot on 2017. 9. 24.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div class="view-works-view"
         :class="{'show':isShow}"
         :style="{
                'height':worksH+'px'

             }"
    >
        <div class="container"
             :class="[{'show':isReady}]"
             :style="{
                'left':containerX+'px',
                'width':containerW+'px'
             }"
        >
            <youtube
                    @ready="setYoutubeReady"
                    :player-vars="{
                         autoplay: 0,
                         loop: 0,
                         controls: 1,
                         rel: 0,
                         fs:1,
                         modestbranding:1,
                         showinfo:1,
                         title:1
                     }"
            ></youtube>
            <div class="title">
                <h3 v-html="viewData.title"></h3>
            </div>
            <div class="comment">
                <small v-html="viewData.comment"></small>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import "~scssMixin";

    small {
        left:50%;
        width:50%;
        text-align:right;
    }
    .view-works-view {
        &.show{position:absolute;}
    }
    .container {
        &.show {
            display:block;
        }
    }
</style>

<script>
    import {EventBus} from "../events/event-bus";
    import MixinContent from '../mixin/mixin-content.vue';

    export default {
        mixins: [MixinContent],
        components:{},

        props: {
            'id':Object
        },
        data: function() {
            return {
                viewData:Object,
                isReady:false,
                player:null,
                containerX:0,
                containerW:0,
                worksH:window.windowHeight,
                isShow:false,
                windowW:window.windowWidth,
                windowH:window.windowHeight,
                videoW:this.videoWidthGet(),
                videoH:this.videoHeightGet()
            };
        },

        computed : {
            videoWidth : function () {
                return this.videoWidthGet();
            },

            videoHeight : function () {
                return this.videoHeightGet();
            }
        },
        methods : {
            videoWidthSet : function(){
                this.videoW = this.getPixelValueByPercentValue(this.getPercentValue('80%'), this.windowW) > 1000 ? 1000 : this.getPixelValueByPercentValue(this.getPercentValue('80%'), this.windowW);
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
            setYoutubeReady : function($player) {
                this.player = $player;
                this.isReady = true;
                this.handleWindowResize();
                this.player.loadVideoById(this.viewData.videoId);
            },
            handleWindowResize: function() {
                if (this.player !== null) {

                    this.windowW = window.windowWidth;
                    this.videoWidthSet();
                    this.videoHeightSet();

                    //this.worksMinH = this.videoWidth*9/16+280;//this.videoWidthGet()*9/16+280 > window.windowHeight ? this.videoWidthGet()*9/16+280 : window.windowHeight;
                    //this.worksMinH = Math.ceil(this.worksMinH);
                    var h = this.videoWidthGet()*9/16+280 > window.windowHeight ? this.videoWidthGet()*9/16+280 : window.windowHeight;
                    this.worksH = Math.ceil(h);
                    this.containerW = this.videoWidthGet();
                    this.containerX = (window.windowWidth - this.videoWidthGet())/2;
                    this.player.setSize(this.videoWidthGet(), this.videoHeightGet());
                }
            },
            onScrollHandler : function($e) {
                // let scrollTop = window.pageYOffset;
                //this.fixY = -scrollTop;
            },
            onWorkViewShowDone:function(){
                this.isShow = true;
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            },
            onWorkViewHide:function(){
                clearTimeout(this.setTimeoutID);
                this.isShow = false;
            }
        },
        watch : {},

        //life cycle
        //beforeCreate : function() {},
        //created = {},
        //beforeMount : function() {},
        mounted : function() {
            EventBus.$on(EventBus.WINDOW_RESIZE, this.handleWindowResize);
            EventBus.$on(EventBus.SCROLL_MOVE, this.onScrollHandler);
            EventBus.$on(EventBus.WORK_VIEW_SHOW_DONE, this.onWorkViewShowDone);
            EventBus.$on(EventBus.WORK_VIEW_HIDE, this.onWorkViewHide);

            this.onWorkViewShowDone();
        },
        //beforeUpdate : function() {},
        //updated : function() {},
        activated : function() {
            this.handleWindowResize();
            this.viewData = this.getWorksDataByIndex(this.$route.params.id);

        },
        //deactivated : function() {},
        beforeDestroy : function () {

            EventBus.$off(EventBus.WINDOW_RESIZE, this.handleWindowResize);
            EventBus.$off(EventBus.SCROLL_MOVE, this.onScrollHandler);
        },
        //destroyed : function() {},
        dummy : {}
    }
</script>
