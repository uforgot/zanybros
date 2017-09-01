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

<style scoped lang="scss">
    @import "~scssMixin";
</style>

<script>
    import MixinControlResize from '../mixin/mixin-control-resize.vue';

    import ViewContentHolder from './view-content-holder.vue';
    import ViewContentMargin from './view-content-margin.vue';
    import ViewContentTitle from './view-content-title.vue';

    import CompVideoFrame from '../component/comp-video-frame.vue';
    import ViewAboutMain from './view-about-main.vue';
    import ViewFooter from './view-footer.vue';

    export default {
        mixins: [ MixinControlResize ],
        components:{
            ViewContentHolder,
            ViewContentTitle,
            ViewContentMargin,
            ViewAboutMain,
            ViewFooter,
            CompVideoFrame
        },

        props: {

        },
        data: function() {
            return {
                dataContents:Object
            }
        },

        computed: {
            frameWidth : function () {
                return this.windowWidth + 'px';
            }
        },

        methods : {},
        watch : {},

        //life cycle
        //beforeCreate : function() {},
        created:function(){
            this.dataContents = Window.ZanyBrosData.data.contentsData[0];
        },
        //beforeMount : function() {},
        //mounted : function() {},
        //beforeUpdate : function() {},
        //updated : function() {},
        //activated : function() {},
        //deactivated : function() {},
        //beforeDestroy : function () {},
        //destroyed : function() {},
        dummy : {}
    }
</script>