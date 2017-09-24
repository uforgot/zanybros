/**
* -----------------------------------------------------
* Created by uforgot on 2017. 9. 4.
* zanybros
* -----------------------------------------------------
*/

<template>
    <li
            :style="{
                 transform : computedLeft
             }"
    >
        <div class="content-about-category-item"
             :style="{
            width : currentWidth + 'px',
            height : dataHeight + 'px'

         }"
        >
            <comp-image
                    class="image"
                    :class="{'din': dataDin, 'focus':dataFocus}"

                    :data-width = "currentWidth"
                    :data-height = "dataHeight"
                    :data-src = "jsonData.imageUrl"
            ></comp-image>

            <!--<div class="title"-->
                 <!--:class="{'din': dataDin,'focus': dataFocus}"-->
            <!--&gt;-->
                <!--<h4 v-html="getJsonMultilineTxt(jsonData.title)"></h4>-->
            <!--</div>&lt;!&ndash;<img :src="item.imageUrl">&ndash;&gt;-->

            <div class="content"
                 :style="{
                            width : dataMaxWidth + 'px'
                         }"
            >
                <h4 v-html="getJsonMultilineTxt(jsonData.title)"
                    :class="{'din': dataDin,'focus': dataFocus}"
                ></h4>
                <p v-html="getJsonMultilineTxt(jsonData.comment)"
                   :class="{'focus': dataFocus}"
                ></p>
            </div>
            <div class="button"
                 @mouseover= "onMouseOverHandler"
                 @mouseout= "onMouseOutHandler"
            ></div>
        </div>
    </li>
</template>

<style scoped lang="scss">
    @import "~scssMixin";

    .button {
        width:100%;
        height:100%;
    }

    .image {
        cursor:pointer;
        overflow:hidden;
        @include css-value-transition('filter 0.2s ease-out 0s, opacity 0.2s ease-out 0s');
        transform: scale(1.1);

        &.din {
            filter:grayscale(100%);
        }
        &.focus {
            /*filter: blur(10px);*/
        }
    }


    .content {
        h4 {
            &.din {
                opacity:0;
            }


        }
        p {
            @include css-value-transition('transform 0.2s ease-out 0s, opacity 0.2s ease-out 0s');
            opacity:0;
            transform:translateY(40px);
            &.focus {
                opacity:1;
                transform:translateY(20px);
            }
        }
    }

    .button {
        position:absolute;
        left:0;
        top:0;
        cursor: pointer;
    }

</style>

<script>
    import MixinContent from '../mixin/mixin-content.vue';
    import CompImage from '../component/comp-image.vue';
    import TWEEN from '../vendor/Tween';

    export default {
        mixins: [MixinContent],
        components: {CompImage},

        props: {
            'data-index':{},
            'data-left':{},
            'data-width': {},
            'data-max-width' : {},
            'data-height' : {},
            'data-focus':{},
            'data-din' : {}
        },
        data: function () {
            return {
                currentLeft:0,
                currentWidth:0
            };
        },

        computed: {
            computedLeft : function() {
                return 'translate3d(' + this.currentLeft + 'px,0,0)';
            }
        },
        methods: {
            onMouseOverHandler : function($e) {
                this.$emit('categoryOver', this.dataIndex);
            },
            onMouseOutHandler : function($e) {
                this.$emit('categoryOver', 0);
            }

        },
        watch : {
            dataLeft : function($newValue, $oldValue){
                function animate() {
                    if (TWEEN.update()) {
                        requestAnimationFrame(animate);
                    }
                }

                new TWEEN.Tween({ tweeningNumber :  this.currentLeft })
                    .to({ tweeningNumber : $newValue }, 300).easing(TWEEN.Easing.Quadratic.Out)
                    .onUpdate(($e) =>
                        {
                            this.currentLeft = Number($e.tweeningNumber.toFixed(2));
                        }
                    )
                    .start();
                animate();
            },

            dataWidth : function($newValue, $oldValue){
                function animate() {
                    if (TWEEN.update()) {
                        requestAnimationFrame(animate);
                    }
                }

                new TWEEN.Tween({ tweeningNumber :  this.currentWidth })
                    .to({ tweeningNumber : $newValue }, 300).easing(TWEEN.Easing.Quadratic.Out)
                    .onUpdate(($e) =>
                        {
                            this.currentWidth = Number($e.tweeningNumber.toFixed(2));
                        }
                    )
                    .start();
                animate();
            }

        },

        //life cycle
        //beforeCreate : function() {},
        //created : function() {},
        //beforeMount : function() {},
        mounted : function() {
            this.currentLeft = this.dataLeft;
            this.currentWidth = this.dataWidth;
        },
        //beforeUpdate : function() {},
        //updated : function() {},
        //activated : function() {},
        //deactivated : function() {},
        //beforeDestroy : function () {},
        //destroyed : function() {},
        dummy: {}
    }
</script>
