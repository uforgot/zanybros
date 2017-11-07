/**
 * Created by uforgot on 2017. 7. 20..
 */

import Vue from 'vue';
import TWEEN from '../vendor/Tween';

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
            return Math.floor(($max * ($value/100) ));
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
        },

        getElementAbsoluteOffset : function(element) {
            let top = 0, left = 0;
            do {
                top += element.offsetTop  || 0;
                left += element.offsetLeft || 0;
                element = element.offsetParent;
            } while(element);

            return {
                top: top,
                left: left
            };
        },

        getElementArray : function(htmlCollection) {
            let tmpArray = [];
            let i;
            let object = {};

            for (i=0;i<htmlCollection.length;i++) {
                object = {
                    el:htmlCollection[i],
                    offset:this.getElementAbsoluteOffset(htmlCollection[i])
                };
                tmpArray.push(object);
            }

            return tmpArray;
        },


        setElementAddClass : function (elem, name) {
            if (!this.getElementHasClass(elem, name)) {
                let cur = this.setElAttr(elem, 'class').trim();
                let res = (cur + ' ' + name).trim();
                this.setElAttr(elem, 'class', res);
            }
        },

        setElementRemoveClass : function (elem, name) {
            let reg = new RegExp('\\s*\\b' + name + '\\b\\s*', 'g')
            let res = this.setElAttr(elem, 'class').replace(reg, ' ').trim()
            this.setElAttr(elem, 'class', res)
        },

        getElementHasClass : function (elem, name) {
            return (new RegExp('\\b' + name + '\\b')).test(this.setElAttr(elem, 'class'))
        },

        setElAttr : function (elem, name, value) {
            if (typeof value !== 'undefined') {
                elem.setAttribute(name, value)
            } else {
                return elem.getAttribute(name) || ''
            }
        },

        scrollToTitle: function(refName) {
            if ((window.currentContentsX%window.innerWidth) !== 0) return;

            let i;
            let elementArray = this.getElementArray(
                document.getElementsByClassName('view-content-anchor')
            );
            let top = 0;

            for (i=0;i<elementArray.length;i++) {
                console.log(elementArray[i].el.getAttribute('anchor-name') , refName);
                if (elementArray[i].el.getAttribute('anchor-name') == refName) {
                    top = elementArray[i].offset.top;
                    console.log('---> ', top);
                }
            }
            // window.scrollTo(0, top);
            this.scrollTo(document.body, top, 500);
        },

        getEaseInOutQuad : function (t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t + b;
            t--;
            return -c/2 * (t*(t-2) - 1) + b;
        },

        scrollTo : function(element, to, duration) {
            let start = element.scrollTop,
                change = to - start,
                currentTime = 0,
                increment = 20;

            let animateScroll = ()=>{
                currentTime += increment;
                let val = this.getEaseInOutQuad(currentTime, start, change, duration);
                window.scrollTo(0, val);
                if(currentTime < duration) {
                    setTimeout(animateScroll, increment);
                }
            };
            animateScroll();
        }


    }
});

