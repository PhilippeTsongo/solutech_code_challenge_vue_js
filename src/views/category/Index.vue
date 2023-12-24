<template>
    <div class="m-0">
        <Head/>
      
      <div class="flex">

         <Sidebar/>

         <div class="content px-5 py-3 bg-[#F5F7FB] mt-0 border-l border-gray-200">

            <Header/>

            <div class="content rounded-md bg-[#F5F7FB] mt-3">
    
                <div class="mb-2 flex">
                    <h1 class="flex-1 text-gray-300 uppercase text-xs"><i class="fa fa-users"></i>Categories </h1>
                    
                    <div class="">
                        <button v-if="showModal == false" class="border border-green text-green-500 bg-white py-1 px-2 rounded hover:text-white hover:bg-green-500 hover:text-white" @click="toggleModal"><i class="fa fa-plus-circle"></i> New Category</button>
                    </div>
                </div>
              
                <!--new modal -->
                <div v-if="showModal">
                        <div class="grid grid-flow-col rounded absolute w-96 top-20 right-0 h-auto">
                            <div class> 
                                <div class="register-form rounded-md bg-white px-5 border-gray-900 shadow-xl md:absolute md:ml-auto md:mr-auto md:w-3/4 lg:ml-14">

                                    <div class="flex py-5 w-full">
                                        <div class="title flex-1">
                                            <h2 class="uppercase text-lg text-green-500"><i class="fa fa-list-ol"></i> New Category</h2>
                                        </div>
                                        <div class="">
                                            <button v-if="showModal" class="bg-white px-2 py-1 rounded text-red-500" @click="toggleModal"><i class="fa fa-xmark"></i> </button>
                                        </div>
                                    </div>

                                    <form @submit.prevent="newCategory">

                                        <div class="mt-5 pb-5">
                                            <h2 class="uppercase text-green-500 text-xs">Category Information</h2>

                                            <h5 class="mt-3 text-red-500">Require fields are marked *</h5>
                                            
                                            <div class="mt-5 md:grid grid-flow-col flex-stretch gap-10">
                                                <div class="block md:inline">
                                                    <label for="" class="block text-xs uppercase">Name <span class="text-red-500">*</span></label>
                                                    <input type="text" v-model="formData.name" class="block border rounded-md p-2 border-gray-300 w-full" required >
                                                </div>
                                            </div>
                                            <div class="mt-10 text-center">
                                                <button class="text-[#111827] border border-[#111827] w-full rounded-md px-3 py-2 hover:border-none hover:bg-green-500 hover:text-white"> <i class="fa fa-paper-plane-top"></i> Save</button>
                                            </div>
                                        </div>

                                    </form>
                                </div>

                            </div>

                        </div>
                </div>

                <!--edit modal -->
                <div v-if="showModalEdit">
                        <div class="grid grid-flow-col rounded absolute w-96 top-20 right-0 h-auto">
                            <div class> 
                                <div class="register-form rounded-md bg-white px-5 border-gray-900 shadow-xl md:absolute md:ml-auto md:mr-auto md:w-3/4 lg:ml-14">

                                    <div class="flex py-5 w-full">
                                        <div class="title flex-1">
                                            <h2 class="uppercase text-lg text-green-500"><i class="fa fa-list-ol"></i> Edit Category</h2>
                                        </div>
                                        <div class="">
                                            <button v-if="showModalEdit" class="bg-white px-2 py-1 rounded text-red-500" @click="toggleModalEdit"><i class="fa fa-xmark"></i> </button>
                                        </div>
                                    </div>

                                    <form @submit.prevent="updateCategory(categoryData.id)">

                                        <div class="mt-5 pb-5">
                                            <h2 class="uppercase text-green-500 text-xs">Category Informations</h2>

                                            <h5 class="mt-3 text-red-500">Required fields are marked *</h5>
                                            
                                            <div class="mt-5 md:grid grid-flow-col flex-stretch gap-10">
                                                <div class="block md:inline">
                                                    <label for="" class="block text-xs uppercase">Nom <span class="text-red-500">*</span></label>
                                                    <input type="text" v-model="categoryData.name" class="block border rounded-md p-2 border-gray-300 w-full" required >
                                                </div>
                                            </div>

                                            <div class="mt-10 text-center">
                                                <button class="text-[#111827] border border-[#111827] w-full rounded-md px-3 py-2 hover:border-none hover:bg-green-500 hover:text-white"> <i class="fa fa-paper-plane-top"></i> Enregistrer</button>
                                            </div>
                                        </div>

                                    </form>
                                </div>

                            </div>

                        </div>
                </div>

                <div class="flex">
                    <div class="hidden lg:block">
                        <div class="rounded-md bg-white w-48 p-5 mt-2 ">
                            <div class="title">
                                <h2 class="uppercase text-green-400"><i class="fa fa-list-ol"></i> Details</h2>
                            </div>
                            <div class="mt-5 bg-[#F5F7FB] rounded p-5 text-center text-green-500">
                                <div>{{ total }}</div>
                                <div class="text-bold">Total</div>
                            </div>
                        </div>
                        <div>    
                            <div class="title mt-5">
                                <h2 class="uppercase text-green-400"><i class="fa fa-list-ul"></i> Related</h2>
                            </div>
                            <ul class="mt-5">
                                <li class="py-2 px-2 w-100 mt-4 rounded bg-white border border-[#111827] text-center hover:bg-[#111827] hover:text-white hover:border-[#111827] "><router-link :to="{ name: 'IndexSubCategory'}"> <i class="fa-solid fa-rectangle-list"></i> Sub Categories</router-link></li>
                            </ul>

                        </div>
                    </div>
                    
                    <div class="flex-1 rounded-md bg-white pt-6 pl-6 pr-6 pb-2 xs:ml-0 sm:ml-0 md:ml-5 mt-2 w-100 ">
                        <div class="bg-[#111827]-100 flex">
                            <div class="title flex-1">
                                <h2 class="uppercase text-lg text-green-500"><i class="fa fa-list-ol"></i>Category</h2>
                            </div>

                            <div class="" style="margin-top: -5px;">
                                <input  type="search" class="p-1 rounded-md border border-gray-200"> 
                            </div>
                            <div class="ml-5 p-1 rounded" style="margin-top: -5px; margin-right: -3px;">
                                <a href="" class=""> <i class="fa fa-print"></i></a>
                                <a href="" class="ml-5"> <i class="fa fa-file-excel"></i></a>
                            </div>
                        </div>

                        <div class="flex flex-col m-3 h-100">
                            <div class="overflow-x-auto sm:-mx-12 lg:-mx-12">
                                <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                    <div class="border-gray-200 rounded">
                                        <table class="rounded border border-gray-200 min-w-full text-left text-sm font-light">
                                            <thead class="bg-[#F5F7FB]">
                                                <tr class="text-xs">
                                                    <th scope="col" class=" px-3 py-3">#</th>
                                                    <th scope="col" class=" px-3 py-3">Name</th>
                                                    <th scope="col" class=" px-3 py-3">Books</th>
                                                    <th scope="col" class=" px-3 py-3">Sub Categories</th>
                                                    <th scope="col" class=" px-3 py-3">Action</th>

                                                </tr>
                                            </thead>
                                            <tbody class="h-100 border-r border-b border-gray-200">
                                                <tr v-for="(category, index) in categories" :key="category.id" class="text-xs">

                                                    <td class="whitespace-nowrap  px-3 py-0 font-medium border-r border-b border-gray-200">{{ index + 1 }}</td>
                                                    <td class="whitespace-nowrap  px-3 py-0 font-medium border-r border-b border-gray-200">{{ category.name }}</td>
                                                    <td class="whitespace-nowrap  px-3 py-0 font-medium border-r border-b border-gray-200" :class="{ 'text-red-500' : category.books.length == 0 }" >{{ category.books.length }}</td>
                                                    <td class="whitespace-nowrap  px-3 py-0 font-medium border-r border-b border-gray-200" :class="{ 'text-red-500' : category.sub_categories.length == 0 }" >{{ category.sub_categories.length }}</td>

                                                    <td class="whitespace-nowrap  px-3 py-0 border-r border-b border-gray-100 text-green-500">
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
                                                                <li><a href="#" @click="dataCategory(category.id)" class="block px-4 py-2 hover:bg-gray-100">Edit</a> </li>
                                                                <li><a href="#" @click="delCategory(category.id)" class="block px-4 py-2 text-red-500 hover:bg-gray-100">Delete</a> </li>

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
import {getCategories, addCategory, showCategory, editCategory, deleteCategory} from '../../jscore/init.js';
import {successMessage, errorMessage} from '../../jscore/IoNotification.js';


export default {
  name: "IndexCategory",
  components: { Head, Header, Sidebar, Footer },

  data() {
        return {
            showModal: false,
            showModalEdit: false,
            openDropdownIndex: null,

            pageOne: true,
            categories: {},
            categoryData: {},

            total: '',
            roles: {},

            //form fields
            formData: {
                name: '',
            },
            
        };
  },

    mounted(){
        this.fetchCategories();
        
    },

    methods: {
        //Category list
        fetchCategories(){

            getCategories()
            .then(response => {
                this.categories = response.data.categories;
                this.total = response.data.total;
            })
            .catch(error => {
                console.log(error.response.message);
            });
        },

        //new Category
        newCategory(){
            addCategory(this.formData)
            .then(response => {
                //toast notification
                successMessage(this.$toast, response.data.message);
                //close the tab    
                this.showModal = !this.showModal;

                //call the list List
                this.fetchCategories();
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


        //data Category
        dataCategory(category){
            //open the tab    
            this.showModalEdit = !this.showModalEdit;
            this.toggleDropdown(null);

            showCategory(category)
            .then(response => {
                this.categoryData.id = category;
                this.categoryData.name = response.data.category.name;

            })
            .catch(errors => {
                // Other errors
                console.error(errors);
            });
        },

        showCategoryProfile(category) {
            // When the "Data Profile" button is clicked, fetch the selected course profile
            this.dataCategory(category);
        },

        //update Category
        updateCategory(category){

            editCategory(category, this.categoryData)
            .then(response => {
                //toast notification
                successMessage(this.$toast, response.data.message);
                //close the tab  
                this.showModalEdit = !this.showModalEdit;
                //call  List
                this.fetchCategories();
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

        //delete category
        delCategory(category) {
            deleteCategory(category)
                .then(response => {
                    //toast notification
                    successMessage(this.$toast, response.data.message);
                    //close the tab    
                    this.openDropdownIndex = null;
                    // fetch List
                    this.fetchCategories();
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
        },

        toggleDropdown(index) {
            if (this.openDropdownIndex === index) {
                this.openDropdownIndex = null;
            } else {
                this.openDropdownIndex = index;
            }
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

/* added */
.register-form{
    margin: 30px auto;
}
label{
    letter-spacing: 1px;
}

@media (max-width: 900px) {
    .register-form{
        width: 65%;
        margin: 0% 5%;
    }
    .close{
        position: absolute;
        margin-left: 100%;
    }
}

</style>