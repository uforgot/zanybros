/**
 * Created by uforgot on 2017. 7. 18..
 */

<template>
    <section class="container"
         :style="{
             'transform':computedPositionX
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
    let mixinResize = require('../mixin/resize.vue');

    export default {
        mixins: [mixinResize],

        props : {
            'data-drag' : {
            },
            'data-index' : {
                type: Number
            },
            'data-left':{
                type: Number
            },
            'data': {
                Type: Array
            }
        },

        components:{
            "comp-imageFrame": require('../component/imageFrame.vue')
        },


        computed:{
            computedPositionX: function() {
//                console.log(this.dataIndex + " " + this.dataLeft);
                return 'translateX(' + ((this.dataIndex * this.windowWidth) +  this.dataLeft) + 'px' + ')';
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


</style>