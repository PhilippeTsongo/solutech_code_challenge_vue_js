import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
//tailwind
import '../src/assets/index.css';
import '../src/assets/fontawesome/css/all.min.css'; 
import Toaster from '@meforma/vue-toaster';


import axios from 'axios';
import { autoLogout } from './jscore/AutoLogoutInactivity';

//local
const apiBaseUrl = 'http://127.0.0.1:8000/api';

//production
// const apiBaseUrl = 'http://127.0.0.1:8000/api';

const authToken = localStorage.getItem('authToken');

//Redirect unauthenticated user to login
if(authToken === null && window.location.pathname !== '/login'){
  	window.location.href = '/login'; // Redirect to the login route
}  


axios.defaults.baseURL = apiBaseUrl;
axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

//autologout
autoLogout();

export default axios;

//notification
createApp(App).use(router).use(Toaster).mount('#app')