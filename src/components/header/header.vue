<template>
    <div id="header">
        <header class="">
        <!-- <header class="" v-show='!title.includes("Menu")'> -->
            <Button type="text" class='backBtn' @click='goBack' v-if='backShow'></Button>
            <label>{{title}}</label>
            <Button type="text" class='menuBtn' :setSelect='select' @click='showactionsheetShow'></Button>
            <!-- <Button type="text" class='menuBtn' :setSelect='select' v-popup='popupArr'></Button> -->
            <Button type="text" class='closeBtn' @click='closeFn'></Button>
        </header>

        <actionsheet v-model="actionsheetShow" :menus="popupArr" @on-click-menu="clickFn" show-cancel ></actionsheet>
    </div>
</template>
<script type="text/javascript">
    import router from '@/router';
    import { Actionsheet } from 'vux';
    export default {
        name: 'myHeader',
        data(){
            return {
                value:'成绩查询',
                title:'Menu',
                backShow:true,
                popupArr:[
                    {
                        label:'option-1',
                        optionID:1,
                        menuKey:1,
                    },
                    {
                        label:'option-2',
                        optionID:2,
                        menuKey:2,
                    }
                ],
                select:null,
                actionsheetShow:false,
                headerPopupActive:''
            }
        },
        components:{
            Actionsheet
        },
        props:['popupactive'],
        watch: {
            '$route'(to,from){
                this.title = to.meta.pageName||from.meta.pageName;
                
                if(to.meta.index == 1){
                    this.backShow = false;
                }else{
                    this.backShow = true;
                }
            }
        },
        mounted(){
            this.$nextTick(function(){
                console.log(this.popupactive)
            })
            this.title = router.history.current.meta.pageName;
        },
        methods:{
            goBack(){
                console.log(this.$route)
                // router.go(this.$route.matched[this.$route.matched.length-1]);
                router.back();
                // router.go(-1);
            },
            popupFn(){
                console.log('popupFn');
            },
            closeFn(){
                // console.log('closeFn');
                var deviceInfo = window.navigator.appVersion;
                
                if(deviceInfo.includes('iPhone')){
                    // alert('iPhone');
                    window.webkit.messageHandlers.closePage.postMessage(null);
                }else{
                    // alert('android');
                    window.AndroidWebView.closePage();
                }
            },
            showactionsheetShow(){
                this.actionsheetShow = true;
            },
            clickFn(key,value){
                if(key != 'cancel'){
                    console.log('key = ',key);
                    console.log('value = ',value);
                    this.$emit('update:popupactive',value.label);
                    this.headerPopupActive = value.label
                }else{
                    console.log('cancel')
                }
                
            }
        }
    }
</script>
<style scoped>
    header{
        height: .5rem;
        line-height: .5rem;
        font-size: .16rem;
        position: relative;
    }
    #header button{
        width: .3rem;
        height: .3rem;
        position: absolute;
        top:.1rem;
        padding:0;
        color:#6b6b6b;
    }
    .backBtn{
        left:.1rem;

        background: url(../../assets/icon/back@2x.png) no-repeat center;
        -webkit-background-size: .2rem;
        background-size: .2rem;
    }
    .menuBtn{
        width: .3rem;
        height: .3rem;
        line-height: .15rem;
        font-size: .2rem;
        right:.45rem;
        background: url(../../assets/icon/ico-dot@2x.png) no-repeat center;
        -webkit-background-size: .2rem;
        background-size: .2rem;
    }
    .closeBtn{
        width: .3rem;
        right:.1rem;
        background: url(../../assets/icon/ico-close@2x.png) no-repeat center;
        -webkit-background-size: .25rem;
        background-size: .25rem;
    }
</style>