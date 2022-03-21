<template>
  <div class="post">
    <div class="text-box">
        <p >{{ post.id }}</p>
        <p><strong>Название: </strong>{{ post.title }}</p>
        <p><strong>Описание: </strong>{{ post.body}}</p>
    </div>
    <div class="post__btns">
      <my-button @click="$router.push(`/posts/${post.id}`)" >Open</my-button>
    </div>
    <div class="post__btns">
      <my-button @click="$emit('remove', post)" >Delete</my-button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      post: {
        type: Object,
        required: true,
      },
    },
  }
</script>

<style lang="css" scoped>
  .post {
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .text-box {
    margin-right: auto;
    padding-right: 10px;
  }
  .post > *:last-child {
    margin-left: 10px;
  }
</style>