/**
 * Created by uforgot on 2017. 7. 20..
 */

import Vue from 'vue';

Vue.mixin({
    methods: {
        isPercentValue : ($value) => {
            $value = String($value);

            if (($value.split('%').length) === 2) {
                return true;
            }
            return false;
        },

        getPercentValue : ($value) => {
            $value = String($value);
            return Number($value.split('%')[0]);
        },

        getPixelValueByPercentValue : ($value, $max) => {
            return ($max * ($value/100) ) + 'px'
        }
    }
})

