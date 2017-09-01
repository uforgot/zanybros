/**
* -----------------------------------------------------
* Created by uforgot on 2017. 9. 1.
* zanybros
* -----------------------------------------------------
*/

<template>
    <!-- 페이지 본문 컨텐츠 영역 -->
    <div class="view-content-holder"
         :style="{
             'background-color': backgroundColor,
             width: frameWidth + 'px',
             height: frameHeight + 'px'
        }"
    >
        <div :class="jsonData.class">
            <div
                    v-for="item in content"
                    :is="item.component"
                    :key ="item.id"
                    :json-data = "item"
                    :parent-data = "parentData"
            ></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import "~scssMixin";
</style>

<script>
    import MixinResizeEvent from '../mixin/mixin-control-resize.vue';
    import CompImage from '../component/comp-image.vue';

    import ContentImage from '../content/content-image.vue';
    import ContentBackgroundImage from '../content/content-background-image.vue';

    import ContentAboutTxt from '../content/content-about-txt.vue';
    import ContentAboutAward from '../content/content-about-award.vue';
    import ContentAboutPartner from '../content/content-about-partner.vue';
    import ContentAboutCategory from '../content/content-about-category.vue';

    import ContentContactTxt from '../content/content-contact-txt.vue';
    import ContentContactGallery from '../content/content-contact-gallery.vue';
    import ContentContactPeople from '../content/content-contact-people.vue';
    import ContentContactPeopleTitle from '../content/content-contact-people-title.vue';

    import ContentVideo from '../content/content-video.vue';

    export default {
        mixins: [MixinResizeEvent],
        components:{
            CompImage,

            ContentImage,
            ContentBackgroundImage,
            ContentVideo,

            ContentAboutTxt,
            ContentAboutAward,
            ContentAboutPartner,
            ContentAboutCategory,

            ContentContactTxt,
            ContentContactGallery,
            ContentContactPeople,
            ContentContactPeopleTitle
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
            parentData : function() {
                let data = {
                    width : this.frameWidth,
                    height : this.frameHeight
                }
                return data;
            },

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
        //destroyed : function() {}
    }
</script>
