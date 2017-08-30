/**
* -----------------------------------------------------
* Created by uforgot on 2017. 8. 29.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div class="content-contact-people-sub-title"
         v-html="getJsonMultilineTxt(jsonData.title)">
    </div>
</template>


<script>
    export default {
        props : {
            'json-data': {
                Type: Object
            }
        },

        data: function () {
            return {}
        },

        components: {},

        methods: {},

        computed : {},

        beforeDestroy: function () {

        },

        mounted: function () {

        },

        created: function () {

        }
    }
</script>

