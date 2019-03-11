<template>
    <div class="volunteer-detail">
        <div class="content">
            <div class='banner'>
                <img :src="item.iconUrl" alt="">
            </div>
            <div class='volunteer-title'>
                <h1>{{item.name}}</h1>
                <button class='going' v-if='item.state == 1'>正在活动</button>
                <button class='before' v-else-if='item.state==3'>招募中</button>
                <button class='end' v-else>已结束</button>
                <img :src="selectSignUpState(item.signUpState)" alt="" >
            </div>
            <!-- info -->
            <div class='volunteer-content'>
                <h2>活动概况</h2>
                <div>
                    <label for="">开始时间：</label>
                    <p>{{item.beginTime?item.beginTime.substr(0,10):'-'}}</p>
                </div>
                <div>
                    <label for="">结束时间：</label>
                    <p>{{item.beginTime?item.endTime.substr(0,10):'-'}}</p>
                </div>
                <div>
                    <label for="">截止时间：</label>
                    <p>{{item.cutOffTime?item.endTime.substr(0,10):'-'}}</p>
                </div>
                <div>
                    <label for="">招募人数：</label>
                    <p>{{item.alreadySignUpCount}}人</p>
                </div>
                <div>
                    <label for="">活动组织者：</label>
                    <p>{{item.originazeName}}人</p>
                </div>
                
                <div>
                    <label for="">组织人数：</label>
                    <p>已报名{{item.totalPerson}}人</p>
                </div>
                <div>
                    <label for="">活动时长：</label>
                    <p>{{item.time}}小时</p>
                </div>
                <div>
                    <label for="">活动地点：</label>
                    <p>{{item.address}}</p>
                </div>
            </div>
            <div class='volunteer-content'>
                <h2>活动详情</h2>
                <p class='detail'>{{item.content}}</p>
            </div>
            
            <!-- <alert v-model="show"  @on-show="onShow" @on-hide="onHide">报名中。。。</alert> -->
        </div>
        <button class='floot-btn' @click='submitFn' v-if='item.state == 1'>{{item.signUpState == 0?"立即报名":"取消报名"}}</button>
        <!-- router-view -->
        <transition name="slide-fade">
            <router-view class='sub-components-view' name='volunteer-form-view'></router-view>
        </transition>
    </div>
</template>
<script>
    import route from '@/router';
    import {JSAjaxRequest,getSha1Data,getAESdecrypt} from '@/common/js/ajax.js';
    import {httpApi,toastTips,alertTips} from '@/common/js/common.js';
    import { Alert } from 'vux'
    export default ({
        data(){
            return {
                msg: 'this is volunteer-detail.vue',
                title: '志愿服务',
                serverId:'',
                show:false,
                item:{}
            }
        },
        watch:{
            '$route'(to,from){
                console.log('from = ' ,from)
            }

        },
        mounted(){
            this.serverId = this.$route.params.items;
            this.getServerDetail(this.serverId);
        },
        components:{
            Alert
        },
        methods:{
            // 获取活动详情
            getServerDetail(id){
                this.$vux.loading.show();
                JSAjaxRequest({
                    url:httpApi.getH5Service.h5ServiceDetail,
                    data:getSha1Data({
                        id:id
                    }),
                    success:(res)=>{
                        // console.log('获取服务列表详情 = ' , res);
                        if(res.status == 200){
                            if(!res.data) {alertTips('数据为空'); this.$vux.loading.hide();return false;}
                            var data = res.data;
                            if(data.code!=0){alertTips(data.msg); this.$vux.loading.hide();return false;}
                            var resData = data.resData;
                            console.log('获取服务列表详情 = ' , resData);
                            this.$set(this.$data,'item',resData)
                            // if(resData.list.length == 0){alertTips('数据暂时为空'); return false;}
                            this.$vux.loading.hide();
                            
                            
                        }else{
                            this.$vux.loading.hide();
                            // alertTips(res.statusText)
                        }
                        
                    },
                    error:(err)=>{
                        // console.log('获取服务列表详情 = ' , err);
                        this.$vux.loading.hide();
                    }
                })
            },
            // 报名  or 取消报名
            submitFn(){
                var _this = this;
                var params = {
                    signUpState:this.item.signUpState, 
                    activityNumber:this.item.activityNumber,
                    time:this.item.time, 
                }
                
                if(this.$route.path.includes('search')||this.$route.path.includes('history')){
                    
                    if(this.item.signUpState){
                        this.$vux.confirm.show( {
                            content:'确定要取消报名吗？',
                            onCancel () {
                                route.go(-1);
                            },
                            onConfirm () {
                                _this.cancelSignUpFn(_this.item.phone);
                            }
                        })
                    }else{
                        route.push({
                            path:this.$route.path+'/form',
                            query:params
                        })
                    }
                }else{
                    if(this.item.signUpState){
                        this.$vux.confirm.show({
                            content:'确定要取消报名吗？',
                            onCancel () {
                                route.go(-1);
                            },
                            onConfirm () {
                                console.log(_this.item.phone)
                                _this.cancelSignUpFn(_this.item.phone);
                            }
                        })
                    }else{
                        route.push({
                            name:'form',
                            params:params,
                        })
                    }
                    
                }
            },
            cancelSignUpFn(phone){
                var _this = this;
                JSAjaxRequest({
                    url:httpApi.getH5Service.h5ServiceSignUpOrCancle,
                    data:getSha1Data({
                        "type":"0",  //1：报名  0：取消报名
                        "hdbh":_this.item.activityNumber,//活动编号
                        "fwsc":_this.item.time,  //活动时长,
                        "phone":phone,
                    }),
                    success:(res)=>{
                        if(res.status == 200){
                            if(!res.data) {alertTips('数据为空'); return false;}
                            var data = res.data;
                            if(data.code!=0){alertTips(data.msg); return false;}
                            var resData = data.resData;
                            toastTips(resData);
                            setTimeout(function(){
                                route.go(-1);
                            },500);
                            
                        }else{
                            _this.$vux.loading.hide();
                            alertTips(res.statusText)
                        }
                    },
                    error:(err)=>{
                        _this.$vux.loading.hide();
                    }
                })
                
            },
            onShow(){
                console.log('show');
            },
            onHide(){
                console.log('hide');
            },
            selectSignUpState(state){
                console.log(state)
                if(state!=undefined){
                    return require('@/assets/volunteer/signup-'+state+'.png')
                }else{
                    return ''
                }
                
            }
        }

    })
</script>
<style scoped>
    @import url(./css/volunteer.css);
    
</style>