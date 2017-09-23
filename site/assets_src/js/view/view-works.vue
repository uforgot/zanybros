/**
* -----------------------------------------------------
* Created by uforgot on 2017. 8. 20.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div>
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
    import {EventBus} from "../events/event-bus";
    import MixinControlResize from '../mixin/mixin-control-resize.vue';

    import ViewWorksHolder from './view-works-holder.vue';
    import ContentWorksItem from '../content/content-works-item.vue';
    import CompVideoFrame from '../component/comp-video-frame.vue';

    import ViewContentHolder from './view-content-holder.vue';
    import ViewContentMargin from './view-content-margin.vue';
    import ViewContentTitle from './view-content-title.vue';

    import ViewFooter from './view-footer.vue';

    import ViewAboutMain from './view-about-main.vue';
    import ViewContactMain from './view-contact-main.vue';
    import ViewWorksMain from './view-works-main.vue';

    export default {
        mixins: [ MixinControlResize ],
        components:{
            ContentWorksItem,

            ViewWorksHolder,
            ViewContentHolder,
            ViewContentTitle,
            ViewContentMargin,
            ViewFooter,
            CompVideoFrame,

            ViewAboutMain,
            ViewWorksMain,
            ViewContactMain
        },

        props: {},
        data: function() {
            return {
                dataPrevContents:Object,
                dataNextContents:Object,
                dataContents:Object,

                fixY:Number
            }
        },

        computed: {
            frameWidth : function () {
                return this.windowWidth + 'px';
            }
        },

        methods : {
            onResizeHandler :function($e) {
                this.onScrollHandler();
            },
            onScrollHandler : function($e) {
                let scrollTop = window.pageYOffset;
                this.fixY = scrollTop;
            }
        },
        watch : {},

        //life cycle
        //beforeCreate : function() {},
        created:function(){
            this.dataPrevContents = Window.ZanyBrosData.data.contentsData[0];
            this.dataNextContents = Window.ZanyBrosData.data.contentsData[2];
            this.dataContents = Window.ZanyBrosData.data.contentsData[1];
        },
        //beforeMount : function() {},
        mounted : function() {
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
            EventBus.$off(EventBus.WINDOW_RESIZE, this.onResizeHandler);
            EventBus.$off(EventBus.SCROLL_MOVE, this.onScrollHandler);
        },
        //destroyed : function() {},
        dummy : {}
    }
</script>