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
// Login con google

const app = createApp(App)
app.use(router)
app.mount('#app')

// app.use(VueGapi, {
//   // apiKey: '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',
//   clientId: '992724199311-54nrmj74qqrcim7ok41v2lnja6pg27lt.apps.googleusercontent.com',
//   scope: 'https://www.googleapis.com/auth/userinfo.profile',
//   prompt: "select_account",
// });
// app.use($gAuth)

// Url del back
app.config.globalProperties.$http = axios
app.config.globalProperties.$apiUrl = process.env.VUE_APP_API_URL

app.use(VuePaginate);
app.use(VueSweetalert2);
app.use(VueRouter);

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");