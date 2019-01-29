import axios from 'axios'
import {stringToHex,GetQueryString} from '@/common/js/common.js'
import CryptoJS from 'crypto-js';
import Vue from 'vue'
// import  { AlertPlugin } from 'vux'
// Vue.use(AlertPlugin)
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
    // localStorage.setItem('token','4559736F68754639685869726256397877667A6B41434B66704F4D5130746D6373694A624672486550774232755A54474659776167636F74676C465377365645');
    
    // localStorage.setItem('token','443239577651526566737530557A5270767653387830344D5636584C654C306244616B713953667568304B4D3873754671314D756D44317152316A2F56464E62');

    let gettoken = localStorage.getItem('token');

    if(!gettoken){
        // console.log(Vue.$vux.toast)
        // Vue.$vux.toast.show({
        //     type:'text',
        //     width:'auto',
        //     text: '请求失败，token为空'
        // })
        localStorage.removeItem('token');
    }
    var key = hexCharCodeToStr(gettoken||'');
    var token = getAESdecrypt(key);
    let data = {
        "sign": "",
        "orgCode": "bjmu",
        "appId": "1001",
        "version": "1.0",
        "dateTime": "20181102101734",
        "appVersion": "1.0.0",
        "clientType": "andriod",
        "clientMark": "2706F35A-62ED-4148-ABC1-5E6218828E00",   
        "token": token,//token，和APP交互
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
// token AES 解码
export function getAESdecrypt(value){

    var key = CryptoJS.enc.Utf8.parse("1234567890123456");
    var iv  = CryptoJS.enc.Utf8.parse("1234567890654321");

    var cfg={
        iv: iv,
        mode:CryptoJS.mode.CBC,
        padding:CryptoJS.pad.Pkcs7,
    };
    var decryptdata = CryptoJS.AES.decrypt(
        value,
        key,
        cfg
    )
    return decryptdata.toString(CryptoJS.enc.Utf8)

}

export function hexCharCodeToStr(hexCharCodeStr) {
　　var trimedStr = hexCharCodeStr.trim();
　　var rawStr = 
　　trimedStr.substr(0,2).toLowerCase() === "0x"
　　? 
　　trimedStr.substr(2) 
　　: 
　　trimedStr;
　　var len = rawStr.length;
　　if(len % 2 !== 0) {
　　　　alert("Illegal Format ASCII Code!");
　　　　return "";
　　}
　　var curCharCode;
　　var resultStr = [];
　　for(var i = 0; i < len;i = i + 2) {
　　　　curCharCode = parseInt(rawStr.substr(i, 2), 16); // ASCII Code Value
　　　　resultStr.push(String.fromCharCode(curCharCode));
　　}
　　return resultStr.join("");
}







