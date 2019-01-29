import Vue from 'vue';

// var requireHTTP = 'http://nativeapp.bjmu.edu.cn:80/app/';
// var requireHTTP2 = 'http://nativeapp.bjmu.edu.cn:80/';

var requireHTTP  = '/api/app/';
var requireHTTP2  = '/api/';

export var httpApi = {
    // 上网服务
	internet:{
		netServiceBasicInfo: requireHTTP + 'netServiceBasicInfo',
        netServiceHistory: requireHTTP + 'netServiceHistory',
        netServiceDevices: requireHTTP + 'netServiceDevices',
        // 重命名
        netServiceRename: requireHTTP + 'netServiceRename',
        // 解绑
        netServiceDeleteMac: requireHTTP + 'netServiceDeleteMac',
        // 下线
        netServiceOffLine: requireHTTP + 'netServiceOffLine',
	},
    // 帮助中心
    helpCenter:{
        h5Columns: requireHTTP + "h5Columns",
        h5QAs: requireHTTP + "h5QAs",
        

    },
    // 获取发布页面信息
    h5DeployeeInfo:requireHTTP + 'h5DeployeeInfo',
    // 成绩查询 queryXnJd
    getScore:{
        getTerms:requireHTTP2 + 'order/score/getTerms',     // 查询学期
        queryScore:requireHTTP2 + 'order/score/queryScore', // 查询学期数据
        queryXnJd:requireHTTP2 + 'order/score/queryXnJd',   // 学年绩点查询
        queryXqJd:requireHTTP2 + 'order/score/queryXqJd',   // 学期绩点
    },
    // 薪资查询
    getSalary:{
        h5ServiceGetZghOrXh: requireHTTP + 'h5ServiceGetZghOrXh', // 获取职工号 或 学号
        queryYdhzsr:requireHTTP + 'queryYdhzsr',    // 教师月度汇总收入
        queryYdsr:requireHTTP + 'queryYdsr',    // 月度汇总收入查询接口
        queryNdsr:requireHTTP + 'queryNdsr',    // 年度收入查询接口
        // 职工
        queryYdjbgz:requireHTTP + 'queryYdjbgz',    // 月度工资-基本工资查询接口
        queryYdlwf:requireHTTP + 'queryYdlwf',    // 月度工资-劳务费查询接口
        queryYdzxbz:requireHTTP + 'queryYdzxbz',    // 月度工资-专项补助查询接口
        queryYdnzj:requireHTTP + 'queryYdnzj',    // 月度工资-年终奖查询接口
        queryYdjlgz:requireHTTP + 'queryYdjlgz',    // 月度工资-奖励工资查询接口
        queryYdzfbt:requireHTTP + 'queryYdzfbt',    // 月度工资-住房补贴查询接口
        queryYdts:requireHTTP + 'queryYdts',    // 月度工资-退税查询接口
        // 学生

    },
    // 课表
    getCourse:{
        h5ServiceCourses:requireHTTP + 'h5ServiceCourses'
    },
    // 志愿服务
    getH5Service:{
        h5ServiceTime:requireHTTP + 'h5ServiceTime',    // 获取服务总时长
        h5ServicePaging:requireHTTP + 'h5ServicePaging', // 获取志愿服务分页
        h5ServiceDetail:requireHTTP + 'h5ServiceDetail', // 通过志愿服务id获取服务详情
        h5ServiceSignUpOrCancle:requireHTTP + 'h5ServiceSignUpOrCancle', // 报名/取消报名
        h5ServiceGetVolunteerInfo:requireHTTP + 'h5ServiceGetVolunteerInfo', // 获取当前登录的用户的个人报名信息

    },
    getStudentRevenue:{
        
        queryXsJxj:requireHTTP + 'queryXsJxj', // 学生奖学金月度汇总
        queryXsQgzx:requireHTTP + 'queryXsQgzx', // 学生勤工助学月度汇总
        queryXsWjfsbz:requireHTTP + 'queryXsWjfsbz', // 学生物价副食补助月度汇总
        queryXsYjssz:requireHTTP + 'queryXsYjssz', // 研究生三助月度汇总

        queryXsYdjxj:requireHTTP + 'queryXsYdjxj', // 奖学金
        queryXsYdqgzx:requireHTTP + 'queryXsYdqgzx', // 勤工助学
        queryXsYdwjfsbz:requireHTTP + 'queryXsYdwjfsbz', // 物价副食补助
        queryXsYdyjssz:requireHTTP + 'queryXsYdyjssz', // 研究生三助
    }
}   
// 转换16进制
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
// 获取地址后面的键值对数据
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
// 提示信息
export function toastTips(value){
    Vue.$vux.toast.show({
        type:'text',
        width:'auto',
        text: value
    })
}
// alert提示
export function alertTips(value){
    Vue.$vux.alert.show({
        content: value,

    });
}