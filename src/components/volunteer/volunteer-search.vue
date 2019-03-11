<template>
    <div class="volunteer-search">
        <div class="content">
            <div class="search-Box" >
                <input placeholder="搜索志愿活动" autocomplete=on v-model='searchServerName'/>
                <!-- <button  @click='searchFn'>搜索</button> -->
                <Button type="text" @click='searchFn'>搜索</Button>

            </div>
            <div id="subwrapper" v-show='serverList.length'>
                <ul class='list' >
                    <li v-for='(item,index) in serverList' >
                        <router-link :to='setTo(item.id)'>
                            <div class='list-img'>
                                <img :src="item.iconUrl" alt="">
                                <img :src="badge(item.state)" alt="" class='badge'>
                            </div>
                            
                            <div class='list-info'>
                                <h3>{{item.name}}</h3>
                                <p>活动开始时间：<span>{{item.beginTime?item.beginTime.substr(0,10):0}}</span></p>
                                <p>活动时长：{{item.time}}小时</p>
                                <p>招募截止时间：<span>{{item.endTime?item.endTime.substr(0,10):0}}</span></p>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
            <!-- status -->
            <div class='status' v-show='nothingState'>
                <div class="bg"></div>
                <span>暂无更多数据</span>
            </div>

        </div>
        <!-- router-view -->
        <transition name="slide-fade">
            <router-view class='sub-components-view' name='volunteer-search-view'></router-view>
        </transition>
    </div>
</template>
<script>
    import route from '@/router';
    import {JSAjaxRequest,getSha1Data,getAESdecrypt} from '@/common/js/ajax.js';
    import {httpApi,toastTips,alertTips} from '@/common/js/common.js';
    import { Alert ,AlertModule} from 'vux'

    import loadMoreFn from '../../../static/plugin/iscroll4/js/loadMore.js';
    export default ({
        data(){
            return {
                msg: 'this is volunteer-search.vue',
                title: '志愿服务',
                results:[],
                hotSearchActive:999,
                hotSearch:[
                    {name:"鲁迅",id:1},
                    {name:"医务义诊",id:2},
                    {name:"儿童安全",id:3},
                    {name:"志愿服务",id:4},
                    {name:"多维宇宙",id:5},
                ],
                historySearchActive:999,
                historySearch:[
                    {name:"鲁迅",id:1},
                    {name:"医务义诊",id:2},
                    {name:"儿童安全",id:3},
                    {name:"志愿服务",id:4},
                    {name:"多维宇宙",id:5},
                ],
                nothingState:false,
                searchServerName:'',
                pageNum:1,
                serverList:[],
                scrollState:true,
                
            }
        },
        
        watch:{
            '$route'(to,from){
                var _this = this;
                // console.log('router change = ' , to);
                if(to.params.type == 'history' && to.name.includes('search')){
                    _this.serverList = [];
                    _this.getServerList(1,_this.searchServerName,"1");
                    
                }
            }
        },
        components:{
            Alert,
            // Search
        },
        mounted(){

            // console.log('router = ',this.$route.params);
            this.runIScrollFn();
            if(this.$route.params.type == 'history'){
                this.getServerList(1,this.searchServerName,"1");
                console.log(this.serverList.length)
                
            }
        },
        methods:{
            setActive(index,type){
                if(type=='hot'){
                    this.hotSearchActive = index;
                    this.historySearchActive = 999;
                }else{
                    this.historySearchActive = index;
                    this.hotSearchActive = 999;
                }
                this.searchServerName = event.target.innerText;
                // console.dir(event.target)
            },
            cancelFn(){
                console.log('cancelFn');
                this.searchServerName = '';
            },
            searchFn(){
                var _this = this;
                this.serverList = [];
                if(this.searchServerName){
                    
                    this.$vux.loading.show();
                    
                    setTimeout(function(){
                        _this.$vux.loading.hide();
                    },1000);
                }else{
                    // toastTips('请输入搜索关键字');

                }
                this.getServerList(1,this.searchServerName,this.$route.params.type == 'history'?'1':"0");
                
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
                            if(!res.data) {return false;}
                            var data = res.data;
                            console.log(this.serverList)
                            if(data.code!=0){alertTips(data.msg); return false;}
                            var resData = data.resData;
                            if(resData.list.length == 0){ 
                                
                                this.nothingState = true;
                                return false;
                            }
                            // console.log('1search  = ' , resData.list);
                            for(var i in resData.list){
                                this.serverList.push(resData.list[i])
                            }
                            this.$nextTick(function(){
                                this.$vux.loading.hide();
                                if(subwrapper.refresh){
                                    subwrapper.refresh();
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
                    id: "subwrapper",
                    pullDown: function() {
                        _this.serverList = [];
                        _this.pageNum = 1;
                        _this.nothingState = false;
                        _this.getServerList(1,_this.searchServerName);
                        subwrapper.refresh();
                    },
                    pullUp: function() {
                        if (_this.scrollState) {
                            ++_this.pageNum;

                            _this.scrollState = false;
                            _this.$nextTick(function() {
                                // 加载 ... 
                                _this.getServerList(_this.pageNum,_this.searchServerName);
                                
                                subwrapper.refresh();
                            });
                        }
                    }
                };
                setTimeout(function(){
                    loadMore.scroll(option);
                },200);
            },
            setTo(id){
                var url = "/volunteer/search/"+this.$route.params.type+"/detail/"+id;
                return url;
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
            },

        }
    });

</script>
<style scoped="">
    @import url(./css/volunteer.css);
    #subwrapper{
        top:.4rem;
    }
    .search-Box /deep/ .searchInput{
        border-radius:5rem;
    }

</style>