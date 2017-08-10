/**
* Created by uforgot on 2017. 7. 18..
*/

<template>
    <div class="content-container"
         :class="{ 'root-zoom-out' : dataFolding, 'root-animation-zoom-in' : dataFolding, 'root-animation-zoom-out' : !dataFolding}"
         :style="{
             width: frameWidth,
             height: frameHeight
         }"
    >
        <view-flick-contents
                v-for="item, key in dataContentsList"
                :key ="key++"

                :data-index="key-1"
                :data-left="currentContentsX"
                :data="item"
                :data-folding="dataFolding"
        >
        </view-flick-contents>
    </div>
</template>

<script>
    import {EventBus} from '../events/event-bus.js';
    import MixinControlResize from '../mixin/mixin-control-resize.vue';
    import MixinEventCustom from '../mixin/mixin-event-custom.vue';

    import ViewFlickContents from './view-flick-contents.vue';

    export default {
        mixins: [ MixinControlResize, MixinEventCustom ],

        props : {
            'data-contents-list' : {
                type:Array,
                required: true
            },
            'data-folding': {
                Type: Boolean,
                required: true
            },
            'data-current-menu-index' : {
                Type: Number,
                required:true
            }
        },

        data: function() {
            return {
                startX:0,
                startY:0,
                distance:0,

                animationInterval:null,
                targetContentsX:0,
                currentContentsX:0,
            }
        },

        components:{
            "view-flick-contents": ViewFlickContents,
        },

        methods: {

            //event
            handleInteractionStart: function ($e) {
                if (window.scrollY>0) { return;}

                EventBus.$emit(EventBus.CONTENTS_FOLDING_EVENT, true);
                this.startX = $e.x;
                this.startY = $e.y;
                this.distanceX = 0;
                this.distanceY = 0;
            },

            handleInteractionEnd: function () {
                EventBus.$emit(EventBus.CONTENTS_FOLDING_EVENT, false);
                this.setContentsSnapX();
            },

            handleInteractionMove: function ($e) {
                if (!this.dataFolding) return;

                this.setContentsPosition($e.x, $e.y);
            },

            handleInteractionCancel: function () {
                EventBus.$emit(EventBus.CONTENTS_FOLDING_EVENT, false);
                this.setContentsSnapX();
            },

            handleTimer: function () {
                if (!this.dataFolding) {
                    this.targetContentsX = (this.windowWidth * -1) * (this.dataCurrentMenuIndex - 1);
                }
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
                EventBus.$emit(EventBus.MENU_CLICK_EVENT, indexX+1);
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
            }
        },

        beforeDestroy: function () {
            clearInterval(this.animationInterval);

            window.removeEventListener('resize', (e)=>this.handleResize);
            this.$off(this.CUSTOM_EVENT.INTERACTION_START, (e)=>this.handleInteractionStart(e));
            this.$off(this.CUSTOM_EVENT.INTERACTION_END, (e)=>this.handleInteractionEnd(e));
            this.$off(this.CUSTOM_EVENT.INTERACTION_MOVE, (e)=>this.handleInteractionMove(e));
            this.$off(this.CUSTOM_EVENT.INTERACTION_CANCEL, (e)=>this.handleInteractionCancel(e));
        },

        mounted() {
            this.animationInterval = setInterval(this.handleTimer, 1000/40);

            window.addEventListener('resize', (e)=>this.handleResize);
            this.$on(this.CUSTOM_EVENT.INTERACTION_START, (e)=>this.handleInteractionStart(e));
            this.$on(this.CUSTOM_EVENT.INTERACTION_END, (e)=>this.handleInteractionEnd(e));
            this.$on(this.CUSTOM_EVENT.INTERACTION_MOVE, (e)=>this.handleInteractionMove(e));
            this.$on(this.CUSTOM_EVENT.INTERACTION_CANCEL, (e)=>this.handleInteractionCancel(e));
        },


        created:function(){

        }
    }
</script>

<style scoped lang="scss">
    @import "~scssMixin";

    .root-animation-zoom-out {
        @include css-transition-out(transform, 0.3, 0);
    }

    .root-animation-zoom-in {
        @include css-transition-out(transform, 0.2, 0);
    }

    .root-zoom-out {
        @include transform(scale(0.8));
    }


</style>