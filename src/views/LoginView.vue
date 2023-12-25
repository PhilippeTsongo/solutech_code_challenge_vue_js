<template>
    <div class="login">
        <div >
            <form @submit.prevent="handleSubmit" method="post" action="" class="pt-14 pb-20">
                <div class="text-center">
                    <h1 class="uppercase text-lg text-green-500 text-bold">Sign In</h1>
                </div>

                <div class="mt-10 px-8 py-5 border rounded ml-auto mr-auto w-96">
                    
                    <div v-if="loading" class="mt-10 text-white bg-green-300 text-center px-5 py-2 ">
                        {{  loadMessage }}
                    </div>

                    <div class="mt-10">
                        <input v-model="email" class="border border-gray-300 w-full rounded px-5 py-2" type="email" placeholder="Email" required>
                    </div>

                    <div class="mt-10">
                        <input v-model="password" class="border border-gray-300 w-full rounded px-5 py-2" type="password" placeholder="Password" required>
                    </div>

                    <div class="mt-7 ml-0">
                        <input type="checkbox">
                        <label class="text-gray-400  ml-3">Remember me</label>
                    </div>

                    <div class="mt-10">
                        <button type="sumit" :disabled="loading" class="w-full relative ">
                            <div v-if="loading" class="spinner"></div>
                            <span v-else class="bg-green-500 text-white p-2 rounded w-80 uppercase text-md submit">Submit</span>
                        </button>
                    </div>

                    <div class="mt-10 text-center">
                        <a href="" class="text-gray-400">Forgot password</a>
                    </div>

                </div>
            </form>
        </div>
        
    </div>    
</template>


<script>

//import init
// import {userLogin} from '../jscore/init.js';
import { successMessage, errorMessage } from "../jscore/IoNotification.js";
import axios from 'axios';

export default {
    name: 'LoginView',
    components: { },

    data(){
        return{
           email: '',
           password: '',
           loadMessage: 'En cours....',
           loading: false,
           userData: {},
        }
    },

    methods:{

        handleSubmit(){
            const credentials = {
                email: this.email,
                password: this.password,
            };
            this.loading = true;

            setTimeout ( () => {
                this.loading = false;
                axios.post('/login', credentials)
                    .then((response) => {
                        const token = response.data.accessToken; 
                        localStorage.setItem('authToken', token); 
                        // this.$store.commit('setAuthToken', token);

                        successMessage(this.$toast, response.data.message);
                        // redirect to the dashborad
                        this.$router.push('/'); 
                    })
                    .catch((errors) => {
                        // console.log(errors.response);
                        if(errors.response){
                            if(errors.response.status === 422)
                                errorMessage(this.$toast, errors.response.data.message);
                            if(errors.response.status === 411)
                            errorMessage(this.$toast, errors.response.data.error);
                        }
                    });
            }, 4000); 
        }
    }
}







</script>

<style>

.login form h1{
    letter-spacing: 2px;
}

.submit {
    letter-spacing: 2px;
}



.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left: 4px solid green;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@keyframes spin {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}


</style>