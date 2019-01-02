<template>
    <div class="help-center-illustrate">
        <div class="content">
            <div class="search-Box" >
                <input placeholder="搜索使用说明" autocomplete=on v-model='searchVal' v-focus/>
                <button  @click='searchFn'>搜索</button>
            </div>
            <!--  -->
            <ul>
                <li>
                    <h2>我们的APP提供了哪些服务？</h2>
                    <p>根据使用者的身份显示不同的内容与风格，学生突出显示课程表；老师突出显示教学计划；管理者突出显示待办事宜，与会议、信息相关的安排。</p>
                </li>
                <li>
                    <h2>我们的APP提供了哪些服务？</h2>
                    <p>根据使用者的身份显示不同的内容与风格，学生突出显示课程表；老师突出显示教学计划；管理者突出显示待办事宜，与会议、信息相关的安排。</p>
                </li>
                <li>
                    <h2>我们的APP提供了哪些服务？</h2>
                    <p>根据使用者的身份显示不同的内容与风格，学生突出显示课程表；老师突出显示教学计划；管理者突出显示待办事宜，与会议、信息相关的安排。</p>
                </li>
                <li>
                    <h2>我们的APP提供了哪些服务？</h2>
                    <p>根据使用者的身份显示不同的内容与风格，学生突出显示课程表；老师突出显示教学计划；管理者突出显示待办事宜，与会议、信息相关的安排。</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';

    export default ({
        data(){
            return {
                msg: 'this is illustrate.vue',
                title: '帮助中心',
                searchVal:''

            }
        },
        mounted(){
           
        },
        methods:{
            searchFn(){

            }
        }
    })
</script>
<style>
    @import url('./css/help-center.css');
    
</style>