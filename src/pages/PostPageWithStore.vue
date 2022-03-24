<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input 
      :model-value="searchQuery" 
      @update:model-value="setSearchQuery"
      placeholder="Поиск..."
    />
    <div class="app-btns">
      <my-button
        @click="showDialog"
      >
        Создать 
      </my-button>
      <my-select
        :model-value="selectedSort"
        @update:model-value="setSelectedSort"
        :options="sortOptions"
      >
      </my-select>
    </div>

    <my-dialog v-model:show="dialogVisible">
      <post-form
        @create="createPost"
      />
    </my-dialog>

    <post-list 
      v-bind:posts="sortedAndSearchedPosts"
      @remove="removePost"
      v-if="!isPostsLoading"
    />
    <div v-else>Идет загрузка...</div>
    
    <div 
      v-intersection="{loadMorePosts}" 
      class="observer">
    </div>

  </div>
</template>

<script>
import PostList from '@/Components/PostList.vue'
import PostForm from '@/Components/PostForm.vue'
import axios from 'axios'
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'

export default {
  components: {
    PostList,
    PostForm,
},
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort',
    }),
    ...mapActions({
      fetchPosts: 'post/fetchPosts',
      loadMorePosts: 'post/loadMorePosts',
    }),
    createPost(post) {
      this.posts.push(post)
      this.dialogVisible = false
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true
    },
  },

  mounted() {
    this.fetchPosts()
  },

  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostsLoading: state => state.post.isPostsLoading,
      selectedSort: state => state.post.selectedSort,
      sortOptions: state => state.post.sortOptions,
      searchQuery: state => state.post.searchQuery,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts', 
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts', 
    }),
  },
  watch: {

  },
}
</script>

<style>
  .app-btns {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
  }
  .page__wrapper {
    display: flex;
    margin-top: 15px;
  }
  .page {
    padding: 5px;
    border: 1px solid black;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
  }
  .page:hover {
    cursor: pointer;
  }
  .page__wrapper > *:not(:last-child) {
    border-right: none;
  }
  .current-page {
    border: 2px solid teal !important;
  }
  .observer {
    height: 30px;
    background-color: none;
  }

</style>