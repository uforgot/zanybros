/**
* -----------------------------------------------------
* Created by uforgot on 2017. 8. 29.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div class="content-contact-people-title">
        <h5 v-html="getJsonMultilineTxt(jsonData.title)"></h5>
    </div>
</template>


<script>
    import MixinContent from '../mixin/mixin-content.vue';

    export default {
        mixins:[MixinContent],
        components:{},

        props : {},

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


