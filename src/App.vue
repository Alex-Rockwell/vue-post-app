<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <my-input v-model="searchQuery" placeholder="Поиск..."/>
    <div class="app-btns">
      <my-button
        @click="showDialog"
      >
        Создать 
      </my-button>
      <my-select
        v-model="selectedSort"
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
    <div class="page__wrapper">
      <div 
        v-for="pageNumber in totalPages" 
        :key="pageNumber"
        class="page"
        :class="{
          'current-page': page === pageNumber
        }"
        @click="changePage(pageNumber)"
      >
        {{pageNumber}}
      </div>
    </div>
  </div>
</template>

<script>
import PostList from '@/Components/PostList.vue'
import PostForm from '@/Components/PostForm.vue'
import axios from 'axios'
import MySelect from './Components/UI/MySelect.vue'
export default {
  components: {
    PostList,
    PostForm,
    MySelect
},
  data() {
    return {
      posts: [ ],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: '',
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По содержимому'}
      ],
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0
    }
  },
  methods: {
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
    async fetchPosts() {
      try {
        this.isPostsLoading = true
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
          params: {
            _page: this.page,
            _limit: this.limit,
          }
        })
        this.posts = response.data
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
      } catch (e) {
        alert('Download Error')
      } finally {
        this.isPostsLoading = false
      }
    },
    changePage(pageNumber) {
      this.page = pageNumber
    }
  },
  created() {
    this.fetchPosts()
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      })
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
  watch: {
    page() {
      this.fetchPosts()
    }
  },
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
    padding: 20px;
  }
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

</style>