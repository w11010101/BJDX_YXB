<template>
    <div class='score'>
        <!-- content -->
        <div class='content'>
            
            <!-- tabs -->
            <div class='tabs'>
                <ul>
                    <li class='tabs-item' v-for='(item,index) in tabs' :class='{active:index===tabActive}' @click='changeTabsFn(index)'>{{item}}</li>
                </ul>
                <div class="swiper-container">
                    <div class="scrollbar" style='height:10px;padding:0 calc((34% - 45px)/2)'>
                        <div class="swiper-scrollbar"></div>
                    </div>
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for='(item,index) in tabs'>
                            <!-- v-if -->
                            <group label-width="5em" class='popup-picker-box' gutter='0' v-if='index == 0'>
                                <popup-picker 
                                    value-text-align='left' 
                                    :columns="2" 
                                    :data="popupPickerData" 
                                    :value='popupValue' 
                                    v-model="popupValue" 
                                    show-name
                                    :placeholder='title2'
                                    @on-change='changeFn'>
                                    
                                </popup-picker>
                            </group>
                            <!-- banner -->
                            <div class='banner' v-else>
                                <h2>{{queryXqJdData.qxcjd}}</h2>
                                <p>全学程绩点</p>
                            </div>
                            <ul v-if='index == 0' >
                                
                                <li v-for='todo in allScoreData'>
                                    <div class='parts'>
                                        <h3>{{todo.time}}</h3>
                                        <ul class='list'>
                                            <li v-for='(node,index) in todo.list' v-if='typeof todo.list == "object" && todo.list.length' :setId = 'node.id||index'>
                                                <a>
                                                    <div class='parts-1'>
                                                        <h4>
                                                            <i class='sticker' :style='"background:"+colors[index%colors.length]'>{{node.scoreName.substr(0,1)}}</i>
                                                            <label for="">{{node.scoreName}}</label>
                                                        </h4>
                                                        <p><span>平时成绩：{{node.usualScore||'-'}}分</span><span>考试成绩：{{node.examScore||'-'}}分</span></p>
                                                    </div>
                                                    <div class='parts-2'>{{Math.floor(node.totalScore)}}<span>.{{node.totalScore.toString().split('.')[1]|formatScore}}</span></div>
                                                </a>
                                            </li>
                                            <li  v-else :setId = 'node.id||index'>
                                                {{todo}}
                                               <!--  <a>
                                                    <div class='parts-1'>
                                                        <h4>
                                                            <i class='sticker' :style='"background:"+colors[index%colors.length]'>{{node.scoreName.substr(0,1)}}</i>
                                                            <label for="">{{node.scoreName}}</label>
                                                        </h4>
                                                        <p><span>平时成绩：{{node.usualScore||'-'}}分</span><span>考试成绩：{{node.examScore||'-'}}分</span></p>
                                                    </div>
                                                    <div class='parts-2'>{{Math.floor(node.totalScore)}}<span>.{{node.totalScore.toString().split('.')[1]|formatScore}}</span></div>
                                                </a> -->
                                            </li>
                                        </ul>            
                                    </div>
                                </li>
                            </ul>
                            <!-- v-else -->
                            <ul class='list2' v-else>
                                <li v-for='todo in index == 1?queryXqJdData.xset:queryXnJdData.xset'>
                                    <a>
                                        <div class='parts-1'>
                                            <h4><img src="../../assets/score/icon-1.png" alt=""><label for="">{{todo.term}}</label></h4>
                                        </div>
                                        <div class='parts-2' v-if='todo.xjd!=null'>{{Math.floor(todo.xjd)}}<span>.{{todo.xjd.toString().split('.')[1]|formatScore}}</span>
                                        </div>
                                        <div class='parts-2' v-else='todo.xjd'>-</span>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                            <!--  -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- floor -->
        <!-- {{msg}} -->
        <!-- <router-view class='score-view' name='score-view'></router-view> -->
    </div>
</template>
<script type="text/javascript">
    import 'swiper/dist/css/swiper.css';
    import Swiper from 'swiper';
    import {data1,data2} from './score.js';
    import {JSAjaxRequest,getSha1Data} from '@/common/js/ajax.js';
    import {httpApi,toastTips,alertTips} from '@/common/js/common.js'
    import { Group,PopupPicker } from 'vux'

    var colors = ['#14cfa0','#4898f6','#f77539','#ebc82c','#8ab668','#439889','#3177ac','#caa52c'];
    export default {
        name: 'score',
        data(){
            return {
                title:'成绩查询',
                title2: '选择学期',
                msg:'this is score.vue',
                scrollBarTranslate:0,
                duration:0,
                tabActive:0,
                tabs:['课程成绩','学期绩点','学年绩点'],
                terms:[],
                popupPickerData:[
                    {
                        name:"全部",
                        value:'all',
                        parent:0
                    },{
                        name:"全部",
                        // value:'全部',
                        parent:'all'
                    }
                ],

                popupValue: [],
                swiperObj:{},
                data1,
                
                colors,
                popupStyle:{
                    color:'#ff5970'
                },
                allScoreData:[],
                queryXqJdData:{},
                queryXnJdData:{},
            }
        },
        // props:['title'],
        components:{
            Group,
            PopupPicker
            // 'private-header':resolve=>require(['@/components/header/header.vue'],resolve),
        },
        mounted(){
            var _this = this;
            this.$nextTick(function(){
                this.$vux.loading.show();
                this.runSwiperFn();
                // 获取学期
                this.getTermsFn();
                // 查询数据
                this.queryScoreFn();
            })
        },
        methods:{
            // 点击选项卡切换
            changeTabsFn(index){
                // console.log(index)
                this.tabActive = index;
                this.swiperObj.slideTo(index, 300, false);
                if(index == 1){
                    this.queryJdFn('queryXqJd');
                }else if(index == 2){
                    this.queryJdFn('queryXnJd');
                }
            },
            // 随机数
            randomFn(maxNum,arr){
                return arr[Math.floor(Math.random()*maxNum)]
            },
            // 获取学期
            getTermsFn(){
                JSAjaxRequest({
                    url:httpApi.getScore.getTerms,
                    data:getSha1Data(),
                    success:(data)=>{

                        let response = data.data;
                        // console.log(response)
                        if(response.code == 0){
                            if(response.resData.length == 0) return false;
                            // 排序
                            var resData = response.resData.sort(function(a,b){
                                return  b.desc.split('-')[0] - a.desc.split('-')[0]
                            });
                            for(var i in resData){
                                var objs = {};
                                objs['name'] = resData[i].desc+'学期';
                                objs['value'] = resData[i].desc;
                                objs['parent'] = 0;

                                this.popupPickerData.push(objs);
                                for(var j in resData[i].terms){
                                    var subObj = {};
                                    subObj['name'] = '第'+resData[i].terms[j]+'学期';
                                    subObj['value'] = resData[i].terms[j];
                                    subObj['parent'] = resData[i].desc;
                                    this.popupPickerData.push(subObj);
                                }

                            }
                        }else{
                            alertTips(response.msg);
                        }

                        // console.log(this.popupPickerData)
                        
                    },
                    error:(error)=>{
                        console.log(error);
                        toastTips('请求失败，请稍后重试');
                    }
                });
            },
            // 获取 全部数据 和 查询数据
            queryScoreFn(searchValue){
                if(this.allScoreData.length) return false;
                this.$vux.loading.hide();
                console.log('searchValue = ',searchValue);

                if(searchValue){
                    if(searchValue[0] == 'all'){
                        var data = getSha1Data();
                    }else{
                       var data = getSha1Data({
                            "xn":searchValue[0],
                            "xq":searchValue[1]
                        }) 
                    }
                    
                }else{
                    var data = getSha1Data();
                }
                var _this = this;
                JSAjaxRequest({
                    url:httpApi.getScore.queryScore,
                    data,
                    success:(res)=>{
                        // console.log('成绩查询1 = ',res);
                        if(res.status != 200){alertTips(res.statusText);this.$vux.loading.hide(); return false;}
                        if(!res.data) { alertTips('数据为空');this.$vux.loading.hide(); return false;}
                        var data = res.data;
                        if(!data.resData) { this.$vux.loading.hide(); return false;}
                        var resData = data.resData;
                        // console.log('成绩查询 = ',resData);
                        var arr = []
                        for(var i in resData){
                            arr.unshift({
                                time:i.substr(0,9)+'第'+(i.substr(10) == 1?'一':'二')+'学期',
                                list:resData[i]
                            })

                        }
                        // console.log('成绩查询 = ',this.allScoreData);
                        arr.sort((a,b)=>{return parseInt(b.time.replace(/-/g,'')) - parseInt(a.time.replace(/-/g,'')) });
                        // console.log('arr = ',arr)
                        this.$set(this.$data,'allScoreData',arr);
                        console.log('this.allScoreData = ' ,this.allScoreData)
                    },
                    error:(error)=>{
                        console.log(error);
                        toastTips('请求失败，请稍后重试');
                    }
                });
            },
            // 学期绩点
            queryJdFn(type){
                if( type=='queryXqJd'){
                    var url = httpApi.getScore.queryXqJd;
                }else if(type = 'queryXnJd'){
                    var url = httpApi.getScore.queryXnJd;
                }
                if(this[type+'Data'].length) return false;
                this.$vux.loading.hide();
                JSAjaxRequest({
                    url:url,
                    data:getSha1Data(),
                    success:(res)=>{
                        if(res.status != 200){alertTips(res.statusText);this.$vux.loading.hide(); return false;}
                        if(!res.data) { alertTips('数据为空');this.$vux.loading.hide(); return false;}
                        var data = res.data;
                        if(!data.resData) { alertTips('数据暂时为空');this.$vux.loading.hide(); return false;}
                        var resData = data.resData;
                        resData.xset.sort((a,b)=>{return parseInt(b.term.replace(/-/g,'')) - parseInt(a.term.replace(/-/g,'')) })
                        console.log(type ,'学期绩点 = ',resData);

                        this.$set(this.$data,type+'Data',resData);
                        
                    },
                    error:(error)=>{
                        console.log(error);
                        toastTips('请求失败，请稍后重试');
                    }
                });
            },
            // popupPicker change 
            changeFn(){
                console.log(this.popupValue);

                this.allScoreData = [];
                this.queryScoreFn(this.popupValue);
                
            },

            runSwiperFn(){
                var _this = this;
                this.swiperObj = new Swiper ('.swiper-container', {
                    direction: 'horizontal', // 垂直切换选项
                    scrollbar: {
                        el: '.swiper-scrollbar',
                        dragSize:'45px;',
                        snapOnRelease: false,
                    },
                    on:{
                        slideChangeTransitionEnd: function(){
                            console.log(this.activeIndex)
                            switch(this.activeIndex){
                                case 0:
                                    _this.queryScoreFn();
                                break;
                                case 1:
                                    _this.queryJdFn('queryXqJd');
                                break;
                                case 2:
                                    _this.queryJdFn('queryXnJd');
                                break;
                            }
                            _this.tabActive = this.activeIndex;//切换结束时，告诉我现在是第几个slide
                        }
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
            

        },
        filters:{
            formatScore(value){
                return (parseInt(value)<=9&&parseInt(value)>0)?value+'0':'00';
            }
        }


    }

            

</script>
<style scoped>
    @import url(score.css);
    .popup-picker-box /deep/ .vux-cell-primary{
        padding-left: .15rem
    }
    .popup-picker-box /deep/ .weui-cells:before,
    .popup-picker-box /deep/ .weui-cells:after{
        display: none;
    }
    .popup-picker-box /deep/ .weui-label,
    .popup-picker-box /deep/ .vux-popup-picker-value,
    .popup-picker-box /deep/ .vux-popup-picker-placeholder{
        font-size: 14px;
        color:#9b9b9b;
    }
    .popup-picker-box /deep/ .weui-cell_access .weui-cell__ft:after{
        height: 12px;
        width: 12px;
        border-width: 0 1px 1px 0;
        margin-top:-10px;
        right: 10px;
    }
    
</style>