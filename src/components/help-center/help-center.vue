<template>
    <div class="help-center">
        <u>
            <li v-for='li in helpList'>
                <router-link :to='li.routerUrl'>{{li.name}}</router-link>
            </li>
        </u>
    </div>
</template>
<script>
    import Vue from 'vue';

    export default ({
        data(){
            return {
                msg: 'this is help-center.vue',
                title: '帮助中心',
                helpList:[
                    {
                        name:'常见问题',
                        routerUrl:'',

                    },{
                        name:'使用说明',
                        routerUrl:''
                    }
                ]
            }
        },
        mounted(){
           
        },
        methods:{
        }
    })
</script>
<style>
    
</style>