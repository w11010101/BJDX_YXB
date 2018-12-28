<template>
    <div class='internet' >
        <!-- {{msg}} -->
        <div class="content">
            <div class='tabs'>
                <ul>
                    <li class='tabs-item' v-for='(item,index) in tabs' :class='{active:index===tabActive}' @click='changeTabsFn(index)'>{{item}}</li>
                </ul>
                <div class="swiper-container">
                    <div class="scrollbar" style='height:10px;padding:0 calc((34% - 65px)/2)'>
                        <div class="swiper-scrollbar"></div>
                    </div>
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for='(item,index) in tabs'>

                            <template v-if='index == 0'>
                                <div class='user-internet-info'>
                                    <div class='info' >
                                        <div class='info-msg'>
                                            <h2>{{userInfo.name}}</h2>
                                            <p>上网账号：{{userInfo.account}}</p>
                                        </div>
                                        <Button class='deviceBtn'>{{userInfo.endTime}}前有效</Button>
                                    </div>
                                    <div class='info-details'>
                                        <p><label>账号有效期</label><span>{{userInfo.endTime}}</span></p>
                                        <p><label>服务截至时限</label><span>{{userInfo.expiryDate}}</span></p>
                                        <p><label>当前设备地址</label><span>{{userInfo.currentIpAddress}}</span></p>
                                        <p><label>计费政策</label><span>{{userInfo.strategy}}</span></p>
                                        <p><label>最大连接数</label><span>{{userInfo.maxCount != ''?userInfo.maxCount:'--'}}</span></p>
                                    </div>
                                </div>
                                <div class='parts'>
                                    <h3>2018年11月</h3>
                                    <ul class="list">
                                        <li v-for = 'item in internetHistory'>
                                            <h4>MAC地址：{{item.macAddress}}</h4>
                                            <p name='p1'><label>计费策略：</label><span>{{item.strategy}}</span></p>
                                            <p name='p2'><label>ipv4地址：</label><span>{{item.ip4Address}}</span></p>
                                            <p name='p3'><label>ipv4流量：</label><span>{{item.ip4Flow}}</span></p>
                                            <p name='p5'><label>上线时间：</label><span>{{item.upTime}}</span></p>
                                            <p name='p6'><label>下线时间：</label><span>{{item.downTime}}</span></p>
                                        </li>
                                    </ul>
                                </div>
                            </template>
                            <template v-else >
                                <div class='internet-list'>
                                    <ul class='list'>
                                        <li v-for='todo in (index == 1?internetServerList:internetServerBindList)' >
                                            <div class='list-content'>
                                                <label>{{todo.ipAddressOrName}}</label><p>{{todo.macAddress}}</p>
                                            </div>
                                            <div class="list-input">
                                                <div v-if='index==1'>
                                                    <button class='rollsOffBtn' @click='rollsOffFn(todo)'>下线</button>
                                                </div>
                                                <div v-if='index==2'>
                                                    <button class='unbunlingBtn' @click='unbunlingFn(todo)'>解绑</button>
                                                </div>
                                                <div v-if='index==2'>
                                                    <button class='renameBtn' @click='renameFn(todo)'>重命名</button>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--  -->
        <div v-transfer-dom>
            <confirm
                v-model="confirmShow"
                show-input
                ref="confirm"
                title='重命名'
                @on-cancel="onCancel"
                @on-confirm="onConfirm"
                @on-show="onShow"
                @on-hide="onHide">
            </confirm>
        </div>
    </div>
</template>
<script type="text/javascript">
    import internet_mothods from './js/internet.js';
    export default {
        name: 'internet',
        data(){
            return {
                title:'上网',
                msg:'this is internet.vue',
                tabs:['上网记录','在线设备','绑定设备'],
                tabActive:0,
                userInfo:{},
                internetHistory:[],
                swiperObj:{},
                showState:true,
                internetServerList:[],
                internetServerBindList:[],
                confirmShow:false,
                activeItem:{},
            }
        },
        mixins: [internet_mothods],

    }
</script>
<style scoped>
    /*! autoprefixer: off */
    @import url(./css/internet.css);


    /* autoprefixer: on */
</style>   