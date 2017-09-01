/**
* -----------------------------------------------------
* Created by uforgot on 2017. 8. 22.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div class="view-footer">
        <div class="contact">
            <h1 v-html="getJsonMultilineTxt(dataFooter.contact.title)"></h1>
            <p v-html="getJsonMultilineTxt(dataFooter.contact.comment)"></p>
            <div class="email">
                <a :href="emailLink" v-html="this.dataFooter.contact.email"></a>
            </div>
        </div>
        <div class="copyright">
            <div class="logo">ZANYBROS</div>
            <p v-html="dataFooter.copyright.join('')"></p>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import "~scssMixin";
</style>

<script>
    export default {
        mixins:[],
        components:{},

        props: {},
        data: function () {
            return {
                dataFooter:Object
            }
        },

        computed: {
            emailLink : function() {
                return "mailto://" + this.dataFooter.contact.email;
            }
        },
        methods : {},
        watch : {},

        //life cycle
        //beforeCreate : function() {},
        created:function(){
            this.dataFooter = Window.ZanyBrosData.data.footerData;
        },
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