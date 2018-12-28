import axios from 'axios'
import {stringToHex} from '@/common/js/common.js'
import CryptoJS from 'crypto-js'
// axios 请求
export function JSAjaxRequest(option){

    // axios ajax
    var _default = {
        url:option.url,
        type:'post',
        data:option.data,
        contentType:option.contentType||'application/x-www-form-urlencoded',
        success:option.success,
        error:option.error,
        onUploadProgress:option.onUploadProgress||function(){},
        onDownloadProgress:option.onDownloadProgress||function(){}
    }
    axios({
        // `url` 是请求的接口地址
        url:_default.url,
        // `method` 是请求的方法
        method:_default.type,
        // `data` 是请求体数据
        data:_default.data,
        // 请求超时时间（毫秒）
        timeout: 10000,
        // 响应格式
        responseType: 'json',
        // 处理上传进度事件
        onUploadProgress: function (progressEvent) {
            _default.onUploadProgress||_default.onUploadProgress(progressEvent);
        },
        // 处理下载进度事件
        onDownloadProgress: function (progressEvent) {
            _default.onDownloadProgress||_default.onDownloadProgress(progressEvent);
        },
    }).then((response)=>{_default.success(response)})
    .catch((error)=>{_default.error(error);});
}
// sha1加密
export function getSha1Data(reqDate,key){
    let getDdate = {};
    let getKey = 'synjones_bjmu_2018'
    if(arguments.length){
        if(typeof arguments[0] == 'object' ){
            getDdate = reqDate;
        }else{
            getKey = reqDate+'';
        }
        if(arguments[1] && typeof arguments[1] != 'object'){
            getKey = key+'';
        }
    }

    let data = {
        "sign": "231df862f2a59345aa4ae984f48f3f75f3b4a4ee",
        "orgCode": "bjmu",
        "appId": "1001",
        "version": "1.0",
        "dateTime": "20181102101734",
        "appVersion": "1.0.0",
        "clientType": "andriod",
        "clientMark": "2706F35A-62ED-4148-ABC1-5E6218828E00",   
        "token": "69965e3035a9480db964fefe6443d397",//token，和APP交互
        "clientIp": "172.16.24.168",//ip地址
        "clientMac": "A4:5E:60:DB:09:0F12",
        "magic": "2356681452",
        "reqData": getDdate,
        "reqDataHex": ''
    }
    data.reqDataHex = parseInt(stringToHex(JSON.stringify(data.reqData)),16);
    let str = '';
    for(var i in data){
        if(i != 'sign' && i != 'reqData'&& i != 'reqDataHex'){
            str+=data[i]
        }
    }
    str+=data.reqDataHex;
    str+='syn_2018_bjmu';

    data.sign = CryptoJS.HmacSHA1(str,getKey).toString(CryptoJS.enc.Hex);

    // console.log(JSON.stringify(data));
    return data;
}









