<!-- template -->
<template>
    <!-- 페이지 본문 컨텐츠 영역 -->
    <div class="img-frame"
         :style="{
             width: frameWidth,
             height: frameHeight,

             'background-image': 'url(' + frameImageSrc + ')'
         }

    ">
        <slot></slot>
    </div>
</template>


<!-- script -->
<script>
    var mixinResize = require('../mixin/resize.vue');

    export default {
        mixins: [mixinResize],

        props : {
            'data-width' : {
                Type : String,
                default : '100%'
            },
            'data-height' : {
                Type : String,
                default : '100%'
            },
            'data-img' : {
                Type : String
            },
            'data-img-retina' : {
                Type : String
            },
            'data-img-mobile' : {
                Type : String
            },
            'data-img-mobile-retina' : {
                Type : String
            }

        },

        data: function() {
            return {
            };
        },

        computed:{
            frameWidth : function () {
                if (this.isPercentValue(this.dataWidth)) {
                    return this.getPixelValueByPercentValue(this.getPercentValue(this.dataWidth), this.windowWidth);
                }
                return this.dataWidth;
            },

            frameHeight : function () {
                if (this.dataHeight == 'auto') {
                    return this.frameWidth;
                }
                if (this.isPercentValue(this.dataHeight)) {
                    return this.getPixelValueByPercentValue(this.getPercentValue(this.dataHeight), this.windowHeight);
                }
                return this.dataHeight;
            },

            frameImageSrc : function() {
                return this.dataImg;
            }
        },

        beforeMount:function(){

        },

        methods:{

        },


        components:{

        },

        mounted : function() {

        },

        created:function(){

        }
    }
</script>


<style scoped lang="scss">
    @import "~scssMixin";

    .img-frame {
        float:left;
        display:inline-block;

        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;

    }
</style>