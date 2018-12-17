<template>
    <div class='menu'>
        <my-header></my-header>
        <div class='btns' v-if='menuShow'>
            <Button type="primary" size='large' long :to='todo.routerUrl' v-for='todo in menus' @click='title=todo.name'>{{todo.name}}</Button>
            <Button type="primary" size='large' long>我的——常见问题</Button>
            <Button type="primary" size='large' long>Primary</Button>
        </div>
        <!-- <Spin fix v-if="spinShow">
            <Icon type="ios-loading" size=50 class="demo-spin-icon-load"></Icon>
        </Spin> -->
        <transition name="slide-fade">
            <router-view class='project-view' name='project-view'/>
        </transition>
        <!-- <list-menu :myprop="'this is HelloWorld.vue'"></list-menu> -->

        <!-- <vue-menu></vue-menu> -->
    </div>
</template>

<script>
import router from '@/router';

export default {
    name: 'mymenu',
    components:{
        'my-header':resolve=>require(['@/components/header/header.vue'],resolve),
        // 'vue-menu': resolve => require(['@/components/list-menu/list-menu.vue'],resolve),
    },
    beforeCreate(){

    },
    mounted(){
        // alert(this.GetQueryString('page'));
        router.push('/'+this.GetQueryString('page'));
    },
    data () {
        return {
            msg: 'Welcome to Menu.vue',
            spinShow:true,
            menuShow:false,
            // title:'Menu.vue',
            menus:[
                {
                    name:'成绩查询',
                    routerUrl:'/score'
                },
                {
                    name:'上网服务',
                    routerUrl:'/internet'
                },
                {
                    name:'志愿服务',
                    routerUrl:'/volunteer'
                }
            ]
        }
    },
    methods:{
        // getSearchParams(paramName,url){
        //     // var _url = url||window.location
        //     let search = window.location.search.substr(1);
        //     console.log(search)
        // },
        GetQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
            var context = "";
            if (r != null)
                context = r[2];
            reg = null;
            r = null;
            return context == null || context == "" || context == "undefined" ? "" : context;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
    font-weight: normal;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #fff;
}
.project-view{
    position: absolute;
    width: 100%;
    top:50px;
    bottom:0;
    background: #fff;
    overflow: hidden;
}
.btns{
    padding:20px;
}
.btns button,.btns a{
    margin-top: 10px;
}
/**/
.demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
}
.demo-spin-col{
    height: 100px;
    position: relative;
    border: 1px solid #eee;
}

</style>
