/**
* -----------------------------------------------------
* Created by uforgot on 2017. 8. 21.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div class="content-contact-people">
        <div v-if="title" class="title"><h6 v-html="title"></h6></div>
        <ul>
            <li v-for="item in jsonData.peoples">
                <small v-html="getJsonMultilineTxt(item.title)"></small>
                <h5 v-html="getJsonMultilineTxt(item.name)"></h5>
                <small v-html="getJsonMultilineTxt(item.email)"></small>
            </li>
        </ul>
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

        computed:{
            title : function () {
                if (!this.jsonData.title) {
                    return false;
                } else {
                    return this.getJsonMultilineTxt(this.jsonData.title)
                }
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


