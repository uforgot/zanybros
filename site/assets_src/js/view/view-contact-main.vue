<!-- template -->
<template>
    <!-- 페이지 본문 컨텐츠 영역 -->
    <div class="content-holder view-contact-main"
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
                    <h6>ZANYBROS</h6>
                    <ul>
                        <li>
                            <h1>KOREA H.Q.</h1>
                        </li>
                    </ul>
                </section>
                <section>
                    <h6>ZANYBROS</h6>
                    <ul>
                        <li><h1>PEOPLES</h1></li>
                    </ul>
                </section>
                <section>
                    <h6>ZANYBROS COMMUNICATION</h6>
                    <ul>
                        <li><h1>JAPAN</h1></li>
                        <li><h1>CHINA</h1></li>
                    </ul>
                </section>
            </div>
        </div>
    </div>
</template>


<!-- script -->
<script>
    import MixinResizeEvent from '../mixin/mixin-control-resize.vue';
    import CompYoutubeFrame from '../component/comp-youtube-frame.vue';
    import CompMainScroll from '../component/comp-main-scroll.vue';

    export default {
        mixins: [MixinResizeEvent],

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

        components:{
            "comp-youtube-frame" : CompYoutubeFrame,
            "comp-main-scroll" : CompMainScroll
        },

        methods:{

        },


        beforeDestroy: function () {

        },

        mounted() {

        },
    }
</script>

<style scoped lang="scss">
    @import "~scssMixin";
</style>
