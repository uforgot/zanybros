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


<script>

    export default {
        props : {
            'json-data': {
                Type : Object
            }
        },

        data: function () {
            return {}
        },

        components: {},

        computed : {
            backgroundColor : function() {
                return (this.jsonData.backgroundColor)?this.jsonData.backgroundColor:"#000";
            }
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

