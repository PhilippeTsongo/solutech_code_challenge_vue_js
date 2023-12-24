<template>
    <div class="m-0">
        <Head/>
      
      <div class="flex">
        <div >
            <Sidebar/>
        </div>
         <div class="content backdrop px-5 py-3 bg-[#F5F7FB] mt-0 border-l border-gray-200">

            <Header/>

            <div class="content rounded-md bg-[#F5F7FB] mt-2">
    
                <div class="flex backdrop mb-5">
                    <h1 class="text-green-300 uppercase text-xs"><i class="fa fa-users"></i> Users</h1>
                    
                    <div class="absolute right-0">
                        <button v-if="!showModal || !showModalEdit" class="border border-green text-green-500 bg-white py-1 px-2 rounded hover:text-white hover:bg-green-500 hover:text-white" @click="toggleModal"><i class="fa fa-plus-circle"></i> New User</button>
                    </div>
                </div>
              
                <!-- modal -->
                <div v-if="showModal">
                        <div class="backdrop grid grid-flow-col bg-[#F5F7FB] rounded">
                            <div class> 
                                <div class="flex my-5 md:w-full">
                                    <div class="title">
                                        <h2 class="uppercase text-xl text-green-500"><i class="fa fa-list-ol"></i> New user</h2>
                                    </div>
                                    <div class="absolute right-0">
                                        <button v-if="showModal" class="bg-white px-2 py-1 rounded text-red-500" @click="toggleModal"><i class="fa fa-xmark"></i> </button>
                                    </div>
                                </div>

                                <div class="rounded-md bg-white border p-5 md:p-10 border-gray-100 xs:w-100 w-full">

                                    <form enctype="multipart/form-data" @submit.prevent="newUser">

                                        <div class="">
                                            <h6 class="text-red-500">Required fields are marked *</h6>
                                            
                                                <div class="mt-5 md:grid grid-flow-col flex-stretch md:gap-8">
                                                    <div class="p-0 w-full">
                                                        <label class="relative flex items-center justify-center rounded-md border border-dashed border-[#e0e0e0] xs:p-2 md:p-12 text-center">
                                                            <div>
                                                                <span class="mb-2 block text-xl font-semibold text-[#07074D]">Drop files here</span>
                                                                <span class="mb-2 block text-base font-medium text-[#6B7280]"> Or</span>
                                                                <input type="file" ref="fileInput" @change="handleFileChange" accept="image/*"  class="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                                                            </div>
                                                        </label>

                                                        <label class="mt-5 md:mt-3 block text-xs uppercase">User type <span class="text-red-500">*</span></label>
                                                        <select v-model="userForm.role" class="block mt-1 border rounded-md p-2 border-gray-300 w-full" required>
                                                            <option v-for="role in roles" :key="role.id" :value="role.id">
                                                                {{ role.name }}
                                                            </option>
                                                        </select>
                                                    </div>

                                                    <div class="mt-5 md:mt-0">
                                                        <div class="mt-0">
                                                            <label class="block text-xs uppercase">Email <span class="text-red-500">*</span></label>
                                                            <input type="email" v-model="userForm.email" class="block mt-1 border rounded-md p-2 border-gray-300 w-full" required>

                                                            <label class="block mt-5 text-xs uppercase">Name <span class="text-red-500">*</span></label>
                                                            <input type="text" v-model="userForm.name" class="block mt-1 border rounded-md p-2 border-gray-300 w-full" required>
                                                        </div>
                                                        <div class="mt-0">
                                                            
                                                            <label class="block mt-5 text-xs uppercase">Password <span class="text-red-500">*</span></label>
                                                            <input type="password" v-model="userForm.password" class="block mt-1 border rounded-md p-2 border-gray-300 w-full" required>

                                                            <label class="block mt-5 text-xs uppercase">Password confirmation <span class="text-red-500">*</span></label>
                                                            <input type="password" v-model="userForm.password_confirmation" class="block mt-1 border rounded-md p-2 border-gray-300 w-full" required>
                                                        </div>
                                                    
                                                    </div>
                                                </div>

                                           
                                            <div class="mt-10 md:grid">
                                                <button class="w-36 text-white rounded-md px-3 py-2 bg-green-500 hover:cursor-pointer hover:bg-[#111827] font-bold"> <i class="fa fa-paper-plane-top"></i> Save</button>
                                            </div>
                                        </div>

                                    </form>

                                </div>

                            </div>
                        </div>
                </div>


                <!-- modal Edit -->
                <div v-if="showModalEdit">
                        <div class="backdrop grid grid-flow-col bg-[#F5F7FB] rounded">
                            <div class> 
                                <div class="flex my-5 md:w-full">
                                    <div class="title">
                                        <h2 class="uppercase text-xl text-green-500"><i class="fa fa-list-ol"></i> Edit user</h2>
                                    </div>
                                    <div class="absolute right-0">
                                        <button v-if="showModalEdit" class="bg-white px-2 py-1 rounded text-red-500" @click="toggleModalEdit"><i class="fa fa-xmark"></i> </button>
                                    </div>
                                </div>

                                <div class="rounded-md bg-white border xs:p-5 md:p-10 border-gray-100 md:w-full">

                                    <form enctype="multipart/form-data" @submit.prevent="updateUser(userForm.id)">

                                        <div class="">
                                            <h6 class="text-red-500">Required fields are marked *</h6>
                                            
                                                <div class="mt-5 md:grid grid-flow-col flex-stretch gap-8">
                                                    <div class="p-0 w-full">
                                                        <div class="mt-5 md:grid grid-flow-col flex-stretch gap-8">
                                                            
                                                            <img :src="handleImage(userForm.profile)" class="rounded-lg w-full h-50" >
                                                            <!-- <label class="relative flex items-center justify-center rounded-md border border-dashed border-[#e0e0e0] mt-5 md:mt-0 xs:p-2 md:p-12 text-center">
                                                                <div>
                                                                    <span class="mb-2 block text-xl font-semibold text-[#07074D]">Drop files here</span>
                                                                    <span class="mb-2 block text-base font-medium text-[#6B7280]"> Or</span>
                                                                    <input type="file" ref="fileInput" @change="handleFileChange" accept="image/*"  class="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                                                                </div>
                                                            </label> -->
                                                        </div>
                                                    </div>

                                                    <div class="mt-5 md:mt-0">
                                                        <div class="mt-4">
                                                            <label class="block text-xs uppercase">Email <span class="text-red-500">*</span></label>
                                                            <input type="email" v-model="userForm.email" class="block mt-1 border rounded-md p-2 border-gray-300 w-full" required>

                                                            <label class="block mt-5 text-xs uppercase">Name <span class="text-red-500">*</span></label>
                                                            <input type="text" v-model="userForm.name" class="block mt-1 border rounded-md p-2 border-gray-300 w-full" required>
                                                        </div>
                                                        <div class="mt-5">
                                                            <label class="mt-0 block text-xs uppercase">User type <span class="text-red-500">*</span></label>
                                                            <select v-model="userForm.role" class="block mt-1 border rounded-md p-2 border-gray-300 w-full" required>
                                                                <option v-for="role in roles" :key="role.id" :value="role.id">
                                                                    {{ role.name }}
                                                                </option>
                                                            </select>
                                                        </div>
                                                    
                                                    </div>
                                                </div>

                                           
                                            <div class="mt-10 md:grid">
                                                <button class="w-36 text-white rounded-md px-3 py-2 bg-green-500 hover:cursor-pointer hover:bg-[#111827] font-bold"> <i class="fa fa-paper-plane-top"></i> Save</button>
                                            </div>
                                        </div>

                                    </form>

                                </div>

                            </div>
                        </div>
                </div>

                <div  class="flex">
                    <div class="hidden lg:block">
                        <div class="rounded-md bg-white w-48 p-5 mt-2 ">
                            <div class="title">
                                <h2 class="uppercase text-green-400"><i class="fa fa-list-ol"></i> Details</h2>
                            </div>
                            <div class="mt-5 bg-[#F5F7FB] rounded p-5 text-center">
                                <div>{{ total }}</div>
                                <div class="text-bold">Total user</div>
                            </div>
                            <div class="flex justify-between mt-5 bg-[#F5F7FB] p-3 rounded">
                                <div class="text-center pr-6 border-r text-green-500 border-gray-200">
                                    <div> {{ active }} </div>
                                    <div> Active </div> 
                                </div>
                                <div class=" text-center text-red-500">
                                    <div> {{ inactive }} </div>
                                    <div> Inactive </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="md:flex-1 xm:block rounded-md bg-white pt-6 pl-6 pr-6 pb-2 xs:ml-0 sm:ml-0 md:ml-5 mt-2 md:w-96 xs:w-full">
                        <div class="bg-[#111827]-100 flex">
                            <div class="title flex-1">
                                <h3 class="uppercase text-lg text-green-500"><i class="fa fa-list-ol"></i> Users list</h3>
                            </div>
                            <div class="" style="margin-top:-5px;">
                                <input  type="search" class="xs:hidden md:block p-1 rounded-md border border-gray-200"> 
                            </div>
                            <div class="ml-5 p-1 rounded" style="margin-top: -5px; margin-right: -3px;">
                                <a href="" class="">  <i class="fa fa-print"></i></a>
                                <a href="" class="ml-5"> <i class="fa fa-file-excel"></i></a>
                            </div>
                        </div>

                        <div class="flex flex-col m-3 h-100">
                            <div class="overflow-x-auto sm:-mx-2 lg:-mx-2">
                                <div class="inline-block min-w-full py-2 sm:px-0 lg:px-0">
                                    <div class="border-gray-200 rounded">
                                        <table class="rounded border border-gray-200 min-w-full text-left text-sm font-light">
                                            <thead class="bg-[#F5F7FB]">
                                                <tr class="text-xs">
                                                    <th scope="col" class=" px-3 py-3">#</th>
                                                    <th scope="col" class=" px-3 py-3">Name</th>
                                                    <th scope="col" class=" px-3 py-3">Image</th>
                                                    <th scope="col" class=" px-3 py-3">Email</th>
                                                    <th scope="col" class=" px-3 py-3">User type</th>
                                                    <th scope="col" class=" px-3 py-3">Status</th>
                                                    <th scope="col" class=" px-3 py-3">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody class="h-100 border-r border-b border-gray-100">
                                                <tr v-for="(user, index) in users" :key="user.id" class="text-xs">
                                                    <td class="whitespace-nowrap  px-3 py-2 font-medium border-r border-b border-gray-100">{{ index + 1 }}</td>
                                                    <td class="whitespace-nowrap  px-4 w-24 py-2 border-r border-b border-gray-100">{{ user.name }}</td>
                                                    <td class="whitespace-nowrap  px-6 py-2 w-20 font-medium border-r border-b border-gray-100"> 
                                                        <img :src="handleImage(user.profile)" class="rounded-full border border-gray-300 h-8 w-8">
                                                    </td>
                                                    <td class="whitespace-nowrap  px-3 py-2 border-r border-b border-gray-100">{{ user.email }}</td>
                                                    <td class="whitespace-nowrap  px-3 py-2 border-r border-b border-gray-100">{{ user.role.name }}</td>
                                                    <td :class=" {'text-red-500' : user.status === 'INACTIVE' }" class="whitespace-nowrap  px-3 py-2 border-r border-b border-gray-100 text-green-500">{{ user.status }}</td>
                                                    <td class="whitespace-nowrap  px-3 py-2 border-r border-b border-gray-100 text-green-500">
                                                        
                                                        <button @click="toggleDropdown(index)" :id="index" class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100" type="button"> 
                                                            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                                                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                                                            </svg>
                                                        </button>

                                                        <!-- Dropdown menu -->
                                                        <div v-if="openDropdownIndex === index" :id="index" class="absolute right-5 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                                                            <div class="bg-gray-100 border-b border-gray-200 p-2 rounded-tr-lg rounded-tl-lg text-black"> Action
                                                                <span @click="toggleDropdown(index)" :id="index" class="absolute cursor-pointer right-2 bg-white px-2 py-0 rounded text-red-500"><i class="fa fa-xmark"></i></span> 
                                                            </div>
                                                            <ul class="py-2 text-sm text-gray-700" :aria-labelledby="'dropdownMenuIconHorizontalButton_' + index">
                                                                <li><a href="#" @click="dataUser(user.id)" class="block px-4 py-2 hover:bg-gray-100">Edit</a> </li>
                                                                <li v-if="user.status === 'INACTIVE'" @click="activate(user.id)"><a href="#" class="block px-4 py-2 hover:bg-gray-100 text-green-500">Activate</a></li>
                                                                <li v-if="user.status === 'ACTIVE'" @click="deactivate(user.id)"><a href="#" class="block px-4 py-2 hover:bg-gray-100 text-red-500">Deactive</a></li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <Footer/>
            </div>
 
       </div>    
    </div>
    </div>

 </template>
 
 <script>
import Head from "../../components/layouts/head.vue";
import Header from "../../components/layouts/Header.vue";
import Sidebar from "../../components/layouts/Sidebar.vue";
import Footer from "../../components/layouts/Footer.vue";

// import axios from "axios";
import {getUsers, addUser, showUser, editUser, activateUser, deactivateUser, getSelectOptionsRoles } from '../../jscore/init.js';
import {successMessage, errorMessage} from '../../jscore/IoNotification.js';
import { getProfileImageUrl } from '../../jscore/ImageHandler.js';




export default {
  name: "IndexUser",
  components: { Head, Header, Sidebar, Footer },

  data() {
        return {
            showModal: false,
            showModalEdit: false,
            openDropdownIndex: null,

            active: '',
            inactive: '',
            total: '',
            roles: {},

            users: [],
            selectedImage: null,
            userForm: {
                name: '',
                email: '',
                role: '',
                password: '',
                profile: null,
                password_confirmation: '',
            },

            selectedFile: null,


        };
    },

    mounted(){
        this.fetchUsers();
        this.selectOptions();
    },


    methods: {
        //users list
        fetchUsers(){

            getUsers()
            .then(response => {
                this.users = response.data.users;
                this.active = response.data.active,
                this.inactive = response.data.inactive,
                this.total = response.data.total;
            })
            .catch(error => {
                console.log(error);
            });
        },

        handleFileChange(event) {
            this.userForm.profile = event.target.files[0];
            this.selectedImage = event.target.files[0];
        },

        //new user
        newUser(){

            const formData = new FormData();
            if ( this.userForm.profile) {
                // Append the file directly to FormData
                formData.append('profile', this.userForm.profile);
            }

            formData.append('email', this.userForm.email);
            formData.append('name', this.userForm.name);
            formData.append('password', this.userForm.password);
            formData.append('password_confirmation', this.userForm.password_confirmation);
            formData.append('role', this.userForm.role);

            //api call
            addUser(formData)
                .then(response => {
                    //toast notification
                    successMessage(this.$toast, response.data.message);
                    //close the tab    
                    this.showModal = !this.showModal;

                    // fetch List
                    this.fetchUsers();
                })
                .catch(errors => {
                    if (errors.response && errors.response.status === 422) {
                        const validationErrors = errors.response.data.errors;
                        if (validationErrors && Object.keys(validationErrors).length > 0) {
                            // Fetch the first error
                            const firstErrorKey = Object.keys(validationErrors)[0];
                            const firstError = validationErrors[firstErrorKey];

                            //toast notification
                            errorMessage(this.$toast, firstError );
                        }
                    } else {
                        // Other errors
                        console.error(errors);
                    }
                });
        },

        //data user
        dataUser(user){
            //open the tab    
            this.showModalEdit = !this.showModalEdit;
            this.toggleDropdown(null);

            showUser(user)
            .then(response => {
                this.userForm.id = user;
                this.userForm.name = response.data.user.name;
                this.userForm.email = response.data.user.email;
                this.userForm.role = response.data.user.role_id;
                this.userForm.profile = response.data.user.profile;

            })
            .catch((errors) => {
                console.error(errors);
            });
        },

        showUserProfile(user) {
            // When the "Data Profile" button is clicked, fetch the selected user profile
            this.dataUser(user);
        },

        //update user
        updateUser(user) {

            this.openDropdownIndex = null;
            editUser(user, this.userForm)
                .then(response => {
                    //toast notification
                    successMessage(this.$toast, response.data.message);
                    //close the tab    
                    this.showModalEdit = !this.showModalEdit;

                    // fetch List
                    this.fetchUsers();
                })
                .catch(errors => {
                    if (errors.response && errors.response.status === 422) {
                        const validationErrors = errors.response.data.errors;
                        if (validationErrors && Object.keys(validationErrors).length > 0) {
                            // Fetch the first error
                            const firstErrorKey = Object.keys(validationErrors)[0];
                            const firstError = validationErrors[firstErrorKey];

                            //toast notification
                            errorMessage(this.$toast, firstError );
                        }
                    } else {
                        // Other errors
                        console.error(errors);
                    }
                });   
        },

        //deactivate user
        activate(user) {
            activateUser(user)
                .then(response => {
                    //toast notification
                    successMessage(this.$toast, response.data.message);
                    //close the tab    
                    this.openDropdownIndex = null;
                    // fetch List
                    this.fetchUsers();
                })
                .catch(errors => {
                    errorMessage(this.$toast, errors.response.data.message);
                });   
        },

        //deactivate user
        deactivate(user) {
            deactivateUser(user)
                .then(response => {
                    //toast notification
                    successMessage(this.$toast, response.data.message);
                    //close the tab    
                    this.openDropdownIndex = null;
                    // fetch List
                    this.fetchUsers();
                })
                .catch(errors => {
                    errorMessage(this.$toast, errors.response.data.message);
                });   
        },

        //togle modal
        toggleModal(){
            this.showModal = !this.showModal;
        },

        toggleModalEdit(){
            this.showModalEdit = !this.showModalEdit;
            this.openDropdownIndex = null;
        },

        toggleDropdown(index) {
            if (this.openDropdownIndex === index) {
                this.openDropdownIndex = null;
            } else {
                this.openDropdownIndex = index;
            }
        },

        //Select options list
        selectOptions(){
            //user role list
            getSelectOptionsRoles()
            .then(response => {
                this.roles = response.data.roles;
            })
            .catch(error => {
                console.log(error);
            });
        },

        //image handler
        handleImage(path){
            const image = getProfileImageUrl(path);
            return image;
        },

    
    }
};
</script>
 
 <style>
    .content {
    width: 100%;
    display: inline-block;
    letter-spacing: 1px;
    font-size: 13px;
    }

    .content a {
    letter-spacing: 1px;
    font-size: 13px;
    }

    .title h2 {
    letter-spacing: 1px;
    }

    .backdrop{
        top: 0;
        position: relative;
        width: 100%;
        height: 100%;
        /* left: 50; */
    }

    label{
        letter-spacing: 1px;
    }

    @media (max-width: 900px) {
        
        .backdrop{
            width: auto;
        }
    }

</style>