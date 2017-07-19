/**
 * Created by uforgot on 2017. 7. 18..
 */

<template>
    <div class="container">
        <image-frame width="100%" data-img="assets/images/main/sample1.jpg"></image-frame>
    </div>
</template>

<script>
    import compImageFrame from '../component/imageFrame.vue'

    export default {
        components:{
            "image-frame": compImageFrame
        },


        created() {

        }
    }
</script>