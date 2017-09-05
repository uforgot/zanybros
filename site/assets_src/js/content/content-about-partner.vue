/**
* -----------------------------------------------------
* Created by uforgot on 2017. 8. 21.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div class="content-about-partner __content-list-frame"
         :class="jsonData.class"
    >
        <div
                v-for="item in jsonData.item"
                class="partner scroll-animation hide"
                animation-offset="30"
        >
            <img :src="item.imageUrl">
        </div>
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


