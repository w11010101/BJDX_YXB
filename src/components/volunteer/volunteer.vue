<template>
    <div class="volunteer">
        <div class='content'>
            <div class="banner">
                <h2>{{serverTime}}</h2>
                <p>完成总时长(小时)</p>
                <router-link to='/volunteer/search/history' class='history'><span>报名历史</span><img src='@/assets/icon/arrow.png'></router-link>
            </div>
            <div class="search-Box" @click='transitionName = "slide-fade-y"'>
                <router-link to='/volunteer/search/search'>搜索志愿活动</router-link>
            </div>
            <!-- list -->
            <div id="wrapper" v-show='serverList.length'>
                <ul class='list' >
                    <li v-for='(item,index) in serverList' >
                        <router-link :to='"/volunteer/detail/"+item.id'>
                            <div class='list-img'>
                                <img :src="item.iconUrl" alt="">
                                <img :src="badge(item.state)" alt="" class='badge'>
                            </div>
                            
                            <div class='list-info'>
                                <h3>{{item.name}}</h3>
                                <p>活动开始时间：<span>{{item.beginTime?item.beginTime.substr(0,10):'-'}}</span></p>
                                <p>活动时长：{{item.time||'-'}}小时</p>
                                <p>招募截止时间：<span>{{item.endTime?item.endTime.substr(0,10):'-'}}</span></p>
                            </div>
                        </router-link>
                    </li>
                </ul>
                
            </div>
            <!-- status -->
            <!-- <div class='status' v-show='!serverList.length'>
                <div class="bg"></div>
                <span>暂无更多数据</span>
            </div> -->
        </div>
        <!-- router-view -->
        <transition name='slide-fade'>
            <!-- <keep-alive> -->
                <router-view class='sub-components-view' name='sub-components-view'></router-view>
            <!-- </keep-alive> -->
        </transition>
    </div>
</template>
<script>
    import route from '@/router';
    import {JSAjaxRequest,getSha1Data,getAESdecrypt} from '@/common/js/ajax.js';
    import {httpApi,toastTips,alertTips} from '@/common/js/common.js';
    import loadMoreFn from '../../../static/plugin/iscroll4/js/loadMore.js';
    export default ({
        data(){
            return {
                msg: 'this is volunteer.vue',
                title: '志愿服务',
                transitionName:"slide-fade",

                serverTime:'0',
                searchServerName:'',
                pageNum:1,
                serverList:[],
                scrollState:true,
                signUpStatusId:'1',
                loadState:"up",
            }
        },
        watch:{
            '$route'(to,from){
                if(to.params.type == 'search'){
                    this.transitionName = 'slide-fade-y';
                }else{
                    this.transitionName = "slide-fade"
                }
                
            }
        },
        mounted(){
            this.runIScrollFn();
            this.getH5ServiceTime();
            this.getServerList(1,'','0');
        },
        methods:{
            // 获取服务总时长
            getH5ServiceTime(){
                JSAjaxRequest({
                    url:httpApi.getH5Service.h5ServiceTime,
                    data:getSha1Data(),
                    success:(res)=>{
                        if(res.status == 200){
                            if(!res.data) {alertTips('数据为空'); return false;}
                            var data = res.data;
                            if(data.code!=0){alertTips(data.msg); return false;}
                            // console.log('获取服务总时长 = ' , data.resData)
                            serverTime = data.resData||0;

                        }else{
                            alertTips(res.statusText)
                        }
                        
                    },
                    error:(err)=>{

                    }
                })
            },
            // 获取服务列表
            getServerList(pageNum,searchVal,type){
                // this.$vux.loading.show();
                JSAjaxRequest({
                    url:httpApi.getH5Service.h5ServicePaging,
                    data:getSha1Data({
                        pageNum:pageNum+'',
                        name:searchVal,
                        type:type
                    }),
                    success:(res)=>{
                        if(res.status == 200){
                            if(!res.data) {alertTips('数据为空'); return false;}
                            var data = res.data;
                            if(data.code!=0){alertTips(data.msg); return false;}
                            var resData = data.resData;
                            if(resData.list.length == 0){alertTips('数据暂时为空'); return false;}
                            console.log('获取服务列表 = ' , resData.list);
                            for(var i in resData.list){
                                this.serverList.push(resData.list[i])
                            }
                            this.$nextTick(function(){
                                this.$vux.loading.hide();
                                if(wrapper.refresh){
                                    wrapper.refresh();
                                }
                                
                            });
                            
                        }else{
                            this.$vux.loading.hide();
                            alertTips(res.statusText)
                        }
                        this.scrollState = true;
                    },
                    error:(err)=>{
                        this.$vux.loading.hide();
                    }
                })
            },
            // iScroll
            runIScrollFn(){
                let _this = this;
                let loadMore = loadMoreFn();
                var option = {
                    id: "wrapper",
                    pullDown: function() {
                        _this.serverList = [];
                        _this.pageNum = 1;
                        _this.getServerList(1,_this.searchServerName,"0");
                        wrapper.refresh();
                    },
                    pullUp: function() {
                        if (_this.scrollState) {
                            ++_this.pageNum;
                            console.log('pullUP')
                            _this.scrollState = false;
                            _this.$nextTick(function() {
                                // 加载 ... 
                                _this.getServerList(_this.pageNum,_this.searchServerName,'0');
                                wrapper.refresh();
                            });
                        }
                    }
                };
                setTimeout(function(){
                    loadMore.scroll(option);
                },200);
            },
            // 徽章
            badge(type){
                if(type == 1){
                    return require('@/assets/volunteer/going.png');
                }else if(type ==2){
                    return require('@/assets/volunteer/before.png');
                }else{
                    return require('@/assets/volunteer/end.png');
                }
            }
        }
    })
</script>
<style scoped="">
    @import url(./css/volunteer.css);
    .status{
        top:calc(30% + 1.4rem);
    }
</style>