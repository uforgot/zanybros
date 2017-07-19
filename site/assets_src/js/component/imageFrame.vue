<!-- template -->
<template>
    <!-- 페이지 본문 컨텐츠 영역 -->
    <div class="img-frame">
        <img :src="this.dataImg">
    </div>
</template>


<!-- script -->
<script>
    export default {

        props : {
            'width' : {
                Type : String
            },
            'height' : {
                Type : String
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
            return {};
        },

        computed:{
            computedWidth : function () {
                if (width=='100%') {
                    return window.height;
                }
            }
        },

        beforeMount:function(){

        },

        methods:{

        },

        computed:{

        },

        components:{
        },

        mounted : function() {

        },

        created:function(){
            console.log('aaaa');
        }
    }
</script>


<style lang="scss">
    @import "~scssMixin";

    .img-frame {
        @include opacity(0.5);

        display:block;
        background:#ff0000;
        width:100%;
        height:2000px;
    }
</style>