<template>
  <div class="container-fluid">
    <div class="content-login" id="content1-login">
      <div class="row justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-center justify-content-xl-center align-items-center h-100">
        <div class=" col-12 col-md-12 col-lg-6 col-xl-6 col-sm-12">
          <div class="row justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-center justify-content-xl-center align-items-center h-100">
            <div class="col-12 col-md-12 col-lg-6 col-xl-6 col-sm-12">
              <input type="text"
                v-model="form.userName"
                class="form-control color-input-fixed-text"
                placeholder="Usuario / email"
                aria-label="Email"
              >
              <span class="errors" v-if="errors.userName">{{ errors.userName }}</span>
            </div>
            <div class="col-12 col-md-12 col-lg-6 col-xl-6 col-sm-12">
              <input type="text"
                v-model="form.userPass"
                class="form-control color-input-fixed-text"
                placeholder="Contraseña"
                aria-label="Email"
              >
              <span class="errors" v-if="errors.userPass">{{ errors.userPass }}</span>
            </div>
            <div class="botones">
              <button class="btn_login" @click="login()">
                Iniciar sesión
              </button>
              <button class="btn_restore" @click="restorePass()">
                Restablecer contraseña
              </button>
            </div>

            <div>
              <button class="btn_back" @click="back()">
                Regresar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
// import swal from 'sweetalert2';

export default {
  name: "loginUser",
  data(){
    return{
      form: {
        userName: null,
        userPass: null,
      },
      errors: {
        userName: false,
        userPass: false,
      }
    };
  },
  methods:{
    back(){
      window.history.back();
    },
    validForm(){
      let app = this;
      if(app.userName == null){
        app.errors.userName = "El nombre de usuario o email es obligatorio.";
      }
      if(app.userPass == null){
        app.errors.userPass = "La contraseña es obligatoria.";
      }
      
      if(!app.errors.userName && !app.errors.userPass){
        return true;
      } else {
        return false;
      }
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
  height: 100vh;
}
.content-login {
  padding-top: 10%;
  padding-bottom: 10%;
  height: 100%;
}
#content1-login {
  /* background-color: aqua; */
}
.botones{
  width: 50%;
  margin: auto;
  display: grid;
}
.btn_restore{
  padding: 5px 15px 5px 15px;
  border: 2px solid;
  cursor: pointer;
  background-color: white;
  color: #008CBA;
  border-radius: 30px;
  font-weight: bold;
  margin: 20px 20px 5px 0px;
}
.btn_restore:hover{
  color: red;
}
.btn_login{
  padding: 5px 15px 5px 15px;
  border: 2px solid;
  cursor: pointer;
  background-color: white;
  color: #008CBA;
  border-radius: 30px;
  font-weight: bold;
  margin: 20px 20px 5px 0px;
}
.btn_login:hover{
  color: green;
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
.errors{
  color: red;
  font-size: 15px;
}




/* .container_login{
    width: 100%;
    height: 100vh;
    background-color: black;
}
.form_login_user{
    width: 80%;
    height: 100%;
    margin: auto;
    background-color: red;
}
.info_aditional{
    width: 80%;
    height: 100%;
    margin: auto;
    background-color: blue;
}
.form_user{
    width: 80%;
    height: 100%;
    margin: auto;
    background-color: green;
}
.inputs_login{
    margin: 25%;
} */
</style>