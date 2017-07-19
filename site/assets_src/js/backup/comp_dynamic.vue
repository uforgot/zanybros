
<!-- template -->
<template>
    <!-- 페이지 본문 컨텐츠 영역 -->
    <div>
        <p v-if="plusValue">Hi Vue Component {{no_test}} {{currentIndex}} {{plusValue}}

        </p>
        <button @click="onClick">plus</button>
    </div>
</template>


<!-- script -->
<script>
    export default {

        data: function() {
            return {}
        },

        beforeMount : function(){

        },

        methods:{
            onClick:function(){
                this.currentIndex++;
            }
        },

        props:{
            no_test:{
                Type:Number,
                default:function(){
                    return 0;
                }
            }
        },

        data : function() {
            return {
                currentIndex : 0
            }
        },

        computed:{
            plusValue : function () {
                return (this.no_test + this.currentIndex)>20;
            }
        },

        components :{

        }
    }
</script>
