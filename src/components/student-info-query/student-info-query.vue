<template>
    <div class='student-info'>
        <!-- content -->
        <div class='content'>
            <div class="search-Box" >
                <input placeholder="搜索志愿活动" autocomplete=on v-model='searchServerName'/>
                <Button type="text" @click='searchFn'>搜索</Button>
            </div>
            <template v-if='tabs.length >= 0'>
                <!-- 下拉选择 -->
                <group class='popup-picker-box' gutter='0'>
                    <popup-picker 
                        value-text-align='left' 
                        :columns="2" 
                        :data="popupPickerData" 
                        :value='popupValue' 
                        v-model="popupValue" 
                        show-name
                        :placeholder='pickerTitle'
                        @on-change='changeFn'>
                    </popup-picker>
                </group>
                <!-- tab -->
                <tab :line-width="1" custom-bar-width="60px"  v-model='tabActive'>
                    <tab-item v-for='(tab,index) in tabs' :selected='index == 0' @on-item-click='tabChangeFn'>{{tab}}</tab-item>
                </tab>
                <swiper v-model='tabActive' height="100%" :show-dots="false" class='swiper-container' @on-index-change='swiperChangeFn'>
                    <swiper-item v-for='(tab,index) in tabs' :key="index" >
                        <div class="tab-swiper vux-center">
                            <div :id="'wrapper'+tabActive" >
                                <ul class='list' >
                                    <li >
                                    <!-- <li v-for='(item,index) in studentsList' > -->
                                        <div class="headerImg">
                                            <img src="">
                                        </div>
                                        <div class="studentInfo">
                                            <div class="studentName">{{tab}} </div>
                                            <div class="studentId">学号：</div>
                                        </div>
                                        <div class="studentFollow">
                                            
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class='status' v-show='studentsList.length'>
                                <div class="bg"></div>
                                <span>暂无更多数据</span>
                            </div>
                        </div>
                    </swiper-item>
                </swiper>
                <!-- <div class='parts' v-for='item in list'>
                    <h3>{{item.year}}年</h3>
                    <ul >
                        <li v-for='todo in item.list' >
                            <router-link :to='{name:"student-revenue-detail",params:todo}' >
                                <div class='revenue-icon'>
                                    <img :src='getRevenueType(todo.revenueType)'>
                                </div>
                                <div class='revenue-info'>
                                    <h4>{{todo.BZ||todo.title}}<span>{{todo.SFE}}元</span></h4>
                                    <p>[发放部门]{{todo.FFBMMC}}</p>
                                    <span>{{todo.FFSJ}}</span>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div> -->
            </template>
            <!-- status -->
            <div class='status' v-else='nothingState'>
                <div class="bg"></div>
                <span>暂无更多数据</span>
            </div>
        </div>
        <!-- router-view -->
        <transition name="slide-fade">
            <router-view class='sub-components-view' name='sub-components-view'></router-view>
        </transition>
    </div>
</template>
<script type="text/javascript">
    import route from '@/router'
    import {JSAjaxRequest,getSha1Data,getAESdecrypt} from '@/common/js/ajax.js';
    import {httpApi,toastTips,alertTips} from '@/common/js/common.js';
    import { Group,PopupPicker,Tab, TabItem,Swiper,SwiperItem} from 'vux';
    import loadMoreFn from '../../../static/plugin/iscroll4/js/loadMore.js';
    export default {
        name: 'student-revenue',
        data(){
            return {
                title:'学生信息查询',
                msg:'this is student-revenue.vue',
                tabs:['管理人数','关注人数'],
                studentsList:[],
                searchServerName:'',

                pickerTitle:"选择班级",
                popupPickerData:[
                    {
                        name:"全部",
                        value:'all',
                        parent:0
                    },
                    {
                        name:"医药系2018级1班",
                        value:'201801',
                        parent:0
                    },
                    {
                        name:"医药系2018级2班",
                        value:'201802',
                        parent:0
                    },
                    {
                        name:"医药系2018级3班",
                        value:'201803',
                        parent:0
                    }
                ],

                popupValue: [],
                tabActive:0,

                pageNum:1,
                scrollState:true,
                vueLoadMore:{},
                tabChangeState:false,
                nothingState:false,
            }
        },
        components:{
            Group,
            PopupPicker,
            Tab, 
            TabItem,
            Swiper,
            SwiperItem
        },
        mounted(){
            this.runIScrollFn();
            
        },
        methods:{
            
            searchFn(){
                console.log('searchFn')
            },
            // popup-picker changeFn
            changeFn(){
                console.log(arguments)
            },
            tabChangeFn(index){
                console.log('tabChangeFn',wrapper0);
                console.log('tabChangeFn',wrapper1);
                this.tabChangeState = true;
                this.tabActive = index;
                // if(!this.vueLoadMore.iscrolls["wrapper"+index]){
                    this.runIScrollFn();
                // }
            },
            swiperChangeFn(index){
                if(!this.tabChangeState){
                    console.log('swiperChangeFn',wrapper0);
                    console.log('swiperChangeFn',wrapper1);
                    this.tabActive = index;
                }
            },
            // iScroll
            runIScrollFn(){
                let _this = this;
                let loadMore = loadMoreFn();

                // this.vueLoadMore = loadMore;
                // console.log("runIScrollFn =  wrapper"+this.tabActive)
                var option = {
                    id: "wrapper"+this.tabActive,
                    pullDown: function() {
                        _this.studentsList = [];
                        _this.pageNum = 1;
                        _this.tabActive == 0?wrapper0.refresh():wrapper1.refresh();

                        // loadMore.Refresh("wrapper"+_this.tabActive);
                        // _this.getServerList(1,_this.searchServerName,"0");
                        // wrapper.refresh();
                    },
                    pullUp: function() {
                        if (_this.scrollState) {
                            ++_this.pageNum;
                            _this.scrollState = false;
                            _this.$nextTick(function() {
                                // 加载 ... 
                                // _this.getServerList(_this.pageNum,_this.searchServerName,'0');
                                // wrapper.refresh();
                                // loadMore.Refresh("wrapper"+_this.tabActive);
                                _this.tabActive == 0?wrapper0.refresh():wrapper1.refresh();
                            });
                        }
                    }
                };
                setTimeout(function(){
                    loadMore.scroll(option);
                    // _this.tabChangeState = false;
                },200);
            },
            
        }
    }
            
</script>
<style scoped>
    @import url(./css/student-info.css);
    .swiper-container{
        padding-top: .1rem;
        background: #f7f6f7;
        height: calc(100% - 130px);
    }
    .tab-swiper{
        height: 100%;
        background: #fff;
        overflow: auto;
        -webkit-overflow-scrolling: touch;

    }
</style>