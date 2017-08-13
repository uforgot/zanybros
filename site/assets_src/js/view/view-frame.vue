/**
* Created by uforgot on 2017. 7. 18..
*/

<template>
    <div class="frame-container">
        <div class="border-container"
             :class = "{
                    'border-folding': dataFolding,
                    'border-animation-folding': dataFolding,
                    'border-animation-normal': !dataFolding
            }"
        >
        </div>

        <div class="logo"><a href="#about">ZANYBROS</a></div>

        <div class="bar left"
            :class = "{
                    'bar-left-folding': dataFolding,
                    'bar-animation-folding': dataFolding,
                    'bar-animation-normal': !dataFolding
            }"
        ></div>

        <div class="bar right"
            :class = "{
                    'bar-right-folding': dataFolding,
                    'bar-animation-folding': dataFolding,
                    'bar-animation-normal': !dataFolding
            }"
        ></div>

        <div class="language-container">
            <div>EN</div>
            <div>CH</div>
        </div>

        <div class="menu-container">
            <ul>
                <li :class="{ 'menu-is-active' : dataCurrentMenuIndex == 1}">
                    <a href="#about">ABOUT US</a>
                </li>
                <li :class="{ 'menu-is-active' : dataCurrentMenuIndex == 2}">
                    <a href="#works">OUR WORKS</a>
                </li>
                <li :class="{ 'menu-is-active' : dataCurrentMenuIndex == 3}">
                    <a href="#contact">CONTACT US</a>
                </li>

            </ul>
        </div>

    </div>
</template>

<script>
    import {EventBus} from '../events/event-bus'

    export default {
        props : {
            'data-folding': {
                Type: Boolean,
                required: true
            },
            'data-current-menu-index' : {
                Type: Number,
                required:true
            }
        },

        computed:{

        },

        methods : {
        }
    }
</script>

<style scoped lang="scss">
    @import "~scssMixin";

    .bar-animation-folding {
        @include css-value-transition('
            left 0.1s ease-out,
            right 0.1s ease-out,
            width  0.1s ease-out,
            height  0.2s 0.2s ease-out,
            margin-top  0.2s 0.2s ease-out
        ');
    }

    .bar-animation-normal {
        @include css-value-transition('
            left 0.2s 0.2s ease-out,
            right 0.2s 0.2s ease-out,
            width  0.2s 0.2s ease-out,
            height  0.1s ease-out,
            margin-top  0.1s ease-out
        ');
    }

    .left {
        left:50px;
    }

    .bar-left-folding {
        left:140px !important;
        width:6px;
        height:80px;
        margin-top:-40px;
    }

    .right {
        right:50px;
    }

    .bar-right-folding {
        right:140px !important;
        width:6px;
        height:80px;
        margin-top:-40px;
    }

    .border-animation-folding {
        @include css-value-transition('
            border 0.2s ease-out
        ');
    }

    .border-animation-normal {
        @include css-value-transition('
            border 0.2s ease-out
        ');
    }

    .border-folding {
        border:30px solid #fff;
    }



    .menu-is-active {
        color:#ff0000;
    }



</style>