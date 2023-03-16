<template>
  <div class="content">
    <h1 id="title">Datos consumidos por axios</h1>
      <table class="table table-striped">
        <thead class="thead-light">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">ID USER</th>
            <th scope="col">TITLE</th>
            <th scope="col">COMPLETED</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dato in datos.slice((currentPage - 1) * 10, currentPage * 10)" :key="dato.id">
            <td>{{ dato.id }}</td>
            <td>{{ dato.userId }}</td>
            <td>{{ dato.title }}</td>
            <td>{{ dato.completed }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Paginación -->
      <div class="d-flex justify-content-center">
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item" :class="{disabled: currentPage === 1}">
              <a class="page-link" href="#" @click.prevent="prevPage()">
                Anterior
              </a>
            </li>
            <li class="page-item" v-for="page in pages" :key="page" :class="{active: currentPage === page}">
              <a class="page-link" href="#" @click.prevent="changePage(page)">
                {{ page }}
              </a>
            </li>
            <li class="page-item" :class="{disabled: currentPage === totalPages}">
              <a class="page-link" href="#" @click.prevent="nextPage()">
                Siguiente
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div class="botones">
        <button class="btn_back" @click="back()">
          Regresar
        </button>
        <button class="btn_excel" @click="downloadExcel()">
          Descargar excel
        </button>
      </div>
      <hr>
  </div>
</template>
  
<script>
import axios from "axios";
import * as XLSX from 'xlsx';
import swal from 'sweetalert2';

export default {
  name: 'pruebaAxios',
  data(){
    return{
      datos: [],
      dataToExport: [],

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
    getData() {
      this.loading = true;
      axios.get("https://jsonplaceholder.typicode.com/todos/").then((res) => {
        this.datos = res.data;
        this.totalDatos = this.datos.length;
        this.totalPages = Math.ceil(this.totalDatos / this.pageSize);
        this.paginate();
        this.loading = false;
      });
    },

    // Paginación
    paginate() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.paginatedData = this.datos.slice(start, end);
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

    downloadExcel() {
      swal.fire({
        icon: "question",
        title: "Descargar reporte",
        text: "¿Deseas descargar el reporte?",
        confirmButtonText: "Sí, Descargar",
        confirmButtonColor: "green",
        showCancelButton: true,
        cancelButtonText: "No, Cancelar",
        cancelButtonColor: "#d33",
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
      }).then((result) => {
        if(result.isConfirmed){
          this.datos.forEach((dato) => {
            this.dataToExport.push({
              Id_Usuario:dato.userId,
              Id:dato.id,
              Titulo:dato.title,
              Completado:dato.completed
            });
          });
          let data = XLSX.utils.json_to_sheet(this.dataToExport);
          const workbook = XLSX.utils.book_new();
          const filename = 'axios_get';
          XLSX.utils.book_append_sheet(workbook, data, filename);
          XLSX.writeFile(workbook, `${filename}.xlsx`);
        }
      });
    },
    back(){
      window.history.back();
    },
  },
  mounted(){
    this.getData();
  },
};
</script>
  
<style scoped>
  .content{
    max-width: 80%;
    padding: 100px 10px 50px 10px;
    margin: auto;
  }
  th, td{
    text-align:left;
    padding: 10px 10px 10px 10px;
    margin: auto;
  }
  #title{
    font-size:30px;
    color:darkblue;
  }
  .d-flex{
    padding: 20px;
  }
  .botones{
    width: 100%;
    margin: auto;
  }
  .btn_back{
    padding: 5px 15px 5px 15px;
    border: 2px solid;
    cursor: pointer;
    background-color: white;
    color: #008CBA;
    border-radius: 30px;
    font-weight: bold;
    margin: 20px 20px 5px 0px;
  }
  .btn_back:hover{
    color: red;
  }
  .btn_excel{
    padding: 5px 15px 5px 15px;
    border: 2px solid;
    cursor: pointer;
    background-color: white;
    color: #008CBA;
    border-radius: 30px;
    font-weight: bold;
    margin: 20px 20px 5px 0px;
  }
  .btn_excel:hover{
    color: green;
  }
</style>