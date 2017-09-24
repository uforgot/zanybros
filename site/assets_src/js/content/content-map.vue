/**
* -----------------------------------------------------
* Created by uforgot on 2017. 8. 21.
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
        @include opacity(0);
    }

    .show {
        @include opacity(1);
    }
</style>

<script>
    import MixinControlScrollAnimation from '../mixin/mixin-control-scroll-animation.vue';
    import MixinContent from '../mixin/mixin-content.vue';
    import CompImage from '../component/comp-image.vue';

    export default {
        mixins:[MixinControlScrollAnimation, MixinContent],
        components:{
            CompImage
        },

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
