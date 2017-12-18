/**
* -----------------------------------------------------
* Created by uforgot on 2017. 9. 1.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div class="content-works-item" v-show="isShow"
         @mouseover= "onMouseOverHandler"
         @mouseout= "onMouseOutHandler"
         @click="onClickHandler"
    >
        <div class="img-frame"
             :class="{'focus':dataFocus}"
             :style="{
                        width: '100%',
                        height: '100%',
                        'background-image': 'url(' + jsonData.imageUrl + ')'
                    }"
        >
        </div>
        <div class="txt-frame"
             :class="{'focus':dataFocus}"
        >
            <!--<h4 v-html="jsonData.title"></h4>-->
            <!--<small v-html="jsonData.comment"></small>-->
            <h4 v-html="computedTitle"></h4>
        </div>
        <div class="button-frame"
             :class="{'focus':dataFocus}"
        ></div>
    </div>
</template>

<style scoped lang="scss">
    @import "~scssMixin";

    .content-works-item {
        overflow:hidden;
    }

    .button-frame {
        @include css-value-transition('border 0.2s ease-out 0s');
        cursor:pointer;

        position:absolute;
        left:0;
        top:0;
        width:100%;
        height:100%;


        &.focus {
            border:10px solid #fff;
        }
    }

    .img-frame {
        //@include css-value-transition('opacity 0.2s ease-out 0s, transform 0.2s ease-out 0s, filter 0.2s ease-out 0s');

        filter:grayscale(100%) blur(0px);
        opacity:0.5;

        &.focus {
            filter:grayscale(0%) blur(10px);
            transform: scale(1.2);
            opacity:1;
        }
    }

    .txt-frame {
        @include css-value-transition('opacity 0.3s ease-out 0s');

        opacity:0;
        /*transform:translateY(110%);*/
        &.focus {
            /*transform:translateY(0%);*/
            opacity:1;
        }
    }
</style>

<script>
    import {EventBus} from "../events/event-bus";
    import MixinContent from '../mixin/mixin-content.vue'

    export default {
        mixins:[MixinContent],
        components:{},

        props: {
            'data-focus':{},
            width: {
                required: true,
                validator: (val) => val >= 0
            },
            height: {
                required: true,
                validator: (val) => val >= 0
            },
            order: {
                default: 0
            },
            moveClass: {
                default: ''
            }
        },
        data: () => ({
            isShow: true
        }),

        computed : {
            computedTitle : function() {
                return this.jsonData.title.split(':').join('<hr>');
            }

        },
        methods : {
            onMouseOverHandler : function($e) {
                if(_isDeskTop)this.$emit('workItemOver', this.order);
            },
            onMouseOutHandler : function($e) {
                this.$emit('workItemOver', -1);
            },
            onClickHandler : function($e) {
                //EventBus.$emit(EventBus.WORK_ITEM_CLICK, this.jsonData);
                this.$router.push(
                    {name:'works-view',params:{id:this.jsonData.index}}
                );
            },

            notify () {
                this.$parent.$emit('reflow', this)
            },
            getMeta () {
                return {
                    vm: this,
                    node: this.$el,
                    order: this.order,
                    width: this.width,
                    height: this.height,
                    moveClass: this.moveClass
                }
            }
        },
        watch : {},

        //life cycle
        //beforeCreate : function() {},
        created () {
            this.rect = {
                top: 0,
                left: 0,
                width: 0,
                height: 0
            };
            this.$watch(() => (
                this.width,
                    this.height
            ), this.notify);

        },
        //beforeMount : function() {},
        mounted () {
            this.$parent.$once('reflowed', () => {
                this.isShow = true
            })
            this.notify();
        },
        //beforeUpdate : function() {},
        //updated : function() {},
        //activated : function() {},
        //deactivated : function() {},
        //beforeDestroy : function () {},
        destroyed () {
            this.notify();
        },
        dummy : {}
    }

</script>
