import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'

Vue.use(Router)

const router = new Router({
    // mode:"history",
    mode: process.env.NODE_ENV === 'production'?'hash':'history',
    routes,
});
router.beforeEach((to, from, next) => {
    // console.log("to = ",to),
    // console.log('from = ' ,from);
    next();
})
router.afterEach((to,from)=>{
    // alert(window.location.href)
    // console.log(window.location.href);
    // console.log('router = ',arguments);
})
export default router;