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
              <span>{{ item.text }}</span>
            </router-link>

            <ul v-else-if="item.subItem.length > 0">
              <li v-for="subItem in item.subItem" :key="subItem.id">
                <router-link :to="{ name: subItem.routeName }">
                  <span>{{ subItem.text }}</span>
                </router-link>
              </li>
            </ul>
          </template>

          <ul class="ul_header_user">
            <template v-for="itemUser in itemsHeaderUser" :key="itemUser.id">
              <router-link class="routes_navbar_user" v-if="itemUser.subItem.length == 0" :to="{ name: itemUser.routeName }">
                <span>{{ itemUser.text }}</span>
              </router-link>
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
    };
  }
}
</script>
  
<style scoped>
.contain_header{
  z-index: 10;
  position: fixed;
  width: 100%;
  height: auto;
  background-color: #E7E7E7;
  padding: 20px 5px 20px 5px;
  border-bottom: 2px solid darkblue;
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
  color: darkblue;
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
  color: darkblue;
}
</style>