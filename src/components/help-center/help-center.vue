<template>
    <div class="help-center">
        <div class="content">
            <ul>
                <li v-for='item in helpList' :setid='item.id' :class='setIconFn(item.orderNumber)'>
                    <router-link :to='toSubRouter(item)'>{{item.name}}<img src="@/assets/icon/back@2x.png"></router-link>
                </li>
            </ul>
        </div>
        <transition name="slide-fade">
            <router-view class='sub-components-view' name='help-center-view'/>
        </transition>
    </div>
</template>
<script>
    import Vue from 'vue';
    import {JSAjaxRequest,getSha1Data,getAESdecrypt} from '@/common/js/ajax.js';
    import {httpApi} from '@/common/js/common.js'
    export default ({
        data(){
            return {
                msg: 'this is help-center.vue',
                title: '帮助中心',
                helpList:[
                ]
            }
        },
        mounted(){
            this.getH5Columns()
        },
        methods:{
            getH5Columns(){
                JSAjaxRequest({
                    url:httpApi.helpCenter.h5Columns,
                    data:getSha1Data(),
                    success:(data)=>{
                        let response = data.data;
                        if(response.code == 0){
                            console.log('getH5Columns = ',response)
                            if(response.resData.length){
                                for(var i in response.resData){
                                    this.helpList.push(response.resData[i])
                                }
                            }
                        }
                    },
                    error:(error)=>{
                        console.log('error = ' , error)
                    }
                });
            },
            setIconFn(name){
                switch(name){
                    case 1:
                        return 'li-icon-q';
                    break;
                    case 2:
                        return 'li-icon-w';
                    break;
                    default:
                        return 'li-icon-w';
                    break;

                }
            },
            toSubRouter(item){
                var url = '';
                 switch(item.orderNumber){
                    case 1:
                        url = '/help-center/problem/'+item.id;
                    break;
                    case 2:
                        url = '/help-center/illustrate';
                    break;
                    default:
                        url = '/help-center';
                    break;

                }
                return url;
            }
        }
    })
</script>
<style>
    @import url('./css/help-center.css');
</style>