<template>
  <div id="app" v-cloak>
    <!-- <img src="./assets/logo.png"> -->
    <router-view />
    <!-- <list-menu :myprop='"this is App.vue"'></list-menu> -->
  </div>
</template>

<script>
export default {
    name: 'App',
    beforeCreate(){
        window.addEventListener('contextmenu', function(e){
            e.preventDefault();
        });
        
    }, 
}
</script>

<style>
  @import url(./common/css/common.css);
  
</style>
