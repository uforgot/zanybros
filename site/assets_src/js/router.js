import VueRouter from 'vue-router';

let routes = [
    {
        path: '/',
        component: require('./view/main')
    },

    {
        path: '/about',
        component: require('./view/about')
    },

    {
        path: '/contact',
        component: require('./view/contact')
    }
];

export default new VueRouter({
    routes,
    linkActiveClass: 'is-active'
});