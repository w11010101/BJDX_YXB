<template>
    <div class='salary'>
        <!-- content -->
        <div class='content'>
            <!-- tabs -->
            <div class='tabs'>
                <ul>
                    <li class='tabs-item' v-for='(item,index) in tabs' :class='{active:index===tabActive}' @click='changeTabsFn(index)'>{{item}}</li>
                </ul>
                <!-- my scrollbar -->
                <div class="swiper-container">
                    <div class="scrollbar" style='height:10px;padding:0 calc((55% - 50px)/2)'>
                        <div class="swiper-scrollbar"></div>
                    </div>
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for='(item,index) in tabs'>
                            <ul v-if='index == 0' >
                                <li v-for='todo in monthData' v-show='monthData.length'>
                                    <div class='parts'>
                                        <h3>{{todo.year}}</h3>
                                        <ul class='monthDetailed'>
                                            <li v-for='(node,index) in todo.data' 
                                                v-if='todo.data.length' :setId = 'node.ZGH' @click='toDetail(node)'>
                                                <a>
                                                    <div class='month'>
                                                        <span>{{node.NIANYUE.split('-')[1]}}月</span>
                                                    </div>
                                                    <div class='detailed'>
                                                        <div>
                                                            应发额
                                                            <p class='add'>{{node.YFE.toFixed(2)||'-'}}元</p>
                                                        </div>
                                                        <div>
                                                            实发额
                                                            <p class='add'>{{node.SFE.toFixed(2)||'-'}}元</p>
                                                        </div>
                                                        <div>
                                                            扣税
                                                            <p class='reduce'>{{node.KS.toFixed(2)||'-'}}元</p>
                                                        </div>
                                                        <div>
                                                            住房公积金
                                                            <p class='reduce'>{{node.GJJ.toFixed(2)||'-'}}元</p>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                        </ul>            
                                    </div>
                                </li>
                                <!-- status -->
                                <!-- <div class='status' v-show='!monthData.length'>
                                    <div class="bg"></div>
                                    <span>暂无更多数据</span>
                                </div> -->
                            </ul>
                            
                            <ul class='yearDetailed' v-else>
                                <li v-for='todo in formatYearData'  v-show='formatYearData.length'>
                                    <div v-if='todo.NIAN'>
                                        <div class='year'>
                                            <label>{{todo.NIAN}}年</label>
                                            <span>合计：{{todo.HJ.toFixed(2)}}元</span>
                                        </div>
                                        <div class='detailed'>
                                            <div>
                                                工资总额
                                                <p>{{todo.YFE.toFixed(2)}}元</p>
                                            </div>
                                            <div>
                                                奖金
                                                <p>{{todo.JLGZ.toFixed(2)}}元</p>
                                            </div>
                                            <div>
                                                其他收入
                                                <p>{{todo.GJJ.toFixed(2)}}元</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <!-- status -->
                                <!-- <div class='status' v-show='!formatYearData.length'>
                                    <div class="bg"></div>
                                    <span>暂无更多数据</span>
                                </div> -->
                            </ul>
                            
                            <!-- btn -->
                            <button @click="clickfn(index)" 
                                class='salary-select-btn'>{{index == 0?"单月筛选":"单年筛选"}}</button>
                            <group>
                                <popup-picker 
                                    v-if= 'index == 0'
                                    :show.sync="tab1_showPopupPicker" 
                                    :show-cell="false" 
                                    :columns="2" 
                                    popup-title="选择月份" 
                                    :data="tab1_dates" 
                                    v-model="tab1_pickerVal"
                                    @on-change='changePickderFn'>
                                </popup-picker>
                                <popup-picker 
                                    v-else
                                    :show.sync="tab2_showPopupPicker" 
                                    :show-cell="false" 
                                    :columns="2" 
                                    popup-title="选择年份"
                                    :data="tab2_dates" 
                                    v-model="tab2_pickerVal"
                                    @on-change='changePickderFn'>
                                </popup-picker>
                            </group>
                        </div>
                    </div>

                </div>
                
            </div>
        </div>
        <!-- router-view -->
        <transition name="slide-fade">
            <router-view class='sub-components-view' name='sub-components-view'></router-view>
        </transition>
    </div>
</template>
<script type="text/javascript">
    import 'swiper/dist/css/swiper.css';
    import Swiper from 'swiper';
    import {formatData} from './js/salary.js';

    import {JSAjaxRequest,getSha1Data} from '@/common/js/ajax.js';
    import {httpApi,toastTips,alertTips} from '@/common/js/common.js'

    import { Group,PopupPicker } from 'vux';
    export default {
        name: 'salary',
        data(){
            return {
                title:'薪资查询',
                msg:'this is salary.vue',
                tabActive:0,
                tabs:['月度薪资查询','年度薪资查询'],
                swiperObj:{},
                data1:[],
                userAccount:'',
                // tab1 picker 
                tab1_showPopupPicker:false,
                tab1_pickerVal:[],
                tab1_dates:[{
                    name:'全部',
                    value:'all',
                    parent:0
                },{
                    name:'全部',
                    value:'all',
                    parent:'all'
                }],
                // tab2 picker
                tab2_showPopupPicker:false,
                tab2_pickerVal:[],
                tab2_dates:[{
                    name:'全部',
                    value:'all',
                    parent:0
                }],

                monthData:[],
                yearData:[],
                formatYearData:[],
            }
        },
        components:{
            Group,
            PopupPicker,
        },
        mounted(){
            var _this = this;
            this.$nextTick(function(){
                this.runSwiperFn();
                this.getH5ServiceGetZghOrXh();
                
            });
            this.$vux.loading.show();
        },
        methods:{
            // 获取职工号 或者是 学号
            getH5ServiceGetZghOrXh(){
                JSAjaxRequest({
                    url:httpApi.getSalary.h5ServiceGetZghOrXh,
                    data:getSha1Data(),
                    success:(res)=>{
                        console.log(res);
                        if(res.data && res.status == 200) {
                            var data = res.data;
                            if(data.code == '0'){
                                this.userAccount = data.resData;
                                this.queryYdhzsrFn();
                            }else{
                                this.$vux.loading.hide();
                                toastTips(data.msg);
                            }
                        } else{
                            this.$vux.loading.hide();
                            toastTips(res.statusText);
                        }
                    },
                    error:(error)=>{
                        console.log(error)
                        this.$vux.loading.hide();
                        toastTips('请求失败，请稍后重试');
                    }
                });
            },
            toDetail(node){
                this.$router.push({
                    name:'salaryDetail',
                    params:{
                        ZGH:node.ZGH||'',
                        NIANYUE:node.NIANYUE||'',
                        SFE:node.SFE||''
                    }
                })
            },
            // 选项卡切换
            changeTabsFn(index){
                this.tabActive = index;
                this.swiperObj.slideTo(index, 300, false);
            },
            // 选项卡点击事件
            clickfn(index){
                if(index == 0){
                    this.tab1_showPopupPicker = true;
                }else{
                    this.tab2_showPopupPicker = true;
                } 
            },

            getDates(option){
                var yearlong = new Date().getFullYear() - option.startTime;
                for(var i = yearlong; i>=0;i--){
                    this[option.key].push({
                        name: option.startTime+i+'年',
                        value: option.startTime+i+'',
                        parent: '0'
                    })
                    if(option.type == 'ym'){
                        for(var x = 1;x<=12;x++){
                            this[option.key].push({
                                name: x+'月',
                                value: x+'',
                                parent: option.startTime+i+''
                            })
                        }
                    }
                }
            },
            // 运行 swiper
            runSwiperFn(){
                var _this = this;
                this.swiperObj = new Swiper ('.swiper-container', {
                    direction: 'horizontal', // 垂直切换选项
                    scrollbar: {
                        el: '.swiper-scrollbar',
                        dragSize:'50px;',
                        snapOnRelease: false,
                    },
                    on:{
                        slideChangeTransitionEnd: function(){
                            _this.tabActive = this.activeIndex;//切换结束时，告诉我现在是第几个slide
                            _this.$vux.loading.show();
                            if(_this.formatYearData.length || _this.yearData.length) {
                                _this.$vux.loading.hide();
                                return false;
                            };
                            // 遍历查询
                            _this.eachQueryNdsrFN();
                            
                        },
                    }
                })
                this.swiperObj.scrollbar.$el.css({
                    'width':'100%',
                    'background':'none',
                    'left':'0',
                });
                this.swiperObj.scrollbar.$dragEl.css({
                    'background':'#96050b',
                });
                this.swiperObj.scrollbar.updateSize();
            },
            // 遍历查询
            eachQueryNdsrFN(){
                var _this = this;
                for(var i = 0;i< this.tab2_dates.length;i++){
                    if(this.tab2_dates[i].value != 'all'){
                        this.queryNdsrFn(this.tab2_dates[i].value,i,function(){
                            
                            setTimeout(function(){
                                _this.$vux.loading.hide();
                                var arr = _this.yearData.sort((a,b)=>{return b.NIAN - a.NIAN});
                                for(var j in arr){
                                    _this.formatYearData.push(arr[j]);
                                }
                            },300);
                            
                        });
                    }
                }

            },
            // 教师月度汇总收入
            queryYdhzsrFn(){
                // 发起请求
                JSAjaxRequest({
                    url:httpApi.getSalary.queryYdhzsr,
                    data:getSha1Data({
                        "ZGH":this.userAccount
                    }),
                    success:(res)=>{
                        this.$vux.loading.hide();
                        if(res.status == 200){
                            if(!res.data) {
                                this.$vux.loading.hide();
                                alertTips('数据为空');
                                return false;
                            }else{
                                let response = res.data;
                                if(response.content){

                                    var content = JSON.parse(response.content);
                                    if(content.code != 0) alertTips(content.code);
                                    if(content.datas.length){
                                        this.screenDate(content,this.tabActive == 0?'tab1_dates':'tab2_dates');
                                    }else{
                                        this.$vux.loading.hide();
                                        alertTips('数据暂时为空');
                                    }
                                }
                            }
                        }
                    },
                    error:(error)=>{
                        this.$vux.loading.hide();
                        toastTips('请求失败，请稍后重试');
                    }
                });
            },
            // 年度薪资
            queryNdsrFn(NIAN,index,callback){
                // console.log('NIAN = ' ,NIAN,' index = ',index );
                JSAjaxRequest({
                    url:httpApi.getSalary.queryNdsr,
                    data:getSha1Data({
                        "ZGH":this.userAccount,
                        "NIAN":NIAN
                    }),
                    success:(res)=>{
                        this.$vux.loading.hide();
                        if(res.status == 200){
                            
                            if(!res.data) {
                                alertTips('数据为空');
                                return false;
                            }else{
                                let response = res.data;
                                if(response.content){
                                    var content = JSON.parse(response.content);
                                    if(content.code != 0) alertTips(content.code);
                                    console.log(NIAN,' = ',content.datas)
                                    if(content.datas.NIAN){
                                        this.yearData.push(content.datas);
                                        // 请求到最后一个的时候 或者是 传null 值时
                                        console.log(index,this.tab2_dates.length - 2)
                                        if(index == this.tab2_dates.length - 2||index == null){
                                            callback();
                                        }
                                    }
                                }
                            }
                        } 
                    },
                    error:(error)=>{
                        console.log(error)
                        this.$vux.loading.hide();
                        toastTips('请求失败，请稍后重试');
                    }
                });
            },
            
            // 筛选重复的 年 月
            screenDate(content,activeTab){
                this.monthData = [];
                var obj = {};
                if(content.datas.length == undefined){
                    var NIANYUE = content.datas.NIANYUE;
                    var year = NIANYUE.split('-')[0];
                    var month = parseInt(NIANYUE.split('-')[1])+'';
                    this.monthData.push({
                        year,
                        data:[]
                    });
                    this.monthData[0].data.push(content.datas);
                    return false;
                }
                for(var i = content.datas.length-1;i>=0;i--){
                    var NIANYUE = content.datas[i].NIANYUE;
                    var year = NIANYUE.split('-')[0];
                    var month = parseInt(NIANYUE.split('-')[1])+'';
                    var status = false;
                    if(!obj[year]){
                        status = true;
                        this.monthData.push({
                            year,
                            data:[]
                        });
                        obj[year] = 'true|'+(this.monthData.length-1);
                        this.monthData[obj[year].split('|')[1]].data.push(content.datas[i]);
                        // 添加 picker 年
                        this.tab1_dates.push({
                            name:year+'年',
                            value:year,
                            parent:0
                        });
                        this.tab2_dates.push({
                            name:year+'年',
                            value:year,
                            parent:0
                        });
                        // 添加 picker 月
                        this.tab1_dates.push({
                            name:month+'月',
                            value:month,
                            parent:year
                        });
                    }else{
                        // 重复的 年、月
                        let index = obj[year].split('|')[1];
                        this.monthData[index]['data'].push(content.datas[i]);
                        // 追加 picker 月
                        this.tab1_dates.push({
                            name:month+'月',
                            value:month,
                            parent:year
                        });
                    }
                }
                // console.log('obj = ' ,obj);
                // console.log('this.monthData = ', this.monthData);
            },
            // picker 值变化时触发
            changePickderFn(date){
                var _this = this;
                this.$vux.loading.show();
                if(date[0] == "all"){
                    if(this.tabActive == 1){
                        // 遍历查询
                        this.yearData = [];
                        this.formatYearData = [];
                        this.eachQueryNdsrFN();
                    }else{
                        this.queryYdhzsrFn();
                    }
                    
                    return false;
                }

                if(this.tabActive == 1) {
                    this.yearData = [];
                    this.formatYearData = [];
                    console.log('queryNdsrFn')
                    this.queryNdsrFn(date[0],null,function(){
                        _this.$set(_this.$data,'formatYearData',_this.yearData);
                    });
                    return false;
                }

                
                JSAjaxRequest({
                    url:httpApi.getSalary.queryYdsr,
                    data:getSha1Data({
                        "ZGH":this.userAccount,
                        "NIANYUE":date[0]+'-'+(parseInt(date[1])<10?'0'+date[1]:date[1])
                    }),
                    success:(res)=>{
                        this.$vux.loading.hide();
                        // console.log(res)
                        if(res.status != 200){alertTips(res.statusText); return false;}
                        if(!res.data) { alertTips('数据为空'); return false;}
                        var data = res.data;
                        if(!data.content) { alertTips('数据暂时为空'); return false;}
                        var content = JSON.parse(data.content);
                        if(!content.datas) {alertTips('datas 数据为空'); return false;}
                        this.screenDate(content,'');
                        

                    },
                    error:(error)=>{
                        this.$vux.loading.hide();
                        toastTips('请求失败，请稍后重试');
                    }
                });
            },


        }
    }
            

</script>
<style scoped>
    @import url(./css/salary.css);
    
    
    
</style>