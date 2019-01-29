import Vue from 'vue';
import 'swiper/dist/css/swiper.css';
import Swiper from 'swiper';
import {JSAjaxRequest,getSha1Data} from '@/common/js/ajax.js';
import {httpApi,toastTips,alertTips} from '@/common/js/common.js'
import { Confirm,TransferDomDirective as TransferDom } from 'vux';
export default {
    directives: {
        TransferDom
    },
    components:{
        Confirm
    },  
    mounted(){
        this.$nextTick(function(){
            // alert('internet')
            // 获取用户信息
            this.getUserInfo();              
            // 上网服务历史分页查询
            this.getInternetHistory();
            // 启动 swiper
            this.runSwiper();
            
        }) 
    },
    methods:{
        // 获取用户信息
        getUserInfo(){
            JSAjaxRequest({
                url:httpApi.internet.netServiceBasicInfo,
                data:getSha1Data(),
                success:(data)=>{
                    let response = data.data;
                    console.log('getUserInfo = ',response);
                    if(response.code == 0){
                        this.$set(this.$data,'userInfo',response.resData);
                    }else{
                        alertTips(response.msg);
                    }
                },
                error:(error)=>{
                    // console.log(error);
                    toastTips('请求失败，请稍后重试');
                }
            });
        },  
        // 获取上网服务历史分页查询
        getInternetHistory(){
            JSAjaxRequest({
                url:httpApi.internet.netServiceHistory,
                data:getSha1Data(),
                success:(data)=>{
                    let response = data.data;
                    if(response.code == 0){
                        console.log('getInternetHistory = ',response)
                        if(response.resData.length){
                            for(var i in response.resData){
                                this.internetHistory.push(response.resData[i])
                            }
                        }
                    }else{
                        alertTips(response.msg);
                    }
                },
                error:(error)=>{
                    // console.log('error = ' , error);
                    toastTips('请求失败，请稍后重试');
                }
            });
        },
        // 启动swiper
        runSwiper(){
            let _this = this;
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
                        if(this.activeIndex==1&&!_this.internetServerList.length){
                            _this.getInternetServerList('1');
                        }else if(this.activeIndex==2&&!_this.internetServerBindList.length){
                            _this.getInternetServerList('0');
                        }
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
        // 上网服务查询
        getInternetServerList(type){
            JSAjaxRequest({
                url:httpApi.internet.netServiceDevices,
                data:getSha1Data({
                    type // 1：在线
                }),
                success:(data)=>{
                    let response = data.data;
                    if(response.code == 0){
                        console.log('getInternetServerList = ',response);
                        if(response.resData.length){
                            this.$set(this.$data,type=='1'?'internetServerList':'internetServerBindList',response.resData);
                        }
                    }else{
                        alertTips(response.msg);
                    }
                },
                error:(error)=>{
                    console.log('error = ' , error)
                    toastTips('请求失败，请稍后重试');
                }
            });
        },
        // 解绑
        setUnbunlingFn(item){
            console.log('asdf = ',item);
            JSAjaxRequest({
                url:httpApi.internet.netServiceDeleteMac,
                data:getSha1Data({
                    "macAddress":item.macAddress
                }),
                success:(data)=>{
                    let response = data.data;
                    if(response.code == 0){
                        console.log('setUnbunlingFn = ',response);
                        this.toastModuleAuto('解绑成功','unbunling');
                    }
                },
                error:(error)=>{
                    console.log('error = ' , error);
                    toastTips('请求失败，请稍后重试');
                }
            });
        },
        // 下线
        setRollsOffFn(item){
            console.log(item)
            JSAjaxRequest({
                url:httpApi.internet.netServiceOffLine,
                data:getSha1Data({
                    "radOnlineId":item.radOnlineId
                }),
                success:(data)=>{
                    let response = data.data;
                    if(response.code == 0){
                        console.log('setRollsOffFn = ',response);
                        this.toastModuleAuto('已下线','rollsOff');
                    }else{
                        alertTips(response.msg);
                    }
                },
                error:(error)=>{
                    console.log('error = ' , error)
                    toastTips('请求失败，请稍后重试');
                }
            });
        },
        // list 控件 renameFn、rollsOffFn、unbunlingFn
        // 重命名按钮
        renameFn(item){
            // console.log('renameFn = ' ,item);  
            this.confirmShow = true;
            this.$set(this.$data,'activeItem',item);
        },
        // 下线按钮
        rollsOffFn(item){
            // console.log('rollsOffFn = ' ,item);
            this.confirmModule('下线',item);
        },
        // 解绑按钮
        unbunlingFn(item){
            console.log('unbunlingFn = ' ,item);
            this.confirmModule('解绑',item);
        },
        // 选项卡切换
        changeTabsFn(index){
            this.tabActive = index;
            this.swiperObj.slideTo(index, 300, false);

            if(index == 1 && !this.internetServerList.length){
                this.getInternetServerList('1');
            }else if(index == 2 && !this.internetServerBindList.length){
                this.getInternetServerList('0');
            }
        },
        onCancel () {
            console.log('on cancel');
        },
        onConfirm (value) {
            JSAjaxRequest({
                url:httpApi.internet.netServiceRename,
                data:getSha1Data({
                    "oldAddress":this.activeItem.macAddress,
                    "newAddress":this.activeItem.macAddress,
                    "deviceName":value
                }),
                success:(data)=>{
                    let response = data.data;
                    if(response.code == 0){
                        console.log('renameFn = ',response);
                        this.toastModuleAuto('修改成功','rename');
                    }else{
                        alertTips(response.msg);
                    }
                },
                error:(error)=>{
                    console.log('error = ' , error);
                    toastTips('请求失败，请稍后重试');
                }
            });
        },
        onShow () {
          this.$refs.confirm.setInputValue(this.activeItem.ipAddressOrName);
        },
        onHide () {
            // console.log('plugin hide');
        },
        // alert提示
        confirmModule(value,item){
            let _this = this;
            this.$vux.confirm.show({
                title: '确定要'+value+'?',
                onConfirm () {
                    if(value == '解绑'){
                        _this.setUnbunlingFn(item);
                    }else{
                        _this.setRollsOffFn(item);
                    }
                },
                onCancel () {
                    console.log('取消'+value)
                }
            }) 
        },
        // toast提示
        toastModule (value) {
            this.$vux.toast.show({
                text: value
            })
        },
        toastModuleAuto (value,type) {
            this.toastModule(value);
            setTimeout(() => {
                this.$vux.toast.hide();
                if(type == 'unbunling' || type == 'rename'){
                    this.$set(this.$data,'internetServerBindList',[]);
                    this.getInternetServerList('0');
                }else{

                    this.$set(this.$data,'internetServerList',[]);
                    this.getInternetServerList('1');
                }
                
            }, 1000)
        },
    }
}