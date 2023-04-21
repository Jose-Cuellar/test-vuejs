<template>
  <div class="container-fluid">
    <div class="content_home">
      <h1 style="color:white; padding:50px 0px 0px 0px">¡Bienvenidos!</h1><br>
      <div v-if="hide_btn_get">
        <button class="btn_get" @click="recuperarPost()">
          Click para mostrar los datos
        </button>
      </div>
      <br><br>
      <div v-if="show_table">
        <hr>
        <h2 style="color:white;">Datos obtenidos con axios post</h2>
          <table class="table table-striped">
            <thead class="thead-light">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">TITLE</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="nota in notas.slice((currentPage - 1) * 10, currentPage * 10)" :key="nota.id">
                <td>{{ nota.id }}</td>
                <td>{{ nota.title }}</td>
              </tr>
            </tbody>
          </table>
  
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
  
          <div class="botones">
            <!-- <button class="btn_back" @click="back()">
              Regresar
            </button> -->
            <button v-if="show_btn" class="btn_download" @click="downloadExcel()">
              Descargar excel
            </button>
          </div>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import * as XLSX from 'xlsx';
import swal from 'sweetalert2';

export default {
  name: 'homePage',

  data(){
    return{
      notas: [],
      notas_download: [],
      show_table: false,
      show_btn: false,
      hide_btn_get: true,

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
  methods: {
    recuperarPost() {
      axios.get("https://jsonplaceholder.typicode.com/posts").then((respuesta) => {
        if (respuesta.status == 200) {
          this.notas = respuesta.data;
          this.totalDatos = this.notas.length;
          this.totalPages = Math.ceil(this.totalDatos / this.pageSize);
          this.paginate();
          this.loading = false;
          this.show_table = true;
          this.show_btn = true;
          this.hide_btn_get = false;
          // console.log('this.notas: ', JSON.stringify(this.notas));
          swal.fire({
            icon: "success",
            title: "Muy bien!",
            text: "Datos consumidos correctamente",
            confirmButtonColor: "green",
          });
        } else {
          swal.fire({
            icon: "error",
            title: "Oops",
            text: "Ocurrió un error trayendo la info",
            confirmButtonColor: "crimson",
          });
        }
      })
    },

    // Paginación
    paginate() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.paginatedData = this.notas.slice(start, end);
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

    downloadExcel(){
      swal.fire({
        icon: "question",
        title: "Descargar reporte",
        text: "¿Deseas descargar el reporte?",
        confirmButtonText: "Sí, Descargar",
        confirmButtonColor: "green",
        showCancelButton: true,
        cancelButtonText: "No, Cancelar",
        cancelButtonColor: "#d33",
      }).then( (result) => {
        if (result.isConfirmed){
          this.notas.forEach((nota) => {
            this.notas_download.push({
              Id: nota.id,
              Titulo: nota.title,
            })
          });
          let data_export = XLSX.utils.json_to_sheet(this.notas_download);
          const workbook = XLSX.utils.book_new();
          const filename = 'post_recuperados';
          XLSX.utils.book_append_sheet(workbook, data_export, filename);
          XLSX.writeFile(workbook, `${filename}.xlsx`);
        }
      });
    },
    back(){
      window.history.back();
    },
  },
}
</script>

<style scoped>
  .container-fluid{
    width: 100%;
    margin: auto;
    padding: 15% 5% 10% 5%;
    background-image: url("../../assets/imgs/imgs_page/fondo_home.jpeg");
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .content_home{
    margin: auto;
    width: 100%;
  }
  th, td{
    text-align:left;
    padding: 10px 10px 10px 10px;
    margin: auto;
  }
  .btn_get{
    padding: 5px 15px 5px 15px;
    border: 2px solid;
    cursor: pointer;
    background-color: transparent;
    color: #008CBA;
    border-radius: 30px;
    font-weight: bold;
  }
  .btn_get:hover{
    color: green;
  }
  .d-flex{
    padding: 20px;
  }
  .previous, .next{
    color:darkblue;
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
  .btn_download{
    padding: 5px 15px 5px 15px;
    border: 2px solid;
    cursor: pointer;
    background-color: transparent;
    color: #008CBA;
    border-radius: 30px;
    font-weight: bold;
    margin: 20px 20px 5px 0px;
  }
  .btn_download:hover{
    color: green;
  }
</style>
