/**
* Created by uforgot on 2017. 7. 18..
*/

<template>
    <div class="frame-container"
         :class="{ 'appear' : dataDrag}"
    >
        <div class="logo">ZANYBROS</div>
        <div class="bar left"></div>
        <div class="bar right"></div>
        <div class="btn-menu"><img src="assets/images/menu.png"></div>
    </div>
</template>

<script>
    export default {
        props : {
            'data-drag': {
                Type: Boolean,
                required: true
            }
        },

    }
</script>

<style scoped lang="scss">
    @import "~scssMixin";

</style>