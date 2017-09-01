/**
* -----------------------------------------------------
* Created by uforgot on 2017. 9. 1.
* zanybros
* -----------------------------------------------------
*/

<template>
    <div class="content-works-item" v-show="isShow">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
    @import "~scssMixin";
</style>

<script>
    export default {
        mixins:[],
        components:{},

        props: {
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
