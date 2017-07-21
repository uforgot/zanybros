<!-- template -->
<template>
    <!-- 페이지 본문 컨텐츠 영역 -->
    <div class="navigation animation" v-bind:class="{ show : isShow}">
        <div class="logo">
            <router-link to="/">ZANYBROS</router-link>
        </div>
        <ul class="menu-list">
            <navigation-menu
                    v-for="item in dataMenuList"
                    :key ="item.id"
                    :data-name="item.name"
                    :data-link="item.link"
            />
        </ul>
        <footer>
            <p v-html="txtCopyright"></p>
        </footer>
        <!--<div class="button"></div>-->
        <div class="button" v-on:click="toggleMenu()"></div>
    </div>
</template>


<!-- script -->
<script>
    import axios from 'axios'
    import compNavigationMenu from './navigationMenu.vue'

    export default {

        props : {
            'data-navigation-url': {
                Type: String,
                required: true
            }
        },

        data: function() {
            return {
                isShow : false,
                dataMenuList : '',
                dataCopyright : ''
            }
        },

        beforeMount:function(){

        },

        methods:{
            loadData : function() {
                axios({
                    method:'get',
                    url: this.dataNavigationUrl,
                    responseType:'json'
                }).then(
                    ($response) => this.setData($response)
                ).catch(
                    ($error) => console.log($error)
                );
            },

            toggleMenu : function() {
                this.isShow = this.isShow?false:true;
            },

            setData : function($response) {
                this.dataMenuList = $response.data.menu;
                this.dataCopyright = $response.data.footer.copyright;
            }
        },

        computed:{
            txtCopyright : function () {
                return this.dataCopyright.replace(/\n/g, "<br/>");
            }
        },

        components:{
            "navigation-menu": compNavigationMenu
        },

        mounted : function() {

        },

        created:function(){
            console.log("init navigation :" + this.dataNavigationUrl);
            this.loadData();
        }
    }
</script>

<style scoped lang="scss">
    @import "~scssMixin";

    .animation {
        @include css-transition-out(left, 0.3, 0);
    }

    .show {
        left:0;
    }
</style>