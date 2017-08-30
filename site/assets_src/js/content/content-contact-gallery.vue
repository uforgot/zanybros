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


<script>
    import MixinResizeEvent from '../mixin/mixin-control-resize.vue';
    import CompAgile from '../component/comp_agile.vue';

    export default {
        mixins: [MixinResizeEvent],

        props: {
            "json-data" :{
                Type:Object
            }
        },

        data: function () {
            return {}
        },

        components: {
            CompAgile
        },

        methods: {},

        beforeDestroy: function () {

        },

        mounted: function () {

        },

        created: function () {

        }
    }
</script>

<style scoped lang="scss">
    @import "~scssMixin";

    .agile__track {
        align-item:default;
    }
</style>



