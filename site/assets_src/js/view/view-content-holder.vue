<!-- template -->
<template>
    <!-- 페이지 본문 컨텐츠 영역 -->
    <div class="view-content-holder"
         :style="{
             'background-color': backgroundColor,
             width: frameWidth + 'px',
             height: frameHeight + 'px'
        }"
    >
        <comp-image v-if="hasBackgroundImage"
                :data-width="frameWidth"
                :data-height="frameHeight"
                :data-src="frameImageSrc"
        ></comp-image>
        <div
                v-for="item in content"
                :is="item.component"
                :key ="item.id"
                :json-data = "item"
        ></div>
    </div>
</template>


<!-- script -->
<script>
    import MixinResizeEvent from '../mixin/mixin-control-resize.vue';
    import CompImage from '../component/comp-image.vue';

    import ContentImage from '../content/content-image.vue';

    import ContentAboutTxt from '../content/content-about-txt.vue';
    import ContentAboutAward from '../content/content-about-award.vue';
    import ContentAboutPartner from '../content/content-about-partner.vue';
    import ContentAboutCategory from '../content/content-about-category.vue';

    import ContentVideo from '../content/content-video.vue';

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
            contentWidth : function() {
                if (this.isPercentValue(this.jsonData.contentWidth)) {
                    return this.getPixelValueByPercentValue(this.getPercentValue(this.jsonData.contentWidth), this.frameWidth);
                }
                return (this.jsonData.contentWidth > this.frameWidth)?this.frameWidth:this.jsonData.contentWidth;
            },

            contentHeight : function() {
                if (this.isPercentValue(this.jsonData.contentHeight)) {
                    return this.getPixelValueByPercentValue(this.getPercentValue(this.jsonData.contentHeight), this.frameHeight);
                }
                return (this.jsonData.contentHeight > this.frameHeight)?this.jsonData.contentHeight:this.frameHeight;
            },

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

            frameImageSrc : function() {
                return this.jsonData.backgroundImg;
            },

            hasBackgroundImage : function() {
                return (this.jsonData.backgroundImg)?true:false;
            },

            backgroundColor : function() {
                return (this.jsonData.backgroundColor)?this.jsonData.backgroundColor:"#000";
            },

            content : function() {
                return this.jsonData.content;
            }
        },

        beforeMount:function(){

        },

        methods:{

        },

        components:{
            CompImage,

            ContentImage,
            ContentVideo,

            ContentAboutTxt,
            ContentAboutAward,
            ContentAboutPartner,
            ContentAboutCategory

        },

        mounted : function() {

        },

        created:function(){

        }
    }
</script>

<style scoped lang="scss">
    @import "~scssMixin";
</style>