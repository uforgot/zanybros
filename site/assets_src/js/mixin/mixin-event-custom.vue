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
        data : function() {
            return {
                CUSTOM_EVENT : {
                    INTERACTION_START : 'interaction_start',
                    INTERACTION_END : 'interaction_end',
                    INTERACTION_CANCEL : 'interaction_cancel',
                    INTERACTION_MOVE : 'interaction_move',
                }
            };
        },

        computed : {},
        methods : {},
        watch : {},

        //life cycle
        //beforeCreate : function() {},
        //created : function() {},
        //beforeMount : function() {},
        mounted() {
            if(_isDeskTop){
                this.$el.addEventListener('mousedown',  (e) => this.$emit(this.CUSTOM_EVENT.INTERACTION_START,     {e:e, x:e.pageX, y:e.pageY, isTouch:false }));
                this.$el.addEventListener('mouseup',    (e) => this.$emit(this.CUSTOM_EVENT.INTERACTION_END,       {e:e, x:e.pageX, y:e.pageY, isTouch:false }));
                this.$el.addEventListener('mouseleave', (e) => this.$emit(this.CUSTOM_EVENT.INTERACTION_CANCEL,    {e:e, x:e.pageX, y:e.pageY, isTouch:false }));
                this.$el.addEventListener('mousemove',  (e) => this.$emit(this.CUSTOM_EVENT.INTERACTION_MOVE,      {e:e, x:e.pageX, y:e.pageY, isTouch:false }));
            }else{
                this.$el.addEventListener('touchstart', (e) => this.$emit(this.CUSTOM_EVENT.INTERACTION_START,     {e:e, x:e.touches[0].pageX, y:e.touches[0].pageY,       isTouch:true }));
                this.$el.addEventListener('touchend',   (e) => this.$emit(this.CUSTOM_EVENT.INTERACTION_END,       {e:e, x:e.changedTouches[0].pageX, y:e.changedTouches[0].pageY, isTouch:true }));
                this.$el.addEventListener('touchcancel',(e) => this.$emit(this.CUSTOM_EVENT.INTERACTION_CANCEL,    {e:e, x:e.changedTouches[0].pageX, y:e.changedTouches[0].pageY, isTouch:true }));
                this.$el.addEventListener('touchmove',  (e) => this.$emit(this.CUSTOM_EVENT.INTERACTION_MOVE,      {e:e, x:e.changedTouches[0].pageX, y:e.changedTouches[0].pageY, isTouch:true }));
            }



        },
        //beforeUpdate : function() {},
        //updated : function() {},
        //activated : function() {},
        //deactivated : function() {},
        beforeDestroy: function () {
            this.$el.removeEventListener('mousedown',  (e) => this.$emit(this.CUSTOM_EVENT.INTERACTION_START,     {e:e, x:e.pageX, y:e.pageY, isTouch:false }));
            this.$el.removeEventListener('mouseup',    (e) => this.$emit(this.CUSTOM_EVENT.INTERACTION_END,       {e:e, x:e.pageX, y:e.pageY, isTouch:false }));
            this.$el.removeEventListener('mouseleave', (e) => this.$emit(this.CUSTOM_EVENT.INTERACTION_CANCEL,    {e:e, x:e.pageX, y:e.pageY, isTouch:false }));
            this.$el.removeEventListener('mousemove',  (e) => this.$emit(this.CUSTOM_EVENT.INTERACTION_MOVE,      {e:e, x:e.pageX, y:e.pageY, isTouch:false }));

            this.$el.removeEventListener('touchstart', (e) => this.$emit(this.CUSTOM_EVENT.INTERACTION_START,     {e:e, x:e.touches[0].pageX, y:e.touches[0].pageY,       isTouch:true }));
            this.$el.removeEventListener('touchend',   (e) => this.$emit(this.CUSTOM_EVENT.INTERACTION_END,       {e:e, x:e.changedTouches[0].pageX, y:e.changedTouches[0].pageY, isTouch:true }));
            this.$el.removeEventListener('touchcancel',(e) => this.$emit(this.CUSTOM_EVENT.INTERACTION_CANCEL,    {e:e, x:e.changedTouches[0].pageX, y:e.changedTouches[0].pageY, isTouch:true }));
            this.$el.removeEventListener('touchmove',  (e) => this.$emit(this.CUSTOM_EVENT.INTERACTION_MOVE,      {e:e, x:e.changedTouches[0].pageX, y:e.changedTouches[0].pageY, isTouch:true }));
        },
        //destroyed : function() {},
        dummy : {}
    }
</script>
