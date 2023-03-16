import { createApp } from 'vue';
import Vue from "vue";
import App from './App.vue';
import router from './router';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import VuePaginate from "vue-paginate";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueRouter from "vue-router";
import axios from 'axios';

const app = createApp(App)
app.use(router)
app.mount('#app')

// Url del back
app.config.globalProperties.$http = axios
app.config.globalProperties.$apiUrl = process.env.VUE_APP_API_URL

Vue.use(VuePaginate);
Vue.use(VueSweetalert2);
Vue.use(VueRouter);

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");