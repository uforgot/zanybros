<!-- template -->
<template>
    <!-- 페이지 본문 컨텐츠 영역 -->
    <div class="content about-sub">
        <section class="section-1">
            </comp-image-frame>
        </section>
    </div>
</template>


<!-- script -->
<script>
    import MixinResizeEvent from '../mixin/mixin-control-resize.vue';
    import CompImageFrame from '../component/comp-image-frame.vue';

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

        },

        components:{
            "comp-image-frame": CompImageFrame
        },

        methods:{

        },


        beforeDestroy: function () {

        },

        mounted() {

        },
    }
</script>


<style scoped lang="scss">
    @import "~scssMixin";
</style>