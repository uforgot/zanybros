/**
* -----------------------------------------------------
* Created by uforgot on 2017. 9. 1.
* zanybros
* -----------------------------------------------------
*/

<template>
    <!-- 페이지 본문 컨텐츠 영역 -->
    <div class="view-works-holder"
         :style="{
             'background-color': backgroundColor,
             width: frameWidth + 'px',
             height: frameHeight + 'px'
        }"
    >
        <content-works-list
                :line-gap="400"
                :align="align"
                :min-line-gap="100"
                :max-line-gap="100"
                :single-max-width="400"
                :watch="content"
        >
            <content-works-item
                    v-for="(item, index) in content"
                    :width="item.width"
                    :height="item.height"
                    :order="index"
                    :key="item.id"
                    :data-focus="item.focus"

                    :json-data="item"
                    @workItemOver="onWorkItemOverHandler"
            >
            </content-works-item>
        </content-works-list>
    </div>
</template>

<style scoped lang="scss">
    @import "~scssMixin";
</style>

<script>
    import ContentWorksItem from '../content/content-works-item.vue';
    import ContentWorksList from '../content/content-works-list.vue';
    import MixinResizeEvent from '../mixin/mixin-control-resize.vue';

    export default {
        mixins: [MixinResizeEvent],
        components:{
            ContentWorksList,
            ContentWorksItem
        },

        props : {
            'json-data': {
                Type : Object
            }
        },
        data: function() {
            return {
                align:"center",
                content:Object
            };
        },

        computed:{
            contentWidth : function() {
                if (this.isPercentValue(this.jsonData.contentWidth)) {
                    return this.getPixelValueByPercentValue(this.getPercentValue(this.jsonData.contentWidth), this.frameWidth);
                }
                return (this.jsonData.contentWidth > this.frameWidth)?this.frameWidth:this.jsonData.contentWidth;
            },

            contentHeight : function() {
                if (this.isPercentValue(this.jsonData.contentHeight)) {
                    return this.getPixelValueByPercentValue(this.getPercentValue(this.jsonData.contentHeight), this.frameHeight);
                }
                return (this.jsonData.contentHeight > this.frameHeight)?this.jsonData.contentHeight:this.frameHeight;
            },

            frameWidth : function () {
                if (this.isPercentValue(this.jsonData.width)) {
                    return this.getPixelValueByPercentValue(this.getPercentValue(this.jsonData.width), this.windowWidth);
                }
                return this.jsonData.width;
            },

            frameHeight : function () {
                if (this.jsonData.height === 'auto') {
                    return this.frameWidth();
                }
                if (this.isPercentValue(this.jsonData.height)) {
                    return this.getPixelValueByPercentValue(this.getPercentValue(this.jsonData.height), this.windowHeight);
                }
                return this.jsonData.height;
            },

            backgroundColor : function() {
                return (this.jsonData.backgroundColor)?this.jsonData.backgroundColor:"#000";
            }
        },

        methods:{
            onWorkItemOverHandler : function($e) {
                let i;
                for (i=0;i< this.content.length;i++) {
                    if (i===$e) {
                        this.content[i].focus = true;
                    } else {
                        this.content[i].focus = false;
                    }
                }
            }
        },

        watch : {},

        //life cycle
        //beforeCreate : function() {},
        created:function(){
            this.content = [];

            let i=0;

            for (i=0;i<this.jsonData.content.length;i++) {
                this.jsonData.content[i].width =  this.jsonData.content[i].width/2;
                this.jsonData.content[i].height =  this.jsonData.content[i].height/2;
                this.jsonData.content[i].focus = false;
            }

            for (let j=0;j<this.jsonData.content.length;j++) {
                this.content.push(
                    {
                        title : this.jsonData.content[j].title,
                        comment : this.jsonData.content[j].comment,
                        width : this.jsonData.content[j].width,
                        height : this.jsonData.content[j].height,
                        focus : this.jsonData.content[j].focus,
                        imageUrl : this.jsonData.content[j].imageUrl,
                        videoId : this.jsonData.content[j].videoId
                    }
                );
            }


//            this.content.sort(function () {
//                return Math.random() - 0.5
//            })
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