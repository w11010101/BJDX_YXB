<template>
    <div class='status'>
        <div class='status-box'>
            <img src="@/assets/status/loading.gif" alt="">
            <p>{{statusMsg}}</p>
        </div>
    </div>
</template>
<script type="text/javascript">
    import route from '@/router'
    export default {
        name: 'status',
        data(){
            return {
                title:'成绩查询',
                msg:'this is status.vue',
                statusMsg:'哎呀，你还没有报名志愿活动~',
            }
        },
        // props:['title'],
        components:{
            
        },
        mounted(){
            console.log(this.$router);
        },
        methods:{
            
        }
    }

            

</script>
<style scoped>
    .status-box{
        position: absolute;
        top:30%;
        left:50%;
        transform: translate(-50%,-50%);
        width: 60%;

    }
    .status-box img{
        width: 100%;
    }
    .status-box p{
        font-size: 14px;
        color: #9b9b9b;
        text-align: center;
        /*margin-top: 20px;*/
    }
</style>