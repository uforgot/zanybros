/**
 * Created by uforgot on 2017. 7. 20..
 */

<!-- script -->
<script>
    export default {
        data() {
            return {
                windowWidth: window.innerWidth,
                windowHeight: window.innerHeight,
            };
        },


        methods: {
            handleWindowResizeMixin : function() {
                this.windowWidth = window.innerWidth;//event.currentTarget.innerWidth;
                this.windowHeight = window.innerHeight;
            },
        },
        beforeDestroy: function () {
            window.removeEventListener('resize', this.handleWindowResizeMixin);
        },

        mounted() {
            window.addEventListener('resize', this.handleWindowResizeMixin);
        },
    }
</script>
