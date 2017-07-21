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
            <view-main :data-index="0" :data-left="currentContentsLeft" :data="mainData"></view-main>
            <view-main :data-index="1" :data-left="currentContentsLeft" :data="aboutData"></view-main>
            <view-main :data-index="2" :data-left="currentContentsLeft" :data="portfolioData"></view-main>
            <view-main :data-index="3" :data-left="currentContentsLeft" :data="contactData"></view-main>

        </div>
</template>

<script>
    let mixinResize = require('../mixin/resize.vue');

    export default {
        mixins: [mixinResize],

        data: function() {
            return {
                isDrag:0,
                startLeft:0,
                defaultLeft:0,
                distance:0,

                animationInterval:null,
                targetContentsLeft:0,
                currentContentsLeft:0,

                mainData : [
                    {
                        dataImg : 'assets/images/main/main.jpg',
                        dataWidth : '100%',
                        dataHeight : '100%'
                    },
                    {
                        dataImg : 'assets/images/main/main.jpg',
                        dataWidth : '100%',
                        dataHeight : '100%'
                    },
                ],
                aboutData : [
                    {
                        dataImg : 'assets/images/main/about_1.jpg',
                        dataWidth : '100%',
                        dataHeight : '100%'
                    },
                    {
                        dataImg : 'assets/images/main/about_2.jpg',
                        dataWidth : '100%',
                        dataHeight : '100%'
                    },
                    {
                        dataImg : 'assets/images/main/about_3.jpg',
                        dataWidth : '100%',
                        dataHeight : '100%'
                    },
                    {
                        dataImg : 'assets/images/main/about_4.jpg',
                        dataWidth : '100%',
                        dataHeight : '100%'
                    },
                ],
                portfolioData : [
                    {
                        dataImg : 'assets/images/main/portfolio.jpg',
                        dataWidth : '100%',
                        dataHeight : '100%'
                    },
                    {
                        dataImg : 'assets/images/main/portfolio_1.jpg',
                        dataWidth : '25%',
                        dataHeight : 'auto'
                    },
                    {
                        dataImg : 'assets/images/main/portfolio_2.jpg',
                        dataWidth : '25%',
                        dataHeight : 'auto'
                    },
                    {
                        dataImg : 'assets/images/main/portfolio_3.jpg',
                        dataWidth : '25%',
                        dataHeight : 'auto'
                    },
                    {
                        dataImg : 'assets/images/main/portfolio_4.jpg',
                        dataWidth : '25%',
                        dataHeight : 'auto'
                    },
                    {
                        dataImg : 'assets/images/main/portfolio_5.jpg',
                        dataWidth : '25%',
                        dataHeight : 'auto'
                    },
                    {
                        dataImg : 'assets/images/main/portfolio_6.jpg',
                        dataWidth : '25%',
                        dataHeight : 'auto'
                    },
                    {
                        dataImg : 'assets/images/main/portfolio_7.jpg',
                        dataWidth : '25%',
                        dataHeight : 'auto'
                    },
                    {
                        dataImg : 'assets/images/main/portfolio_8.jpg',
                        dataWidth : '25%',
                        dataHeight : 'auto'
                    },
                    {
                        dataImg : 'assets/images/main/portfolio_9.jpg',
                        dataWidth : '25%',
                        dataHeight : 'auto'
                    },
                    {
                        dataImg : 'assets/images/main/portfolio_10.jpg',
                        dataWidth : '25%',
                        dataHeight : 'auto'
                    },
                    {
                        dataImg : 'assets/images/main/portfolio_11.jpg',
                        dataWidth : '25%',
                        dataHeight : 'auto'
                    },
                    {
                        dataImg : 'assets/images/main/portfolio_12.jpg',
                        dataWidth : '25%',
                        dataHeight : 'auto'
                    },
                    {
                        dataImg : 'assets/images/main/portfolio_13.jpg',
                        dataWidth : '25%',
                        dataHeight : 'auto'
                    },
                    {
                        dataImg : 'assets/images/main/portfolio_14.jpg',
                        dataWidth : '25%',
                        dataHeight : 'auto'
                    },
                    {
                        dataImg : 'assets/images/main/portfolio_15.jpg',
                        dataWidth : '25%',
                        dataHeight : 'auto'
                    },
                    {
                        dataImg : 'assets/images/main/portfolio_16.jpg',
                        dataWidth : '25%',
                        dataHeight : 'auto'
                    },
                    {
                        dataImg : 'assets/images/main/portfolio_17.jpg',
                        dataWidth : '25%',
                        dataHeight : 'auto'
                    },
                    {
                        dataImg : 'assets/images/main/portfolio_18.jpg',
                        dataWidth : '25%',
                        dataHeight : 'auto'
                    },
                    {
                        dataImg : 'assets/images/main/portfolio_19.jpg',
                        dataWidth : '25%',
                        dataHeight : 'auto'
                    },
                    {
                        dataImg : 'assets/images/main/portfolio_20.jpg',
                        dataWidth : '25%',
                        dataHeight : 'auto'
                    },
                    {
                        dataImg : 'assets/images/main/portfolio_21.jpg',
                        dataWidth : '25%',
                        dataHeight : 'auto'
                    },
                    {
                        dataImg : 'assets/images/main/portfolio_22.jpg',
                        dataWidth : '25%',
                        dataHeight : 'auto'
                    },
                    {
                        dataImg : 'assets/images/main/portfolio_23.jpg',
                        dataWidth : '25%',
                        dataHeight : 'auto'
                    },
                    {
                        dataImg : 'assets/images/main/portfolio_24.jpg',
                        dataWidth : '25%',
                        dataHeight : 'auto'
                    },

                ],
                contactData : [
                    {
                        dataImg : 'assets/images/main/contact_1.jpg',
                        dataWidth : '100%',
                        dataHeight : '100%'
                    }
                ]
            }
        },

        components:{
            "view-main": require('../view/main.vue')
        },

        methods: {
            handleMouseDown: function ($e) {
                this.isDrag = true;
                this.startX = $e.pageX;
                this.defaultX = 0;
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
    }
</script>

<style scoped lang="scss">
    @import "~scssMixin";


</style>