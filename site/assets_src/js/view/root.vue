/**
* Created by uforgot on 2017. 7. 18..
*/

<template>
    <div class="content-container"

         @mousedown="handleMouseDown"
         @mousemove="handleMouseMove"
         @mouseup="handleMouseUp"
         @mouseleave="handleMouseLeave"

         :style="{
             width: frameWidth,
             height: frameHeight
         }"
    >
            <view-main
                    v-for="item, key in dataContentsList"
                    :key ="key++"

                    :data-index="key-1"
                    :data-left="currentContentsLeft"
                    :data="item">
            </view-main>
        </div>
</template>

<script>
    import axios from 'axios'
    let mixinResize = require('../mixin/resize.vue');

    export default {
        mixins: [mixinResize],

        props : {
            'data-contents-url': {
                Type: String,
                required: true
            }
        },

        data: function() {
            return {
                dataContentsList:[],

                isDrag:0,
                startLeft:0,
                distance:0,

                animationInterval:null,
                targetContentsLeft:0,
                currentContentsLeft:0,

            }
        },

        components:{
            "view-main": require('../view/main.vue')
        },

        methods: {
            loadData : function() {
                axios({
                    method:'get',
                    url: this.dataContentsUrl,
                    responseType:'json'
                }).then(
                    ($response) => this.setData($response)
                ).catch(
                    ($error) => console.log($error)
                );
            },

            setData : function($response) {
                console.log($response.data.contents);
                this.dataContentsList = $response.data.contents;
            },

            //event
            handleMouseDown: function ($e) {
                this.isDrag = true;
                this.startX = $e.pageX;
            },

            handleMouseUp: function ($e) {
                this.isDrag = false;
                this.setContentsSnapLeft();
            },

            handleMouseMove: function ($e) {
                if (!this.isDrag) return;
                this.setContentsLeft($e.pageX);
            },
            handleMouseLeave: function ($e) {
                this.isDrag = false;
                this.setContentsSnapLeft();
            },
            handleTimer: function ($e) {
                this.currentContentsLeft +=  (this.targetContentsLeft - this.currentContentsLeft)/4;
            },

            setContentsLeft: function($x) {
                this.distance = $x - this.startX;
                this.startX = $x;

                var minX = (this.windowWidth * 1/8);
                var maxX = (this.windowWidth * 3)*-1 + (this.windowWidth * 1/8)*-1;

                this.targetContentsLeft = this.currentContentsLeft + (this.distance * 20);

                if (this.targetContentsLeft > minX) {
                    this.targetContentsLeft = minX;
                }

                if (this.targetContentsLeft < maxX) {
                    this.targetContentsLeft = maxX;
                }
            },

            setContentsSnapLeft: function() {
                var indexX = Math.abs(Math.round((this.targetContentsLeft)/this.windowWidth));
                this.setContentsLeftByIndex(indexX);
            },

            setContentsLeftByIndex: function($index) {
                let tmpX = (this.windowWidth * -1) * $index;
                this.targetContentsLeft = tmpX;
            }

        },

        computed:{
            frameWidth : function () {
                return this.windowWidth + 'px';
            },
            frameHeight : function () {
                return this.windowHeight + 'px';
            },
        },

        created() {

        },

        beforeDestroy: function () {
            clearInterval(this.animationInterval);
        },
        mounted() {
            this.animationInterval = setInterval(this.handleTimer, 1000/60);
        },

        created:function(){
            console.log("init root :" + this.dataContentsUrl);
            this.loadData();
        }
    }
</script>

<style scoped lang="scss">
    @import "~scssMixin";


</style>