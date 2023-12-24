import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
//tailwind
import '../src/assets/index.css';
import '../src/assets/fontawesome/css/all.min.css'; 
import Toaster from '@meforma/vue-toaster';


import axios from 'axios';
// import store from '../src/store.js';


const apiBaseUrl = 'http://127.0.0.1:8000/api';
const authToken = localStorage.getItem('authToken');

//Redirect unauthenticated user to login
if(authToken === null && window.location.pathname !== '/login'){
  window.location.href = '/login'; // Redirect to the login route
}  


axios.defaults.baseURL = apiBaseUrl;
axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

// Set a timeout to disconnect the user after 10 minutes of inactivity
const inactivityTimeout = 10 * 60 * 1000; // 10 minutes in milliseconds
let inactivityTimer;

function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    // Logout the user after 10 minutes of inactivity
  localStorage.removeItem('authToken'); // Clear the authentication token
  window.location.href = '/login'; // Redirect to the login route

  }, inactivityTimeout);
}

// Attach event listeners to reset the inactivity timer on user activity
document.addEventListener('mousemove', resetInactivityTimer);
document.addEventListener('keydown', resetInactivityTimer);
document.addEventListener('touchstart', resetInactivityTimer);
document.addEventListener('scroll', resetInactivityTimer);

// Optionally, reset the inactivity timer on each Axios request
axios.interceptors.request.use((config) => {
  resetInactivityTimer();
  return config;
});


export default axios;

//notification
createApp(App).use(router).use(Toaster).mount('#app')
