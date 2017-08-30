/**
* -----------------------------------------------------
* Created by uforgot on 2017. 8. 22.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div class="view-content-title"
         :style="{
            'background-color': backgroundColor,
            height : jsonData.height,
            'color' : color
         }"
    >
        <h3 v-html="getJsonMultilineTxt(jsonData.title)"></h3>
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
            },
            color : function() {
                return (this.jsonData.color)?this.jsonData.color:"#fff";
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

