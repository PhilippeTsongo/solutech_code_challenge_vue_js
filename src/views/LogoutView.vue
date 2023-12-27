<template>
    <div>

    </div>
</template>

<script>
//import init
import {userLogout} from '../jscore/init.js';
import { successMessage, errorMessage } from "../jscore/IoNotification.js";



export default {
    name: 'LogoutView',
    components: { },

    data(){
        return{
            user_email: '',
        }
    },

    method: {
        handleSubmit(){
                const credentials = {
                    user_email: this.user_email,
                };

                userLogout(credentials)
                    .then((response) => {
                         // Clear user data from local storage
                        localStorage.removeItem('authToken'); 
                        localStorage.removeItem('userRole');
                        localStorage.removeItem('userData'); 

                        window.location.href = '/login'; // Redirect to the login route
                        successMessage(this.$toast, response.data.message);
                    })
                    .catch((errors) => {
                        // console.error(errors.response.data.error);
                        errorMessage(this.$toast, errors.response.data.error);
                    });
            }
        }   
    }
</script>