/**
* -----------------------------------------------------
* Created by uforgot on 2017. 8. 21.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div class="content-image"
        :class="jsonData.class"
    >
        <div class="title" v-html="getJsonMultilineTxt(jsonData.title)"></div>
        <img :src="jsonData.imageUrl">
    </div>
</template>


<script>

    export default {
        props: {
            "json-data" :{
                Type:Object
            }
        },

        data: function () {
            return {}
        },

        components: {},

        methods: {},

        beforeDestroy: function () {

        },

        mounted: function () {

        },

        created: function () {

        }
    }
</script>

<style scoped lang="scss">
    @import "~scssMixin";
</style>