<template>
    <div class='salary-detail'>
        <!-- content -->
        <div class='content'>
            <div class='banner'>
                <div>实发工资（元）</div>
                <div>12123123.12</div>
            </div>
            <!--  -->
            <div class='detail-content'>
                <div class="detail-part-1">
                    <h2>基本项目</h2>
                    <div>
                        <label for="">应发工资：</label>
                        <span>654345678.76元</span> 
                    </div>
                    <div>
                        <label for="">实发工资：</label>
                        <span>2345678765.87元</span> 
                    </div>
                    <div>
                        <label for="">个人所得税：</label>
                        <span>23456.76元</span> 
                    </div>

                </div>
                <div class="detail-part-2">
                    <h2>其他明细</h2>
                    <div>
                        <label for="">补助天数：</label>
                        <span>18天</span> 
                    </div>
                    <div>
                        <label for="">合计缺勤天数：</label>
                        <span>0天</span> 
                    </div>
                    <div>
                        <label for="">缺勤扣款：</label>
                        <span>0.00元</span> 
                    </div>
                    <div>
                        <label for="">餐补：</label>
                        <span>540元</span> 
                    </div>
                    <div>
                        <label for="">养老保险：</label>
                        <span>367.00元</span> 
                    </div>
                    <div>
                        <label for="">医疗保险：</label>
                        <span>120.08元</span> 
                    </div>
                    <div>
                        <label for="">失业保险：</label>
                        <span>9.18元</span> 
                    </div>
                    <div>
                        <label for="">公积金：</label>
                        <span>124534元</span> 
                    </div>
                    <div>
                        <label for="">汇总：</label>
                        <span>123465789元</span> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        name: 'salary-detail',
        data(){
            return {
                msg:'this is salary-detail.vue',
               
                
            }
        },
        components:{
            
        },
        mounted(){
            
            
        },
        methods:{
            
        }
    }
            

</script>
<style scoped>
    @import url(./css/salary.css);
    
    
    
</style>