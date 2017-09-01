/**
* -----------------------------------------------------
* Created by uforgot on 2017. 8. 29.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div class="content-contact-gallery">
        <comp-agile
                :arrows="false"
                :speed="500"
                :timing="'linear'"
                :fade="false"
                :autoplay="true"
                :pauseOnHover="false"
        >
            <div v-for="item in jsonData.imageUrl"
                :style="{
                        width: '100%',
                        height: windowHeight + 'px',
                        'background-image': 'url(' + item + ')',
                        'background-size': 'cover',
                        'background-position' : 'center'
                    }"
                >
            </div>
        </comp-agile>
    </div>
</template>

<style scoped lang="scss">
    @import "~scssMixin";

    .agile__track {
        align-item:default;
    }
</style>


<script>
    import MixinContent from '../mixin/mixin-content.vue';
    import MixinResizeEvent from '../mixin/mixin-control-resize.vue';
    import CompAgile from '../component/comp_agile.vue';

    export default {
        mixins: [MixinContent, MixinResizeEvent],
        components: {
            CompAgile
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




