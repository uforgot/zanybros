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
            width : dataWidth + 'px',
            height : dataHeight + 'px'
         }"
        >
            <comp-image
                    class="image"
                    :class="{'din': dataDin}"
                    :data-width = "dataWidth"
                    :data-height = "dataHeight"
                    :data-src = "jsonData.imageUrl"
            ></comp-image>
            <div class="title"><h4 v-html="getJsonMultilineTxt(jsonData.title)"></h4></div><!--<img :src="item.imageUrl">-->
            <div class="button"
                 :style="{
                    width : dataWidth + 'px',
                    height : dataHeight + 'px'
             }"
                 @mouseover= "onMouseOverHandler"
                 @mouseout= "onMouseOutHandler"
            ></div>
        </div>
    </li>
</template>

<style scoped lang="scss">
    @import "~scssMixin";

    .image {
        cursor:pointer;
        @include css-value-transition('filter 0.2s ease-out 0s');
    }
    .din {
        filter:grayscale(100%);;
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
            'data-height' : {},
            'data-din' : {}
        },
        data: function () {
            return {
                currentLeft:0
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
            }
        },

        //life cycle
        //beforeCreate : function() {},
        //created : function() {},
        //beforeMount : function() {},
        mounted : function() {
            this.currentLeft = this.dataLeft;
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
