// var requireHTTP = 'http://202.112.187.103:81/app/';
var requireHTTP  = '/api/app/'
export var httpApi = {
	internet:{
		netServiceBasicInfo:requireHTTP+'netServiceBasicInfo',
        netServiceHistory:requireHTTP+'netServiceHistory',
        netServiceDevices:requireHTTP+'netServiceDevices',
        netServiceRename:requireHTTP+'netServiceRename',
        netServiceDeleteMac:requireHTTP+'netServiceDeleteMac',
        netServiceOffLine:requireHTTP+'netServiceOffLine',
	}
}
export function stringToHex(str){
    var val="";
    for(var i = 0; i < str.length; i++){
        if(val == ""){

            val = str.charCodeAt(i).toString(16);
        }else{
            val += "," + str.charCodeAt(i).toString(16);
        }
    }
　　return val;
}
export function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
    var context = "";
    if (r != null)
        context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
}