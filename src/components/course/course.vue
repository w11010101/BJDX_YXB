<template>
    <div class="content courseContent">
        <div class="btns">
            <Button type='text' @click='changeTab(1)'>今日课表</Button>
            <Button type='text' @click='changeTab(2)'>明日课表</Button>
        </div>
        <div v-if='tab == 1'>
            <ul v-if='todayCourseList.length'>
                <li v-for='(item,index) in todayCourseList' v-if='item'>
                    <div class='course-date'>
                        <label>{{item.timeBegin}} - {{item.timeEnd}}</label>
                    </div>
                    <div class='course-info'>
                        <h2>{{item.courseName}}</h2>
                        <p>[教师]<span>{{item.teacherName}}</span></p>
                        <p>[地点]<span>{{item.address}}</span></p>
                    </div>
                </li>
            </ul>
            <!-- status -->
            <div class='status' v-else>
                <img src='@/assets/status/undefined.png'>
                <span>暂无更多数据</span>
            </div>
        </div>
        <div v-if='tab == 2'>
            <ul v-if='tomorrowCourseList.length'>
                <li v-for='(item,index) in tomorrowCourseList' v-if='item'>
                    <div class='course-date'>
                        <label>{{item.timeBegin}} - {{item.timeEnd}}</label>
                    </div>
                    <div class='course-info'>
                        <h2>{{item.courseName}}</h2>
                        <p>[教师]<span>{{item.teacherName}}</span></p>
                        <p>[地点]<span>{{item.address}}</span></p>
                    </div>
                </li>
            </ul>
            <!-- status -->
            <div class='status' v-else>
                <img src='@/assets/status/undefined.png'>
                <span>暂无更多数据</span>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import {JSAjaxRequest,getSha1Data,getAESdecrypt} from '@/common/js/ajax.js';
    import {httpApi,toastTips,alertTips} from '@/common/js/common.js';
    export default ({
        data(){
            return {
                msg: 'this is course.vue',
                title: '课表',
                todayCourseList:[],
                tomorrowCourseList:[],
                tab:1,
            }
        },
        mounted(){
            this.getCourse();
        },
        props:['subViewPorps'],
        methods:{
            getCourse(){
                JSAjaxRequest({
                    url:httpApi.getCourse.h5ServiceCourses,
                    data:getSha1Data(),
                    success:(res)=>{
                        // console.log(res)
                        if(res.status == 200){
                            if(!res.data) {alertTips('数据为空'); return false;}
                            var data = res.data;
                            if(data.code!=0){alertTips(data.msg); return false;}
                            if(data.resData.length == 0) {alertTips('数据暂时为空'); return false;}
                            var resData = data.resData;
                            for(var i in resData){
                                console.log(resData[i])
                                for(var j in resData[i].courses){
                                    // console.log(resData[i].courses[j])
                                    if(i == '0'){
                                        this.todayCourseList.push(resData[i].courses[j]);
                                    }else{
                                        this.tomorrowCourseList.push(resData[i].courses[j]);
                                    }
                                }
                                
                            }

                        }else{
                            alertTips(res.statusText)
                        }
                    },
                    error:(err)=>{

                    }

                })
            },
            changeTab(tab){
                this.tab = tab;
                console.log()
            },

        }
    })
</script>
<style scoped>
    header{
        height: .5rem;
        position: absolute;
        top:-.5rem;
    }
    .btns{
    }
    .btns button{
        font-size: .16rem;
        height: .3rem;
        padding:0 .1rem;
        line-height: .3rem;
        margin:0 .1rem;
    }
    .courseContent{
        padding-top: .1rem;
        overflow-y: scroll; 
    }
    .courseContent ul{
        
    }
    .courseContent ul li{
        position: relative;
        padding:.2rem;
        font-size: 0;
        text-align: left
    }
    .courseContent ul li:after{
        content:'';
        position: absolute;
        height: 1px;
        width: 100%;
        background: #dbdbdb;
        left:.2rem;
        bottom: 0;
    }
    .courseContent ul li > div{
        display: inline-block;
        vertical-align: top;
        font-size: .14rem;
    }
    .courseContent ul li .course-date{
        width: 30%;
    }
    .courseContent ul li .course-date label{
        font-size: .16rem;
        color:#8d8d8d;
        line-height: .2rem;
    }
    .courseContent ul li .course-info{
        width: 70%;
        padding-left: .2rem;text-align: 
    }
    .courseContent ul li .course-info h2{
        font-size: .2rem;
        line-height: .2rem;
        font-weight: normal;
        margin-bottom: .1rem;
    }
    .courseContent ul li .course-info p{
        font-size: .16rem;
        margin-top: .05rem;
        overflow:hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .courseContent ul li .course-info p span {
        display: inline-block;
        padding-left: .1rem
    }
</style>