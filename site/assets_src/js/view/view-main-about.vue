<!-- template -->
<template>
    <!-- 페이지 본문 컨텐츠 영역 -->
    <div class="content about-main"
         :style="{
             width: frameWidth,
             height: frameHeight
         }
    ">
        <div class="title">
            <div>WIDEN</div>
            <div>THE VIEW OF</div>
            <div>CREATIVITY</div>
        </div>
    </div>
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
                return this.windowWidth;
            },

            frameHeight : function () {
                return this.windowHeight;
            },
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