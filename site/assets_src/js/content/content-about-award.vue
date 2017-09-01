/**
* -----------------------------------------------------
* Created by uforgot on 2017. 8. 21.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div class="content-about-award __content-list-frame"
         :class="jsonData.class"
    >
        <div
                v-for="item in jsonData.item"
                class="award"
        >
            <h5 v-html="getJsonMultilineTxt(item.title)"></h5>
            <small v-html="getJsonMultilineTxt(item.comment)"></small>
        </div>
    </div>
</template>

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
        //destroyed : function() {}
        dummy : {}
    }
</script>


