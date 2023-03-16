<template>
  <div class="min-h-screen w-screen bg-gray-600 flex items-center justify-center">
    <draggable :list="users">     
      <div
        class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
        v-for="user in users" :key="user.name"
        >
        <div class="content_users">
          <div class="avatar_user">
            <img
              :src="user.image"
            >
          </div>
          <div class="name_user">
            <b>{{ user.name }}</b>
          </div>
        </div>
      </div>
    </draggable>
    <!-- Paginación -->
    <div class="d-flex justify-content-center">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item" :class="{disabled: currentPage === 1}">
            <a class="previous page-link" href="#" @click.prevent="prevPage()">
              Anterior
            </a>
          </li>
          <li class="page-item" v-for="page in pages" :key="page" :class="{active: currentPage === page}">
            <a class="page-link" href="#" @click.prevent="changePage(page)">
              {{ page }}
            </a>
          </li>
          <li class="page-item" :class="{disabled: currentPage === totalPages}">
            <a class="next page-link" href="#" @click.prevent="nextPage()">
              Siguiente
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { VueDraggableNext } from "vue-draggable-next";

export default {
  name: 'App',
  components: {
    draggable: VueDraggableNext   
  },
  data() {
    return {
      users: [],

      // Paginación
      currentPage: 1,
      pageSize: 10,
      totalDatos: 0,
      totalPages: 0,
      paginatedData: [],
      pageSizes: [5, 10, 15],
      currentSize: 10,
      paginationVisible: true,
      loading: false,
    }
  },
  computed: {
    pages() {
      const pages = [];
      const limit = this.totalPages > 5 ? 5 : this.totalPages;
      let start = this.currentPage - 2;
      if (start <= 0) start = 1;
      let end = start + limit - 1;
      if (end > this.totalPages) {
        end = this.totalPages;
        start = end - limit + 1;
        if (start <= 0) start = 1;
      }
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
  methods:{
    // Paginación
    paginate() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.paginatedData = this.users.slice(start, end);
    },
    changePage(page) {
      this.currentPage = page;
      this.paginate();
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.paginate();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.paginate();
      }
    },
    changeSize(size) {
      this.pageSize = size;
      this.totalPages = Math.ceil(this.totalDatos / this.pageSize);
      this.currentPage = 1;
      this.paginate();
    },
  },
  mounted() {
    axios
    .get('https://rickandmortyapi.com/api/character')
    .then(response => {
      this.users = response.data.results;
      this.users.sort((a, b) => a.name.localeCompare(b.name));
      this.totalDatos = this.users.length;
      this.totalPages = Math.ceil(this.totalDatos / this.pageSize);
      this.paginate();
      this.loading = false;
    })
    .catch(error => {
      console.log(error);
    });
  }
}
</script>

<style scoped>
.w-screen{
  max-width: 60%;
  padding: 100px 10px 50px 10px;
  margin: auto;
}
.list-group-item{
  background-color: rgb(60, 62, 68);
  border-radius: 20px;
}
.content_users{
  display: flex;
  cursor: move;
}
.id_user, .name_user, .avatar_user{
  padding: 15px;
  margin-top: auto;
  margin-bottom: auto;
}
.name_user{
  color: white;
}
.avatar_user img{
  max-width: 100px;
  border-radius: 100%;
}
.d-flex{
  padding: 20px;
}
</style>