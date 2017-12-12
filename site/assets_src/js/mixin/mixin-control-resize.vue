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
                this.windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                this.windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            },
        },
        watch : {},

        //life cycle
        //beforeCreate : function() {},
        //created : function() {},
        //beforeMount : function() {},
        mounted() {
            window.addEventListener('resize', this.handleWindowResizeMixin);
        },
        //beforeUpdate : function() {},
        //updated : function() {},
        //activated : function() {},
        //deactivated : function() {},
        beforeDestroy: function () {
            window.removeEventListener('resize', this.handleWindowResizeMixin);
        },
        //destroyed : function() {},
        dummy : {}
    }
</script>
