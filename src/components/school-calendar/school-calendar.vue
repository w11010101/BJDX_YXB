<template>
    <div class="school-calendar">
        <div >
            <template v-if='termstate == 1' >
                <img src="@/assets/school-calendar/term1-word.jpg" alt="">
                <img src="@/assets/school-calendar/term1-img.jpg" alt="">
            </template>
            <template v-else>
                <img src="@/assets/school-calendar/term2-word.jpg" alt="">
                <img src="@/assets/school-calendar/term2-img.jpg" alt="">
            </template>
            <img src="@/assets/school-calendar/floor.jpg" alt="">
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';

    export default ({
        data(){
            return {
                msg: 'this is school-calendar.vue',
                title: '校历',
                termstate:1
            }
        },
        mounted(){
            let currentTime = new Date(new Date().getFullYear()+1,6,22);
            // 第一学期
            let term1TimeStart = new Date(new Date().getFullYear(),7,27);
            let term1TimeEnd = new Date(new Date().getFullYear()+1,0,19);
            // 寒假
            let winterVacationStart = new Date(new Date().getFullYear()+1,0,20);
            let winterVacationEnd = new Date(new Date().getFullYear()+1,1,17); 
            // 第二学期
            let term2TimeStart = new Date(new Date().getFullYear()+1,1,18);
            let term2TimeEnd = new Date(new Date().getFullYear()+1,6,7);
            // 暑假
            let summerVacationStart = new Date(new Date().getFullYear()+1,6,8);
            let summerVacationEnd = new Date(new Date().getFullYear()+1,7,26);
            

            if(currentTime>=term1TimeStart && currentTime<=term1TimeEnd){
                // console.log('第一学期 2018.8.27 ~ 2019.1.19');
                this.termstate = 1;
            }else if(currentTime>=winterVacationStart && currentTime<=winterVacationEnd){
                this.termstate = 2;
                // console.log('暑假 2019.1.20 ~ 2019.2.17 第二学期 ');
            }

            if(currentTime>=term2TimeStart && currentTime<=term2TimeEnd){
                // console.log('第二学期 2019.2.18 ~ 2019.7.7');
                this.termstate = 2;
            }else if(currentTime>=summerVacationStart && currentTime<=summerVacationEnd){
                // console.log('寒假 2019.7.8 ~ 2019.8.26 第一学期 ');
                this.termstate = 1;
            }
        },
        methods:{
        }
    })
</script>
<style>
    img{
        width: 100%;
    }
    .school-calendar div{
        height: 100%;
        overflow-y: auto;
        overflow-scrolling:touch;
    }
</style>