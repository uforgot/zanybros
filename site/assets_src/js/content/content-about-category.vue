/**
* -----------------------------------------------------
* Created by uforgot on 2017. 8. 22.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div class="content-about-category">
        <ul
            :style="{
                left : frameLeft + 'px',
                width : frameWidth + 'px',
                height : frameHeight + 'px'
            }"
        >
            <li v-for="item, key in jsonData.category"
                :key="key++"
                :style="{
                    left : ((key-1) * categoryWidth) + 'px'
                }"
            >
                <comp-image
                        :dataWidth="categoryWidth"
                        :dataHeight="categoryHeight"
                        :dataSrc="item.imageUrl"
                >
                </comp-image>
                <div class="title"><h4 v-html="getJsonMultilineTxt(item.title)"></h4></div><!--<img :src="item.imageUrl">-->
            </li>
        </ul>
    </div>
</template>


<script>
    import MixinResizeEvent from '../mixin/mixin-control-resize.vue';
    import MixinContent from '../mixin/mixin-content.vue';

    import CompImage from '../component/comp-image.vue';

    export default {
        mixins: [MixinResizeEvent, MixinContent],
        components: {
            CompImage
        },

        props: {},
        data: function () {
            return {}
        },

        computed:{
            frameLeft : function() {
                return  this.getPixelValueByPercentValue(
                    (100- this.getPercentValue(this.jsonData.width))/2,
                    this.windowWidth
                );
            },
            frameWidth : function() {
                return this.getPixelValueByPercentValue(this.getPercentValue(this.jsonData.width), this.windowWidth);
            },
            frameHeight : function() {
                return this.getPixelValueByPercentValue(this.getPercentValue(this.jsonData.height), this.windowHeight);
            },

            categoryWidth : function() {
                return this.frameWidth/this.dataLength;
            },
            categoryHeight : function() {
                return this.frameHeight;
            },
            dataLength: function() {
                return this.jsonData.category.length;
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