<template>
  <div class="post">
    <div>
        <p>{{ post.id }}</p>
        <p><strong>Название: </strong>{{ post.title }}</p>
        <p><strong>Описание: </strong>{{ post.body}}</p>
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
    justify-content: space-between;
  }
</style>