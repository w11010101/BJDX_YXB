<template>
    <div class='internet'>
        <!-- {{msg}} -->
        <div class="content">
            <div class='user-internet-info'>
                <div class='info' >
                    <div class='info-header'>
                        <img src="@/assets/internet/man.png" alt="">
                    </div>
                    <div class='info-msg'>
                        <h2>羊羊羊</h2>
                        <p>上网账号：20180808</p>
                    </div>
                    <Button to='/internet/list' class='deviceBtn'>设备管理 <Icon type="ios-arrow-forward" size='14' /></Button>
                    <!-- <button>设备管理 &#8250;</button> -->
                </div>
                <div class='info-details'>
                    <p><label>账号有效期</label><span>2019.09.20.23:59:59</span></p>
                    <p><label>服务截至时限</label><span>已开启实名认证，请咨询82802999</span></p>
                    <p><label>当前设备地址</label><span>202.112.111.111</span></p>
                    <p><label>计费政策</label><span>包月</span></p>
                    <p><label>最大连接数</label><span>29</span></p>
                </div>
            </div>
            
            <div class='parts'>
                <h3>2018年11月</h3>
                <ul class="list">
                    <li>
                        <h4>MAC地址：手机</h4>
                        <p name='p1'><label>计费策略：</label><span>外聘人员国际畅游包月</span></p>
                        <p name='p2'><label>ipv4地址：</label><span>172.20.240.98</span></p>
                        <p name='p3'><label>ipv4流量：</label><span>2.58M</span></p>
                        <p name='p4'><label>ipv6流量：</label><span></span></p>
                        <p name='p5'><label>上线时间：</label><span>2018.10.10 10:12:12</span></p>
                        <p name='p6'><label>下线时间：</label><span>2018.10.11 12:12:12</span></p>
                    </li>
                </ul>
                <ul class="list">
                    <li>
                        <h4>MAC地址：手机</h4>
                        <p name='p1'><label>计费策略：</label><span>外聘人员国际畅游包月</span></p>
                        <p name='p2'><label>ipv4地址：</label><span>172.20.240.98</span></p>
                        <p name='p3'><label>ipv4流量：</label><span>2.58M</span></p>
                        <p name='p4'><label>ipv6流量：</label><span></span></p>
                        <p name='p5'><label>上线时间：</label><span>2018.10.10 10:12:12</span></p>
                        <p name='p6'><label>下线时间：</label><span>2018.10.11 12:12:12</span></p>
                    </li>
                </ul>
                <ul class="list">
                    <li>
                        <h4>MAC地址：手机</h4>
                        <p name='p1'><label>计费策略：</label><span>外聘人员国际畅游包月</span></p>
                        <p name='p2'><label>ipv4地址：</label><span>172.20.240.98</span></p>
                        <p name='p3'><label>ipv4流量：</label><span>2.58M</span></p>
                        <p name='p4'><label>ipv6流量：</label><span></span></p>
                        <p name='p5'><label>上线时间：</label><span>2018.10.10 10:12:12</span></p>
                        <p name='p6'><label>下线时间：</label><span>2018.10.11 12:12:12</span></p>
                    </li>
                </ul>
            </div>
        </div>
        <!-- router-view -->
        <transition name="slide-fade">
            <router-view class='internet-view' name='internet-view'></router-view>
        </transition>
    </div>
</template>
<script type="text/javascript">
    
    export default {
        name: 'internet',
        data(){
            return {
                title:'上网服务',
                msg:'this is internet.vue',
            }
        },
        mounted(){
            this.$nextTick(function(){
                // alert($('html').css('font-size'));
                
            })
            
        }
        // props:['title'],
        // components:{
        //     'my-header':resolve=>require(['@/components/header/header.vue'],resolve),
        // }

    }
</script>
<style scoped>
/*! autoprefixer: off */
    @import url(./css/internet.css);
    /*@import url(./internet-media.css);*/
    /* autoprefixer: on */
</style> 