<template>
    <div class='student-revenue-detail'>
        <!-- content -->
        <div class='content'>
            <label class='title'>{{title}}</label>
            <p class='revenue'><span>{{info.SFE}}</span></p>
            <p class='NIANYUE'><span v-if='info.NIANYUE'>{{info.NIANYUE.substr(0,4)+'年 '+info.NIANYUE.substr(4)+'月'}}</span></p>
            <div class='revenue-detail'>
                <div>
                    <label>发放时间</label><span v-if='info.FFSJ'>{{info.FFSJ.substr(0,10)}}</span>
                </div>
                <div class='org'>
                    <label>发放部门名称</label><span>{{info.FFBMMC}}</span>
                </div>
                <div>
                    <label>备注</label><span>{{info.BZ}}</span>
                </div>
                <div v-if='info.KS'>
                    <label>应发额</label><span>{{info.YFE}}</span>
                </div>
                <div v-if='info.KS'>
                    <label>扣税</label><span>{{info.KS}}</span>
                </div>
                <div >
                    <label>实发额</label><span>{{info.SFE}}</span>
                </div>
                <!--  -->
                <div class='line'></div>
                <!-- 奖学金 -->
                <div v-if='info.JXJ'>
                    <label>奖学金</label><span>{{info.JXJ}}元</span>
                </div>
                <div v-if='info.BUZ'>
                    <label>补助</label><span>{{info.BUZ}}元</span>
                </div>
                <div v-if='info.ZXJ'>
                    <label>助学金</label><span>{{info.ZXJ}}元</span>
                </div>
                <!-- 勤工助学 -->
                <div v-if='info.QGZX'>
                    <label>勤工助学</label><span>{{info.QGZX}}元</span>
                </div>
                <!-- 物价副食补助 -->
                <div v-if='info.WJFS'>
                    <label>物价副食补助</label><span>{{info.WJFS}}元</span>
                </div>
                <div v-if='info.SHBZ'>
                    <label>生活补助</label><span>{{info.SHBZ}}元</span>
                </div>
                <div v-if='info.KNBZ'>
                    <label>困难补助</label><span>{{info.KNBZ}}元</span>
                </div>
                <div v-if='info.LSBF'>
                    <label>临时补发</label><span>{{info.LSBF}}元</span>
                </div>
                <div v-if='info.LSKF'>
                    <label>临时扣发</label><span>{{info.LSKF}}元</span>
                </div>
                <!-- 三助 -->
                <div v-if='info.SZ'>
                    <label>研究生三助</label><span>{{info.SZ}}元</span>
                </div>

            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import {JSAjaxRequest,getSha1Data,getAESdecrypt} from '@/common/js/ajax.js';
    import {httpApi,toastTips,alertTips} from '@/common/js/common.js';
    export default {
        name: 'student-revenue-detail',
        data(){
            return {
                msg:'this is student-revenue-detail.vue',
                title:'',
                info:{},
                queryApiArr:[
                    'queryXsYdjxj', // 奖学金
                    'queryXsYdqgzx', // 勤工助学
                    'queryXsYdwjfsbz', // 物价副食补助
                    'queryXsYdyjssz', // 研究生三助
                ],
                XH:'',
                queryXsJxjData:[],
                queryXsQgzxData:[],
                queryXsWjfsbzData:[],
                queryXsYjsszData:[],
            }
        },
        components:{
            
        },
        mounted(){
            this.$set(this.$data,'info',this.$route.params)
            // console.log(this.$route.params)
            this.getInfo(this.$route.params.revenueType);
        },
        methods:{
            getInfo(type){
                var url = '';
                console.log(type);

                switch(type){

                    case '0':
                        this.title = '奖学金';
                        url = httpApi.getStudentRevenue.queryXsYdjxj;
                    break;
                    case '1':
                        this.title = '勤工助学';
                        url = httpApi.getStudentRevenue.queryXsYdqgzx;
                    break;
                    case '2':
                        this.title = '物价副食补助';
                        url = httpApi.getStudentRevenue.queryXsYdwjfsbz;
                    break;
                    case '3':
                        this.title = '研究生三助';
                        url = httpApi.getStudentRevenue.queryXsYdyjssz;
                    break;

                }
                var data = getSha1Data({
                    "XH":this.info.XH,
                    "NIANYUE":this.info.NIANYUE
                });
                JSAjaxRequest({
                    url:url,
                    data,
                    success:(res)=>{
                        
                        // console.log(type,' = ' ,res);

                        if(res.status != 200){alertTips(res.statusText);this.$vux.loading.hide(); return false;}
                        if(!res.data) { alertTips('数据为空');this.$vux.loading.hide(); return false;}
                        var data = res.data;
                        // console.log(type,' = ' ,data);
                        if(!data.content) { alertTips('数据暂时为空');this.$vux.loading.hide(); return false;}
                        var content = JSON.parse(data.content);
                        // console.log('content = ' ,content);
                        if(!content.datas) {alertTips('datas 数据为空');this.$vux.loading.hide(); return false;}
                        var datas = content.datas;
                        console.log('datas = ' ,datas);
                        this.$set(this.$data,'info',datas);
                        // for(var i in datas){
                        //     this.arr.push(datas[i])
                        //     datas[i]['revenueType'] = index;
                        // }
                        // if(index == this.queryApiArr.length - 2||index == null){
                        //     callback(this.arr);
                        // }

                    },
                    error:(err)=>{

                    }

                }) 
            }
        }
    }
            

</script>
<style scoped>
    @import url(./css/student-revenue.css);
    .student-revenue-detail .content .title{
        display: block;
        font-size: .14rem;
        margin-top: .28rem;
    }
    .student-revenue-detail .content .revenue{
        color: #96050b;
        font-size: .28rem;
        margin-top: .2rem;
        margin-bottom: .2rem;
    }
    .student-revenue-detail .content .revenue:before{
        content:'￥';
        font-size: .16rem;
    }
    .student-revenue-detail .content .NIANYUE{
        margin-bottom: .6rem;
        font-size: .14rem;
    }
    .revenue-detail{
        width: 100%;
        overflow-x: hidden;
    }
    .student-revenue-detail .revenue-detail{
        text-align: left;

    }
    .student-revenue-detail .line{
        height: 1px;
        position: relative;
        background: #dbdbdb;
        left:.2rem;
        transform: rotateX(60deg);
        margin:.12rem 0;
    }
    .student-revenue-detail .revenue-detail >div{
        padding-left: .3rem;
        padding-right: .3rem;
        font-size: 0;
        line-height: .28rem;
        color: #9b9b9b;
    }
    .student-revenue-detail .revenue-detail >div label{
        display: inline-block;
        width: 1rem;
        font-size: .14rem;
        vertical-align: top;
    }
    .student-revenue-detail .revenue-detail >div span{
        display: inline-block;
        float: right;
        max-width: calc(100% - 1rem);
        font-size: .14rem;
        color: #4a4a4a;
    }
    .student-revenue-detail .revenue-detail >div:after{
        display: block;
        height: 0;
        content:"1";
        clear:both;
    }
</style>