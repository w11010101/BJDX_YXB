// import Vue from 'vue'
// import Router from 'vue-router'
import routes from './routers'

Vue.use(VueRouter)

const router = new VueRouter({
    // mode:"history",
    mode: process.env.NODE_ENV === 'production'?'hash':'history',
    routes,
});
router.afterEach((to,from)=>{
    // alert(window.location.href)
    // console.log(window.location.href);
    // console.log('router = ',arguments);
})
export default router;