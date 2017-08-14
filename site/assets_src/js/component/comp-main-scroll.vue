<!-- template -->
<template>
    <!-- 페이지 본문 컨텐츠 영역 -->
    <div class="main-scroll">SCROLL DOWN</div>
</template>


<!-- script -->
<script>
    import mixinResizeEvent from '../mixin/mixin-control-resize.vue';

    export default {
        mixins: [mixinResizeEvent],

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

            frameImageSrc : function() {
                return this.jsonData.backgroundImg;
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