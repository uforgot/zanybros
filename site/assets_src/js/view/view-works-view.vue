/**
* -----------------------------------------------------
* Created by uforgot on 2017. 9. 24.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div class="view-works-view">
        <div class="container"
             :class="[{'show':isReady}]"
        >
            <youtube
                    @ready="setYoutubeReady"
                    :player-vars="{
                         autoplay: 0,
                         loop: 0,
                         controls: 1,
                         rel: 0,
                         fs:0,
                         modestbranding:0,
                         showinfo:0
                     }"
            ></youtube>
            <div class="title">
                <h3 v-html="viewData.title"></h3>
            </div>
            <div class="comment">
                <small v-html="viewData.comment"></small>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import "~scssMixin";

    small {
        left:50%;
        width:50%;
        text-align:right;
    }

    .container {
        &.show {
            display:block;
        }
    }
</style>

<script>
    import {EventBus} from "../events/event-bus";
    import MixinResizeEvent from '../mixin/mixin-control-resize.vue';
    import MixinContent from '../mixin/mixin-content.vue';

    export default {
        mixins: [MixinContent, MixinResizeEvent],
        components:{},

        props: {
            'id':Object
        },
        data: function() {
            return {
                viewData:Object,
                isReady:false,
                player:null
            };
        },

        computed : {
            videoWidth : function () {
                return this.getPixelValueByPercentValue(this.getPercentValue('80%'), this.windowWidth);
            },

            videoHeight : function () {
                return (this.videoWidth /16) * 9;
            }
        },
        methods : {
            setYoutubeReady : function($player) {
                this.player = $player;
                this.isReady = true;
                this.handleWindowResize();
                this.player.loadVideoById(this.viewData.videoId);
            },
            handleWindowResize: function() {
                if (this.player !== null) {
                    this.player.setSize(this.videoWidth, this.videoHeight);
                }
            },
        },
        watch : {},

        //life cycle
        //beforeCreate : function() {},
        //created = {},
        //beforeMount : function() {},
        mounted : function() {
            window.addEventListener('resize', this.handleWindowResize);
        },
        //beforeUpdate : function() {},
        //updated : function() {},
        activated : function() {
            this.handleWindowResize();

            this.viewData = this.getWorksDataByIndex(this.$route.params.id);

        },
        //deactivated : function() {},
        beforeDestroy : function () {
            window.removeEventListener('resize', this.handleWindowResize);
        },
        //destroyed : function() {},
        dummy : {}
    }
</script>
