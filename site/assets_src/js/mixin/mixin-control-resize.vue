/**
* -----------------------------------------------------
* Created by uforgot on 2017. 9. 1.
* zanybros
* -----------------------------------------------------
*/

<script>
    export default {
        mixins:[],
        components:{},

        props: {},
        data() {
            return {
                windowWidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                windowHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
            };
        },

        computed : {},
        methods: {
            handleWindowResizeMixin : function() {
                let currentWindowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                let currentWindowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

                if (_isMobile) {
                    if (currentWindowWidth < currentWindowHeight) {
                        if(currentWindowHeight < this.windowHeight) {
                            currentWindowHeight = this.windowHeight;
                        }
                    }
                }

                this.windowWidth = currentWindowWidth;
                this.windowHeight = currentWindowHeight;
            },
        },
        watch : {},

        //life cycle
        //beforeCreate : function() {},
        //created : function() {},
        //beforeMount : function() {},
        mounted() {
            //window.addEventListener('resize', this.handleWindowResizeMixin);
        },
        //beforeUpdate : function() {},
        //updated : function() {},
        //activated : function() {},
        //deactivated : function() {},
        beforeDestroy: function () {
            //window.removeEventListener('resize', this.handleWindowResizeMixin);
        },
        //destroyed : function() {},
        dummy : {}
    }
</script>
