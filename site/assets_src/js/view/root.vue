/**
* Created by uforgot on 2017. 7. 18..
*/

<template>
    <div class="content-container"
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
                    :data="item"
                    :data-scale="currentContentsScale"
            >
            </view-main>
        </div>
</template>

<script>
    import axios from 'axios'
    let mixinResize = require('../mixin/resize.vue');
    let mixinInteractionEvent = require('../mixin/interactionEvent.vue');

    export default {
        mixins: [mixinResize, mixinInteractionEvent],

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

                targetContentsScale:1,
                currentContentsScale:1

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
                if (this.isDrag) {
                    this.targetContentsScale = 0.5;
                } else {
                    this.targetContentsScale = 1.0;
                }

                this.currentContentsLeft = this.setEasingValue(this.targetContentsLeft, this.currentContentsLeft, 4);
//                this.currentContentsScale = this.setEasingValue(this.targetContentsScale, this.currentContentsScale, 4);
//                this.currentContentsScale +=  (this.targetContentsScale - this.currentContentsScale)/4;
//                this.currentContentsLeft +=  (this.targetContentsLeft - this.currentContentsLeft)/4;
            },

            setEasingValue: function($targetValue , $currentValue, $easingValue) {
                if (Math.abs($targetValue - $currentValue) > 0.005) {
                    return $currentValue + ($targetValue - $currentValue)/$easingValue;
                } else {
                    return $targetValue;
                }
            },

            setContentsLeft: function($x) {
                this.distance = $x - this.startX;
                this.startX = $x;

                let minX = (this.windowWidth * 1/8);
                let maxX = (this.windowWidth * 3)*-1 + (this.windowWidth * 1/8)*-1;

                this.targetContentsLeft = this.currentContentsLeft + (this.distance * 20);

                if (this.targetContentsLeft > minX) {
                    this.targetContentsLeft = minX;
                }

                if (this.targetContentsLeft < maxX) {
                    this.targetContentsLeft = maxX;
                }
            },

            setContentsSnapLeft: function() {
                let indexX = Math.abs(Math.round((this.targetContentsLeft)/this.windowWidth));
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

        beforeDestroy: function () {
            clearInterval(this.animationInterval);

            this.$off('customMouseDown', (e)=>this.handleMouseDown(e));
            this.$off('customMouseUp', (e)=>this.handleMouseUp(e));
            this.$off('customMouseMove', (e)=>this.handleMouseMove(e));
            this.$off('customMouseLeave', (e)=>this.handleMouseLeave(e));
        },

        mounted() {
            this.animationInterval = setInterval(this.handleTimer, 1000/60);

            this.$on('customMouseDown', (e)=>this.handleMouseDown(e));
            this.$on('customMouseUp', (e)=>this.handleMouseUp(e));
            this.$on('customMouseMove', (e)=>this.handleMouseMove(e));
            this.$on('customMouseLeave', (e)=>this.handleMouseLeave(e));
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