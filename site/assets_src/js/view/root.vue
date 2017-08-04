/**
* Created by uforgot on 2017. 7. 18..
*/

<template>
    <div class="content-container"
         :class="{ 'zoom-out' : isDrag, 'animation-zoom-in' : isDrag, 'animation-zoom-out' : !isDrag}"
         :style="{
             width: frameWidth,
             height: frameHeight
         }"
    >
        <view-main-background
                v-for="item, key in dataContentsList"
                :key ="key++"

                :data-index="key-1"
                :data-left="currentContentsX"
                :data="item"
                :data-drag="isDrag"
        ></view-main-background>
        <view-main
                v-for="item, key in dataContentsList"
                :key ="key++"

                :data-index="key-1"
                :data-left="currentContentsX"
                :data="item"
                :data-drag="isDrag"
        >
        </view-main>
    </div>
</template>

<script>
    import axios from 'axios'
    let mixinResizeEvent = require('../mixin/resizeEvent.vue');
    let mixinInteractionEvent = require('../mixin/interactionEvent.vue');

    export default {
        mixins: [mixinResizeEvent, mixinInteractionEvent],

        props : {
            'data-contents-url': {
                Type: String,
                required: true
            }
        },

        data: function() {
            return {
                dataContentsList:[],

                isDrag:false,
                startX:0,
                startY:0,
                distance:0,

                animationInterval:null,
                targetContentsX:0,
                currentContentsX:0,
            }
        },

        components:{
            "view-main": require('../view/main.vue'),
            "view-main-background": require('../view/mainBackground.vue')
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
                this.dataContentsList = $response.data.contentsData;
            },

            //event
            handleInteractionStart: function ($e) {
                this.isDrag = true;
                this.$emit('drag-control', true);
                this.startX = $e.x;
                this.startY = $e.y;
                this.distanceX = 0;
                this.distanceY = 0;
            },

            handleInteractionEnd: function () {
                this.isDrag = false;
                this.$emit('drag-control', false);
                this.setContentsSnapX();
            },

            handleInteractionMove: function ($e) {
                if (!this.isDrag) return;

//                if (this.distanceY > 1) {
//                    this.isDrag = false;
//                    this.setContentsSnapX();
//                    return;
//                }

                if (this.distanceX > 1) {
                    $e.e.preventDefault();              // this one is the key
                    $e.e.stopPropagation();
                }

                this.setContentsPosition($e.x, $e.y);
            },

            handleInteractionCancel: function () {
                this.isDrag = false;
                this.setContentsSnapX();
            },

            handleTimer: function () {
                this.currentContentsX = this.setEasingValue(this.targetContentsX, this.currentContentsX, 4);
            },

            handleResize: function () {
                this.setContentsSnapX();
                this.currentContentsX = this.targetContentsX;
            },

            setEasingValue: function($targetValue , $currentValue, $easingValue) {
                if (Math.abs($targetValue - $currentValue) > 1) {
                    return $currentValue + ($targetValue - $currentValue)/$easingValue;
                } else {
                    return $targetValue;
                }
            },

            setContentsPosition: function($x, $y) {
                this.distanceX = $x - this.startX;
                this.distanceY = $y - this.startY;

                this.startX = $x;
                this.startY = $y;

                let minX = 0;//this.windowWidth * 1/8;
                let maxX = (this.windowWidth * (this.dataContentsList.length-1))*-1; // + (this.windowWidth * 1/8)*-1;

                this.targetContentsX = this.currentContentsX + (this.distanceX * (50));

                if (this.targetContentsX > minX) {
                    this.targetContentsX = minX;
                }

                if (this.targetContentsX < maxX) {
                    this.targetContentsX = maxX;
                }
            },

            setContentsSnapX: function() {
                let indexX = Math.abs(Math.round((this.targetContentsX)/this.windowWidth));
                this.setContentsXByIndex(indexX);
            },

            setContentsXByIndex: function($index) {
                let tmpX = (this.windowWidth * -1) * $index;
                this.targetContentsX = tmpX;
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

            window.removeEventListener('resize', this. handleResize);
            this.$off('interactionStart', (e)=>this.handleInteractionStart(e));
            this.$off('interactionEnd', (e)=>this.handleInteractionEnd(e));
            this.$off('interactionMove', (e)=>this.handleInteractionMove(e));
            this.$off('interactionCancel', (e)=>this.handleInteractionCancel(e));
        },

        mounted() {
            this.animationInterval = setInterval(this.handleTimer, 1000/40);

            window.addEventListener('resize', this.handleResize);
            this.$on('interactionStart', (e)=>this.handleInteractionStart(e));
            this.$on('interactionEnd', (e)=>this.handleInteractionEnd(e));
            this.$on('interactionMove', (e)=>this.handleInteractionMove(e));
            this.$on('interactionCancel', (e)=>this.handleInteractionCancel(e));
        },


        created:function(){
            console.log("init root :" + this.dataContentsUrl);
            this.loadData();
        }
    }
</script>

<style scoped lang="scss">
    @import "~scssMixin";

    .animation-zoom-out {
        //@include css-transition-out(transform, 0.3, 0.2);
    }

    .animation-zoom-in {
        //@include css-transition-out(transform, 0.2, 0);
    }

    .zoom-out {
        //@include transform(scale(1.0));
    }


</style>