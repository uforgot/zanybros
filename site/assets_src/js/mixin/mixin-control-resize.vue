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
                windowWidth: window.innerWidth,
                windowHeight: window.innerHeight,
            };
        },

        computed : {},
        methods: {
            handleWindowResizeMixin : function() {
                this.windowWidth = window.innerWidth;//event.currentTarget.innerWidth;
                this.windowHeight = window.innerHeight;
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
