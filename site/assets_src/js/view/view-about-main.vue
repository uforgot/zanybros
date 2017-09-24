/**
* -----------------------------------------------------
* Created by uforgot on 2017. 9. 1.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div class="view-about-main"
         :style="{
             width: frameWidth + 'px',
             height: frameHeight + 'px'
         }"
    >
        <div class="title"
             :style="{
             width: frameWidth + 'px',
             height: frameHeight + 'px'
         }"
        >
            <ul>
                <li><h1>WHO WE ARE</h1></li>
                <li><h1>WHAT WE DO</h1></li>
                <li><h1>2017 SHOWREEL</h1></li>
                <li><h1>AWARDS</h1></li>
                <li><h1>PARTNERS</h1></li>
            </ul>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import "~scssMixin";
</style>

<script>
    import MixinResizeEvent from '../mixin/mixin-control-resize.vue';
    import CompYoutubeFrame from '../component/comp-youtube-frame.vue';
    import CompMainScroll from '../component/comp-main-scroll.vue';

    export default {
        mixins: [MixinResizeEvent],
        components:{
            CompYoutubeFrame,
            CompMainScroll
        },

        props : {
            'json-data': {
                Type : Object
            }
        },
        data: function() {
            return {
            };
        },

        computed:{
            frameWidth : function () {
                if (this.isPercentValue(this.jsonData.width)) {
                    return this.getPixelValueByPercentValue(this.getPercentValue(this.jsonData.width), this.windowWidth);
                }
                return this.jsonData.width;
            },

            frameHeight : function () {
                if (this.jsonData.height === 'auto') {
                    return this.frameWidth();
                }
                if (this.isPercentValue(this.jsonData.height)) {
                    return this.getPixelValueByPercentValue(this.getPercentValue(this.jsonData.height), this.windowHeight);
                }
                return this.jsonData.height;
            }
        },

        methods : {},
        watch : {},

        //life cycle
        //beforeCreate : function() {},
        //created : function() {},
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
