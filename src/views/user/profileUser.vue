<template>
  <div class="container-fluid">
    <div class="content-profile" id="content1-profile">
      <div class="row justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-center justify-content-xl-center align-items-center h-100">
        <div class="col-12 col-md-12 col-lg-6 col-xl-6 col-sm-12">
          <div style="display:block;" class="row justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-center justify-content-xl-center align-items-center h-100">
            <div class="profile_user">
              <h2>Perfil</h2>
              <!-- <div>
                <span>
                  {{ user.name }}
                </span>
                <span>
                  {{ user.last_name }}
                </span>
                <span>
                  {{ user.email }}
                </span>
              </div> -->
              <!-- <div style="margin:15px auto;" class="col-12 col-md-12 col-lg-8 col-xl-8 col-sm-12">
                <input 
                  type="text"
                  v-model="form.userName"
                  class="form-control color-input-fixed-text"
                  placeholder="Email"
                >
                <div class="mesagge">
                  <span class="errors" v-if="errors.userName">{{ errors.userName }}</span>
                </div>
              </div>
              <div style="margin:15px auto;" class="col-12 col-md-12 col-lg-8 col-xl-8 col-sm-12">
                <div style="display:flex;">
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    v-model="form.userPass"
                    class="form-control color-input-fixed-text"
                    placeholder="Contraseña"
                  >
                  <div class="input-group-append">
                    <button
                      class="btn btn-eye-pass"
                      type="button"
                      @click="showPassword = !showPassword"
                    >
                      <i
                        class="mdi mdi-eye"
                        :class="showPassword ? 'mdi mdi-eye' : 'mdi mdi-eye-off'"
                      ></i>
                    </button>
                  </div>
                </div>
                <div class="mesagge">
                  <span class="errors" v-if="errors.userPass">{{ errors.userPass }}</span>
                </div>
              </div> -->
            </div>
            <div class="botones">
              <button class="btn_modal_update" @click="showModal()">
                Actualizar mis datos
              </button>
            </div>
            <!-- modal para actualizar datos personales -->
            <div id="modal_update_data" class="modal">
              <div class="modal-content">
                <span @click="closeModal()" class="close">&times;</span>
                <h3>Actualiza tus datos</h3>
                <div style="margin:15px auto;" class="col-12 col-md-12 col-lg-8 col-xl-8 col-sm-12">
                  <input 
                    type="text"
                    v-model="form.userName"
                    class="form-control color-input-fixed-text"
                    placeholder="Nombres"
                  >
                  <div class="mesagge">
                    <span class="errors" v-if="errors.userName">{{ errors.userName }}</span>
                  </div>
                </div>

                <div style="margin:15px auto;" class="col-12 col-md-12 col-lg-8 col-xl-8 col-sm-12">
                  <input 
                    type="text"
                    v-model="form.userLastName"
                    class="form-control color-input-fixed-text"
                    placeholder="Apellidos"
                  >
                  <div class="mesagge">
                    <span class="errors" v-if="errors.userLastName">{{ errors.userLastName }}</span>
                  </div>
                </div>

                <div style="margin:15px auto;" class="col-12 col-md-12 col-lg-8 col-xl-8 col-sm-12">
                  <input 
                    type="text"
                    v-model="form.userEmail"
                    class="form-control color-input-fixed-text"
                    placeholder="Email"
                  >
                  <div class="mesagge">
                    <span class="errors" v-if="errors.userEmail">{{ errors.userEmail }}</span>
                  </div>
                </div>
                <div class="botones">
                  <button class="btn_update_data" @click="update()">
                    Actualizar
                  </button>
                </div>
              </div>
            </div>

            <!-- <div class="botones">
              <div>
                <button class="btn_login" @click="login()">
                  Iniciar sesión
                </button>
                <button class="btn_register" @click="register()">
                  Registrarme
                </button>
              </div>
              <button class="btn_restore" @click="showModal()">
                Restablecer contraseña
              </button>
            </div> -->
          </div>
        </div>
        <!-- <div class="btn_regresar">
          <button class="btn_back" @click="back()">
            Regresar
          </button>
        </div> -->
      </div>
    </div>
  </div>
</template>
  
<script>
  import axios from 'axios';
  import $ from 'jquery';
  import swal from 'sweetalert2';
  
  export default {
    name: "ProfileUser",
    data(){
      return{
        dataUser: [],
        form: {
          userName: null,
          userLastName: null,
          userEmail: null,
        },
        errors: {
          userName: false,
          userLastName: false,
          userEmail: false,
        },
        showPassword: false,
      };
    },
    methods:{
      getDataUser(){
        axios
        .get("api/get/user")
        .then((res) => {
          if(res.data.cod == 0){
            this.dataUser = res.data.data;
          }
        })
        .catch((error) => {
          swal.fire({
            icon: "error",
            title: "Ops",
            text: error.response.data.message,
            confirmButtonColor: "#d33",
          });
        });
      },
      back(){
        window.history.back();
      },
      validForm(){
        let app = this;
        if(app.form.userName == null){
          app.errors.userName = "El nombre de usuario es obligatorio.";
          return false;
        }
        if(app.form.userLastName == null){
          app.errors.userLastName = "El apellido de usuario es obligatorio.";
          return false;
        }
        if(app.form.userEmail == null){
          app.errors.userEmail = "El email es obligatorio.";
          return false;
        }
        return true;
      },
      update(){
        var app = this;
        if(app.validForm()){
          axios
          .post('api/update/user')
          .then((res) => {
            console.log(res);
          })
          .catch((res) => {
            console.log(res);
          });
        }
      },
      showModal(){
        $("#modal_update_data").css("display", "block");
      },
      closeModal(){
        $("#modal_update_data").css("display", "none");
      },
    },
    watch: {
      "form.userName": function(n) {
        if (!n) {
          this.errors.userName = "El nombre de usuario es obligatorio.";
        } else {
          this.errors.userName = false;
        }
      },
      "form.userLastName": function(n) {
        if (!n) {
          this.errors.userLastName = "El apellido de usuario es obligatorio.";
        } else {
          this.errors.userLastName = false;
        }
      },
      "form.userEmail": function(n) {
        if (!n) {
          this.errors.userEmail = "El email es obligatorio.";
        } else {
          this.errors.userEmail = false;
        }
      },
    },
    mounted(){
  
    },
  }
</script>
  
<style scoped>
.container-fluid{
  width: 100%;
  height: 100%;
  background-image: url("../../assets/imgs/fondo_perfil.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
.content-profile {
  width: 100%;
  height: 100vh;
}
#content1-profile {
  /* background-image: url("../../assets/imgs/fondo_perfil.jpg"); */
}
.profile_user{
  color: white;
}

/* Icono para ver contraseña */
.btn-eye-pass{
  border: none;
  position: absolute;
  margin-left: -50px;
  font-size: 19px;
}
.mdi-eye::before{
  background-color: none;
}
.mesagge{
  width: 100%;
  text-align: start;
}
.errors{
  color: red;
  font-size: 15px;
}
/* Modal de restablecimiento de contraseña */
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}
.modal-content {
  background-color: #fefefe;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
}
.close {
  color: black;
  font-size: 30px;
  font-weight: bold;
  text-align: end;
  margin-top: -20px;
}
.close:hover,
.close:focus {
  color: #d33;
  text-decoration: none;
  cursor: pointer;
}
.botones{
  width: 50%;
  margin: auto;
  display: grid;
}
.btn_modal_update{
  padding: 5px 15px 5px 15px;
  border: 2px solid;
  cursor: pointer;
  background-color: transparent;
  color: #008CBA;
  border-radius: 30px;
  font-size: 15px;
  font-weight: bold;
  margin: 20px 10px 5px 0px;
}
.btn_modal_update:hover{
  color: green;
}
.btn_update_data{
  padding: 5px 15px 5px 15px;
  border: 2px solid;
  cursor: pointer;
  background-color: white;
  color: #008CBA;
  border-radius: 30px;
  font-size: 15px;
  font-weight: bold;
  margin: 20px 0px 5px 0px;
}
.btn_update_data:hover{
  color: green;
}
.btn_restore{
  max-width: 80%;
  padding: 5px 15px 5px 15px;
  border: 2px solid;
  cursor: pointer;
  background-color: white;
  color: #008CBA;
  border-radius: 30px;
  font-size: 15px;
  font-weight: bold;
  margin: 10px auto 0px auto;
}
.btn_restore:hover{
  color: red;
}
.btn_regresar{
  width: 80%;
  text-align: start;
}
.btn_back{
  padding: 5px 15px 5px 15px;
  border: 2px solid;
  cursor: pointer;
  background-color: white;
  color: #008CBA;
  border-radius: 30px;
  font-size: 15px;
  font-weight: bold;
  margin: 20px 0px 5px 0px;
}
.btn_back:hover{
  color: red;
}
</style>