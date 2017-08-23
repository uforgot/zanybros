/**
* -----------------------------------------------------
* Created by uforgot on 2017. 8. 21.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div class="content-about-partner"
         :class="jsonData.class"
    >
        <div class="title" v-html="getJsonMultilineTxt(jsonData.title)"></div>
        <div
                v-for="item in jsonData.item"
                class="partner">
            <img :src="item.imageUrl">
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

