<!-- template -->
<template>
    <!-- 페이지 본문 컨텐츠 영역 -->
    <menu>
        <router-link v-bind:to="dataLink">{{dataName}}</router-link>
        <!--<a v-bind:href="dataLink">{{dataName}}</a>-->
    </menu>
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
