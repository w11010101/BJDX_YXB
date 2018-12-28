<template>
    <div class='menu'>
        <my-header></my-header>
        <div class='btns' v-if='menuShow'>
            <Button type="primary" size='large' long 
                v-for='(todo,index) in menus' 
                :to='todo.routerUrl'
                :key='index' 
                @click='title=todo.name'>{{todo.name}}</Button>
        </div>
        <transition name="slide-fade">
            <router-view class='project-view' name='project-view'/>
        </transition>
        <!-- <transition name="slide-fade">
            <router-view class='status-view' name='status-view'/>
        </transition> -->
        <!-- <list-menu :myprop="'this is HelloWorld.vue'"></list-menu> -->
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
            menuShow:true,
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
                },
                {
                    name:'薪资查询',
                    routerUrl:'/salary'
                },
                {
                    name:'校历',
                    routerUrl:'/school-calendar'
                },
                {
                    name:'常见问题',
                    routerUrl:'/'
                }

            ]
        }
    },
    methods:{
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
.project-view,.status-view{
    position: absolute;
    width: 100%;
    top:.5rem;
    bottom:0;
    background: #fff;
    overflow: hidden;
}
.btns{
    padding:.2rem;
}
.btns button,.btns a{
    margin-top: .1rem;
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
    height: 1rem;
    position: relative;
    border: 1px solid #eee;
}

</style>
