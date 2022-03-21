<template>
  <div class="navbar">
    <my-button class="my-button" @click="$router.push('/')">Home</my-button>
    <router-link class="link" to="/posts">Posts</router-link>
    <router-link class="link" to="/about">About</router-link>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>
  .navbar {
    background-color: teal;
    box-shadow: 2px 2px 4px gray;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 20px;
    padding: 10px 15px;
  }
  .navbar .my-button {
    color: #fff;
    border-color: #fff;
    margin-right: auto;
  }
  .navbar .my-button:hover {
    cursor: pointer;
  }
  .link {
    padding: 10px;
    color: #fff;
    text-decoration: none;
    font-size: 18px;
  }
</style>