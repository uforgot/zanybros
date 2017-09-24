/**
* -----------------------------------------------------
* Created by uforgot on 2017. 9. 1.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div class="content-background-image"
         :style="{
                 width: parentData.width + 'px',
                 height: parentData.height + 'px'}"
    >
        <comp-image class="scroll-animation hide"
                :style="{
                 width: parentData.width + 'px',
                 height: parentData.height + 'px',
                 'background-image': 'url(' + jsonData.imageUrl + ')'
            }"
        ></comp-image>
    </div>
</template>

<style scoped lang="scss">
    @import "~scssMixin";

    .hide {
        @include css-value-transition('opacity 0.2s ease-out 0s, transform 0.2s ease-out 0s, filter 0.2s ease-out 0.2s');
        @include opacity(0);
        @include transform(scale(1) translate(0px, 0px));
    }
    .show {
        @include css-value-transition('opacity 2.0s ease-out 0.2s, transform 4.0s ease-out 0.2s, filter 2.0s ease-out 0.2s');
        @include opacity(1);
        @include transform(scale(1) translate(0px, 0px));
    }
</style>

<script>
    import MixinContent from '../mixin/mixin-content.vue';
    import MixinControlScrollAnimation from '../mixin/mixin-control-scroll-animation.vue';

    import CompImage from '../component/comp-image.vue';

    export default {
        mixins:[MixinContent, MixinControlScrollAnimation],
        components: {CompImage},

        props: {},
        data: function () {
            return {};
        },

        computed: {},
        methods: {},
        watch: {},

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
    }
</script>
