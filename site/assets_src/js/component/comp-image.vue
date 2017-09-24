/**
* -----------------------------------------------------
* Created by uforgot on 2017. 9. 1.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div class="comp-image"
         :style="{
                 width: dataWidth + 'px',
                 height: dataHeight + 'px',
                 'background-image': 'url(' + dataSrc + ')'
            }"
    >
            <slot></slot>
    </div>
</template>

<style scoped lang="scss">
    @import "~scssMixin";

    .comp-image {
        @include backgroundCover();
    }
</style>

<script>
    export default {
        mixins: [],
        components:{},

        props : {
            'data-width' : {
            },
            'data-height' : {
            },
            'data-src' : {
                Type : String
            }
        },

        data: function() {
            return {
            };
        },

        computed: {},
        methods: {},
        watch: {},

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
        //destroyed : function() {}
        dummy : {}
    }
</script>


