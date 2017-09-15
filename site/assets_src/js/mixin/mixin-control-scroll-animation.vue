/**
* -----------------------------------------------------
* Created by uforgot on 2017. 9. 1.
* zanybros
* -----------------------------------------------------
*/

<script>
    import mixinResizeEvent from '../mixin/mixin-control-resize.vue';
    import {EventBus} from "../events/event-bus";

    export default {
        mixins: [mixinResizeEvent],
        components: {},

        props: {},
        data: function () {
            return {
                elArray:[],
            };
        },

        computed: {},

        methods: {
            onResizeHandler :function($e) {
                this.setElArray();
            },
            setElArray : function() {
                this.elArray = this.getElementArray(
                    this.$el.getElementsByClassName('scroll-animation')
                );
            },
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

        watch: {},

        //life cycle
        //beforeCreate : function() {},
        //created : function() {},
        //beforeMount : function() {},
        mounted : function() {
            EventBus.$on(EventBus.WINDOW_RESIZE, this.onResizeHandler);
            EventBus.$on(EventBus.SCROLL_MOVE, this.onScrollHandler);
            this.onResizeHandler();
        },
        //beforeUpdate : function() {},
        //updated : function() {},
        //activated : function() {},
        //deactivated : function() {},
        beforeDestroy : function () {
            EventBus.$off(EventBus.WINDOW_RESIZE, this.onResizeHandler);
            EventBus.$off(EventBus.SCROLL_MOVE, this.onScrollHandler);
        },
        //destroyed : function() {}
    }
</script>
