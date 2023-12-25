<template>
   <div class="m-0">
      <Head/>
      
      <div class="flex">

         <Sidebar :data="goMenu"/>

         <div class="content px-5 py-3 bg-[#F5F7FB] mt-0">

            <button @click="newMenu" class="absolute p-1">
                <svg xmlns="http://www.w3.org/2000/svg"  class="w-10 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M4 6h16M4 12h16M4 18h16"/> 
                </svg>
            </button>

            <Header/>

            <!-- <div class="mb-2 mt-3 flex">
               <h1 class="mr-24"><i class="fa fa-home "></i> Dashboard</h1>
            </div> -->
            <div class="md:w-98">
               <div class="rounded-md bg-white py-5 flex items-stretch mt-6 ">
                  <span href="" class="flex-1 text-center text-md md:text-lg"><router-link :to="{ name: 'IndexLoan' }"> <i class="fa-solid fa-rectangle-list"></i> Loan </router-link></span>
                  <span href="" class="flex-1 text-center text-md md:text-lg"><router-link :to="{ name: 'IndexBook' }"> <i class="fa fa-book"></i> Book </router-link></span>
                  <span href="" class="flex-1 text-center text-md md:text-lg"><router-link :to="{ name: 'IndexUser' }"> <i class="fa fa-users"></i> Users </router-link></span>
               </div>

               <div class="rounded-md mt-5">               
                  <div class="xs:grid grid-flow-col justify-stretch gap-5">
                     <div class="">
                        <div class="rounded-md bg-green-100 p-4 w-full staff">
                           <h2 class="font-bold text-lg md:text-xl md:mb-4 md:ml-1">Total Users</h2>
                           <div class="flex mt-3 relative">
                              <div class="md:ml-1">
                                 <h1 class="text-2xl">200</h1>
                              </div>
                              <div class="mt-1 absolute right-0">
                                 <span class="bg-white rounded-full text-xs p-1"><i class="fa fa-check"></i> Actif 10</span>
                              </div>
                           </div>
                        </div>
                        <div class="rounded-md bg-white p-0 pt-5 mt-5 ">
                           <h2 class="font-bold text-lg md:text-xl mb-4 ml-4">Books Status</h2>
                           
                           <!-- book component graph -->
                           <books-chart :data="booksData"></books-chart>
                        </div>
                     </div>

                     <div class="rounded-md bg-white p-0 pt-5 xs:mt-5 md:mt-0">
                           <h2 class="font-bold text-lg md:text-xl mb-4 ml-4">Books Loans</h2>

                        <!-- loans component graph -->
                        <loans-chart :data="loansData"></loans-chart>

                     </div>
                  </div>
                     
                     
                  <div class="md:grid grid-flow-col justify-stretch gap-5">
                        <div class="rounded-md bg-white p-4 mt-5  staff ">
                           <h2>Etats des cours</h2>
                           <div class="flex justify-between mt-2 text-white">
                              <div class="flex p-2 bg-pink-500 rounded-full">
                                 <div>
                                    <h1 class="text-md"> 300</h1>
                                 </div>
                                 <div class="mt-0">
                                    <span class="bg-white rounded-full text-pink-500 text-xs ml-2 p-1"> Terminés</span>
                                 </div>
                              </div>

                              <div class="flex p-2 bg-green-500 rounded-full">
                                 <div>
                                    <h3 class="text-md"> 10</h3>
                                 </div>
                                 <div class="mt-0">
                                    <span class="bg-white rounded-full text-green-500 text-xs ml-2 p-1"> Encours</span>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div class="rounded-md p-4 mt-5 bg-white   staff">
                           <h2 class="">Nombre d'étudiants</h2>
                           <div class="flex mt-5 pl-20 flex justify-between">
                              <div class="">
                                 <a href="" class=" font-bold"> <router-link :to="{ }"> <i class="fa fa-times-circle"></i> 10 Abandons </router-link></a>
                              </div>

                              <div class="w-40 ml-20 mr-10">
                                 <a href="" class=" font-bold"> <router-link :to="{ }"> <i class="fa fa-check"></i>  500 Actifs </router-link></a>
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
   
</template>

<script>
import Head from "../components/layouts/head.vue";
import Header from "../components/layouts/Header.vue";
import Sidebar from "../components/layouts/Sidebar.vue";
import Footer from "../components/layouts/Footer.vue";
import BooksChart from "../components/charts/BooksChart.vue";
import LoansChart from "../components/charts/LoansChart.vue";


import { bookChart, loanChart } from "../jscore/init.js";

export default {
  name: "HomeView",
  components: { Sidebar, Head, Header, Footer, BooksChart, LoansChart },

	data() {
		return {
			booksData: {
				books: 0,
				available: 0,
				unavailable: 0,
			},

         goMenu: false,
			loansData: {
				loans: 0,
				pending: 0,
				approved: 0,
				rejected: 0,
				extended: 0,
				returned: 0,
			},
		};
	},

	mounted() {
		this.fetchBooksData();
		this.fetchLoansData();
	},

	methods: {
		fetchBooksData() {
			bookChart()
			.then(response => {
				this.booksData = response.data;
			})
			.catch(errors => {
				console.error("Error fetching books data:", errors);
			});
		},

		fetchLoansData() {
			loanChart()
			.then(response => {
			   this.loansData = response.data;
			})
			.catch(errors => {
			   console.error("Error fetching books data:", errors);
			});
		},

      newMenu(){
         this.goMenu = !this.goMenu;
      }
	},
};

</script>

<style>
.content a {
  letter-spacing: 1px;
  font-size: 13px;
}

.staff h2 {
  letter-spacing: 1px;
}

@media (max-width: 900px) {
   .staff, .payment{
      margin-top: 20px;
   }
}

</style>