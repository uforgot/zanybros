<!-- template -->
<template>
    <!-- 페이지 본문 컨텐츠 영역 -->
    <div class="img-frame"
         :style="{
             width: dataWidth + 'px',
             height: dataHeight + 'px',
             'background-image': 'url(' + dataSrc + ')'
         }
    ">
            <slot></slot>
    </div>
</template>


<!-- script -->
<script>
    import mixinResizeEvent from '../mixin/mixin-control-resize.vue';

    export default {
        mixins: [mixinResizeEvent],

        props : {
            'data-width' : {
            },
            'data-height' : {
            },
            'data-src' : {
                Type : String
            }
        },

        data: function() {
            return {
            };
        },

        computed:{

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
</style>