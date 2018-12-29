<template>
    <div class="volunteer-search">
        <div class="content">
            <div class="search-Box" >
                <input placeholder="搜索志愿活动" autocomplete=on v-model='searchVal' v-focus/>
                <button  @click='searchFn'>搜索</button>

            </div>

            <!--  -->
            <!-- <h2>历史搜索</h2>
            <ul>
                <li v-for='(item,index) in hotSearch' :key='item.id' @click='setActive(index,"hot")' :class='{"active":index == hotSearchActive}'>{{item.name}}</li>
            </ul> -->
            <!--  -->
            <!-- <h2>热门搜索</h2>
            <ul>
                <li v-for='(item,index) in historySearch' :key='item.id' @click='setActive(index,"history")' :class='{"active":index == historySearchActive}'>{{item.name}}</li>
            </ul> -->
        </div>
        <!-- router-view -->
        <transition name="slide-fade">
            <router-view class='sub-components-view' name='volunteer-search-view'></router-view>
        </transition>
    </div>
</template>
<script>
    import route from '@/router';
    import { Alert ,AlertModule} from 'vux'
    export default ({
        data(){
            return {
                msg: 'this is volunteer-search.vue',
                title: '志愿服务',
                searchVal:'',
                results:[],
                hotSearchActive:999,
                hotSearch:[
                    {name:"鲁迅",id:1},
                    {name:"医务义诊",id:2},
                    {name:"儿童安全",id:3},
                    {name:"志愿服务",id:4},
                    {name:"多维宇宙",id:5},
                ],
                historySearchActive:999,
                historySearch:[
                    {name:"鲁迅",id:1},
                    {name:"医务义诊",id:2},
                    {name:"儿童安全",id:3},
                    {name:"志愿服务",id:4},
                    {name:"多维宇宙",id:5},
                ]
            }
        },
        directives: {
            focus: {
                // 指令的定义
                inserted: function (el) {
                    el.focus();
                }
            }
        },
        watch:{
            '$route'(){
                console.log('search = ' , arguments)
            }
        },
        components:{
            Alert
            // Search
        },
        methods:{
            setActive(index,type){
                if(type=='hot'){
                    this.hotSearchActive = index;
                    this.historySearchActive = 999;
                }else{
                    this.historySearchActive = index;
                    this.hotSearchActive = 999;
                }
                this.searchVal = event.target.innerText;
                // console.dir(event.target)
            },
            cancelFn(){
                console.log('cancelFn');
                this.searchVal = '';
            },
            searchFn(){
                console.log('searchFn');
                if(this.searchVal){
                    AlertModule.show({
                        // title: '',
                        content: '搜索中。。。',
                        onShow () {
                            console.log('Plugin: I\'m showing')
                        },
                        onHide () {
                            console.log('Plugin: I\'m hiding')
                        }
                    });
                    setTimeout(function(){
                        AlertModule.hide();
                        route.push('/volunteer/search/list/searchVal');
                    },1000);
                }else{
                    AlertModule.show({
                        // title: '',
                        content: '请输入搜索关键字',
                        onShow () {
                            console.log('Plugin: I\'m showing')
                        },
                        onHide () {
                            console.log('Plugin: I\'m hiding')
                        }
                    })
                }
                
            },           

        }
    });

</script>
<style scoped="">
    @import url(./css/volunteer.css);
    .search-Box /deep/ .searchInput{
        border-radius:5rem;
    }
</style>