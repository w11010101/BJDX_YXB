<template>
    <div class="volunteer-form">
        <ul class='group'>
            <li><label>学号</label><span>{{userInfo.number}}</span></li>
            <li><label>姓名</label><span>{{userInfo.name}}</span></li>
            <li><label>性别</label><span>{{userInfo.sex == 0?'-':userInfo.sex == 1?"男":"女"}}</span></li>
            <li><label>学院</label><span>{{userInfo.dept}}</span></li>
            <li><label>年级</label><span>{{userInfo.grade||'-'}}</span></li>
            <!-- <li><label>学生类型</label><span>研究生</span></li> -->
            <li>
                <group><x-switch title="是否在校" v-model="userInfo.isInSchool==1?true:false" disabled ></x-switch></group>
            </li>
        </ul>
        <div class='edit'>
            <ul class='group'>
                <li><label>联系电话</label><input type="tel" class='phone' v-model='userInfo.phone' placeholder="输入电话号码" maxlength="11" @blur='onblurFn'></li>
            </ul>
            
        </div>
        <button class='floot-btn' @click='submitFn'>{{item.signUpState == 0?"立即报名":"取消报名"}}</button>
        <loading :show="loadingshow" text=""></loading>
    </div>
</template>
<script>
    import route from '@/router';
    import Vue from 'vue'
    import {JSAjaxRequest,getSha1Data,getAESdecrypt} from '@/common/js/ajax.js';
    import {httpApi,toastTips,alertTips} from '@/common/js/common.js';
    import { Group ,XSwitch, Loading} from 'vux'
    export default ({
        data(){
            return {
                msg: 'this is volunteer-form.vue',
                title: '志愿服务',
                transitionName:"slide-fade",
                phone:'',
                switchvalue:false,
                loadingshow:false,
                userInfo:'',
                item:{}
            }
        },
        components: {
            Group,
            XSwitch,
            Loading
        },  
        watch:{
            
        },
        mounted(){
            console.log('报名 = ',this.$route);
            if(this.$route.path.includes('search')||this.$route.path.includes('history')){
                this.$set(this.$data,'item',this.$route.query);
            }else{
                this.$set(this.$data,'item',this.$route.params);
            }
            
            this.gitUserInfo();
        },
        methods:{
            submitFn(){
                if(this.userInfo.phone == ''){
                    this.$vux.toast.text('手机号能为空');
                }else if(this.userInfo.phone.length< 11){
                    this.$vux.toast.text('手机号不正确');
                }else{
                    // this.loadingshow = true;
                    this.SignUpFn(this.userInfo.phone)
                }
                
            },
            // 获取当前登录的用户的个人报名信息
            gitUserInfo(){
                JSAjaxRequest({
                    url:httpApi.getH5Service.h5ServiceGetVolunteerInfo,
                    data:getSha1Data(),
                    success:(res)=>{
                        if(res.status == 200){

                            if(!res.data) {alertTips('数据为空'); this.$vux.loading.hide();return false;}
                            var data = res.data;
                            if(data.code!=0){alertTips(data.msg); this.$vux.loading.hide();return false;}
                            // console.log('个人报名信息2 = ' , data);
                            var resData = data.resData;
                            console.log('个人报名信息2 = ' , resData);
                            this.$set(this.$data,'userInfo',resData);
                            
                            
                        }else{
                            this.$vux.loading.hide();
                            alertTips(res.statusText)
                        }
                        
                    },
                    error:(err)=>{
                        console.log('获取服务列表详情 = ' , err);
                        this.$vux.loading.hide();
                    }
                })
            },
            // 报名  or 取消报名
            SignUpFn(phone){
                var _this = this;
    
                    
                JSAjaxRequest({
                    url:httpApi.getH5Service.h5ServiceSignUpOrCancle,
                    data:getSha1Data({
                        "type":"1",  //1：报名  0：取消报名
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
                                route.go(-2);
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
            onblurFn(){
                console.log('on blur')
                window.scroll(0,0)
            },

        }
    })
</script>
<style scoped="">
    @import url(./css/volunteer.css);
    .group /deep/ .vux-no-group-title {
        margin-top:.03rem;
    }
    .group /deep/ .weui-cells:before,.group /deep/ .weui-cells:after{
        display: none;
    }
    .group /deep/ .vux-no-group-title label{
        padding-left:.1rem;
    }
    .group .phone{
        height: .5rem;
        padding:.1rem 0;
        border:0;
        -webkit-user-select: auto;
        -moz-user-select: auto;
        -ms-user-select: auto;
        user-select: auto;
    }
</style>