<template>
    <div class="volunteer-detail">

        <div class='banner'>
            <img :src="item.img2" alt="">
        </div>
        <div class='volunteer-title'>
            <h1>{{item.title}}</h1>
            <button class='going' v-if='item.statue == 1'>正在活动</button>
            <button class='before' v-else-if='item.statue==2'>招募中</button>
            <button class='end' v-else>已结束</button>
            <!-- <p>招募人数：{{item.peoples}}人</p> -->
            <img src="@/assets/volunteer/img5-1.png" alt="" v-if='item.statue == 1'>
            <img src="@/assets/volunteer/img5-2.png" alt="" v-else-if='item.statue==2'>
        </div>
        <!-- info -->
        <div class='volunteer-content'>
            <h2>活动概况</h2>
            <div>
                <label for="">开始时间：</label>
                <p>{{item.starttime}}</p>
            </div>
            <div>
                <label for="">截止时间：</label>
                <p>{{item.endtime}}</p>
            </div>
            <div>
                <label for="">招募人数：</label>
                <p>已报名{{item.peoples}}人</p>
            </div>
            <div>
                <label for="">活动时长：</label>
                <p>{{item.longtime}}</p>
            </div>
            <div>
                <label for="">活动地点：</label>
                <p>{{item.address}}</p>
            </div>
        </div>
        <div class='volunteer-content'>
            <h2>活动详情</h2>
            <p class='detail'>{{item.detailInfo}}</p>
        </div>
        <button class='floot-btn' @click='submitFn'>立即报名</button>
        <alert v-model="show"  @on-show="onShow" @on-hide="onHide">报名中。。。</alert>
        <!-- router-view -->
        <transition name="slide-fade">
            <router-view class='sub-components-view' name='volunteer-form-view'></router-view>
        </transition>
    </div>
</template>
<script>
    import route from '@/router';
    import { Alert } from 'vux'
    export default ({
        data(){
            return {
                msg: 'this is volunteer-detail.vue',
                title: '志愿服务',
                item:{},
                show:false
            }
        },
        mounted(){
            this.item = this.$route.params;
        },
        components:{
            Alert
        },
        methods:{
            submitFn(){
                if(this.item.statue!=3){
                    this.$vux.toast.text('暂时无法报名');
                    // this.show = true;
                    // route.push({
                    //     name:'form',
                    //     params:{
                    //         item:this.item
                    //     }
                    // });
                }else{
                    this.$vux.toast.text('活动已结束');
                }
                
            },
            onShow(){
                console.log('show');
            },
            onHide(){
                console.log('hide');
            }
        }

    })
</script>
<style scoped>
    @import url(./css/volunteer.css);
    
</style>