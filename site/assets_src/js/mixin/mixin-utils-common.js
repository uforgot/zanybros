/**
 * Created by uforgot on 2017. 7. 20..
 */

import Vue from 'vue';

Vue.mixin({
    methods: {
        isPercentValue : function ($value) {
            $value = String($value);
            return ($value.split('%').length) === 2;
        },

        getPercentValue : function ($value) {
            $value = String($value);
            return Number($value.split('%')[0]);
        },

        getPixelValueByPercentValue : function ($value, $max) {
            return ($max * ($value/100) );
        },

        getSizeByFrameSize : function ($size, $frameSize) {
            let ratio = $size.width / $size.height;
            let size = {width:0, height:0};

            if ($frameSize.width > $frameSize.height) {
                size.width = $frameSize.width;
                size.height = size.width / ratio;

                if (size.height < $frameSize.height) {
                    size.height = $frameSize.height;
                    size.width = size.height*ratio;
                }
            } else {
                size.height = $frameSize.height;
                size.width = size.height*ratio;

                if (size.width < $frameSize.width) {
                    size.width = $frameSize.width;
                    size.height = size.width / ratio;
                }
            }

            return size;
        },

        getJsonMultilineTxt : function ($str) {
            return $str.join('\n');
        }
    }
});

