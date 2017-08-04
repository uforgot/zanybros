/**
* Created by uforgot on 2017. 8. 4..
*/

<template>
    <div class="background-container">
        <div class="left-text animation"
             :class="{ 'left-hide' : !dataDrag}"
        >
            ZANY
        </div>
        <div class="right-text animation"
             :class="{ 'right-hide' : !dataDrag}"
        >
            BROS
        </div>
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

    .animation {
        @include css-transition-out(all,0.2,0.1);
//        @include css-transition-out(margin-right,0.2,0.0);
    }

    .left-hide {
        margin-left:-200px;
    }

    .right-hide {
        margin-right:-200px;
    }
</style>