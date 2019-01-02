<template>
    <div class="help-center-problem">
        <div class="content">
            <div class="search-Box" >
                <input placeholder="搜索常见问题" autocomplete=on v-model='searchVal' />
                <button  @click='searchFn'>搜索</button>
            </div>
            <!--  -->
            <ul>
                <li v-for='item in H5QAsArr'>
                    <h2>{{item.question}}</h2>
                    <p>{{item.answer}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';

    import {JSAjaxRequest,getSha1Data,getAESdecrypt} from '@/common/js/ajax.js';
    import {httpApi} from '@/common/js/common.js'
    export default ({
        data(){
            return {
                msg: 'this is help-center-problem.vue',
                title: '帮助中心',
                searchVal:'',
                H5QAsArr:[]
            }
        },
        mounted(){
            // console.log(this.$route.params.id)
            this.getH5QAs()
        },
        methods:{
            searchFn(){

            },
            getH5QAs(page='',searchVal=''){
                JSAjaxRequest({
                    url:httpApi.helpCenter.h5QAs,
                    data:getSha1Data({
                        "pageNum":page,
                        "columnId":this.$route.params.id,
                        "searchParam1":searchVal
                    }),

                    success:(data)=>{
                        let response = data.data;
                        if(response.code == 0){
                            console.log('getH5QAs = ',response)
                            let list = response.resData.list
                            if(list.length){
                                for(var i in list){
                                    this.H5QAsArr.push(list[i])
                                }
                            }
                        }
                    },
                    error:(error)=>{
                        console.log('error = ' , error)
                    }
                });
            },
        }
    })
</script>
<style>
    @import url('./css/help-center.css');

</style>