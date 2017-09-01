<template>
    <div class="content-contact-txt"
         :class="jsonData.class"
    >
        <h2 v-html="txtTitle"></h2>
        <p v-html="txtComment"></p>
    </div>
</template>

<style scoped lang="scss">
    @import "~scssMixin";
</style>

<script>
    import MixinContent from '../mixin/mixin-content.vue';

    export default {
        mixins:[MixinContent],
        components:{},

        props : {},
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
