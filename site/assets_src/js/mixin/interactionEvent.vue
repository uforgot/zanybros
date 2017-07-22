/**
* Created by uforgot on 2017. 7. 20..
*/

<!-- script -->
<script>
    export default {
        beforeDestroy: function () {
            this.$el.removeEventListener('mousedown', (e) => this.$emit('interactionStart',     {e:e, x:e.pageX, y:e.pageY, isTouch:false }));
            this.$el.removeEventListener('mouseup', (e)=> this.$emit('interactionEnd',          {e:e, x:e.pageX, y:e.pageY, isTouch:false }));
            this.$el.removeEventListener('mouseleave', (e)=> this.$emit('interactionCancel',    {e:e, x:e.pageX, y:e.pageY, isTouch:false }));
            this.$el.removeEventListener('mousemove', (e)=> this.$emit('interactionMove',      {e:e, x:e.pageX, y:e.pageY, isTouch:false }));

            this.$el.removeEventListener('touchstart', (e) => this.$emit('interactionStart',    {e:e, x:e.touches[0].pageX, y:e.touches[0].pageY,       isTouch:true }));
            this.$el.removeEventListener('touchend', (e)=> this.$emit('interactionEnd',         {e:e, x:e.changedTouches[0].pageX, y:e.changedTouches[0].pageY, isTouch:true }));
            this.$el.removeEventListener('touchcancel', (e)=> this.$emit('interactionCancel',   {e:e, x:e.changedTouches[0].pageX, y:e.changedTouches[0].pageY, isTouch:true }));
            this.$el.removeEventListener('touchmove', (e)=> this.$emit('interactionMove',      {e:e, x:e.changedTouches[0].pageX, y:e.changedTouches[0].pageY, isTouch:true }));
        },

        mounted() {
            this.$el.addEventListener('mousedown', (e) => this.$emit('interactionStart',     {e:e, x:e.pageX, y:e.pageY, isTouch:false }));
            this.$el.addEventListener('mouseup', (e)=> this.$emit('interactionEnd',          {e:e, x:e.pageX, y:e.pageY, isTouch:false }));
            this.$el.addEventListener('mouseleave', (e)=> this.$emit('interactionCancel',    {e:e, x:e.pageX, y:e.pageY, isTouch:false }));
            this.$el.addEventListener('mousemove', (e)=> this.$emit('interactionMove',      {e:e, x:e.pageX, y:e.pageY, isTouch:false }));

            this.$el.addEventListener('touchstart', (e) => this.$emit('interactionStart',    {e:e, x:e.touches[0].pageX, y:e.touches[0].pageY,       isTouch:true }));
            this.$el.addEventListener('touchend', (e)=> this.$emit('interactionEnd',         {e:e, x:e.changedTouches[0].pageX, y:e.changedTouches[0].pageY, isTouch:true }));
            this.$el.addEventListener('touchcancel', (e)=> this.$emit('interactionCancel',   {e:e, x:e.changedTouches[0].pageX, y:e.changedTouches[0].pageY, isTouch:true }));
            this.$el.addEventListener('touchmove', (e)=> this.$emit('interactionMove',      {e:e, x:e.changedTouches[0].pageX, y:e.changedTouches[0].pageY, isTouch:true }));
        }
    }
</script>
