<template>
    <div class="volunteer-search">
        <div class="content">
            <div class="search-Box" >
                <input placeholder="搜索志愿活动" autocomplete=on v-model='searchVal'/>
                <!-- <Input v-model="searchVal" prefix="ios-search" class='searchInput' placeholder="搜索志愿活动" clearable style="width: calc(100% - 60px);" ></Input> -->
                <button  @click='searchFn'>搜索</button>
                <!-- <button v-if='searchVal == ""' @click='searchFn'>搜索</button>
                <button v-else @click='cancelFn'>取消</button> -->
                <!-- <search
                  @result-click="resultClick"
                  @on-change="getResult"
                  :results="results"
                  v-model="searchVal"
                  position="absolute"
                  auto-scroll-to-top
                  top="46px"
                  @on-focus="onFocus"
                  @on-cancel="onCancel"
                  @on-submit="onSubmit"
                  ref="search"></search> -->
            </div>
            <!--  -->
            <h2>历史搜索</h2>
            <ul>
                <li v-for='(item,index) in hotSearch' :key='item.id' @click='setActive(index,"hot")' :class='{"active":index == hotSearchActive}'>{{item.name}}</li>
            </ul>
            <!--  -->
            <h2>热门搜索</h2>
            <ul>
                <li v-for='(item,index) in historySearch' :key='item.id' @click='setActive(index,"history")' :class='{"active":index == historySearchActive}'>{{item.name}}</li>
            </ul>
        </div>
        
    </div>
</template>
<script>
    // import { Search } from 'vux'
    import { Alert ,AlertModule} from 'vux'
    export default ({
        data(){
            return {
                msg: 'this is volunteer-search.vue',
                title: '志愿服务',
                searchVal:'',
                // searchStyle:{
                //     'display': 'inline-block',
                //     'width': 'calc(100% - 60px)',
                //     'height': '30px',
                //     'border':'none',
                //     'border-radius':'5rem',
                //     'padding-left': '40px',
                //     'background': 'url(../../../assets/volunteer/search.png) no-repeat left 15px center #f8f8f8',
                //     'background-size': '20px',
                //     'outline': 'none',
                //     'font-size': '16px',
                // },
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
                        content: '搜索。。。',
                        onShow () {
                            console.log('Plugin: I\'m showing')
                        },
                        onHide () {
                            console.log('Plugin: I\'m hiding')
                        }
                    })
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
            // resultClick(){
            //     console.log('resultClick')
            // },
            // getResult(){
            //     console.log('getResult')
            // },
            // onFocus(){
            //     console.log('onFocus')
            // },
            // onCancel(){
            //     console.log('onCancel')
            // },
            // onSubmit(){
            //     console.log('onSubmit')
            // },            

        }
    });

</script>
<style scoped="">
    @import url(./css/volunteer.css);
    .search-Box /deep/ .searchInput{
        border-radius:5rem;
    }
</style>