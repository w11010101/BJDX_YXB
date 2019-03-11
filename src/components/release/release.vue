<template>
    <div class="release">
        <!-- <a class='release-backBtn' @click='backFn'></a> -->
        <div class="appImg-container">
            <div v-if='bgFileType=="video"' class='bgVideo'>
                <video width="375" height="667" autoplay=autoplay loop muted :src="info.backgroundUrl">
                    <source  type="video/mp4">
                    不支持
                </video>
                <!-- <video width="375" height="667" autoplay=autoplay loop muted src="@/assets/release/bg-video-1.mp4">
                    <source  type="video/mp4">
                    不支持
                </video> -->
                <div class="videoMask"></div>
            </div>
            <img :src="info.backgroundUrl" alt="" v-else >
            <div class='app-content'>
                <h3>{{info.topWords}}</h3>
                <div class='app-floor'>
                    <h4>{{info.description}}</h4>
                    <div class='btns'>
                        <img :src="info.qrcodeUrl" alt="">
                        <div>
                            <a :href='info.androidUrl'><Icon type="logo-android" />android</a>
                            <a :href='info.iosUrl'><Icon type="logo-apple" />app store</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import {JSAjaxRequest,getSha1Data,getAESdecrypt} from '@/common/js/ajax.js';
    import {httpApi,toastTips,alertTips} from '@/common/js/common.js';
    import router from '@/router';
    export default ({
        data(){
            return {
                msg: 'this is release.vue',
                title: '发布页',
                bgFileType:'video',
                info:{

                },
                previewData:{

                }
            }
        },
        mounted(){
            this.getH5DeployeeInfo();
            
        },
        methods:{
            getH5DeployeeInfo(){
                // var data = getSha1Data();
                // data['token'] = '';
                // console.log(data)
                JSAjaxRequest({
                    url:'https://appadmin.bjmu.edu.cn:443/app/h5DeployeeInfo',
                    data:getSha1Data(),
                    success:(data)=>{
                        let response = data.data;
                        console.log('h5DeployeeInfo = ',response);
                        if(response.code == 0){
                            this.bgFileType = response.resData.type?"bg":'video';
                            console.log(this.bgFileType)
                            this.$set(this.$data,'info',response.resData);
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
            backFn(){
                router.go(-1)
            },
        }
    })
</script>
<style>
    .appImg-container{
        position: relative;
        width: 100%;
        height: 100%;
    }
    .appImg-container h3{
        position: absolute;
        width: 100%;
        font-size: .18rem;
        line-height: .5rem;
        top:.3rem;
        color:#000;
    }
    .appImg-container >img{
        position: absolute;
        width: 100%;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        bottom: 0

    }
    .bgVideo{
        position: absolute;
        top:0;
        left:0;
        color:#fff;
    }
    .videoMask{
        position: absolute;
        width: 100%;
        height:100%;
        top:0;
        left:0;
        z-index: 1;
    }
    .app-floor{
        position: absolute;
        width: 90%;
        bottom: .3rem;
        left:50%;
        z-index: 2;
        margin-left: -45%;

    }
    .app-floor h4{
        font-size: .24rem;
        color:#dbdbdb;
        margin-bottom: .3rem;
    }
    .app-floor .btns {
        width: 100%;
        font-size: 0;
        text-align: center; 
    }
    .app-floor .btns img{
        display: inline-block;
        width: 1.2rem;
        height:1.2rem;
        border:1px solid #dbdbdb;
        border-radius: 5px;
        padding:.05rem;
        background: #fff;
        vertical-align: middle;
    }
    .app-floor .btns >div{
        vertical-align: middle;
        width: 1rem;
        display: inline-block;
        margin-left:.2rem; 
    }
    /*.app-floor .btns button,*/
    .app-floor .btns a{
        display: inline-block;
        margin:.1rem 0;
        width: 1rem;
        padding: .1rem 0;
        font-size: .16rem;
        border:1px solid #dbdbdb;
        border-radius: 5px;
        background: #fff;
    }
    .release-backBtn{
        position: absolute;
        width: .45rem;
        height: .45rem;
        z-index: 999;
        left:.1rem;
        top:.1rem;
        background: url(../../assets/icon/back@2x.png) no-repeat center;
        -webkit-background-size: .2rem;
        background-size: .2rem;
    }
</style>