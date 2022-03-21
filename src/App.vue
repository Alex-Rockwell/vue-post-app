<template>
  <div  class="app">
    <navbar/>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "./Components/Navbar.vue";
  export default {
    components: { Navbar }
}
</script>

<style>
  body {
    padding-left: 1px;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .app {
    padding: 0 20px 70px;
  }
</style>