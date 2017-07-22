/**
* Created by uforgot on 2017. 7. 20..
*/

<!-- script -->
<script>
    export default {
        beforeDestroy: function () {
            this.$el.removeEventListener('mousedown', (e) => this.$emit('customMouseDown',e));
            this.$el.removeEventListener('mouseup', (e)=> this.$emit('customMouseUp',e));
            this.$el.removeEventListener('mouseleave', (e)=> this.$emit('customMouseLeave',e));
            this.$el.removeEventListener('mousemove', (e)=> this.$emit('customMouseMove',e));
        },

        mounted() {
            this.$el.addEventListener('mousedown', (e) => this.$emit('customMouseDown',e));
            this.$el.addEventListener('mouseup', (e)=> this.$emit('customMouseUp',e));
            this.$el.addEventListener('mouseleave', (e)=> this.$emit('customMouseLeave',e));
            this.$el.addEventListener('mousemove', (e)=> this.$emit('customMouseMove',e));
        }
    }
</script>
