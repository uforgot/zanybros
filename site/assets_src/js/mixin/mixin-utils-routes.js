/**
 * Created by uforgot on 2017. 7. 20..
 */

import Vue from 'vue';

Vue.mixin({
    methods: {
        getCurrentIndex: function($e) {
            switch ($e) {
                case 'about' : return 0;
                case 'works' : return 1;
                case 'works-view' : return 1;
                case 'contact' : return 2;
            }
        },
        getPrevIndex : function($e) {
            let returnValue;
            returnValue = $e - 1;

            if (returnValue < 0) {
                returnValue = 2;
            }

            return returnValue;
        },

        getNextIndex : function($e) {
            let returnValue;
            returnValue = $e + 1;

            if (returnValue > 2) {
                returnValue = 0;
            }

            return returnValue;
        },
        getRouterNameByIndex: function($index) {
            switch($index) {
                case 0:
                    return 'about';
                case 1:
                    return 'works';
                case 2:
                    return 'contact';
            }
        },
        getWorksDataByIndex:function($index) {
            let i;
            let data = Window.ZanyBrosWorksData;

            for (i=0;i<data.length;i++) {
                if (data[i].index === $index) {
                    return data[i];
                }
            }

            return false;
        },
        getRouterFlowDirection: function($fromIndex, $toIndex) {
            let fromToGap = $fromIndex - $toIndex;

            if (fromToGap < 0) {
                if (fromToGap === -2) {
                    if ($fromIndex === 0) {
                        return 'slide-right';
                    } else {
                        return 'slide-left';

                    }
                } else {
                    return 'slide-left';
                }

            } else {
                if (fromToGap === 2) {
                    if ($fromIndex === 0) {
                        return 'slide-right';
                    } else {
                        return 'slide-left';
                    }
                } else {
                    return 'slide-right';
                }
            }

        }
    }
});

