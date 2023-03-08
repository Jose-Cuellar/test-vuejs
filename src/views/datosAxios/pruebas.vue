<template>
  <div id="aplicacion">
    <div v-if="hide_btn_get">
      <button class="btn_get" v-on:click="recuperarPost()">
        Click para mostrar los datos
      </button>
    </div>
    <br><br>
    <div v-if="show_table">
      <hr>
      <h1>Datos obtenidos con v-on:click</h1>
        <table class="table table-striped">
          <thead class="thead-light">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">TITLE</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="nota in notas" v-bind:key="nota.id">
              <td>{{ nota.id }}</td>
              <td>{{ nota.title }}</td>
            </tr>
          </tbody>
        </table>
        <div v-if="show_btn">
          <button class="btn_download" @click="downloadExcel()">
            Descargar excel
          </button>
        </div>
      <hr>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import * as XLSX from 'xlsx';
import swal from 'sweetalert2';

export default {
  name: 'pruebasVue',
  data(){
    return{
      notas: [],
      notas_download: [],
      show_table: false,
      show_btn: false,
      hide_btn_get: true,
    }
  },
  methods: {
    recuperarPost() {
      axios.get("https://jsonplaceholder.typicode.com/posts").then((respuesta) => {
        if (respuesta.status == 200) {
          this.notas = respuesta.data;
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
    }
  },
}
</script>

<style scoped>
  #aplicacion{
    max-width: 80%;
    padding: 80px 10px 50px 10px;
    margin: auto;
  }
  /* th{
    border: 2px solid #008CBA !important;
  }
  th, td{
    text-align:left;
    border: 1px solid gray;
    padding: 10px 10px 10px 10px;
    margin: auto;
  } */
  .btn_get{
    padding: 10px 15px 10px 15px;
    border: 2px solid;
    cursor: pointer;
    background-color: white;
    color: #008CBA;
    border-radius: 30px;
    font-weight: bold;
  }
  .btn_get:hover{
    color: green;
  }
  .btn_download{
    padding: 10px 15px 10px 15px;
    border: 2px solid;
    cursor: pointer;
    background-color: white;
    color: #008CBA;
    border-radius: 30px;
    font-weight: bold;
    margin-top: 20px;
  }
  .btn_download:hover{
    color: green;
  }
</style>
