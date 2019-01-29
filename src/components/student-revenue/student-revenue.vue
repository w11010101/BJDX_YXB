<template>
    <div class='student-revenue'>
        <!-- content -->
        <div class='content'>
            <template v-if='revenueList.length > 0'>
                <div class='parts' v-for='item in revenueList'>
                    <h3>{{item.year}}年</h3>
                    <ul >
                        <li v-for='todo in item.list' >
                            <router-link :to='{name:"student-revenue-detail",params:todo}' >
                                <div class='revenue-icon'>
                                    <img :src='getRevenueType(todo.revenueType)'>
                                </div>
                                <div class='revenue-info'>
                                    <h4>{{todo.BZ||todo.title}}<span>{{todo.SFE}}元</span></h4>
                                    <p>[发放部门]{{todo.FFBMMC}}</p>
                                    <span>{{todo.FFSJ}}</span>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </template>
            <div class="nullData" v-else >
                暂无更多数据
            </div>
        </div>
        <!-- router-view -->
        <transition name="slide-fade">
            <router-view class='sub-components-view' name='sub-components-view'></router-view>
        </transition>
    </div>
</template>
<script type="text/javascript">
    import route from '@/router'
    import {JSAjaxRequest,getSha1Data,getAESdecrypt} from '@/common/js/ajax.js';
    import {httpApi,toastTips,alertTips} from '@/common/js/common.js';

    export default {
        name: 'student-revenue',
        data(){
            return {
                title:'学生收入',
                msg:'this is student-revenue.vue',
                revenueList:[],
                arr:[],
                queryApiArr:[
                    'queryXsJxj', // 学生奖学金月度汇总
                    'queryXsQgzx', // 学生勤工助学月度汇总
                    'queryXsWjfsbz', // 学生物价副食补助月度汇总
                    'queryXsYjssz', // 研究生三助月度汇总
                ],
                title:"",
                userAccount:'',
            }
        },
        components:{
            
        },
        mounted(){
            var _this = this;
            this.$vux.loading.show();
            var data = getSha1Data({
                // "XH":'1410305226',
                "XH":this.userAccount,
            });
            // 月度汇总 循环 查询接口
            for(var i in this.queryApiArr){
                this.getQueryApi(data,this.queryApiArr[i],i,function(res){
                    // 循环查询到最后一个时触发 callback
                    let obj = {};
                    let arr = [];
                    for(var j in res){
                        var y = res[j].FFSJ.substr(0,4);
                        if(!obj[y]){
                            obj[y] = 'true|'+arr.length;
                            arr.push({
                                year:y,
                                list:[]
                            });
                            arr[arr.length-1].list.push(res[j])
                        }else{
                            arr[obj[y].split('|')[1]].list.push(res[j])
                        }
                    }
                    // console.log(obj)
                    setTimeout(function(){
                        _this.$vux.loading.hide();
                        _this.sortData(arr,_this.revenueList,'parent');
                        for(let i in arr){
                            _this.$set(_this.revenueList[i],'list',_this.sortData(arr[i].list,[]))
                            // _this.revenueList[]._this.sortData(arr[i].list,[],'FFSJ');
                        }
                    },500);

                    // console.log(arr.sort(function(a,b){return b.year - a.FFSJ}));
                });
            }
        },
        methods:{
            // 获取职工号 或者是 学号
            getH5ServiceGetZghOrXh(){
                JSAjaxRequest({
                    url:httpApi.getSalary.h5ServiceGetZghOrXh,
                    data:getSha1Data(),
                    success:(res)=>{
                        console.log(res);
                        if(res.data && res.status == 200) {
                            var data = res.data;
                            if(data.code == '0'){
                                this.userAccount = data.resData;
                                this.queryYdhzsrFn();
                            }else{
                                this.$vux.loading.hide();
                                toastTips(data.msg);
                            }
                        } else{
                            this.$vux.loading.hide();
                            toastTips(res.statusText);
                        }
                    },
                    error:(error)=>{
                        console.log(error)
                        this.$vux.loading.hide();
                        toastTips('请求失败，请稍后重试');
                    }
                });
            },
            // 根据奖金类型获取icon
            getRevenueType(type){
                switch (type){
                    case '1':
                        return require('@/assets/student-revenue/qgzx.png');
                    break;
                    case '2':
                        return require('@/assets/student-revenue/bz.png');
                    break;
                    case '3':
                        return require('@/assets/student-revenue/sz.png');
                    break;
                    case '4':
                        return require('@/assets/student-revenue/jxj.png');
                    break;

                }
            },
            // 查询接口
            getQueryApi(data,api,index,callback){
                var url = '';

                switch(api){
                    case 'queryXsJxj':
                        url = httpApi.getStudentRevenue.queryXsJxj;
                    break;
                    case 'queryXsQgzx':
                        url = httpApi.getStudentRevenue.queryXsQgzx;
                    break;
                    case 'queryXsWjfsbz':
                        url = httpApi.getStudentRevenue.queryXsWjfsbz;
                    break;
                    case 'queryXsYjssz':
                        url = httpApi.getStudentRevenue.queryXsYjssz;
                    break;

                }

                JSAjaxRequest({
                    url:url,
                    data,
                    success:(res)=>{
                        
                        // console.log(api,' = ' ,res);
                        if(res.status != 200){alertTips(res.statusText);this.$vux.loading.hide(); return false;}
                        if(!res.data) { alertTips('数据为空');this.$vux.loading.hide(); return false;}
                        var data = res.data;

                        if(!data.content) { alertTips('数据暂时为空');this.$vux.loading.hide(); return false;}
                        var content = JSON.parse(data.content);
                        
                        if(!content.datas) {alertTips('datas 数据为空');this.$vux.loading.hide(); return false;}
                        var datas = content.datas;
                        // console.log(api,' = ' ,datas);
                        for(var i in datas){
                            this.arr.push(datas[i])
                            datas[i]['revenueType'] = index;
                            datas[i]['title'] = index=="1"?"勤工助学":(index =="2"?'补助':(index == "3"?'三助':"奖学金"));
                        }
                        if(index == this.queryApiArr.length - 2||index == null){
                            callback(this.arr);
                        }

                    },
                    error:(err)=>{

                    }

                })  
            },
            // 排序 数组
            sortData(oldData,newData,type){
                // console.log('sortData = ' , oldData)
                if(type == 'parent'){
                    oldData.sort(function(a,b){return b.year - a.year});
                }else{
                    oldData.sort(function(a,b){return parseInt(b['FFSJ'].replace(/-|:| /g,'')) - parseInt(a['FFSJ'].replace(/-|:| /g,'')) })
                }
                
                for(var i in oldData){
                    newData.push(oldData[i]);
                }
                return newData;
            }
        }
    }
            
</script>
<style scoped>
    @import url(./css/student-revenue.css);

</style>