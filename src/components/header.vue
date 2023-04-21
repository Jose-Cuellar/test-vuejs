<template>
  <div class="contain_header">
    <header>
      <!-- Iconos -->
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <link rel="stylesheet" href="https://cdn.materialdesignicons.com/5.7.55/css/materialdesignicons.min.css">
      <!-- fin iconos -->
      <nav>
        <ul class="ul_header">
          <template v-for="item in itemsHeader" :key="item.id">
            <router-link class="routes_navbar" v-if="item.subItem.length == 0" :to="{ name: item.routeName }">
              <span><b>{{ item.text }}</b></span>
            </router-link>

            <ul v-else-if="item.subItem.length > 0">
              <li v-for="subItem in item.subItem" :key="subItem.id">
                <router-link :to="{ name: subItem.routeName }">
                  <span><b>{{ subItem.text }}</b></span>
                </router-link>
              </li>
            </ul>
          </template>

          <ul v-if="!user" class="ul_header_user">
            <template v-for="itemUser in itemsHeaderUser" :key="itemUser.id">
              <router-link class="routes_navbar_user" v-if="itemUser.subItem.length == 0" :to="{ name: itemUser.routeName }">
                <span><b>{{ itemUser.text }}</b></span>
              </router-link>
            </template>
          </ul>
          <ul v-else class="ul_header_user">
            <template v-for="itemUser in itemsLogout" :key="itemUser.id">
              <span class="routes_navbar_user" @click="logout()"><b>{{ itemUser.text }}</b></span>
            </template>
          </ul>
        </ul>
      </nav>
    </header>
  </div>
</template>
  
<script>
export default {
  name: 'AppHeader',
  data(){
    return{
      showSubItems: false,
      user: JSON.parse(sessionStorage.getItem('user')),
      
      // Items de navegación
      itemsHeader: [
        {
          id: 1,
          routeName: "home",
          text: "Home",
          subItem: []
        },
        {
          id: 2,
          routeName: "axios",
          text: "Axios",
          subItem: []
        },
        {
          id: 3,
          routeName: "RickAndMorty",
          text: "Api Rick And Morty",
          subItem: [
            // {
            //   id: 4,
            //   routeName: "axiosv2",
            //   text: "item 1",
            // },
          ]
        },
      ],

      // Items para botones de registro e inicio de sesión
      itemsHeaderUser: [
        {
          id: 4,
          routeName: "loginUser",
          text: "Iniciar sesión",
          subItem: []
        },
        {
          id: 5,
          routeName: "registerUser",
          text: "Regístrate",
          subItem: []
        },
      ],

      // Item paracerrar sesión
      itemsLogout: [
        {
          id: 6,
          routeName: "addCollectors",
          text: "Añadir recolectores",
          subItem: []
        },
        {
          id: 7,
          routeName: "logout",
          text: "Cerrar sesión",
          subItem: []
        }
      ]
    };
  },
  methods: {
    handleStorageChange(event) {
      // Si el objeto de usuario existe en sessionStorage, actualizar el estado del componente
      if (event.key === 'user') {
        this.user = JSON.parse(event.newValue);
      }
    },
    logout(){
      sessionStorage.removeItem('user');
      this.$router.push({ name: "loginUser" });
    },
  },
  created() {
    // Observar cambios en el sessionStorage
    window.addEventListener('storage', this.handleStorageChange);
  },
}
</script>
  
<style scoped>
.contain_header{
  z-index: 10;
  position: fixed;
  /* position: sticky; */
  width: 100%;
  height: auto;
  /* background-color: rgba(255, 255, 255, 0.5); */
  background-color: white;
  padding: 20px 5px 20px 5px;
  border-bottom: 2px solid #3F2212;
}
.ul_header{
  display: flex;
  margin: 0px auto 0px 0px;
  text-align: start;
}
.ul_header .routes_navbar{
  list-style-type: none;
  margin: 5px 15px 5px 15px;
}
.routes_navbar{
  text-decoration: none;
  color: #3F2212;
}
.ul_header_user .routes_navbar_user{
  list-style-type: none;
  margin: 5px 15px 5px 15px;
}
.ul_header_user{
  margin: 5px 0px 5px auto;
  text-align: end;
}
.routes_navbar_user{
  text-decoration: none;
  color: #3F2212;
  cursor: pointer;
}
</style>