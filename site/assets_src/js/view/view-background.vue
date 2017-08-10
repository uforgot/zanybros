/**
* Created by uforgot on 2017. 8. 4..
*/

<template>
    <div class="background-container">
        <div class="left-text background-animation"
             :class="{ 'background-left-hide' : !dataFolding}"
        >
            ZANY
        </div>
        <div class="right-text background-animation"
             :class="{ 'background-right-hide' : !dataFolding}"
        >
            BROS
        </div>
    </div>
</template>

<script>
    export default {
        props : {
            'data-folding': {
                Type: Boolean,
                required: true
            }
        },

    }
</script>

<style scoped lang="scss">
    @import "~scssMixin";

    .background-animation {
        @include css-transition-out(all,0.2,0);
    }

    .background-left-hide {
        margin-left:-200px;
    }

    .background-right-hide {
        margin-right:-200px;
    }
</style>