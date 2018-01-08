/**
* -----------------------------------------------------
* Created by uforgot on 2017. 9. 1.
* zanybros
* -----------------------------------------------------
*/

<script>
    import {EventBus} from "../events/event-bus";

    export default {
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
                let scrollTop = window.pageYOffset + window.windowHeight;
                let i;
                let elObject;
                let animationOffset;
                let animationOffsetValue;

                for (i=0; i< this.elArray.length; i++) {
                    elObject = this.elArray[i];

                    animationOffsetValue = 0;
                    animationOffset = elObject.el.getAttribute('animation-offset');

                    if (animationOffset !== null) {
                        animationOffsetValue = window.windowHeight * (Number(animationOffset)/100);
                    }

                    if (scrollTop > (elObject.offset.top - animationOffsetValue)) {
                        this.setElementAddClass(elObject.el, 'show');
                    } else {
                        this.setElementRemoveClass(elObject.el, 'show');
                    }
                }
            },
            setMobile : function() {
                this.setElArray();

                let i;
                let elObject;

                for (i=0; i< this.elArray.length; i++) {
                    elObject = this.elArray[i];
                     this.setElementAddClass(elObject.el, 'show');
                }
            }
        },

        watch: {},

        //life cycle
        //beforeCreate : function() {},
        //created : function() {},
        //beforeMount : function() {},
        mounted : function() {
            if (!_isMobile) {
                EventBus.$on(EventBus.WINDOW_RESIZE, this.onResizeHandler);
                EventBus.$on(EventBus.SCROLL_MOVE, this.onScrollHandler);
                this.onResizeHandler();
                this.onScrollHandler();
            } else {
                this.setMobile();
            }

        },
        //beforeUpdate : function() {},
        //updated : function() {},
        //activated : function() {},
        //deactivated : function() {},
        beforeDestroy : function () {
            if (!_isMobile) {
                EventBus.$off(EventBus.WINDOW_RESIZE, this.onResizeHandler);
                EventBus.$off(EventBus.SCROLL_MOVE, this.onScrollHandler);
            }
        },
        //destroyed : function() {}
    }
</script>
