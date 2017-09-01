/**
* -----------------------------------------------------
* Created by uforgot on 2017. 9. 1.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div class="comp-video-frame"
         :style="{
             width: frameWidth + 'px',
             height: frameHeight + 'px'
         }
    ">
        <div class="container"
             :style="{
                         'margin-left':videoFrameMarginLeft,
                         'margin-top': videoFrameMarginTop
                    }"
        >
            <video  autoplay loop
                    :width="videoFrameWidth"
                    :height="videoFrameHeight"
            ></video>
            <!--:src="videoUrl"-->
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import "~scssMixin";

    .comp-video-frame {
        display:block;
        overflow:hidden;
        position:absolute;
        left:0;
        top:0;

        .container {
            position:absolute;
            display: block;
            left:50%;
            top:50%;
        }
    }
</style>

<script>
    import mixinResizeEvent from '../mixin/mixin-control-resize.vue';

    export default {
        mixins: [mixinResizeEvent],
        components:{},

        props : {
            'video-url': {
                Type : String,
                Required : true
            },
            'video-width': {
                Type : Number
            },
            'video-height': {
                Type : Number
            }
        },
        data: function() {
            return {
                videoFrameWidth:0,
                videoFrameHeight:0
            };
        },

        computed:{
            frameWidth : function () {
                return this.windowWidth;
            },

            frameHeight : function () {
                return this.windowHeight;
            },

            videoFrameMarginLeft: function () {
                return (this.videoFrameWidth/2) * -1 + 'px';
            },

            videoFrameMarginTop: function () {
                return (this.videoFrameHeight/2) * -1 + 'px';
            }
        },

        methods:{
            handleWindowResize: function() {
                let size = this.getSizeByFrameSize(
                    {width:this.videoWidth, height:this.videoHeight},
                    {width:this.frameWidth, height:this.frameHeight},
                );

                this.videoFrameWidth = size.width;
                this.videoFrameHeight = size.height;
            }
        },

        watch : {},

        //life cycle
        //beforeCreate : function() {},
        //created : function() {},
        //beforeMount : function() {},
        mounted() {
            this.handleWindowResize();
            window.addEventListener('resize', this.handleWindowResize);
        },
        //beforeUpdate : function() {},
        //updated : function() {},
        //activated : function() {},
        //deactivated : function() {},
        beforeDestroy: function () {
            window.removeEventListener('resize', this.handleWindowResize);
        },
        //destroyed : function() {}
        dummy : {}
    }
</script>
