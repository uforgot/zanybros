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
    import TWEEN from '../vendor/Tween';

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
                isResize:false,

                startX:0,
                startY:0,
                distance:0,

                currentContentsX:0,
                targetContentsX:0
            }
        },

        components:{
            ViewFlickContents,
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

            handleResize: function () {
                this.isResize = true;
                this.setContentsSnapX();
            },

            setContentsPosition: function($x, $y) {
                this.distanceX = $x - this.startX;
                this.distanceY = $y - this.startY;

                this.startX = $x;
                this.startY = $y;

                let minX = 0;//this.windowWidth * 1/8;
                let maxX = (this.windowWidth * (this.dataContentsList.length-1))*-1; // + (this.windowWidth * 1/8)*-1;

                this.targetContentsX += (this.distanceX * (4));

                if (this.targetContentsX > minX) {
                    this.targetContentsX = minX;
                }

                if (this.targetContentsX < maxX) {
                    this.targetContentsX = maxX;
                }
            },

            setContentsSnapX: function() {
                let indexX = Math.abs(Math.round((this.targetContentsX)/this.windowWidth)) + 1;
                EventBus.$emit(EventBus.MENU_CLICK_EVENT, indexX);
                this.setContentsXByIndex(indexX);
            },

            setContentsXByIndex: function($index) {
                this.targetContentsX = (this.windowWidth * -1) * ($index - 1);
            }

        },

        watch : {
            targetContentsX : function($newValue, $oldValue){
                function animate() {
                    if(TWEEN.update()) {
                        requestAnimationFrame(animate);
                    }
                }

                new TWEEN.Tween({ tweeningNumber : $oldValue })
                    .to({ tweeningNumber : $newValue }, (this.isFolding || this.isResize) ?0:200)
                    .onUpdate(($e) =>
                        {
                            this.currentContentsX = Number($e.tweeningNumber.toFixed(2));
                            this.isResize = false;
                        }
                    )
                    .start();


                animate();
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
            EventBus.$off(EventBus.MENU_CLICK_EVENT, this.setContentsXByIndex);

            window.removeEventListener('resize', this.handleResize);
            this.$off(this.CUSTOM_EVENT.INTERACTION_START, (e)=>this.handleInteractionStart(e));
            this.$off(this.CUSTOM_EVENT.INTERACTION_END, (e)=>this.handleInteractionEnd(e));
            this.$off(this.CUSTOM_EVENT.INTERACTION_MOVE, (e)=>this.handleInteractionMove(e));
            this.$off(this.CUSTOM_EVENT.INTERACTION_CANCEL, (e)=>this.handleInteractionCancel(e));
        },

        mounted() {
            EventBus.$on(EventBus.MENU_CLICK_EVENT, this.setContentsXByIndex);

            window.addEventListener('resize', this.handleResize);
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
        @include css-value-transition('
            transform 0.2s ease-out
        ');
    }

    .root-animation-zoom-in {
        @include css-value-transition('
            transform 0.2s ease-out
        ');
    }

    .root-zoom-out {
        //@include transform(scale(0.8));
    }


</style>