import Vue from 'vue'
import comp_A from './comp_dynamic.vue'

const TEST_TEST = "Hello DF!";

var comp = comp_A;

var vm = new Vue({
    el: '#app',

    data: {
        currentView: comp
    },
    components:{
        "compe-static": comp
    },
    created:function(){
        console.log("가나다라마바사 ");
    }
});


var vm2 = new Vue({
    el: '#app2',

    data: {
        className:'color-red',

        title : 'remove this',
        newName:'',
        names: ['신형주', '반승한', '곽병준', '양경식']
    },

    methods: {
        removeName : function ($e) {
            console.log($e);
            var tmpArr = [];

            for (var i=0;i<this.names.length;i++){
                if (i !== $e) {
                    tmpArr.push(this.names[i]);
                }
            }

            this.names = tmpArr;
        },
        addName: function () {
            this.names.push(this.newName);
            this.newName ='';
        }
    }
})
