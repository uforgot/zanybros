<!-- template -->
<template>
    <!-- 페이지 본문 컨텐츠 영역 -->
    <li class="menu">
        <router-link v-bind:to="dataLink">{{dataName}}</router-link>
        <!--<a v-bind:href="dataLink">{{dataName}}</a>-->
    </li>
</template>


<!-- script -->
<script>
    export default {

        props : {
            'data-name' : {
                Type : String
            },
            'data-link' : {
                Type : String
            }
        },

        data: function() {
            return{

            }
        },

        beforeMount:function(){

        },

        methods:{
            onClick:function(){

            }
        },

        computed:{

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

    .menu {
        a {
            @include css-transition-out(opacity, 0.2, 0);
            &:hover {
                opacity: 1.0;
            }
        }
    }
</style>