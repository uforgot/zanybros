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
                                         :data-index="key"
                                         :data-left="itemArray[(key-1)].x"
                                         :data-width="itemArray[(key-1)].width"
                                         :data-max-width="categoryWidth * 2.2"
                                         :data-height="categoryHeight"
                                         :data-focus="itemArray[(key-1)].focus"
                                         :data-din="itemArray[(key-1)].din"
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
    import MixinContent from '../mixin/mixin-content.vue';

    import ContentAboutCategoryItem from './content-about-category-item.vue'

    export default {
        mixins: [MixinContent, MixinControlScrollAnimation],
        components: {
            ContentAboutCategoryItem
        },

        props: {},
        data: function () {
            return {
                itemArray:[],
                windowW : window.windowWidth
            }
        },

        computed:{
            frameLeft : function() {
                return  this.getPixelValueByPercentValue(
                    (100- this.getPercentValue(this.jsonData.width))/2,
                    this.windowW
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
                        this.itemArray[i].width = this.categoryWidth;
                        this.itemArray[i].din = false;
                        this.itemArray[i].focus = false;
                        x += this.itemArray[i].width;
                    }
                    return;
                } else {
                    for (i = 0; i < this.itemArray.length; i++) {
                        this.itemArray[i].x = x;
                        if (i===$idx) {
                            this.itemArray[i].width = this.categoryWidth * 2.2;
                            this.itemArray[i].din = false;
                            this.itemArray[i].focus = true;
                        } else {
                            this.itemArray[i].width = (this.frameWidth-(this.categoryWidth * 2.2))/(this.dataLength-1);
                            this.itemArray[i].din = true;
                            this.itemArray[i].focus = false;
                        }
                        x += this.itemArray[i].width;
                    }
                }

            },

            handleWindowResize : function () {
                this.windowW = window.windowWidth;
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
                    width:0,
                    din:false,
                    focuse:false
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