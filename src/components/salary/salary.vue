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
                            <ul >
                                <li v-for='todo in data1'>
                                    <div class='parts'>
                                        <h3>{{todo.time}}</h3>
                                        <ul class='list'>
                                            <li v-for='(node,index) in todo.nodes' v-if='todo.nodes.length' :setId = 'node.id'>
                                                <router-link to='/salary/salary-detail'>
                                                    <div class='parts-1'>
                                                        <span>{{node.month}}月</span>
                                                    </div>
                                                    <div class='parts-2'>
                                                        <div>
                                                            每月的应发额
                                                            <p>{{node.data1}}元</p>
                                                        </div>
                                                        <div>
                                                            实发额
                                                            <p>{{node.data2}}元</p>
                                                        </div>
                                                        <div>
                                                            扣税
                                                            <p>{{node.data3}}元</p>
                                                        </div>
                                                        <div>
                                                            住房公积金
                                                            <p>{{node.data4}}元</p>
                                                        </div>
                                                    </div>
                                                </router-link>
                                            </li>
                                        </ul>            
                                    </div>
                                </li>
                            </ul>
                            <!-- btn -->
                            <button @click="clickfn(index)" 
                                class='salary-select-btn'>单月筛选value: {{index == 0?tab1_pickerVal:tab2_pickerVal}}</button>
                            <group>
                                <popup-picker 
                                    v-if= 'index == 0'
                                    :show.sync="tab1_showPopupPicker" 
                                    :show-cell="false" 
                                    :columns="2" 
                                    title="TEST" 
                                    :data="tab1_dates" 
                                    v-model="tab1_pickerVal">
                                </popup-picker>
                                <popup-picker 
                                    v-else
                                    :show.sync="tab2_showPopupPicker" 
                                    :show-cell="false" 
                                    :columns="2" 
                                    title="TEST" 
                                    :data="tab2_dates" 
                                    v-model="tab2_pickerVal">
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
    import {data1} from './js/salary.js';
    import { Group,PopupPicker } from 'vux';
    export default {
        name: 'salary',
        data(){
            return {
                title:'成绩查询',
                title2: '选择学期',
                msg:'this is salary.vue',
                tabActive:0,
                tabs:['月度薪资查询','年度薪资查询'],
                swiperObj:{},
                data1,
                // tab1
                tab1_showPopupPicker:false,
                tab1_pickerVal:[],
                tab1_dates:[],
                // tab2
                tab2_showPopupPicker:false,
                tab2_pickerVal:[],
                tab2_dates:[],
                
            }
        },
        components:{
            Group,
            PopupPicker,
        },
        mounted(){
            var _this = this;
            this.$nextTick(function(){
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

                this.getDates({
                    startTime:2015,
                    type:'ym',
                    key:'tab1_dates'
                });
                this.getDates({
                    startTime:2015,
                    type:null,
                    key:'tab2_dates'
                });
            });
            
        },
        methods:{
            // // 选项卡切换
            changeTabsFn(index){
                this.tabActive = index;
                this.swiperObj.slideTo(index, 300, false);
            },
            clickfn(index){
                console.log(index,this.tab1_showPopupPicker)
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
            }
        }
    }
            

</script>
<style scoped>
    @import url(./css/salary.css);
    
    
    
</style>