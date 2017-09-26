/**
* -----------------------------------------------------
* Created by uforgot on 2017. 9. 1.
* zanybros
* -----------------------------------------------------
*/

<template>
    <!-- 페이지 본문 컨텐츠 영역 -->
    <div class="view-contact-main"
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
            <div class="container">
                <section>
                    <ul>
                        <li>
                            <h1>KOREA H.Q.</h1>
                        </li>
                    </ul>
                </section>
                <section>
                    <ul>
                        <li><h1>PEOPLES</h1></li>
                    </ul>
                </section>
                <section>
                    <ul>
                        <li><h1>JAPAN</h1></li>
                        <li><h1>CHINA</h1></li>
                    </ul>
                </section>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import "~scssMixin";

    li {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently */
    }
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
            },
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


