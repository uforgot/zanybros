<!-- template -->
<template>
    <!-- 페이지 본문 컨텐츠 영역 -->
    <comp-image
        :data-width="frameWidth"
        :data-height="frameHeight"
        :data-src="frameImageSrc"
    >
        <div class="content">
            <div v-bind:is="jsonData.content.component"
                :json-data="jsonData.content"
            ></div>
        </div>

        <div class="content"
        :style="{
        'background-image': 'url(' + jsonData.img + ')',
        'background-position' : jsonData.align,
        'background-size' : jsonData.size,
        'width' : contentWidth + 'px',
        'height' : contentHeight + 'px'
        }"
        >
            <slot></slot>
        </div>
    </comp-image>
</template>


<!-- script -->
<script>
    import MixinResizeEvent from '../mixin/mixin-control-resize.vue';
    import CompImage from '../component/comp-image.vue';
    import CompTxtAbout from '../component/comp-txt-about.vue';

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
            }
        },

        beforeMount:function(){

        },

        methods:{

        },


        components:{
            CompImage,
            CompTxtAbout
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