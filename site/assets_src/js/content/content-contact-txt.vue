<!-- template -->
<template>
    <!-- 페이지 본문 컨텐츠 영역 -->
    <div class="content-contact-txt"
         :class="jsonData.class"
    >
        <h2 v-html="txtTitle"></h2>
        <p v-html="txtComment"></p>
    </div>
</template>


<!-- script -->
<script>
    import mixinResizeEvent from '../mixin/mixin-control-resize.vue';

    export default {
        mixins: [mixinResizeEvent],

        props : {
            "json-data" :{
                Type:Object
            }
        },

        data: function() {
            return {
            };
        },

        computed:{
            txtTitle : function () {
                return this.getJsonMultilineTxt(this.jsonData.title);
            },
            txtComment : function () {
                return this.getJsonMultilineTxt(this.jsonData.comment);
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
</style>