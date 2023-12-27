<template>
    <div class="m-0">
        <Head/>
      
      <div class="flex">
        <div >
            <Sidebar :data="goMenu"/>
        </div>
         <div class="content backdrop px-5 py-3 bg-[#F5F7FB] mt-0 border-l border-gray-200">

            <button @click="newMenu" class="absolute p-1">
                <svg xmlns="http://www.w3.org/2000/svg"  class="w-10 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M4 6h16M4 12h16M4 18h16"/> 
                </svg>
            </button>
            <Header/>

            <div class="content rounded-md bg-[#F5F7FB] mt-2">
    
                <div class="flex backdrop mb-5">
                    <h1 class="text-green-300 uppercase text-xs"><i class="fa fa-book mr-1"></i> Books</h1>
                    
                    <div v-if="userRole == 1" class="absolute right-0">
                        <button v-if="!showModal || !showModalEdit" class="border border-green text-green-500 bg-white py-1 px-2 rounded hover:text-white hover:bg-green-500 hover:text-white" @click="toggleModal"><i class="fa fa-plus-circle"></i> New book</button>
                    </div>
                </div>
              
                <!-- modal -->
                <div v-if="showModal">
                        <div class="backdrop grid grid-flow-col bg-[#F5F7FB] rounded">
                            <div class> 
                                <div class="flex my-5 md:w-full">
                                    <div class="title">
                                        <h2 class="uppercase text-xl text-green-500"><i class="fa fa-list-ol"></i> New Book</h2>
                                    </div>
                                    <div class="absolute right-0">
                                        <button v-if="showModal" class="bg-white px-2 py-1 rounded text-red-500" @click="toggleModal"><i class="fa fa-xmark"></i> </button>
                                    </div>
                                </div>

                                <div class="rounded-md bg-white border p-5 md:p-10 border-gray-100 xs:w-100 w-full">

                                    <form enctype="multipart/form-data" @submit.prevent="newBook">

                                        <div class="xs:pb-20 md:pb-10">
                                            <h6 class="text-red-500">Required fields are marked *</h6>
                                            <div v-if="pageOne" class="pb-5">
                                                <div class="mt-5 md:grid grid-flow-col flex-stretch md:gap-8">
                                                    <div class="p-0 w-full">
                                                        <label class="relative flex items-center justify-center rounded-md border border-dashed border-[#e0e0e0] xs:p-2 md:p-12 text-center">
                                                            <div>
                                                                <span class="mb-2 block text-xl font-semibold text-[#07074D]">Select a file</span>
                                                                <input type="file" ref="fileInput" @change="handleFileChange" accept="image/*" required class="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                                                            </div>
                                                        </label>                                                        
                                                    </div>

                                                    <div class="mt-5 md:mt-0">
                                                        <div class="mt-0">
                                                            <label class="block text-xs uppercase">Name <span class="text-red-500">*</span></label>
                                                            <input type="text" v-model="formData.name" class="block mt-1 border rounded-md p-2 border-gray-300 w-full" required>
                                                        
                                                            <label class="block text-xs mt-5 uppercase">Publisher <span class="text-red-500">*</span></label>
                                                            <input type="text" v-model="formData.publisher" class="block mt-1 border rounded-md p-2 border-gray-300 w-full" required>

                                                            <label class="block mt-5 text-xs uppercase">Isbn <span class="text-red-500">*</span></label>
                                                            <input type="number" v-model="formData.isbn" class="block mt-1 border rounded-md p-2 border-gray-300 w-full" required>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="mt-10 absolute right-10">
                                                    <span @click="showTab2" class="rounded-md px-3 py-2 hover:cursor-pointer text-[#111827] hover:border"> <i class="fa fa-chevron-right"></i> Next</span>
                                                </div>
                                            </div>
                                            <div v-if="pageTwo">                                            
                                                <div  class="mt-5 md:grid grid-flow-col flex-stretch md:gap-8">
                                                    <div class="mt-5 md:mt-0">
                                                        <label class="block mt-5 text-xs uppercase">Sub Category <span class="text-red-500">*</span></label>
                                                        <select v-model="formData.subcategory" class="block mt-1 border rounded-md p-2 border-gray-300 w-full" required>
                                                            <option v-for="subcategory in subcategories" :key="subcategory.id" :value="subcategory.id">
                                                                {{ subcategory.name }}
                                                            </option>
                                                        </select>
                                                   </div>
                                                    <div class="mt-5 md:mt-0">
                                                        <label class="block mt-5 text-xs uppercase">Page <span class="text-red-500">*</span></label>
                                                        <input type="number" v-model="formData.page" class="block mt-1 border rounded-md p-2 border-gray-300 w-full" required>
                                                    </div>
                                                </div>
                                                <div class="xs:mt-5 md:mt-5 md:grid grid-flow-col flex-stretch md:gap-8">
                                                    <div class="mt-0">
                                                        <label class="block text-xs uppercase">Description</label>
                                                        <textarea v-model="formData.description" row="10" class="block mt-1 border rounded-md p-2 border-gray-300 w-full"></textarea>
                                                    </div>
                                                </div>

                                                <div class="mt-5 absolute xs:right-5 md:right-10">
                                                    <span @click="showTab1" class="rounded-md px-3 py-2 hover:cursor-pointer text-[#111827] hover:border"> <i class="fa fa-chevron-left"></i> Previous</span>
                                                    <button class="text-white rounded-md ml-5 px-2 py-2 bg-green-500 hover:cursor-pointer hover:bg-[#111827] font-bold"> <i class="fa fa-paper-plane-top"></i> Save</button>
                                                </div>
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
                                        <h2 class="uppercase text-xl text-green-500"><i class="fa fa-list-ol"></i> Edit Book</h2>
                                    </div>
                                    <div class="absolute right-0">
                                        <button v-if="showModal" class="bg-white px-2 py-1 rounded text-red-500" @click="toggleModal"><i class="fa fa-xmark"></i> </button>
                                    </div>
                                </div>

                                <div class="rounded-md bg-white border p-5 md:p-10 border-gray-100 xs:w-100 w-full">

                                    <form enctype="multipart/form-data" @submit.prevent="updateBook(formData.id)">

                                        <div class="xs:pb-20 md:pb-10">
                                            <h6 class="text-red-500">Required fields are marked *</h6>
                                            <div v-if="pageOne" class="pb-5">
                                                <div class="mt-5 md:grid grid-flow-col flex-stretch md:gap-8">
                                                    <div class="p-0 w-full">
                                                        <label class="relative flex items-center justify-center rounded-md border border-dashed border-[#e0e0e0] xs:p-2 md:p-12 text-center">
                                                            
                                                            <img :src="handleImage(formData.image)" class="rounded-lg" >
                                                            
                                                            <!-- <div>
                                                                <span class="mb-2 block text-xl font-semibold text-[#07074D]">Select a file</span>
                                                                <input type="file" ref="fileInput" @change="handleFileChange" accept="image/*" required class="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                                                            </div> -->
                                                        </label>                                                        
                                                    </div>

                                                    <div class="mt-5 md:mt-0">
                                                        <div class="mt-0">
                                                            <label class="block text-xs uppercase">Name <span class="text-red-500">*</span></label>
                                                            <input type="text" v-model="formData.name" class="block mt-1 border rounded-md p-2 border-gray-300 w-full" required>
                                                        
                                                            <label class="block text-xs mt-5 uppercase">Publisher <span class="text-red-500">*</span></label>
                                                            <input type="text" v-model="formData.publisher" class="block mt-1 border rounded-md p-2 border-gray-300 w-full" required>

                                                            <label class="block mt-5 text-xs uppercase">Isbn <span class="text-red-500">*</span></label>
                                                            <input type="number" v-model="formData.isbn" class="block mt-1 border rounded-md p-2 border-gray-300 w-full" required>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="mt-10 absolute xs:right-5 md:right-10">
                                                    <span @click="showTab2" class="rounded-md px-3 py-2 hover:cursor-pointer text-[#111827] hover:border"> <i class="fa fa-chevron-right"></i> Next</span>
                                                </div>
                                            </div>
                                            <div v-if="pageTwo">                                            
                                                <div  class="mt-5 md:grid grid-flow-col flex-stretch md:gap-8">
                                                    <div class="mt-5 md:mt-0">
                                                        <label class="block mt-5 text-xs uppercase">Sub Category <span class="text-red-500">*</span></label>
                                                        <select v-model="formData.subcategory" class="block mt-1 border rounded-md p-2 border-gray-300 w-full" required>
                                                            <option v-for="subcategory in subcategories" :key="subcategory.id" :value="subcategory.id">
                                                                {{ subcategory.name }}
                                                            </option>
                                                        </select>
                                                   </div>
                                                    <div class="mt-5 md:mt-0">
                                                        <label class="block mt-5 text-xs uppercase">Page <span class="text-red-500">*</span></label>
                                                        <input type="number" v-model="formData.page" class="block mt-1 border rounded-md p-2 border-gray-300 w-full" required>
                                                    </div>
                                                </div>
                                                <div class="xs:mt-5 md:mt-5 md:grid grid-flow-col flex-stretch md:gap-8">
                                                    <div class="mt-0">
                                                        <label class="block text-xs uppercase">Description</label>
                                                        <textarea v-model="formData.description" row="10" class="block mt-1 border rounded-md p-2 border-gray-300 w-full"></textarea>
                                                    </div>
                                                </div>

                                                <div class="mt-5 absolute xs:right-5 md:right-10">
                                                    <span @click="showTab1" class="rounded-md px-3 py-2 hover:cursor-pointer text-[#111827] hover:border"> <i class="fa fa-chevron-left"></i> Previous</span>
                                                    <button class="text-white rounded-md ml-5 px-2 py-2 bg-green-500 hover:cursor-pointer hover:bg-[#111827] font-bold"> <i class="fa fa-paper-plane-top"></i> Save</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                </div>

                <!-- borrrow a book modal -->
                <div v-if="showModalBorrow">
                        <div class="backdrop grid grid-flow-col bg-[#F5F7FB] rounded">
                            <div class> 
                                <div class="flex my-5 md:w-full">
                                    <div class="title">
                                        <h2 class="uppercase text-xl text-green-500"><i class="fa fa-list-ol"></i> Borrow a Book</h2>
                                    </div>
                                    <div class="absolute right-0">
                                        <button v-if="showModalBorrow" class="bg-white px-2 py-1 rounded text-red-500" @click="toggleModaleBorrow"><i class="fa fa-xmark"></i> </button>
                                    </div>
                                </div>

                                <div class="rounded-md bg-white border p-5 md:p-10 border-gray-100 xs:w-100 w-full">

                                    <form enctype="multipart/form-data" @submit.prevent="borrowBook(formData.id)">

                                        <div class="xs:pb-20 md:pb-10">
                                            <h6 class="text-red-500">Required fields are marked *</h6>
                                            <div class="pb-5">
                                                <div class="mt-5 md:grid grid-cols-2 gap-4">
                                                    <div class="mt-5 md:mt-0">
                                                        <label class="block text-xs mt-5 uppercase">Loan date <span class="text-red-500">*</span></label>
                                                        <input type="date" v-model="loanData.loan_date" class="block mt-1 border rounded-md p-2 border-gray-300 w-full" required>
                                                    </div>
                                                    <div class="mt-5 md:mt-0">
                                                        <label class="block text-xs mt-5 uppercase">Due date <span class="text-red-500">*</span></label>
                                                        <input type="date" v-model="loanData.due_date" class="block mt-1 border rounded-md p-2 border-gray-300 w-full" required>
                                                    </div>
                                                </div>
                                                <div class="mt-5 md:grid grid-cols-2 gap-4">
                                                    
                                                    <div class="mt-0">
                                                        <label class="block text-xs mt-5 uppercase">Penalty Status <span class="text-red-500">*</span></label>
                                                        <select v-model="loanData.penalty_status" class="block mt-1 border rounded-md p-2 border-gray-300 w-full" required>
                                                            <option :value="charged">Charged</option>
                                                            <option :value="not_charged">Not Charged</option>
                                                        </select>
                                                    </div>
                                                    <div class="mt-5 md:mt-0">
                                                        <label class="block text-xs mt-5 uppercase">Penalty Amount (Required if penalty status is charged) </label>
                                                        <input type="number" v-model="loanData.penalty_amount" class="block mt-1 border rounded-md p-2 border-gray-300 w-full">
                                                    </div>
                                                </div>

                                                <div class="mt-5 absolute xs:right-5 md:right-10">
                                                    <button class="text-white rounded-md ml-5 px-2 py-2 bg-green-500 hover:cursor-pointer hover:bg-[#111827] font-bold"> <i class="fa fa-paper-plane-top"></i> Save</button>
                                                </div>
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
                                <div class="text-bold">Total book</div>
                            </div>
                            <div class="flex justify-between mt-5 bg-[#F5F7FB] p-2 rounded">
                                <div class="text-center pr-1 border-r text-green-500 border-gray-200">
                                    <div> {{ available }} </div>
                                    <div class="text-xs"> Available </div> 
                                </div>
                                <div class="text-center ml-1 text-red-500">
                                    <div> {{ unavailable }} </div>
                                    <div class="text-xs"> Unavailable </div> 
                                </div>
                            </div>
                            <div>    
                            <div class="title mt-5">
                                <h2 class="uppercase text-green-400"><i class="fa fa-list-ul"></i> Related</h2>
                            </div>
                            <ul class="mt-5">
                                <li class="py-2 px-2 w-100 mt-4 rounded bg-white border border-[#111827] text-center hover:bg-[#111827] hover:text-white hover:border-[#111827] "><router-link :to="{ name: 'IndexLoan'}"> <i class="fa-solid fa-rectangle-list"></i> Loans</router-link></li>
                            </ul>

                        </div>
                        </div>
                    </div>
                    
                    <div class="md:flex-1 xs:block rounded-md bg-white pt-6 pl-6 pr-6 pb-2 xs:ml-0 sm:ml-0 md:ml-5 mt-2 md:w-96 xs:w-full">
                        <div class="bg-[#111827]-100 flex">
                            <div class="title flex-1">
                                <h3 class="uppercase text-lg text-green-500"><i class="fa fa-list-ol"></i> Books list</h3>
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
                            <div class="overflow-x-auto sm:-mx-3 lg:-mx-2">
                                <div class="inline-block min-w-full py-2 sm:px-0 lg:px-0">
                                    <div class="border-gray-200 rounded">
                                        <table class="rounded border border-gray-200 min-w-full text-left text-sm font-light">
                                            <thead class="bg-[#F5F7FB]">
                                                <tr class="text-xs">
                                                    <th scope="col" class=" px-3 py-3">#</th>
                                                    <th scope="col" class=" px-3 py-3">Isbn</th>
                                                    <th scope="col" class=" px-3 py-3">Name</th>
                                                    <th scope="col" class=" px-3 py-3">Image</th>
                                                    <th scope="col" class=" px-3 py-3">Publisher</th>
                                                    <th scope="col" class=" px-3 py-3">Category</th>
                                                    <th scope="col" class=" px-3 py-3">Sub Category</th>
                                                    <th scope="col" class=" px-3 py-3">Page</th>
                                                    <th scope="col" class=" px-3 py-3">Status</th>
                                                    <th scope="col" class=" px-3 py-3">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody class="h-100 border-r border-b border-gray-100">
                                                <tr v-for="(book, index) in books" :key="book.id" class="text-xs">
                                                    <td class="whitespace-nowrap  px-3 py-2 font-medium border-r border-b border-gray-100">{{ index + 1 }}</td>
                                                    <td class="whitespace-nowrap  px-4 w-24 py-2 border-r border-b border-gray-100">{{ book.isbn }}</td>
                                                    <td class="whitespace-nowrap  px-4 w-24 py-2 border-r border-b border-gray-100">{{ book.name }}</td>
                                                    <td class="whitespace-nowrap  px-6 py-2 w-20 font-medium border-r border-b border-gray-100"> 
                                                        <img :src="handleImage(book.image)" class="rounded-full border border-gray-300 md:h-8 md:w-8">
                                                    </td>
                                                    <td class="whitespace-nowrap  px-3 py-2 border-r border-b border-gray-100">{{ book.publisher }}</td>
                                                    <td class="whitespace-nowrap  px-3 py-2 border-r border-b border-gray-100">{{ book && book.category ? book.category.name : ' ' }}</td>
                                                    <td class="whitespace-nowrap  px-3 py-2 border-r border-b border-gray-100">{{ book && book.subcategory ? book.subcategory.name : ' ' }}</td>
                                                    <td class="whitespace-nowrap  px-3 py-2 border-r border-b border-gray-100">{{ book.page }}</td>
                                                    <td :class=" {'text-red-500' : book.status === 'UNAVAILABLE' }" class="whitespace-nowrap  px-3 py-2 border-r border-b border-gray-100 text-green-500">{{ book.status }}</td>
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
                                                                <div v-if="userRole == 2">
                                                                    <li><a href="#" @click="dataBookBorrow(book.id)" class="block px-4 py-2 text-blue-500 hover:bg-gray-100" :class="{ 'text-red-500' : book.status === 'UNAVAILABLE' }" >{{ book.status === 'UNAVAILABLE' ? 'Cant be borrowed' : 'Borrow'}}</a> </li>
                                                                </div>
                                                                <div v-if="userRole == 1">
                                                                    <li><a href="#" @click="dataBook(book.id)" class="block px-4 py-2 hover:bg-gray-100">Edit</a> </li>
                                                                    <li v-if="book.status === 'UNAVAILABLE'" @click="statusBookAvailable(book.id)"><a href="#" class="block px-4 py-2 hover:bg-gray-100 text-green-500">Available</a></li>
                                                                    <li v-if="book.status === 'AVAILABLE'" @click="statusBookUnavailable(book.id)"><a href="#" class="block px-4 py-2 hover:bg-gray-100 text-red-500">Unavailable</a></li>
                                                                    <li><a href="#" @click="delBook(book.id)" class="block px-4 py-2 text-red-500 hover:bg-gray-100">Delete</a> </li>
                                                                </div>
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

import {getBooks, addBook, showBook, editBook, availableBook, unavailableBook, deleteBook, requestLoan, getSubcategories } from '../../jscore/init.js';
import {successMessage, errorMessage} from '../../jscore/IoNotification.js';
import { getProfileImageUrl } from '../../jscore/ImageHandler.js';
import { getUserRole } from '../../jscore/UserRole.js';


export default {
  name: "IndexBook",
  components: { Head, Header, Sidebar, Footer },

  data() {
        return {
            showModal: false,
            showModalEdit: false,
            showModalBorrow: false,
            openDropdownIndex: null,

            goMenu: false,

            pageOne: true,
            pageTwo: false,

            available: '',
            unavailable: '',
            total: '',
            roles: {},
            subcategories: {},

            books: [],
            selectedImage: null,
            formData: {
                name: '',
                isbn: '',
                publisher: '',
                page: '',
                image: null,
                subcategory: '',
                description: '',
            },

            loanData: {
                user: '',
                book: '',
                loan_date: '',
                return_date: '',
                penalty_amount: '',
                penalty_status: '',
            },

            charged: 'CHARGED',
            not_charged: 'NOT_CHARGED',
            selectedFile: null,
            userRole: '',

        };
    },

    mounted(){
        this.fetchBooks();
        this.selectOptions();

        this.userRole = getUserRole();

    },


    methods: {
        //books list
        fetchBooks(){

            getBooks()
            .then(response => {
                this.books = response.data.books;
                this.available = response.data.available,
                this.unavailable = response.data.unavailable,
                this.total = response.data.total;
            })
            .catch(error => {
                console.log(error);
            });
        },

        handleFileChange(event) {
            this.formData.image = event.target.files[0];
        },

        //new book
        newBook(){

            const formData = new FormData();
            if ( this.formData.image) {
                // Append the file directly to FormData
                formData.append('image', this.formData.image);
            }

            formData.append('name', this.formData.name);
            formData.append('publisher', this.formData.publisher);
            formData.append('isbn', this.formData.isbn);
            formData.append('page', this.formData.page);
            formData.append('subcategory', this.formData.subcategory);
            formData.append('description', this.formData.description);

            //api call
            addBook(formData)
                .then(response => {
                    //toast notification
                    successMessage(this.$toast, response.data.message);
                    //close the tab    
                    this.showModal = !this.showModal;

                    // fetch List
                    this.fetchBooks();
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
                        errorMessage(this.$toast, errors.response.data.message);
                    }
                });
        },

        //data book
        dataBook(book){
            //open the tab    
            this.showModalEdit = !this.showModalEdit;
            this.showModalBorrow = !this.showModalBorrow;

            this.toggleDropdown(null);
            showBook(book)
            .then(response => {
                this.formData.id = book;
                this.formData.name = response.data.book.name;
                this.formData.isbn = response.data.book.isbn;
                this.formData.publisher = response.data.book.publisher;
                this.formData.page = response.data.book.page;
                this.formData.subcategory = response.data.book.subcategory_id;
                this.formData.description = response.data.book.description;

                this.formData.image = response.data.book.image;

            })
            .catch((errors) => {
                console.error(errors);
            });
        },


        //data book borrow
        dataBookBorrow(book){
            //open the tab    
            this.showModalBorrow = !this.showModalBorrow;
            this.toggleDropdown(null);
            showBook(book)
            .then(response => {
                this.formData.id = book;
            })
            .catch((errors) => {
                console.error(errors);
            });
        },


        showBookProfile(book) {
            // When the "Data Profile" button is clicked, fetch the selected book data
            this.dataBook(book);
        },

        //update book
        updateBook(book) {

            this.openDropdownIndex = null;
            editBook(book, this.formData)
                .then(response => {
                    //toast notification
                    successMessage(this.$toast, response.data.message);
                    //close the tab    
                    this.showModalEdit = !this.showModalEdit;

                    // fetch List
                    this.fetchBooks();
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
                        errorMessage(this.$toast, errors.response.data.message);
                    }
                });   
        },

        //change book status to available
        statusBookAvailable(book) {
            availableBook(book)
                .then(response => {
                    //toast notification
                    successMessage(this.$toast, response.data.message);
                    //close the tab    
                    this.openDropdownIndex = null;
                    // fetch List
                    this.fetchBooks();
                })
                .catch(errors => {
                    errorMessage(this.$toast, errors.response.data.message);
                });   
        },

        //change book status to unavailable
        statusBookUnavailable(book) {
            unavailableBook(book)
                .then(response => {
                    //toast notification
                    successMessage(this.$toast, response.data.message);
                    //close the tab    
                    this.openDropdownIndex = null;
                    // fetch List
                    this.fetchBooks();
                })
                .catch(errors => {
                    errorMessage(this.$toast, errors.response.data.message);
                });   
        },

        //delete a book
        delBook(book) {
            deleteBook(book)
                .then(response => {
                    //toast notification
                    successMessage(this.$toast, response.data.message);
                    //close the tab    
                    this.openDropdownIndex = null;
                    // fetch List
                    this.fetchBooks();
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
                        errorMessage(this.$toast, errors.response.data.message);
                    }
                });   
        },


        // requestLoan
        borrowBook(book) {
            this.openDropdownIndex = null;
            requestLoan(book, this.loanData)
            .then(response => {
                //toast notification
                successMessage(this.$toast, response.data.message);
                //close the tab    
                this.showModalBorrow = !this.showModalBorrow;

                // fetch List
                this.fetchBooks();
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
                    errorMessage(this.$toast, errors.response.data.message);

                }
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

        toggleModaleBorrow(){
            this.showModalBorrow = !this.showModalBorrow;
        },

        showTab1() {
            this.pageOne = !this.pageOne;
            this.pageTwo = !this.pageTwo;
        },

        showTab2() {
            this.pageTwo = !this.pageTwo;
            this.pageOne = !this.pageOne;
        },

        //image handler
        handleImage(path){
            const image = getProfileImageUrl(path);
            return image;
        },

        //Select options list
        selectOptions(){
            //book sub categories list
            getSubcategories()
            .then(response => {
                this.subcategories = response.data.subcategories;
            })
            .catch(error => {
                console.log(error);
            });
        },
        
        newMenu(){
            this.goMenu = !this.goMenu;
        }
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