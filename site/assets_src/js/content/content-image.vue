/**
* -----------------------------------------------------
* Created by uforgot on 2017. 8. 21.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div class="content-image"
        :class="jsonData.class"
    >
        <img :src="jsonData.imageUrl">
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

        props: {},
        data: function () {
            return {}
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
