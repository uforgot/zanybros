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
        <div class="scroll-animation hide" animation-offset="10">
            <img :src="jsonData.imageUrl">
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import "~scssMixin";

    .hide {
        @include css-value-transition('opacity 0.2s ease-out 0s, transform 0.2s ease-out 0s');
        @include opacity(0);
        @include transform(scale(0.9));
    }

    .show {
        @include css-value-transition('opacity 2.0s ease-out 0.2s, transform 2.0s ease-out 0.2s');
        @include opacity(1);
        @include transform(scale(1.0));
    }
</style>

<script>
    import MixinControlScrollAnimation from '../mixin/mixin-control-scroll-animation.vue';
    import MixinContent from '../mixin/mixin-content.vue';

    export default {
        mixins:[MixinControlScrollAnimation, MixinContent],
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
