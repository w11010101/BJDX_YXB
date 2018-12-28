// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import promise from 'es6-promise';
promise.polyfill();
import App from './App';
import router from './router';
import $ from 'zepto';
import iView from 'iView';

import { ToastPlugin ,AlertPlugin,ConfirmPlugin} from 'vux';
Vue.use(ToastPlugin);
Vue.use(AlertPlugin);
Vue.use(ConfirmPlugin);
Vue.use(iView);
import 'iview/dist/styles/iview.css';
// import 'iview.css'
// import VueTouch from 'vue-touchjs';
// import VueTouch from 'vue-touch';
// var VueTouch = require('vue-touchjs');
// Vue.use(VueTouch, {name: 'v-touch'});
// Vue.use(VueTouch);
// Vue.use(iview);

// import 'babel-polyfill';
// import components from './components/list-menu/list-menu.js'
// import directive from './directive/directive.js'
import './directive/directive.js'
// console.log(components)
Vue.config.productionTip = false;


/* eslint-disable no-new */
window.myVue = new Vue({
    el: '#app',
    router,
    components: { 
        App,
    },
    beforeCreate(){
        // this.$Spin.show({
        //     render: (h) => {
        //         return h('div', [
        //             h('Icon', {
        //                 'class': 'demo-spin-icon-load',
        //                 props: {
        //                     type: 'ios-loading',
        //                     size: 30
        //                 }
        //             }),
        //             h('div')
        //         ])
        //     }
        // });
        // setTimeout(() => {
        //     this.$Spin.hide();
        // }, 500);
    },
    template: '<App/>',

})
