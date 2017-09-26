/**
* -----------------------------------------------------
* Created by uforgot on 2017. 8. 20.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div class="container" :style="{
                left:computedTransform
        }"
    >
        <div class="prev-container"
                :class="dataPrevContents.class"
            :style="{
                width: frameWidth,
                top:fixY+'px'
            }">
            <div
                    :is="dataPrevContents.contents[0].component"
                    :json-data = "dataPrevContents.contents[0].data"
            >
            </div>
        </div>
        <div class="next-container"
             :class="dataNextContents.class"
            :style="{
                width: frameWidth,
                top:fixY+'px'
            }">
            <div
                    :is="dataNextContents.contents[0].component"
                    :json-data = "dataNextContents.contents[0].data"
            >
            </div>
        </div>
        <div :class="dataContents.class"
                :style="{
                 width: frameWidth
             }"
        >
            <div
                    v-for="item in dataContents.contents"
                    :is="item.component"
                    :key ="item.id"
                    :json-data = "item.data"
            >
            </div>
        </div>
        <view-footer></view-footer>
    </div>
</template>

<style scoped lang="scss">
    @import "~scssMixin";
</style>

<script>
    import {EventBus} from '../../events/event-bus';
    import MixinControlResize from '../../mixin/mixin-control-resize.vue';
    import MixinEventCustom from '../../mixin/mixin-event-custom.vue';
    import TWEEN from '../../vendor/Tween';

    import ViewContentHolder from '.././view-content-holder.vue';
    import ViewContentMargin from '.././view-content-margin.vue';
    import ViewContentTitle from '.././view-content-title.vue';

    import CompVideoFrame from '../../component/comp-video-frame.vue';
    import ViewFooter from '.././view-footer.vue';

    import ViewAboutMain from '.././view-about-main.vue';
    import ViewContactMain from '.././view-contact-main.vue';
    import ViewWorksMain from '.././view-works-main.vue';

    export default {
        mixins: [ MixinControlResize, MixinEventCustom ],
        components:{
            ViewContentHolder,
            ViewContentTitle,
            ViewContentMargin,
            ViewFooter,
            CompVideoFrame,

            ViewAboutMain,
            ViewWorksMain,
            ViewContactMain
        },

        props: {

        },
        data: function() {
            return {
                titleArray:Array,
                dataPrevContents:Object,
                dataNextContents:Object,
                dataContents:Object,

                fixY:Number,

                isResize:false,
                isDrag:false,

                startX:0,
                startY:0,
                distance:0,

                currentContentsX:0,
                targetContentsX:0
            }
        },

        computed: {
            computedTransform : function() {
//                return 'translateX(' + this.targetContentsX  +'px )';
                return this.targetContentsX  +'px';
            },
            frameWidth : function () {
                return this.windowWidth + 'px';
            }
        },

        methods : {
            //event
            handleInteractionStart: function ($e) {
                this.isDrag = true;
                this.startX = $e.x;
                this.startY = $e.y;
                this.distanceX = 0;
                this.distanceY = 0;
            },

            handleInteractionEnd: function () {
                this.isDrag = false;
                this.setContentsSnapX();
            },

            handleInteractionMove: function ($e) {
                if (!this.isDrag) return;

                this.setContentsPosition($e.x, $e.y);
            },

            handleInteractionCancel: function () {
                this.isDrag = false;
                this.setContentsSnapX();
            },

            setContentsPosition: function($x, $y) {
                this.distanceX = $x - this.startX;
                this.distanceY = $y - this.startY;

                this.startX = $x;
                this.startY = $y;

                let minX = this.windowWidth;
                let maxX = (this.windowWidth * 1)*-1; // + (this.windowWidth * 1/8)*-1;

                this.targetContentsX += (this.distanceX * (4));

                if (this.targetContentsX > minX) {
                    this.targetContentsX = minX;
                }

                if (this.targetContentsX < maxX) {
                    this.targetContentsX = maxX;
                }
            },

            setContentsSnapX: function() {
                let indexX = Math.round((this.targetContentsX)/this.windowWidth);
                this.setContentsXByIndex(indexX);
            },

            setContentsXByIndex: function($index) {
                this.targetContentsX = (this.windowWidth ) * ($index);
            },

            onResizeHandler :function($e) {
                this.isResize = true;
                this.setContentsSnapX();
                this.onScrollHandler();
            },

            onScrollHandler : function($e) {
                let scrollTop = window.pageYOffset;
                this.fixY = scrollTop;
            }
        },
        watch : {
        },

        //life cycle
        //beforeCreate : function() {},
        created:function(){
            this.dataPrevContents = Window.ZanyBrosData.data.contentsData[2];
            this.dataNextContents = Window.ZanyBrosData.data.contentsData[1];
            this.dataContents = Window.ZanyBrosData.data.contentsData[0];
        },
        //beforeMount : function() {},
        mounted : function() {
            this.$on(this.CUSTOM_EVENT.INTERACTION_START, (e)=>this.handleInteractionStart(e));
            this.$on(this.CUSTOM_EVENT.INTERACTION_END, (e)=>this.handleInteractionEnd(e));
            this.$on(this.CUSTOM_EVENT.INTERACTION_MOVE, (e)=>this.handleInteractionMove(e));
            this.$on(this.CUSTOM_EVENT.INTERACTION_CANCEL, (e)=>this.handleInteractionCancel(e));

            EventBus.$on(EventBus.WINDOW_RESIZE, this.onResizeHandler);
            EventBus.$on(EventBus.SCROLL_MOVE, this.onScrollHandler);
            this.onResizeHandler();

            window.scrollTo(0,0);
        },
        //beforeUpdate : function() {},
        //updated : function() {},
        //activated : function() {},
        //deactivated : function() {},
        beforeDestroy : function () {
            this.$off(this.CUSTOM_EVENT.INTERACTION_START, (e)=>this.handleInteractionStart(e));
            this.$off(this.CUSTOM_EVENT.INTERACTION_END, (e)=>this.handleInteractionEnd(e));
            this.$off(this.CUSTOM_EVENT.INTERACTION_MOVE, (e)=>this.handleInteractionMove(e));
            this.$off(this.CUSTOM_EVENT.INTERACTION_CANCEL, (e)=>this.handleInteractionCancel(e));

            EventBus.$off(EventBus.WINDOW_RESIZE, this.onResizeHandler);
            EventBus.$off(EventBus.SCROLL_MOVE, this.onScrollHandler);
        },
        //destroyed : function() {},
        dummy : {}
    }
</script>