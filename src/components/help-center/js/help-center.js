import Vue from 'vue';
import {JSAjaxRequest,getSha1Data,getAESdecrypt} from '@/common/js/ajax.js';
import {httpApi,toastTips,alertTips} from '@/common/js/common.js';
import loadMoreFn from '../../../../static/plugin/iscroll4/js/loadMore.js';


export default {
    mounted(){
        this.$nextTick(function(){
            this.runIScrollFn();
            this.getH5QAs();
            
        });
    },
	methods:{
        searchFn(){
            this.$set(this.$data,'H5QAsArr',[]);
            this.pageNum = 0;
            this.getH5QAs('',this.searchVal);
        },
        // 请求数据
        getH5QAs(page='',searchVal=''){
            JSAjaxRequest({
                url:httpApi.helpCenter.h5QAs,
                data:getSha1Data({
                    "pageNum":page+'',
                    "columnId":this.$route.params.id,
                    "searchParam1":searchVal
                }),

                success:(data)=>{
                    let response = data.data;
                    if(response.code == 0){
                        // console.log('getH5QAs = ',response);
                        let list = response.resData.list;
                        if(list.length){
                            for(var i in list){
                                this.H5QAsArr.push(list[i]);
                            }
                            this.$nextTick(function(){
                                console.log(wrapper);
                                wrapper.refresh();
                            });
                            
                        }
                    }else{
                        alertTips(response.msg);
                    }
                },
                error:(error)=>{
                    console.log('error = ' , error);
                    toastTips('操作失败，请稍后再试')

                }
            });
        },
        // iScroll
        runIScrollFn(){
            let _this = this;
            let loadMore = loadMoreFn();
            var option = {
                id: "wrapper",
                pullDown: function() {
                    _this.H5QAsArr = [];
                    _this.pageNum = 0;
                    _this.getH5QAs(1,_this.searchVal);
                    wrapper.refresh();
                },
                pullUp: function() {
                    if (_this.scrollState) {
                        ++_this.pageNum;

                        _this.scrollState = false;
                        setTimeout(function() {
                            // 加载 ... 
                            _this.getH5QAs(_this.pageNum,_this.searchVal);
                            _this.scrollState = true;
                            wrapper.refresh();
                        }, 1000);
                    }
                }
            };
            setTimeout(function(){
                loadMore.scroll(option);
            },200);
        },
    }
}