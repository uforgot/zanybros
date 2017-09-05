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

            class="scroll-animation hide"
            animation-offset="30"

        >
            <content-about-category-item v-for="item, key in jsonData.category"
                :key="key++"
                :data-left="itemArray[(key-1)].x"
                :data-index="key"

                :data-width="itemArray[(key-1)].width"
                :data-height="categoryHeight"
                :json-data="item"
                @categoryOver="onCategoryOverHandler"
            >
            </content-about-category-item>
        </ul>
    </div>
</template>

<style scoped lang="scss">
    @import "~scssMixin";

    .hide {
        @include css-value-transition('opacity 0.2s ease-out 0s, transform 0.2s ease-out 0s, left 0.2s ease-out 0s');
        @include opacity(0);
        @include transform(translate(0px, 40px));
    }

    .show {
        @include css-value-transition('opacity 0.5s ease-out 0s, transform 0.5s ease-out 0s');
        @include opacity(1.0);
        @include transform(translate(0px, 0px));
    }
</style>

<script>
    import MixinControlScrollAnimation from '../mixin/mixin-control-scroll-animation.vue';
    import MixinResizeEvent from '../mixin/mixin-control-resize.vue';
    import MixinContent from '../mixin/mixin-content.vue';

    import ContentAboutCategoryItem from './content-about-category-item.vue'
    import CompImage from '../component/comp-image.vue';

    export default {
        mixins: [MixinResizeEvent, MixinContent, MixinControlScrollAnimation],
        components: {
            ContentAboutCategoryItem
        },

        props: {},
        data: function () {
            return {
                itemArray:[]
            }
        },

        computed:{
            frameLeft : function() {
                return  this.getPixelValueByPercentValue(
                    (100- this.getPercentValue(this.jsonData.width))/2,
                    this.windowWidth
                );
            },
            frameWidth : function() {
                return this.getPixelValueByPercentValue(this.getPercentValue(this.jsonData.width), this.parentData.width);
            },
            frameHeight : function() {
                return this.getPixelValueByPercentValue(this.getPercentValue(this.jsonData.height), this.parentData.height);
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

        methods : {
            onCategoryOverHandler : function($e) {
                this.setCategory($e-1);
            },

            setCategory : function($idx) {
//                console.log("------>" + $idx);
                let i;
                let x = 0;

                if ($idx === -1) {
                    for (i = 0; i < this.itemArray.length; i++) {
                        this.itemArray[i].x = x;
                        this.itemArray[i].width = this.categoryWidth * 2;
                        x += this.categoryWidth;
                    }
                    return;
                } else {
                    for (i = 0; i < this.itemArray.length; i++) {
                        this.itemArray[i].x = x;
                        if (i===$idx) {
                            x += this.categoryWidth * 2;
                        } else {
                            x += (this.frameWidth-(this.categoryWidth * 2))/(this.dataLength-1);
                        }
                    }
                }

            },

            handleWindowResize : function () {
                this.handleWindowResizeMixin();
                this.setCategory(-1);
            }

        },
        watch : {
            categoryWidth : function($newValue, $oldValue) {
                this.setCategory(-1);
            }
        },

        //life cycle
        //beforeCreate : function() {},
        created : function() {
            let i;

            for (i=0;i<this.dataLength;i++) {
                this.itemArray.push({
                    x:0,
                    width:0
                });
            }

            this.setCategory(-1);
        },
        //beforeMount : function() {},
        mounted : function() {
//            window.addEventListener('resize', this.handleWindowResize);
//            this.handleWindowResize();
        },
        //beforeUpdate : function() {},
        //updated : function() {},
        //activated : function() {},
        //deactivated : function() {},
        beforeDestroy : function () {
//            window.removeEventListener('resize', this.handleWindowResize);
        },
        //destroyed : function() {},
        dummy : {}
    }
</script>