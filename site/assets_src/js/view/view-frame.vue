/**
* Created by uforgot on 2017. 7. 18..
*/

<template>
    <div class="frame-container">
        <div class="logo"><a href="/">ZANYBROS</a></div>

        <div class="language-container">
            <div>EN</div>
            <div>CH</div>
        </div>

        <div class="menu-container">
            <ul>
                <li>
                    <router-link to="/about">ABOUT US</router-link>
                </li>
                <li>
                    <router-link to="/works">OUR WORKS</router-link>
                </li>
                <li>
                    <router-link to="/contact">CONTACT US</router-link>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
    import {EventBus} from '../events/event-bus'

    export default {
        props : {

        },

        computed:{

        },

        methods : {
        }
    }
</script>

<style scoped lang="scss">
    @import "~scssMixin";

    .router-link-active {
        color:red;
    }
</style>