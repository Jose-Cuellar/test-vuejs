<template>
  <div class="contain_header">
    <header>
      <nav>
        <ul class="ul_header">
  
          <template v-for="item in itemsHeader">
  
            <router-link class="routes_navbar" v-if="item.subItem.length == 0" :key="item.id" :to="{ name: item.routeName }">
              <span>{{ item.text }}</span>
            </router-link>
  
            <!-- <li v-else class="nav-item dropdown">
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
      itemsHeader: [
        {
          id: 1,
          routeName: "home",
          text: "Home",
          subItem: []
        },
        {
          id: 2,
          routeName: "axios1",
          text: "axios1",
          subItem: []
        },
        {
          id: 3,
          routeName: "items",
          text: "Items",
          subItem: [
            {
              id: 4,
              routeName: "item1",
              text: "item 1",
            },
            {
              id: 5,
              routeName: "item2",
              text: "item 2",
            },
          ]
        },
      ],
    };
  }
}
</script>
  
<style>
.contain_header{
    position: fixed;
    width: 100%;
    height: auto;
    background-color: #E7E7E7;
    padding: 20px 5px 20px 5px;
}
.ul_header{
    margin: 0px auto 0px 0px;
}
.ul_header .routes_navbar{
    list-style-type: none;
    margin: 5px 15px 5px 15px;
}
.routes_navbar{
    text-decoration: none;
    color: darkblue;
}
</style>