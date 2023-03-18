<template>
  <div class="container-fluid">
    <div class="content-login" id="content1-login">
      <div class="row justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-center justify-content-xl-center align-items-center h-100">
        <div class=" col-12 col-md-12 col-lg-6 col-xl-6 col-sm-12">
          <div style="display:block;" class="row justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-center justify-content-xl-center align-items-center h-100">
            <div class="login_user">
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
            <!-- modal restablecer contraseña -->
            <div id="myModal" class="modal">
              <div class="modal-content">
                <span @click="closeModal()" class="close">&times;</span>
                <p>Este es mi modal personalizado.</p>
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
  // import swal from 'sweetalert2';
  
  export default {
    name: "ProfileUser",
    data(){
      return{
        form: {
          userName: null,
          userPass: null,
        },
        errors: {
          userName: false,
          userPass: false,
        },
        showPassword: false,
        modalRestore: false,
      };
    },
    methods:{
      back(){
        window.history.back();
      },
      validForm(){
        let app = this;
        if(app.form.userName == null){
          app.errors.userName = "El nombre de usuario o email es obligatorio.";
          return false;
        }
        if(app.form.userPass == null){
          app.errors.userPass = "La contraseña es obligatoria.";
          return false;
        }
        return true;
      },
      login(){
        var app = this;
        if(app.validForm()){
          axios.post('login/users').then((res) => {
            console.log(res);
          })
          .catch((res) => {
            console.log(res);
          });
        }
      },
      showModal(){
        $("#myModal").css("display", "block");
      },
      closeModal(){
        $("#myModal").css("display", "none");
      },
    },
    watch: {
      "form.userName": function(n) {
        if (!n) {
          this.errors.userName = "El nombre de usuario o email es obligatorio.";
        } else {
          this.errors.userName = false;
        }
      },
      "form.userPass": function(n) {
        if (!n) {
          this.errors.userPass = "La contraseña es obligatoria.";
        } else {
          this.errors.userPass = false;
        }
      },
    },
    mounted(){
  
    },
  }
</script>
  
<style scoped>
.container-fluid{
  padding-right: 0px !important;
  padding-left: 0px !important;
  overflow: hidden;
  height: auto;
}
.content-login {
  padding-top: 10%;
  padding-bottom: 10%;
  height: 100%;
}
#content1-login {
  /* background-color: aqua; */
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
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}
.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
.botones{
  width: 50%;
  margin: auto;
  display: grid;
}
.btn_login{
  padding: 5px 15px 5px 15px;
  border: 2px solid;
  cursor: pointer;
  background-color: white;
  color: #008CBA;
  border-radius: 30px;
  font-size: 15px;
  font-weight: bold;
  margin: 20px 10px 5px 0px;
}
.btn_login:hover{
  color: green;
}
.btn_register{
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
.btn_register:hover{
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