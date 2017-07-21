/**
 * Created by uforgot on 2017. 7. 18..
 */

<template>
    <section class="container"
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
    let mixinResize = require('../mixin/resize.vue');

    export default {
        mixins: [mixinResize],

        props : {
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
                return ((this.dataIndex * this.windowWidth) +  this.dataLeft) + 'px';
            }
        },

        created() {

        }
    }
</script>

<style scoped lang="scss">
    @import "~scssMixin";


</style>