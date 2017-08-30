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


<script>
    import CompYoutubeFrame from '../component/comp-youtube-frame.vue';

    export default {
        props: {},

        data: function () {
            return {}
        },

        components: {
            CompYoutubeFrame
        },

        methods: {},

        beforeDestroy: function () {

        },

        mounted: function () {

        },

        created: function () {
            this.dataVideo = Window.ZanyBrosData.data.mainData.video[0];
        }
    }
</script>

