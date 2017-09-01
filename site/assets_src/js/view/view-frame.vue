/**
* -----------------------------------------------------
* Created by uforgot on 2017. 9. 1.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div class="frame-container">
        <div class="logo"><a href="/">ZANYBROS</a></div>

        <div class="language-container">
            <div>EN</div>
            <div>CH</div>
        </div>

        <div class="menu-container">
            <ul>
                <li>
                    <router-link to="/about">ABOUT US</router-link>
                </li>
                <li>
                    <router-link to="/works">OUR WORKS</router-link>
                </li>
                <li>
                    <router-link to="/contact">CONTACT US</router-link>
                </li>
            </ul>
        </div>

    </div>
</template>

<style scoped lang="scss">
    @import "~scssMixin";

    .router-link-active {
        color:red;
    }
</style>

<script>
    export default {
        mixins:[],
        components:{},

        props: {},
        data: function() {
            return {
            };
        },

        computed : {},
        methods : {},
        watch : {},

        //life cycle
        //beforeCreate : function() {},
        //created : function() {},
        //beforeMount : function() {},
        //mounted : function() {},
        //beforeUpdate : function() {},
        //updated : function() {},
        //activated : function() {},
        //deactivated : function() {},
        //beforeDestroy : function () {},
        //destroyed : function() {},
        dummy : {}
    }
</script>