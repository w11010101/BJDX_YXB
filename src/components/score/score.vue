<template>
    <div class='score'>
        <!-- content -->
        <div class='content'>
            <!-- banner -->
            <div class='banner'>
                <h2>3.63</h2>
                <p>全学程绩点</p>
            </div>
            <!-- tabs -->
            <div class='tabs'>
                <ul>
                    <li class='tabs-item' v-for='(item,index) in tabs' :class='{active:index===tabActive}' @click='changeTabsFn(index)'>{{item}}</li>
                </ul>
                <!-- my scrollbar -->
                <!-- <div class="scrollbar-container">
                    <div class="scrollbar-drag" 
                    :style='"transform: translate3d("+((-scrollBarTranslate/3).toFixed(2))+"px, 0px, 0px);transition-duration:"+duration+"ms;"'></div>
                </div> -->
                <div class="swiper-container">
                    <div class="scrollbar" style='height:10px;padding:0 calc((33% - 65px)/2)'>
                        <div class="swiper-scrollbar"></div>
                    </div>
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for='(item,index) in tabs'>
                            <!-- v-if -->
                            <ul v-if='index == 0' >
                                <li v-for='todo in data1'>
                                    <div class='parts'>
                                        <h3>{{todo.time}}</h3>
                                        <ul class='list'>
                                            <li v-for='(node,index) in todo.nodes' v-if='todo.nodes.length' :setId = 'node.id'>
                                                <a>
                                                    <div class='parts-1'>
                                                        <h4>
                                                            <i class='sticker' :style='"background:"+colors[index%colors.length]'>{{node.name.substr(0,1)}}</i>
                                                            <label for="">{{node.name}}</label>
                                                        </h4>
                                                        <p><span>平时成绩：{{node.score1}}分</span><span>考试成绩：{{node.score2}}分</span></p>
                                                    </div>
                                                    <div class='parts-2'>{{Math.floor(node.score)}}<span>.{{node.score.toString().split('.')[1]||'00'}}</span></div>
                                                </a>
                                            </li>
                                        </ul>            
                                    </div>
                                </li>
                            </ul>
                            <!-- v-else -->
                            <ul v-else>
                                <li v-for='todo in data2'>
                                    <div class="parts">
                                        <h3>{{todo.time}}</h3>
                                        <ul class='list2'>
                                            <li v-for='node in todo.nodes' :setId='node.id'>
                                                <a>
                                                    <div class='parts-1'>
                                                        <h4><img src="../../assets/score/icon-1.png" alt=""><label for="">{{node.name}}</label></h4>
                                                    </div>
                                                    <div class='parts-2'>{{Math.floor(node.score)}}<span>.{{node.score.toString().split('.')[1]||'00'}}</span>
                                                    </div>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
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
    import mui from '../../../static/plugin/mui/js/mui.min.js'
    import '../../../static/plugin/mui/css/mui.picker.min.css'
    import picker from '../../../static/plugin/mui/js/mui.picker.min.js'
    console.log(picker);
    var colors = ['#14cfa0','#4898f6','#f77539','#ebc82c','#8ab668','#439889','#3177ac','#caa52c'];
    export default {
        name: 'score',
        data(){
            return {
                title:'成绩查询',
                msg:'this is score.vue',
                scrollBarTranslate:0,
                duration:0,
                tabActive:0,
                tabs:['课程成绩','学期绩点','学年绩点'],
                swiperObj:{},
                data1,
                data2,
                colors,
            }
        },
        // props:['title'],
        // components:{
        //     'private-header':resolve=>require(['@/components/header/header.vue'],resolve),
        // },
        mounted(){
            var _this = this;
            this.$nextTick(function(){
                this.swiperObj = new Swiper ('.swiper-container', {
                    direction: 'horizontal', // 垂直切换选项
                    scrollbar: {
                        el: '.swiper-scrollbar',
                        dragSize:'65px;',
                        snapOnRelease: false,
                    },
                    on:{
                        slideChangeTransitionEnd: function(){
                            _this.tabActive = this.activeIndex;//切换结束时，告诉我现在是第几个slide
                        },
                        //=================
                        // ------------------- state -------------------
                        // touchStart:function(){
                        //     _this.scrollBarTranslate = this.getTranslate();
                        //     console.log('touchStart = ',this.getTranslate());
                        // },
                        // touchEnd:function(){

                        //     console.log('touchEnd = ',this.getTranslate());
                        // },
                        // transitionStart:function(){
                        //     _this.duration = 300;

                        //     _this.scrollBarTranslate = this.getTranslate();
                        //     console.log('transitionStart = ',this.getTranslate());
                        // },
                        // transitionEnd:function(){
                        //     _this.duration = 0;
                        //     _this.scrollBarTranslate = this.getTranslate();
                        //     console.log('transitionEnd = ',this.getTranslate());
                        // },
                        // // ------------------- move -------------------
                        // // move
                        // sliderMove: function(event){
                        //     _this.scrollBarTranslate = this.getTranslate();
                        //     // console.log('sliderMove = ',this.getTranslate());
                        // },
                        // setTranslate:function(){
                        //     // _this.scrollBarTranslate = this.getTranslate();
                        //     // console.log('setTranslate = ',this.getTranslate());
                        // },
                        // // ------------------- change -------------------
                        // // change
                        // slideChangeTransitionStart:function(){
                        //     console.log('slideChangeTransitionStart = ',this.getTranslate());
                        //     // _this.scrollBarTranslate = this.getTranslate();
                        // },
                        // slideChangeTransitionEnd:function(){
                        //     console.log('slideChangeTransitionEnd = ',this.getTranslate());
                        //     // _this.scrollBarTranslate = this.getTranslate();
                        // },
                        // slideChange:function(){
                        //     console.log('slideChange = ',this.getTranslate());
                        //     // _this.scrollBarTranslate = this.getTranslate();
                        // }
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
            })
        },
        methods:{
            // 选项卡切换
            changeTabsFn(index){
                this.tabActive = index;
                this.swiperObj.slideTo(index, 300, false);
            },
            // 随机数
            randomFn(maxNum,arr){
                return arr[Math.floor(Math.random()*maxNum)]
            },
            setIntervalFn(){
                
            }
        }
    }

            

</script>
<style scoped>
    @import url(score.css);
</style>