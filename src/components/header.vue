<template>
  <div class="contain_header">
    <header>
      <!-- Iconos -->
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <link rel="stylesheet" href="https://cdn.materialdesignicons.com/5.7.55/css/materialdesignicons.min.css">
      <!-- fin iconos -->
      <nav>
        <ul class="ul_header">
          <!-- Items para navegar en la página sin estar logueado -->
          <ul class="header_landing" v-if="!user">
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
          </ul>

          <!-- Items para gestionar la información como usuario logueado -->
          <ul class="management" v-else>
            <div>
              <div class="routes_navbar" v-for="item in itemsHeaderUserLoged" :key="item.id" @click="selectItem(item)">
                <span><b>{{ item.text }}</b></span>
                <div class="subitems" v-if="selectedItem === item">
                  <div @click="goLink(subitem)" v-for="subitem in item.subItem" :key="subitem.id">{{ subitem.text }}</div>
                </div>
              </div>
            </div>
          </ul>

          <!-- Items para ver las opciones de inicio de sesión o registro -->
          <ul v-if="!user" class="ul_header_user">
            <template v-for="itemUser in itemsHeaderUser" :key="itemUser.id">
              <router-link class="routes_navbar_user" v-if="itemUser.subItem.length == 0" :to="{ name: itemUser.routeName }">
                <span><b>{{ itemUser.text }}</b></span>
              </router-link>
            </template>
          </ul>

          <!-- Item para cerrar sesión -->
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

      selectedItem: null,
      subitemsVisible: false,
      selectedSubitem: null,
      
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

      // Items para navegación del usuario logueado
      itemsHeaderUserLoged: [
        {
          id: 6,
          routeName: "",
          text: "Gestión general",
          subItem: [
            {
              id: 7,
              routeName: "addCollectors",
              text: "Añadir recolectores"
            },
            {
              id: 8,
              routeName: "registerFertilization",
              text: "Registrar fertilización"
            }
          ]
        }
      ],

      // Item para cerrar sesión
      itemsLogout: [
        {
          id: 9,
          routeName: "logout",
          text: "Cerrar sesión",
          subItem: []
        }
      ]
    };
  },
  methods: {
    selectItem(item) {
      this.selectedItem = this.selectedItem === item ? null : item;
    },
    goLink(subitem){
      this.$router.push({ name: subitem.routeName })
    },
    handleStorageChange(event) {
      // Si el objeto de usuario existe en sessionStorage, actualizar el estado del componente
      if (event.key === 'user') {
        this.user = JSON.parse(event.newValue);
      }
    },
    logout(){
      sessionStorage.removeItem('user');
      this.$router.push({ name: "loginUser" });
      setTimeout(() => {
        location.reload();
      }, 0);
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
  padding: 18px 5px 18px 5px;
  border-bottom: 2px solid #3F2212;
}
ol, ul {
  padding-left: 1rem;
  padding-right: 1rem;
}
.ul_header{
  display: flex;
  margin: 0px auto 0px 0px;
  text-align: start;
}
.ul_header .routes_navbar{
  list-style-type: none;
  margin: 5px 10px 5px 10px;
}
.routes_navbar{
  text-decoration: none;
  color: #3F2212;
  cursor: pointer;
}
.management, .header_landing{
  margin-top: auto;
  margin-bottom: auto;
}
.subitems{
  position: absolute;
  background: white;
  padding: 5px 15px 15px 15px;
  margin-top: 10px;
  margin-left: -15px;
  color: #3F2212;
  cursor: pointer;
  border-radius: 2px;
  box-shadow: 2px 2px 2px 2px rgba(0,0,0,0.5);
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