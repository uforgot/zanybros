/**
 * Created by uforgot on 2017. 7. 20..
 */

import Vue from 'vue';

Vue.mixin({
    methods: {
        getCurrentIndex: function($e) {
            switch ($e) {
                case '/about' : return 0;
                case '/works' : return 1;
                case '/contact' : return 2;
            }
        },
        getRouterNameByIndex: function($index) {
            switch($index) {
                case 0:
                    return '/about';
                case 1:
                    return '/works';
                case 2:
                    return '/contact';

            }
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

