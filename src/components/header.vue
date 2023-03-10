<template>
  <div class="contain_header">
    <header>
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
              
            <!-- <li v-else :key="item.id" class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                {{item.text}}
              </a>
              <div style="margin-bottom:20px;" class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link v-for="data in item.subItem " :key="data.id" class="dropdown-item text-danger"
                  :to="{ name: data.routeName }" :class="{
                    active: $route.name === data.routeName,
                    'nav-item': true,
                    'nav-link': true
                  }">
                  <span @click="ocultar">{{ data.text }}</span>
                </router-link>
              </div>
            </li> -->
            
          </template>

          <ul class="ul_header_sessions">
            <template v-for="itemSession in itemsHeaderSessions" :key="itemSession.id">
              <router-link class="routes_navbar_sessions" v-if="itemSession.subItem.length == 0" :to="{ name: itemSession.routeName }">
                <span>{{ itemSession.text }}</span>
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
          routeName: "axiosv2",
          text: "Axios V2",
          subItem: [
            // {
            //   id: 4,
            //   routeName: "axiosv2",
            //   text: "item 1",
            // },
          ]
        },
      ],

      // Items para botones de inicio de sesión
      itemsHeaderSessions: [
        {
          id: 4,
          routeName: "loginUser",
          text: "Iniciar sesión",
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
.ul_header_sessions .routes_navbar_sessions{
  list-style-type: none;
  margin: 5px 15px 5px 15px;
}
.ul_header_sessions{
  margin: 5px 0px 5px auto;
  text-align: end;
}
.routes_navbar_sessions{
  text-decoration: none;
  color: darkblue;
}
</style>