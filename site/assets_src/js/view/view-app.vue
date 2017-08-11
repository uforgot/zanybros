/**
* Created by uforgot on 2017. 7. 18..
*/


<template>
    <div id="app">
        <view-background :data-folding="isFolding"></view-background>
        <view-flick-container  :data-folding="isFolding" :data-contents-list="dataContentsList" :data-current-menu-index="currentMenuIndex"></view-flick-container>
        <view-frame :data-folding="isFolding" :data-contents-list="dataContentsList" :data-current-menu-index="currentMenuIndex"></view-frame>
    </div>
</template>


<script>
    import { EventBus } from '../events/event-bus.js';
    import ViewBackground from './view-background';
    import ViewFlickContainer from './view-flick-container.vue';
    import ViewFrame from './view-frame.vue';

    export default {
        data: function() {
            return {
                dataContents:Object,
                currentMenuIndex:1,
                isFolding:false
            }
        },

        components:{
            "view-background" : ViewBackground,
            "view-flick-container" : ViewFlickContainer,
            "view-frame" : ViewFrame
        },

        methods : {
            setMenuHandler:function($index) {
                // 메뉴 포커스 제어
//                console.log('setMenu--> ' + $index);
                switch ($index) {
                    case 1:
                        window.location.href = '#about';
                        break;
                    case 2:
                        window.location.href = '#works';
                        break;
                    case 3:
                        window.location.href = '#contact';
                        break;
                }

                this.currentMenuIndex = $index;
            },

            setFoldingHandler:function ($e) {
                // 축소 뷰 제어
                this.isFolding = $e;
            }


        },

        beforeDestroy: function () {
            EventBus.$off(EventBus.MENU_CLICK_EVENT, this.setMenuHandler);
            EventBus.$off(EventBus.CONTENTS_FOLDING_EVENT, this.setFoldingHandler);
        },

        mounted : function() {
            EventBus.$on(EventBus.MENU_CLICK_EVENT, this.setMenuHandler);
            EventBus.$on(EventBus.CONTENTS_FOLDING_EVENT, this.setFoldingHandler);
        },

        created:function(){
            this.dataContentsList = Window.ZanyBrosData.data.contentsData;
        }
    }
</script>

