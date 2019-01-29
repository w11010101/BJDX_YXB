<template>
    <div class='salary-detail'>
        <!-- content -->
        <div class='content'>
            <div class='banner'>
                <div>实发工资（元）</div>
                <div>{{SFE.toFixed(2)}}</div>
            </div>
            <!--  -->
            <div class='detail-content'>
                <div class="explain">
                    图例：<span>发放项</span><span>扣发项</span>
                </div>
                <!--  -->
                <div :class="'detail-part '+ 'icon-'+(index+1)"  v-for= '(item,index) in queryApiArr' v-if='$data[item+"Data"].length'>
                    <h2>{{item|formatTitle}}</h2>
                    <div>
                        <label>发放部门：</label>
                        <span>{{$data[item+"Data"][0].FFBMMC}}</span> 
                    </div>
                    <div>
                        <label>发放日期：</label>
                        <span>{{$data[item+"Data"][0].NIANYUE}}</span> 
                    </div>
                    <div>
                        <label>备注：</label>
                        <span>{{$data[item+"Data"][0].BZ}}</span> 
                    </div>
                    <div>
                        <label>应发额：</label>
                        <span class='add'>{{$data[item+"Data"][0].YFE.toFixed(2)}}</span> 
                    </div>
                    <div>
                        <label>税前扣除：</label>
                        <span class='reduce'>{{$data[item+"Data"][0].SQKC.toFixed(2)}}</span> 
                    </div>
                    <div>
                        <label>应税额：</label>
                        <span class='add'>{{$data[item+"Data"][0].YSE.toFixed(2)}}</span> 
                    </div>
                    <div>
                        <label>扣税：</label>
                        <span class='reduce'>{{$data[item+"Data"][0].KS.toFixed(2)}}</span> 
                    </div>
                    <div>
                        <label>实发额：</label>
                        <span class='add'>{{$data[item+"Data"][0].SFE.toFixed(2)}}</span> 
                    </div>
                    <div>
                        <label>现金额：</label>
                        <span class='add'>{{$data[item+"Data"][0].XJE.toFixed(2)}}</span> 
                    </div>
                    <div>
                        <label>转卡额：</label>
                        <span class='add'>{{$data[item+"Data"][0].ZKE.toFixed(2)}}</span> 
                    </div>
                    <div>
                        <label>转存折额：</label>
                        <span class='add'>{{$data[item+"Data"][0].ZCZE.toFixed(2)}}</span> 
                    </div>
                    <!-- 专项补助 -->
                    <div v-if='item == "queryYdzxbz"'>
                        <label>特殊补助：</label>
                        <span class='add'>{{$data[item+"Data"][0].TSZX.toFixed(2)}}</span> 
                    </div>
                    <div v-if='item == "queryYdzxbz"'>
                        <label>计生奖励：</label>
                        <span class='add'>{{$data[item+"Data"][0].DSJL.toFixed(2)}}</span> 
                    </div>
                    <div v-if='item == "queryYdzxbz"'>
                        <label>省部级奖：</label>
                        <span class='add'>{{$data[item+"Data"][0].SBJJ.toFixed(2)}}</span> 
                    </div>
                    <div v-if='item == "queryYdzxbz"'>
                        <label>节日补助：</label>
                        <span class='add'>{{$data[item+"Data"][0].JRBZ.toFixed(2)}}</span> 
                    </div>
                    <div v-if='item == "queryYdzxbz"'>
                        <label>供暖补贴：</label>
                        <span class='add'>{{$data[item+"Data"][0].GNBT.toFixed(2)}}</span> 
                    </div>
                    <div v-if='item == "queryYdzxbz"'>
                        <label>其他：</label>
                        <span class='add'>{{$data[item+"Data"][0].SHXC.toFixed(2)}}</span> 
                    </div>
                    <div v-if='item == "queryYdzxbz"'>
                        <label>补其他：</label>
                        <span class='add'>{{$data[item+"Data"][0].BQT.toFixed(2)}}</span> 
                    </div>
                    <div v-if='item == "queryYdzxbz"'>
                        <label>补发应税额：</label>
                        <span class='add'>{{$data[item+"Data"][0].BFYSE.toFixed(2)}}</span> 
                    </div>
                    <div v-if='item == "queryYdzxbz"'>
                        <label>扣发：</label>
                        <span class='add'>{{$data[item+"Data"][0].KF.toFixed(2)}}</span> 
                    </div>
                    <!-- 年终奖 or 奖励工资 -->
                    <div v-if='item == "queryYdnzj" || item == "queryYdjlgz"'>
                        <label>奖励工资：</label>
                        <span class='add'>{{$data[item+"Data"][0].JLGZ.toFixed(2)}}</span> 
                    </div>
                    <div v-if='item == "queryYdnzj" || item == "queryYdjlgz"'>
                        <label>生活补贴：</label>
                        <span class='add'>{{$data[item+"Data"][0].SHBT.toFixed(2)}}</span> 
                    </div>
                    <div v-if='item == "queryYdnzj" || item == "queryYdjlgz"'>
                        <label>CMB：</label>
                        <span class='add'>{{$data[item+"Data"][0].CMB.toFixed(2)}}</span> 
                    </div>
                    <div v-if='item == "queryYdnzj" || item == "queryYdjlgz"'>
                        <label>985年终奖：</label>
                        <span class='add'>{{$data[item+"Data"][0].NZJ985.toFixed(2)}}</span> 
                    </div>
                    <div v-if='item == "queryYdnzj" || item == "queryYdjlgz"'>
                        <label>专项绩效：</label>
                        <span class='add'>{{$data[item+"Data"][0].ZXJX.toFixed(2)}}</span> 
                    </div>
                    <div v-if='item == "queryYdnzj" || item == "queryYdjlgz"'>
                        <label>一次性补发：</label>
                        <span class='add'>{{$data[item+"Data"][0].YCXBF.toFixed(2)}}</span> 
                    </div>
                    <!-- 住房补贴 -->
                    <div v-if='item == "queryYdzfbt"'>
                        <label>住房补贴：</label>
                        <span class='add'>{{$data[item+"Data"][0].ZFBT.toFixed(2)}}</span> 
                    </div>
                    <!-- 退税 -->
                    <div v-if='item == "queryYdts"'>
                        <label>退税：</label>
                        <span class='add'>{{$data[item+"Data"][0].TS.toFixed(2)}}</span> 
                    </div>
                    <!-- 基本工资 -->
                    <div v-if='item == "queryYdlwf"'>
                        <label>劳务费：</label>
                        <span class='add'>{{$data[item+"Data"][0].LW.toFixed(2)}}</span> 
                    </div>
                    <div>
                        <label>补扣税：</label>
                        <span class='reduce'>{{$data[item+"Data"][0].BKS.toFixed(2)}}</span> 
                    </div>
                </div>
                <!-- ---------------- -->
                
                
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import axios from 'axios'
    import {formatData} from './js/salary.js';
    import {JSAjaxRequest,getSha1Data} from '@/common/js/ajax.js';
    import {httpApi,toastTips,alertTips} from '@/common/js/common.js'
    export default {
        name: 'salary-detail',
        data(){
            return {
                msg:'this is salary-detail.vue',
                ZGH:'',
                NIANYUE:'',
                SFE:'',

                queryApiArr:[
                    'queryYdjbgz',
                    'queryYdlwf',
                    'queryYdzxbz',
                    'queryYdnzj',
                    'queryYdjlgz',
                    'queryYdzfbt',
                    'queryYdts',
                ],
                queryYdjbgzData:[],     // 月度工资-基本工资查询接口
                queryYdlwfData:[],      // 月度工资-劳务费查询接口
                queryYdzxbzData:[],     // 月度工资-专项补助查询接口
                queryYdnzjData:[],      // 月度工资-年终奖查询接口
                queryYdjlgzData:[],     // 月度工资-奖励工资查询接口
                queryYdzfbtData:[],     // 月度工资-住房补贴查询接口
                queryYdtsData:[],       // 月度工资-退税查询接口
            }
        },
        components:{
            
        },
        mounted(){
            this.ZGH = this.$route.params.ZGH;
            this.NIANYUE = this.$route.params.NIANYUE;
            this.SFE = this.$route.params.SFE;
            this.$vux.loading.show();
            var data = getSha1Data({
                "ZGH":this.ZGH,
                "NIANYUE":this.NIANYUE
            });
            // 月度工资 循环 查询接口
            for(var i in this.queryApiArr){
                this.getQueryApi(data,this.queryApiArr[i]);
            }
        },
        methods:{
            // 月度工资-基本工资查询接口
            getQueryApi(data,api){
                var url = '';
                switch(api){
                    case 'queryYdjbgz':
                        url = httpApi.getSalary.queryYdjbgz;
                    break;
                    case 'queryYdlwf':
                        url = httpApi.getSalary.queryYdlwf;
                    break;
                    case 'queryYdzxbz':
                        url = httpApi.getSalary.queryYdzxbz;
                    break;
                    case 'queryYdnzj':
                        url = httpApi.getSalary.queryYdnzj;
                    break;
                    case 'queryYdjlgz':
                        url = httpApi.getSalary.queryYdjlgz;
                    break;
                    case 'queryYdzfbt':
                        url = httpApi.getSalary.queryYdzfbt;
                    break;
                    case 'queryYdts':
                        url = httpApi.getSalary.queryYdts;
                    break;

                }

                JSAjaxRequest({
                    url:url,
                    data,
                    success:(res)=>{
                        this.$vux.loading.hide();
                        // console.log(api,' = ' ,res);
                        if(res.status != 200){alertTips(res.statusText);this.$vux.loading.hide(); return false;}
                        if(!res.data) { alertTips('数据为空');this.$vux.loading.hide(); return false;}
                        var data = res.data;

                        if(!data.content) { alertTips('数据暂时为空');this.$vux.loading.hide(); return false;}
                        var content = JSON.parse(data.content);
                        if(!content.datas) {alertTips('datas 数据为空');this.$vux.loading.hide(); return false;}
                        var datas = content.datas;
                        // console.log(api+'Data = ',datas);
                        this.eachQueryData(datas,api);
                        
                    },
                    
                    error:(error)=>{
                        console.log(error);
                        this.$vux.loading.hide();
                        toastTips('请求失败，请稍后重试');
                    }
                });
            },
            eachQueryData(data,api){
                for(var i in data){
                    if(typeof data[i] == 'object'){
                        this.eachQueryData(data[i],api);

                    }else if(data[i]){
                        this[api+'Data'].push(data);
                        break;
                    }
                }
                
            },

        },
        filters:{
            formatTitle(value){
                switch(value){
                    case 'queryYdjbgz':
                        return '基本工资';
                    break;
                    case 'queryYdlwf':
                        return '劳务费'
                    break;
                    case 'queryYdzxbz':
                        return '专项补助'
                    break;
                    case 'queryYdnzj':
                        return '年终奖查'
                    break;
                    case 'queryYdjlgz':
                        return '奖励工资'
                    break;
                    case 'queryYdzfbt':
                        return '住房补贴'
                    break;
                    case 'queryYdts':
                        return '退税';
                    break;

                }
            }
        },

    }
            

</script>
<style scoped>
    @import url(./css/salary.css);
    
    
    
</style>