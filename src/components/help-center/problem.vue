<template>
    <div class="help-center-problem">
        <div class="content">
            <div class="search-Box" >
                <input placeholder="搜索常见问题" autocomplete=on v-model='searchVal' />
                <button  @click='searchFn'>搜索</button>
            </div>
            <!--  -->
            <div id="wrapper">
                
                <ul >
                    <li v-for='item in H5QAsArr' v-if='H5QAsArr.length>0'>
                        <h2>{{item.question}}</h2>
                        <p>{{item.answer}}</p>
                    </li>
                    <div class="nullData" v-else >
                        暂无更多数据
                    </div>
                </ul>
                
            </div>
        </div>
    </div>
</template>
<script>
    
    import helpjs from './js/help-center.js'
    export default ({
        data(){
            return {
                msg: 'this is help-center-problem.vue',
                title: '帮助中心',
                searchVal:'',
                H5QAsArr:[],
                scrollState:true,
                pageNum:0,
            }
        },
        mixins: [helpjs],
    })
</script>
<style scoped>
    @import url('./css/help-center.css');

</style>