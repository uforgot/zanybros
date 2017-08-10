/**
* Created by uforgot on 2017. 7. 18..
*/

<template>
    <div class="frame-container">
        <div class="logo"><a href="#about">ZANYBROS</a></div>
        <div
            :class="{  'bar':true, 'left':true , 'bar-left-folding' : dataFolding}"
        ></div>
        <div class="bar right"></div>

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

    .menu-is-active {
        color:#ff0000;
    }

</style>