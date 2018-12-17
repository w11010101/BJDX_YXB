<template>
    <div class="volunteer-search">
        <div class="content">
            <div class="search-Box" >
                <input placeholder="搜索志愿活动" autocomplete=on/>
                <button >取消 </button>
            </div>
            <!--  -->
            <h2>历史搜索</h2>
            <ul>
                <li>鲁迅</li>
                <li>医务义诊</li>
                <li>儿童安全</li>
                <li>志愿服务</li>
                <li>多维宇宙</li>
            </ul>
            <!--  -->
            <h2>热门搜索</h2>
            <ul>
                <li>鲁迅</li>
                <li>医务义诊</li>
                <li>儿童安全</li>
                <li>志愿服务</li>
                <li>多维宇宙</li>
            </ul>
        </div>
        
    </div>
</template>
<script>
    // import route from '@/router'
    export default ({
        data(){
            return {
                msg: 'this is volunteer-search.vue',
                title: '志愿服务',
               
            }
        },
        methods:{
            
        }
    });

</script>
<style scoped="">
    @import url(./css/volunteer.css);
    .volunteer-search .content{
        padding-top:10px;
    }
    .volunteer-search .content .search-Box{
        padding: 0 13px;
    }
    .volunteer-search .search-Box{
        text-align:left;
    }
    .volunteer-search .search-Box input{
        display: inline-block;
        width: 290px;
        height: 30px;
        border:none;
        border-radius:5rem;
        padding-left: 40px;
        background: url(../../assets/volunteer/search.png) no-repeat left 15px center #f8f8f8;
        background-size: 20px;
        outline: none;
        font-size: 16px;
    }
    .volunteer-search .search-Box button{
        padding:0 10px;
        line-height: 30px;
        border:none;
        background: none;
        float:right;  
        font-size: 16px;
    }
    .volunteer-search h2{
        margin-top: 30px;
        text-align: left;
        padding-left: 18px;
        font-size: 18px;
        /*font-weight: normal;*/
    }
    .volunteer-search ul{
        text-align:left;
        padding-left:18px;
    }
    .volunteer-search ul li{
        display: inline-block;
        padding:5px 10px;
        font-size: 14px;
        color: #4a4a4a;
        border-radius:4px;
        border:1px solid #dfdfdf;
        margin:10px 10px 0 0 ;
    }
</style>