/**
* -----------------------------------------------------
* Created by uforgot on 2017. 8. 21.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div class="content-contact-people">
        <div v-if="title" class="title"><h6 v-html="title"></h6></div>
        <ul>
            <li v-for="item in jsonData.peoples">
                <p v-html="getJsonMultilineTxt(item.title)"></p>
                <h5 v-html="getJsonMultilineTxt(item.name)"></h5>
                <p v-html="getJsonMultilineTxt(item.email)"></p>
            </li>
        </ul>
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
            title : function () {
                if (!this.jsonData.title) {
                    return false;
                } else {
                    return this.getJsonMultilineTxt(this.jsonData.title)
                }
            }
        },

        beforeDestroy: function () {

        },

        mounted: function () {

        },

        created: function () {

        }
    }
</script>

