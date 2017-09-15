/**
* -----------------------------------------------------
* Created by uforgot on 2017. 8. 30.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div class="view-background">
        <comp-youtube-frame
                :video-id="dataVideo.videoId"
                :video-width="dataVideo.videoWidth"
                :video-height="dataVideo.videoHeight"
        ></comp-youtube-frame>
    </div>
</template>

<style scoped lang="scss">
    @import "~scssMixin";
</style>

<script>
    import CompYoutubeFrame from '../component/comp-youtube-frame.vue';

    export default {
        mixins : [],
        components: {
            CompYoutubeFrame
        },

        props: {},
        data: function () {
            return {}
        },

        computed : {},
        methods : {
            onScrollHandler : function($e) {
                let scrollTop = window.pageYOffset + this.windowHeight;
                let i;
                let elObject;
                let animationOffset;
                let animationOffsetValue;

                for (i=0; i< this.elArray.length; i++) {
                    elObject = this.elArray[i];

                    animationOffsetValue = 0;
                    animationOffset = elObject.el.getAttribute('animation-offset');

                    if (animationOffset !== null) {
                        animationOffsetValue = this.windowHeight * (Number(animationOffset)/100);
                    }

                    if (scrollTop > (elObject.offset.top - animationOffsetValue)) {
                        this.setElementAddClass(elObject.el, 'show');
                    } else {
                        this.setElementRemoveClass(elObject.el, 'show');
                    }
                }
            }
        },
        watch : {},

        //life cycle
        //beforeCreate : function() {},
        created: function () {
            this.dataVideo = Window.ZanyBrosData.data.mainData.video[0];
        },
        //beforeMount : function() {},
        //mounted : function() {},
        //beforeUpdate : function() {},
        //updated : function() {},
        //activated : function() {},
        //deactivated : function() {},
        //beforeDestroy : function () {},
        //destroyed : function() {},
        dummy : {}
    }
</script>
