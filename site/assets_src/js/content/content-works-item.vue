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
            <h4>SHINHWA TOUCH M/V PRODUCE</h4>
            <small>Client : Liveworks company
                Director : Hong Wonki
                Director of Photography: Kim Joonhong
                Production Design : Jeon Eunyoung
                Post production : ASTRO digital.LAB</small>
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
        @include css-value-transition('opacity 0.2s ease-out 0s, transform 0.2s ease-out 0s, filter 0.2s ease-out 0s');

        filter:grayscale(100%);
        opacity:0.5;

        &.focus {
            filter:grayscale(0%);
            transform: scale(1.2);
            opacity:1;
        }
    }

    .txt-frame {
        @include css-value-transition('opacity 0.3s ease-out 0s, transform 0.3s ease-out 0s, filter 0.3s ease-out 0s');

        transform:translateY(100%);
        &.focus {
            transform:translateY(0%);
        }
    }
</style>

<script>
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
            isShow: false
        }),

        computed : {},
        methods : {
            onMouseOverHandler : function($e) {
                this.$emit('workItemOver', this.order);
            },
            onMouseOutHandler : function($e) {
                this.$emit('workItemOver', -1);
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
            }
            this.$watch(() => (
                this.width,
                    this.height
            ), this.notify)
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
