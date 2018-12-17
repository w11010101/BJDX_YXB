<template>
    <div class='internet-list' @click='hideListFn'>
        <!-- <Button type="primary" @click='showListFn'>展开</Button> -->
        <ul class='list'>
            <li v-for='item in data2' v-swipeleft='swipeleftFn' v-swiperight='swiperightFn'>
                <!-- <v-touch v-on:pinchmove="onSwipeLeft"> -->
                    <div class='list-content'>
                        <label>{{item.name}}</label><p>{{item.value}}</p>
                    </div>
                    <div class="list-input">
                        <button class='renameBtn' @click='renameFn'>重命名</button>
                        <button class='rollsOffBtn' @click='rollsOffFn'>下线</button>
                        <button class='unbunlingBtn' @click='unbunlingFn'>解绑</button>
                    </div>
                <!-- </v-touch> -->
            </li>
        </ul>
        <!-- <router-view class='internet-view' name='internet-view'></router-view> -->
    </div>
</template>
<script type="text/javascript">
    import {data2} from './js/internet.js';

    export default {
        name: 'internet-list',
        data(){
            return {
                // title:'上网服务',
                msg:'this is internet-list.vue',
                showState:true,
                data2,
                // tapFn:{
                //     a:1
                // }
            }
        },
        mounted(){
            // document.addEventListener('touchstart', function(event) {
            //     event.preventDefault();
            // }, {passive:false});
            this.$nextTick(function(){
            })
        },
        // computed:{
        //     tapFn:function(){
        //         return 'this is tapFn'
        //     }
        // },
        // props:['title'],
        components:{
            // 'my-header':resolve=>require(['@/components/header/header.vue'],resolve),
        },
        methods:{
            showListFn(){
                var currentLi = $(event.target).parents('li');
                if(!$('.internet-list .show').length){
                    if(this.showState){
                        currentLi.addClass('show').siblings().removeClass('show')
                    }else{
                        $('.list-input,.list-content').removeClass('show')
                    }
                }else{
                    this.hideListFn();
                }
                
            },
            hideListFn(){
                if($('.internet-list .show').length){
                    $('.internet-list .show').removeClass('show');
                }                
            },
            // list 控件 renameFn、rollsOffFn、unbunlingFn
            renameFn(){
                console.log('renameFn');

            },
            rollsOffFn(){
                console.log('rollsOffFn');

            },
            unbunlingFn(){
                console.log('unbunlingFn');

            }, 
            // 左右滑动
            swipeleftFn(binding,event){
                this.showListFn();
            },
            swiperightFn(){
                this.hideListFn();
            },


        }
    }
</script>
<style scoped>
    @import url(./css/internet.css);

</style> 