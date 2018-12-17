<template>
    <div class='vueMenu'>
        {{msg}}
    </div>
</template>
<script type="text/javascript">
    
    export default {
        name: 'vue-menu',
        data(){
            return {
                msg:'this is vueMenu.vue'
            }
        }
    }
</script>
<style scoped>
    .vueMenu{
        font-size: 30px;
    }
</style>