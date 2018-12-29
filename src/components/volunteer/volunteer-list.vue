<template>
    <div class="volunteer">
        <div class='content'>
            <!-- list -->
            <ul class='list'>
                <li v-for='(item,index) in lists' @click='toDetail(index)'>
                    <div class='list-img'>
                        <img :src="item.img" alt="">
                    </div>
                    <div class='list-info'>
                        <h3>{{item.title}}</h3>
                        <p>活动开始时间：{{item.endtime}}</p>
                        <p>活动时长：{{item.longtime}}</p>
                        <p>招募截止时间：{{item.endtime}}</p>
                    </div>
                </li>
            </ul>
            <!-- nothing -->
            <div class='nothing'>
                没有更多了
            </div>
        </div>
        <transition name="slide-fade">
            <router-view class='sub-components-view' name='volunteer-list-view'></router-view>
        </transition>
    </div>
</template>
<script>
    import route from '@/router'
    export default ({
        data(){
            return {
                msg: 'this is volunteer.vue',
                title: '志愿服务',
                lists:[
                    {
                        title:'鲁迅博物馆讲解',
                        starttime:'2019.12.12',
                        endtime:'2019.09.09',
                        longtime:'6小时',
                        peoples:100,
                        address :'北京大学北京大学北京大学北京大学北京大学北京大学北京大学北京大学',
                        detailInfo:'作为中国科幻“四大天王”之一，韩松代表着其中人文与反思的一面。他站在不同维度、通过不同视角冷静观察着宇宙，以荒诞诡谲的风格，在科幻中描摹历史、现实和未来。韩松的作品常常突破文字的限制，给读者留下浓烈又独特的鬼魅感受。首次出版的精选集由韩松亲自选编，包含经典长篇《红色海洋》、《火星照耀美国》，并首度出版杂文集《我一次次活着是为了什么》、诗集《假漂亮和苍蝇拍手》，收录未发表中短篇小说《苦难》、获奖中短篇小说集《冷战与信使》。',
                        img:require('@/assets/volunteer/img1-1.png'),
                        img2:require('@/assets/volunteer/img1-2.png')
                    },
                    {
                        title:'第十一届全国大学生社会活动',
                        starttime:'2019.12.12',
                        endtime:'2019.10.09',
                        longtime:'2小时',
                        peoples:100,
                        address :'北京大学北京大学北京大学北京大学北京大学北京大学北京大学北京大学',
                        detailInfo:'作为中国科幻“四大天王”之一，韩松代表着其中人文与反思的一面。他站在不同维度、通过不同视角冷静观察着宇宙，以荒诞诡谲的风格，在科幻中描摹历史、现实和未来。韩松的作品常常突破文字的限制，给读者留下浓烈又独特的鬼魅感受。首次出版的精选集由韩松亲自选编，包含经典长篇《红色海洋》、《火星照耀美国》，并首度出版杂文集《我一次次活着是为了什么》、诗集《假漂亮和苍蝇拍手》，收录未发表中短篇小说《苦难》、获奖中短篇小说集《冷战与信使》。',
                        img:require('@/assets/volunteer/img2-1.png'),
                        img2:require('@/assets/volunteer/img2-2.png')
                    },
                    {
                        title:'多维宇宙观察者·《韩松精选集》首发',
                        starttime:'2019.12.12',
                        endtime:'2019.12.15',
                        longtime:'1小时',
                        peoples:100,
                        address :'北京大学北京大学北京大学北京大学北京大学北京大学北京大学北京大学',
                        detailInfo:'作为中国科幻“四大天王”之一，韩松代表着其中人文与反思的一面。他站在不同维度、通过不同视角冷静观察着宇宙，以荒诞诡谲的风格，在科幻中描摹历史、现实和未来。韩松的作品常常突破文字的限制，给读者留下浓烈又独特的鬼魅感受。首次出版的精选集由韩松亲自选编，包含经典长篇《红色海洋》、《火星照耀美国》，并首度出版杂文集《我一次次活着是为了什么》、诗集《假漂亮和苍蝇拍手》，收录未发表中短篇小说《苦难》、获奖中短篇小说集《冷战与信使》。',
                        img:require('@/assets/volunteer/img2-1.png'),
                        img2:require('@/assets/volunteer/img2-2.png')
                    },
                    {
                        title:'儿童户外活动安全讲座',
                        starttime:'2019.12.12',
                        endtime:'2019.12.15',
                        longtime:'1小时',
                        peoples:100,
                        address :'北京大学北京大学北京大学北京大学北京大学北京大学北京大学北京大学',
                        detailInfo:'作为中国科幻“四大天王”之一，韩松代表着其中人文与反思的一面。他站在不同维度、通过不同视角冷静观察着宇宙，以荒诞诡谲的风格，在科幻中描摹历史、现实和未来。韩松的作品常常突破文字的限制，给读者留下浓烈又独特的鬼魅感受。首次出版的精选集由韩松亲自选编，包含经典长篇《红色海洋》、《火星照耀美国》，并首度出版杂文集《我一次次活着是为了什么》、诗集《假漂亮和苍蝇拍手》，收录未发表中短篇小说《苦难》、获奖中短篇小说集《冷战与信使》。',
                        img:require('@/assets/volunteer/img4-1.png'),
                        img2:require('@/assets/volunteer/img4-2.png')
                    }
                ]
            }
        },
        watch:{
            '$route'(){
                // console.log('$route = ',arguments);
            }
        },  
        mounted(){
            // console.log(this.$route.params)
        },
        methods:{
            toDetail(index){
                // this.transitionName = "slide-fade";
                var _this = this;

                // console.log(_this.lists[index]);

                route.push({
                    name:'list-detail',
                    params:_this.lists[index]
                })

            }
        }
    })
</script>
<style scoped="">
    @import url(./css/volunteer.css);
    
</style>