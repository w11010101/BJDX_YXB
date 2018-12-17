<template>
    <div id="header">
        <!-- <header class=""> -->
        <header class="" v-show='!title.includes("Menu")'>
            <!-- v-show='!title.includes("Menu")' -->
            <Button type="text" class='backBtn' @click='goBack' v-if='backShow'></Button>
            <label>{{title}}</label>
            <Button type="text" class='menuBtn' :setSelect='select' v-popup='popupArr'></Button>
            <Button type="text" class='closeBtn' @click='closeFn'></Button>
        </header>

    </div>
</template>
<script type="text/javascript">
    import router from '@/router';
    export default {
        name: 'myHeader',
        data(){
            return {
                value:'成绩查询',
                title:'Menu',
                backShow:true,
                popupArr:[
                    {
                        value:'option-1',
                        optionID:1,
                    },
                    {
                        value:'option-2',
                        optionID:2,
                    }
                ],
                select:null
            }
        },
        // props:['title'],
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
            // console.log(router.history.current)
            this.title = router.history.current.meta.pageName;
        },
        methods:{
            goBack(){
                router.go(-1);
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
            }
        }
    }
</script>
<style scoped>
    header{
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        position: relative;
    }
    header:after{
        /*content:' ';*/
        position: absolute;
        width:100%;
        height: 1px;
        background:#ccc;
        left:0;
        bottom: 0;
    }
    #header button{
        width: 30px;
        height: 30px;
        position: absolute;
        top:10px;
        padding:0;
        color:#6b6b6b;
    }
    .backBtn{
        left:10px;

        background: url(../../assets/icon/back@2x.png) no-repeat center;
        -webkit-background-size: 20px;
        background-size: 20px;
    }
    .menuBtn{
        width: 30px;
        height: 30px;
        line-height: 15px;
        font-size: 20px;
        right:45px;
        background: url(../../assets/icon/ico-dot@2x.png) no-repeat center;
        -webkit-background-size: 20px;
        background-size: 20px;
    }
    .closeBtn{
        width: 30px;
        right:10px;
        background: url(../../assets/icon/ico-close@2x.png) no-repeat center;
        -webkit-background-size: 25px;
        background-size: 25px;
    }
</style>