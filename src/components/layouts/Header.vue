<template>
    <div class="flex w-100 pb-3 bg-[#F5F7FB]">
      <div class="flex">

			<form action="" class="flex ml-0">
				<i class="fa fa-search absolute mt-3 ml-3"></i>
				<input type="search" class="pl-8 p-2 rounded-md w-48 sm:w-96" placeholder="Search...">
			</form>

			<div class="flex absolute right-5">
				<div class="bg-white mr-2 rounded-md p-2 text-green-500 ">
						<span class="notification-icon m-2">
						<i class="fa fa-bell"></i>
						</span> 
						<span class="xs:hidden md:inline parameter-icon m-2">
						<i class="fa fa-envelope"></i>
						</span>
				</div>
				
				<div class="flex font-bold ">
					<span id="focusableNames" class="bg-white rounded-md p-2 pl-2 pr-2 ">{{ name }}  </span>
					<img @click="profileInfo" :src="handleImage(profile)" class="rounded-full border border-gray-300 ml-2 w-9 h-9 cursor-pointer">
				</div>
				<div v-if="showModalProfile" class="flex absolute right-0 mt-14 rounded-lg bg-white border border-gray-300 shadow-xl">
					<div class="">
						<div class="bg-gray-100 border-b border-gray-200 p-2 rounded-tr-lg rounded-tl-lg text-black"> Profile
							<span @click="profileInfo" title="Déconnexion" class="absolute cursor-pointer right-2 bg-white px-2 py-0 rounded text-red-500"><i class="fa fa-xmark"></i></span> 
						</div>
						<div class="flex justify-center mx-auto px-3 mt-3">
							<img :src="handleImage(profile)" class="rounded-full border border-gray-300 ml-2 w-24 h-24 cursor-pointer">
						</div>
						<div class="font-bold mt-5 px-5 py-2 text-center">
							{{ name }} 
						</div>

						<div class="font-bold mt-5 px-5 py-2 text-center">
							{{ email }} 
						</div>

						<form @submit.prevent="SignOut" class="flex justify-center mb-2">
							<input type="text" id="focusableEmail" value="{{email}}" class="hidden block border rounded-md p-2 border-gray-300 w-full"  >

							<button class="text-xl bg-red-500 text-white px-2 py-0 rounded"><i class="fa fa-power-off"></i></button>
						</form>
						
					</div>
				</div>
			</div>
      </div>
    </div>
</template>

<script>
import { userLogout } from "../../jscore/init.js";
import {getProfileImageUrl} from '../../jscore/ImageHandler.js';

import {successMessage, errorMessage} from '../../jscore/IoNotification.js';


import axios from "axios";

export default {
	name: "Header",
	components: {},

	data() {
		return {
		email: "",
		name: "",
		showModalProfile: false,
		showMenu: true,
		profile: "",
		};
	},

	mounted() {
		this.fetchUserInfo();
	},

  methods: {
    async fetchUserInfo() {
      try{ 
        const response = await axios.get("/user/authenticated");
        
          this.email = response.data.user.email;
          this.name = response.data.user.name;
          this.profile = response.data.user.profile.replace(/\\/g, "/");

          // console.log(response.status);
        }catch(errors){
          // console.log(errors.response.status);

          if (errors.response){
            if (errors.response.status === 401) {
              this.$router.push("/");
              window.location.reload();
              console.error("Error fetching user data:", errors);
            }
          }
        };
    },

    profileInfo() {
      this.showModalProfile = !this.showModalProfile;
    },

    SignOut() {
      const credentials = {
        user_email: this.user_email
      };
      userLogout(credentials)
        .then(response => {
          localStorage.removeItem("authToken"); // Clear the authentication token
          window.location.href = "/login"; // Redirect to the login route
          successMessage(this.$toast, response.data.message);
        })
        .catch(errors => {
          // console.error(errors.response.data.error);
          errorMessage(this.$toast, errors.response.data.error);
        });
    },

    //image handler
    handleImage(path){
        const image = getProfileImageUrl(path);
      return image;
    },

    toggleShowMenu() {
        this.showMenu = !this.showMenu;
    }

  }
};
</script>



<style>
.header h1 {
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: bolder;
}

.search-icon-table {
  position: absolute;
  margin: 5px 0px 0px -25px;
}

@media (max-width: 900px) {

}
</style>