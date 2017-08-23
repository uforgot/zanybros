/**
* -----------------------------------------------------
* Created by uforgot on 2017. 8. 20.
* zanybros
* -----------------------------------------------------
*/


<template>
    <div>
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


<script>
    import MixinControlResize from '../mixin/mixin-control-resize.vue';

    import ViewWorksHolder from './view-works-holder.vue';
    import ContentWorksItem from '../content/content-works-item.vue';

    import CompVideoFrame from '../component/comp-video-frame.vue';
    import ViewWorksMain from './view-works-main.vue';
    import ViewFooter from './view-footer.vue';

    export default {
        mixins: [ MixinControlResize ],

        props: {

        },

        data: function() {
            return {
                dataContents:Object
            }
        },

        components:{
            ContentWorksItem,

            ViewWorksHolder,
            ViewWorksMain,
            ViewFooter,
            CompVideoFrame
        },

        computed: {
            frameWidth : function () {
                return this.windowWidth + 'px';
            }
        },

        methods : {

        },

        beforeDestroy: function () {

        },

        mounted : function() {
            console.log('mounted');
        },

        created:function(){
            this.dataContents = Window.ZanyBrosData.data.contentsData[1];
        }
    }
</script>

<style scoped lang="scss">
    @import "~scssMixin";
</style>

