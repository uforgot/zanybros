/**
* -----------------------------------------------------
* Created by uforgot on 2017. 8. 22.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div class="view-content-margin"
        :style="{
            'background-color': backgroundColor,
            height: jsonData.height
         }"
    >
    </div>
</template>

<style scoped lang="scss">
    @import "~scssMixin";
</style>

<script>
    export default {
        mixins:[],
        components:{},

        props : {
            'json-data': {
                Type : Object
            }
        },
        data: function () {
            return {}
        },

        computed : {
            backgroundColor : function() {
                return (this.jsonData.backgroundColor)?this.jsonData.backgroundColor:"#000";
            }
        },
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
