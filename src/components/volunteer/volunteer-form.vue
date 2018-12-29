<template>
    <div class="volunteer-form">
        <div class="content">
            <ul class='group'>
                <li><label>学号</label><span>12312312312312</span></li>
                <li><label>姓名</label><span>张三</span></li>
                <li><label>性别</label><span>男</span></li>
                <li><label>学院</label><span>医学院药理系医学院药理系</span></li>
                <li><label>年级</label><span>研究生一年级</span></li>
                <li><label>学生类型</label><span>研究生</span></li>
            </ul>
            <div class='edit'>
                <ul class='group'>
                    <li><label>联系电话</label><input type="" name="" v-model='phone' placeholder="输入电话号码" maxlength="11" ></li>
                </ul>
                <x-switch title="是否在校" v-model="switchvalue"></x-switch>
            </div>
            <button class='floot-btn' @click='submitFn'>确认报名</button>
        </div>

        <loading :show="loadingshow" text=""></loading>
    </div>
</template>
<script>
    import route from '@/router';
    import Vue from 'vue'
    import { Group ,XSwitch, Loading} from 'vux'
    export default ({
        data(){
            return {
                msg: 'this is volunteer-form.vue',
                title: '志愿服务',
                transitionName:"slide-fade",
                phone:'',
                switchvalue:false,
                loadingshow:false
            }
        },
        components: {
            Group,
            XSwitch,
            Loading
        },  
        watch:{
            
        },
        mounted(){
            console.log(this.$route)
        },
        methods:{
            submitFn(){
                if(this.phone == ''){
                    this.$vux.toast.text('手机号能为空');
                }else if(this.phone.length< 11){
                    this.$vux.toast.text('手机号不正确');
                }else{
                    // this.$vux.toast.text('手机号为：'+this.phone);
                    this.loadingshow = true;
                    setTimeout(()=>{
                        this.loadingshow = false;
                        // route.replace({
                        //     name:'detail'
                        // })
                        // route.go(-1)
                        // route.go({
                        //     name:'detail',
                        //     params:_this.lists[index]
                        // })
                    },1000)
                }
                
            }
        }
    })
</script>
<style scoped="">
    @import url(./css/volunteer.css);
    
</style>