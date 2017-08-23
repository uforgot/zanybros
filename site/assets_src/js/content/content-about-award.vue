/**
* -----------------------------------------------------
* Created by uforgot on 2017. 8. 21.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div class="content-about-award"
         :class="jsonData.class"
    >
        <div class="title" v-html="getJsonMultilineTxt(jsonData.title)"></div>
        <div
                v-for="item in jsonData.item"
                class="award">
            <h1 v-html="getJsonMultilineTxt(item.title)">
            </h1>
            <p v-html="getJsonMultilineTxt(item.comment)">
            </p>
        </div>
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

        computed:{
        },

        beforeDestroy: function () {

        },

        mounted: function () {

        },

        created: function () {

        }
    }
</script>

