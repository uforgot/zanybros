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
            handleWindowResize(event) {
                this.windowWidth = event.currentTarget.innerWidth;
                this.windowHeight = window.innerHeight;
            },
        },
        beforeDestroy: function () {
            window.removeEventListener('resize', this. handleWindowResize);
        },
        mounted() {
            window.addEventListener('resize', this.handleWindowResize);
        },
    }
</script>
