/**
* -----------------------------------------------------
* Created by uforgot on 2017. 8. 22.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div class="content-about-category">
        <div class="title" v-html="getJsonMultilineTxt(jsonData.title)"></div>
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
                <div class="title" v-html="getJsonMultilineTxt(item.title)"></div><!--<img :src="item.imageUrl">-->
            </li>
        </ul>
    </div>
</template>


<script>
    import mixinResizeEvent from '../mixin/mixin-control-resize.vue';
    import CompImage from '../component/comp-image.vue';

    export default {
        mixins: [mixinResizeEvent],

        props: {
            "json-data" :{
                Type:Object
            }
        },

        data: function () {
            return {}
        },

        components: {
            CompImage
        },

        methods: {},

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

        beforeDestroy: function () {

        },

        mounted: function () {

        },

        created: function () {
        }
    }
</script>

