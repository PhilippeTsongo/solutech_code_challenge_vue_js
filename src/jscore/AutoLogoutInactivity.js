import axios from 'axios';
import {userLogout} from './init.js'; 

export function autoLogout(){

    // Set a timeout to disconnect the user after 10 minutes of inactivity
    const inactivityTimeout = 10 * 60 * 1000; // 10 minutes in milliseconds
    let inactivityTimer;

    function resetInactivityTimer() {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
            // Logout the user after 10 minutes of inactivity

            //logout api call
            userLogout()
            .then((response) => {
                //Clear user data from the localStorage
                localStorage.removeItem('userToken');
                localStorage.removeItem('userRole');
                localStorage.removeItem('userData'); 

                window.location.href = '/login'; // Redirect to the login route
            })
            .catch((errors) => {
                // console.error(errors.response.data.error);
                console.error(this.$toast, errors.response.data.error);
            });

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

}
