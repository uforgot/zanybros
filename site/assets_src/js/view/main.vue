/**
 * Created by uforgot on 2017. 7. 18..
 */

<template>
    <section class="container animation"

             :class="{ 'zoom-out' : dataDrag}"
             :style="{
                 left:computedPositionX
             }"
    >
        <comp-imageFrame
                v-for="item in data"
                :key ="item.id"
                :data-width ="item.dataWidth"
                :data-height="item.dataHeight"
                :data-img="item.dataImg"
        ></comp-imageFrame>
    </section>
</template>

<script>
    let mixinResizeEvent = require('../mixin/resizeEvent.vue');

    export default {
        mixins: [mixinResizeEvent],

        props : {
            'data-drag' : {
                type: Boolean,
                default :false

            },
            'data-index' : {
                type: Number
            },
            'data-left':{
                type: Number
            },
            'data': {
                type: Array
            }
        },

        components:{
            "comp-imageFrame": require('../component/imageFrame.vue')
        },


        computed:{
            computedPositionX: function() {
//                console.log(this.dataIndex + " " + this.dataLeft);
                return ((this.dataIndex * this.windowWidth) +  this.dataLeft) + 'px';
//                return 'translateX(' + ((this.dataIndex * this.windowWidth) +  this.dataLeft) + 'px' + ')';
            },
            computedScale: function() {
                return 'scale(' + this.dataScale + ')';
            }
        },

        created() {

        }
    }
</script>

<style scoped lang="scss">
    @import "~scssMixin";

    .animation {
        @include css-transition-out(transform, 0.3, 0);
    }

    .zoom-out {
        @include transform(scale(0.9));
    }

</style>