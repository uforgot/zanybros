/**
* -----------------------------------------------------
* Created by uforgot on 2017. 8. 21.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div class="content-contact-people">
        <div v-if="title"
             class="title scroll-animation hide"
             animation-offset="-20"
        ><h6 v-html="title"></h6></div>
        <ul>
            <li v-for="item in jsonData.peoples"
                class="award scroll-animation hide"
                animation-offset="-20"
            >
                <small v-html="getJsonMultilineTxt(item.title)"></small>
                <h5 v-html="getJsonMultilineTxt(item.name)"></h5>
                <small v-html="getJsonMultilineTxt(item.email)"></small>
            </li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
    @import "~scssMixin";

    .hide {
        @include css-value-transition('opacity 0.2s ease-out 0s, transform 0.2s ease-out 0s, left 0.2s ease-out 0s');
        @include opacity(0);
        @include transform(translate(0px, 40px));
    }

    .show {
        @include css-value-transition('opacity 0.5s ease-out 0s, transform 0.5s ease-out 0s');
        @include opacity(1.0);
        @include transform(translate(0px, 0px));
    }
</style>

<script>
    import MixinContent from '../mixin/mixin-content.vue';
    import MixinControlScrollAnimation from '../mixin/mixin-control-scroll-animation.vue';

    export default {
        mixins:[MixinContent, MixinControlScrollAnimation],
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


