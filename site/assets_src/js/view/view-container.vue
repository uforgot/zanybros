/**
* -----------------------------------------------------
* Created by uforgot on 2017. 9. 26.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div>
    <div class="inner-container"
         :class="{'on-transition':(!isIE),
                   'crop-works':isWorksViewShow,
                   'crop-menu':isMenuViewShow,
           }"
         :style="{
            transform:computedTransform,
            'height' : innerH
        }"
    >
        <div class="prev-container"
             :class="dataPrevContents.class"
             :style="{
                width: frameWidth,
                top:fixY+'px'
            }">
            <div
                    :is="dataPrevContents.contents[0].component"
                    :json-data = "dataPrevContents.contents[0].data"
                    :data-index="prevIndex"
            >
            </div>
        </div>
        <div class="next-container"
             :class="dataNextContents.class"
             :style="{
                width: frameWidth,
                top:fixY+'px'
            }">
            <div
                    :is="dataNextContents.contents[0].component"
                    :json-data = "dataNextContents.contents[0].data"
                    :data-index="nextIndex"
            >
            </div>
        </div>
        <div :class="dataContents.class"
             :style="{
                 width: frameWidth
             }"
        >
            <div
                    v-for="item in dataContents.contents"
                    :is="item.component"
                    :key ="item.id"
                    :json-data = "item.data"
                    :data-index="currentIndex"
            >
            </div>
        </div>
        <view-footer></view-footer>
    </div>
        <transition :name="transitionPopup" mode="out-in">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>
    </div>
</template>

<style scoped lang="scss">
    @import "~scssMixin";
    .inner-container{
        &.crop-works{
            overflow: hidden;
            height:100vh;
        }
        &.crop-menu{
            overflow: hidden;
            height:100vh;
        }
    }
    .on-transition{
        transition: transform 0.3s ease-out 0s;
    }
    .view-works-view {
        transition: transform 0.3s ease-out 0s;
    }

    .popup-enter {
        transform: translate3d(0,100%,0);
    }

    .popup-leave-active {
        transform: translate3d(0,100%,0);
    }

    .none-enter{

    }
    .none-leave-active{

    }

</style>

<script>
    import {EventBus} from "../events/event-bus";
    import MixinEventCustom from '../mixin/mixin-event-custom.vue';
    import TWEEN from '../vendor/Tween';

    import ViewContentHolder from './view-content-holder.vue';
    import ViewContentMargin from './view-content-margin.vue';
    import ViewContentTitle from './view-content-title.vue';
    import ViewContentAnchor from './view-content-anchor.vue';

    import CompVideoFrame from '../component/comp-video-frame.vue';
    import ViewFooter from './view-footer.vue';

    import ViewMain from './view-main.vue';
    import ViewWorksHolder from './view-works-holder.vue';

    export default {
        mixins: [ MixinEventCustom ],
        components:{
            ViewContentHolder,
            ViewContentTitle,
            ViewContentMargin,
            ViewContentAnchor,
            ViewFooter,
            CompVideoFrame,

            ViewMain,
            ViewWorksHolder
        },

        props: {
            'current-index':Number
        },

        data: function() {
            return {
                nextIndex:Number,
                prevIndex:Number,

                titleArray:Array,
                dataPrevContents:Object,
                dataNextContents:Object,
                dataContents:Object,

                fixY:Number,

                transitionNextIndex:Number,

                isResize:false,
                isDrag:false,

                firstX:0,
                firstY:0,
                startX:0,
                startY:0,
                distance:0,

                isScrollLock:false,
                isSwipeLock:false,

                isTouchStart:false,
                isTouchMoved:false,
                touchMoveTime:0,

                currentContentsX:0,
                targetContentsX:0,

                transitionPopup:'popup',
                isIE : _isIE,
                isWorksViewShow : false,
                isMenuViewShow : false,
                innerMinH : 0,
                innerH : 'auto',
                windowW:window.windowWidth,
                setTimeoutID:0
            }
        },

        computed: {
            computedTransform : function() {
                return 'translate3d(' + this.currentContentsX  +'px,0px,0px )';
//                return this.targetContentsX  +'px';
            },
            frameWidth : function () {
                return this.windowW + 'px';
            }
        },

        methods : {
            //event
            handleInteractionStart: function ($e) {
                if(!this.isTouchStart){
                    if (this.$route.name==='works-view') return;

                    this.isDrag = true;
                    this.firstX = $e.x;
                    this.firstY = $e.y;
                    this.startX = $e.x;
                    this.startY = $e.y;
                    this.distanceX = 0;
                    this.distanceY = 0;

                    this.isScrollLock  = false;
                    this.isSwipeLock  = false;

                    this.isTouchStart = true;
                    //console.log('handleInteractionStart')
                }

            },

            handleInteractionEnd: function () {
                if(this.isTouchMoved && this.isTouchStart){
                    this.isDrag = false;
                    this.setContentsSnapX();

                    this.isTouchMoved = false;
                    this.isTouchStart = false;
                    //console.log('handleInteractionEnd')
                }

            },

            handleInteractionMove: function ($e) {
                if(this.isTouchStart){
                    if (!this.isDrag) return;

                    if (Math.abs(this.startY - $e.y) > 5 && !this.isScrollLock && !this.isSwipeLock) {
                        this.isSwipeLock = true;
                    }
                    if(Math.abs(this.startX - $e.x) > 5 && !this.isSwipeLock && !this.isScrollLock) {
                        this.isScrollLock = true;
                    }

                    if (this.isScrollLock) {
                        $e.e.preventDefault();
                    }

                    if (!this.isSwipeLock) {
                        this.setContentsPosition($e.x, $e.y, $e);
                    }

                    this.isTouchMoved = true;
                    //console.log('handleInteractionMove')
                }

            },

            handleInteractionCancel: function () {
                if(this.isTouchMoved && this.isTouchStart){
                    this.isDrag = false;
                    this.setContentsSnapX();

                    this.isTouchMoved = false;
                    this.isTouchStart = false;
                }

            },

            setContentsPosition: function($x, $y, $e) {
                this.distanceX = $x - this.startX;
                this.distanceY = $y - this.startY;

                this.startX = $x;
                this.startY = $y;

                let minX = window.windowWidth;
                let maxX = (window.windowWidth * 1)*-1; // + (window.windowWidth * 1/8)*-1;

                this.targetContentsX += (this.distanceX * (10));

                if (this.targetContentsX > minX) {
                    this.targetContentsX = minX;
                }

                if (this.targetContentsX < maxX) {
                    this.targetContentsX = maxX;
                }

                this.setTransitionNextIndex();
            },

            setTransitionNextIndex :function() {
                this.transitionNextIndex = Math.round((this.targetContentsX)/window.windowWidth);
            },

            setContentsSnapX: function() {
                let indexX = Math.round((this.targetContentsX)/window.windowWidth);
                this.setContentsXByIndex(indexX);
            },

            setContentsXByIndex: function($index) {
                this.transitionNextIndex = $index;
                this.targetContentsX = (window.windowWidth ) * ($index);
            },

            onResizeHandler :function($e) {
                this.isResize = true;
                this.setContentsSnapX();
                this.onScrollHandler();
                this.windowW = window.windowWidth;
                if(this.isWorksViewShow) {
                    var w = window.windowWidth*0.8 > 1000 ? 1000 : window.windowWidth*0.8;
                    var h = w*9/16+280 > window.windowHeight ? w*9/16+280 : window.windowHeight;
                    this.innerH = Math.floor(h)+'px';
                }else{
                    this.innerH = 'auto';
                }

            },
            onWorkViewShow:function(){
                var owner = this;
                this.setTimeoutID = setTimeout(function(){
                    owner.isWorksViewShow = true;
                    var w = window.windowWidth*0.8 > 1000 ? 1000 : window.windowWidth*0.8;
                    var h = w*9/16+280 > window.windowHeight ? w*9/16+280 : window.windowHeight;
                    owner.innerH = Math.floor(h)+'px';

                    EventBus.$emit(EventBus.WORK_VIEW_SHOW_DONE);
                    },400);

            },
            onWorkViewHide:function(){
                clearTimeout(this.setTimeoutID);
                this.isWorksViewShow = false;
                this.innerH = 'auto';

            },
            onScrollHandler : function($e) {
                let scrollTop = window.pageYOffset;
                this.fixY = scrollTop;

            },
            onMenuShowHandler:function(){
                this.isMenuViewShow = true;
            },
            onMenuHideHandler:function(){
                this.isMenuViewShow = false;
            }
        },
        watch : {
            targetContentsX : function($newValue, $oldValue){
                function animate() {
                    if (TWEEN.update()) {
                        requestAnimationFrame(animate);
                    }
                }
                new TWEEN.Tween({ tweeningNumber : $oldValue })
                    .to({ tweeningNumber : $newValue }, this.touchMoveTime)
                    .onUpdate(($e) =>
                        {
                            this.currentContentsX = $e.tweeningNumber;//Number($e.tweeningNumber.toFixed(2));
                            window.currentContentsX = this.currentContentsX;
                            this.isResize = false;
                        }
                    ).onComplete(($e)=>{
                        if (this.transitionNextIndex === 0) return;
                        if (this.currentContentsX !== this.transitionNextIndex * (window.windowWidth)) return;

                        let nextRouteName;
                        if (this.transitionNextIndex < 0) {
                            nextRouteName = this.getRouterNameByIndex(this.nextIndex);
                        } else {
                            nextRouteName = this.getRouterNameByIndex(this.prevIndex);
                        }
                        window.noTransition = true;
                        this.$router.push({name:nextRouteName});
                        this.currentContentsX = 0;
                        // console.log(nextRouteName + '->ok');
                    })
                    .start();


                animate();
            },
            '$route'(to, from) {

                if(to.name == 'works-view') {
                    EventBus.$emit(EventBus.WORK_VIEW_SHOW);
                } else {
                    EventBus.$emit(EventBus.WORK_VIEW_HIDE);
                }
            }
        },

        //life cycle
        //beforeCreate : function() {},
        created:function(){
            this.prevIndex = this.getPrevIndex(this.currentIndex);
            this.nextIndex = this.getNextIndex(this.currentIndex);
            this.dataPrevContents = window.ZanyBrosData.data.contentsData[this.prevIndex];
            this.dataNextContents = window.ZanyBrosData.data.contentsData[this.nextIndex];
            this.dataContents = window.ZanyBrosData.data.contentsData[this.currentIndex];

            this.touchMoveTime = _isIE ? 0 : 200;
        },
        //beforeMount : function() {},
        mounted : function() {
            if (this.$route.name == 'works-view') {
                this.isWorksViewShow = true;
                EventBus.$emit(EventBus.WORK_VIEW_SHOW);
            }
            this.$on(this.CUSTOM_EVENT.INTERACTION_START, (e)=>this.handleInteractionStart(e));
            this.$on(this.CUSTOM_EVENT.INTERACTION_END, (e)=>this.handleInteractionEnd(e));
            this.$on(this.CUSTOM_EVENT.INTERACTION_MOVE, (e)=>this.handleInteractionMove(e));
            this.$on(this.CUSTOM_EVENT.INTERACTION_CANCEL, (e)=>this.handleInteractionCancel(e));

            EventBus.$on(EventBus.WINDOW_RESIZE, this.onResizeHandler);
            EventBus.$on(EventBus.SCROLL_MOVE, this.onScrollHandler);

            EventBus.$on(EventBus.MENU_SHOW, this.onMenuShowHandler);
            EventBus.$on(EventBus.MENU_HIDE, this.onMenuHideHandler);

            EventBus.$on(EventBus.WORK_VIEW_SHOW, this.onWorkViewShow);
            EventBus.$on(EventBus.WORK_VIEW_HIDE, this.onWorkViewHide);

            this.onResizeHandler();

            //window.scrollTo(0,0);
        },
        //beforeUpdate : function() {},
        //updated : function() {},
        //activated : function() {},
        //deactivated : function() {},
        beforeDestroy : function () {
            this.$off(this.CUSTOM_EVENT.INTERACTION_START, (e)=>this.handleInteractionStart(e));
            this.$off(this.CUSTOM_EVENT.INTERACTION_END, (e)=>this.handleInteractionEnd(e));
            this.$off(this.CUSTOM_EVENT.INTERACTION_MOVE, (e)=>this.handleInteractionMove(e));
            this.$off(this.CUSTOM_EVENT.INTERACTION_CANCEL, (e)=>this.handleInteractionCancel(e));

            EventBus.$off(EventBus.WINDOW_RESIZE, this.onResizeHandler);
            EventBus.$off(EventBus.SCROLL_MOVE, this.onScrollHandler);

            EventBus.$off(EventBus.MENU_SHOW, this.onMenuShowHandler);
            EventBus.$off(EventBus.MENU_HIDE, this.onMenuHideHandler);

            EventBus.$off(EventBus.WORK_VIEW_SHOW, this.onWorkViewShow);
            EventBus.$off(EventBus.WORK_VIEW_HIDE, this.onWorkViewHide);
        },
        //destroyed : function() {},
        dummy : {}
    }
</script>