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
            <div class="sm:w-4/4 md:w-4/4 lg:w-100">
               <div class="rounded-md bg-white py-5 flex items-stretch mt-6 ">
                  <span href="" class="flex-1 text-center text-md md:text-lg"><router-link :to="{ name: 'IndexLoan' }"> <i class="fa-solid fa-rectangle-list"></i> Loans </router-link></span>
                  <span href="" class="flex-1 text-center text-md md:text-lg"><router-link :to="{ name: 'IndexBook' }"> <i class="fa fa-book"></i> books </router-link></span>
                  <span href="" class="flex-1 text-center text-md md:text-lg"><router-link :to="{ name: 'IndexUser' }"> <i class="fa fa-users"></i> Users </router-link></span>
               </div>

               <div class="rounded-md mt-5">               
                  <div class="lg:grid grid-flow-col justify-stretch xs:gap-2 lg:gap-5">
                     <div class="">
                        <div class="rounded-md bg-green-100 p-4 w-full staff">
                           <h2 class="font-bold text-lg md:text-xl md:mb-4 md:ml-1">{{ userRoleId == 1 ? 'LOANS' : 'MY LOANS' }} </h2>
                           <div class="xs:grid grid-flow-col mt-3 justify-between xs:gap:5 md:gap-10">
                              <div class="md:ml-1">
                                 <h1 class="text-2xl">{{loansData.loans}}</h1>
                              </div>
                              
                              <div class="mt-1">
                                 <span class="rounded-full text-xs p-1 bg-red-500 text-white"><i class="fa fa-check"></i> Rejected {{ loansData.rejected }}</span>
                              </div>
                              <div class="mt-1">
                                 <span class="rounded-full text-xs p-1 bg-green-500 text-white"><i class="fa fa-check"></i> Approved {{ loansData.approved }}</span>
                              </div>
                           </div>
                        </div>
                        <div class="lg:grid grid-flow-col justify-stretch xs:gap-2 lg:gap-5">

                           <div class="rounded-md w-full bg-white p-0 pt-5 mt-5 ">
                              <h2 class="font-bold text-lg md:text-xl mb-4 ml-4">Books</h2>
                              
                              <!-- book component graph -->
                              <books-chart :data="booksData"></books-chart>
                           </div>

                           <div class="rounded-md w-full bg-white p-0 pt-5 mt-5 ">
                              <h2 class="font-bold text-lg md:text-xl mb-4 ml-4">Users</h2>
                              
                              <!-- book component graph -->
                              <users-chart :data="usersData"></users-chart>
                           </div>
                           
                        </div>
                     </div>

                     <div class="rounded-md w-full bg-white p-0 pt-5 xs:mt-5 md:mt-0">
                           <h2 class="font-bold text-lg md:text-xl mb-4 ml-4">{{ userRoleId == 1 ? 'LOANS' : 'MY LOANS' }}</h2>

                        <!-- loans component graph -->
                        <loans-chart :data="loansData"></loans-chart>

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
import UsersChart from "../components/charts/UsersChart.vue";


import { bookChart, loanChart, userChart } from "../jscore/init.js";
import { getUserRole} from "../jscore/UserRole.js";
import { isAuthenticated} from "../jscore/checkAuth.js";

export default {
  name: "HomeView",
  components: { Sidebar, Head, Header, Footer, BooksChart, LoansChart, UsersChart },

	data() {
		return {
         goMenu: false,
         userRoleId: '',
			booksData: {
				books: 0,
				available: 0,
				unavailable: 0,
			},

			loansData: {
				loans: 0,
				pending: 0,
				approved: 0,
				rejected: 0,
				extended: 0,
				returned: 0,
			},

         usersData: {
            users: 0,
            active: 0,
            inactive: 0,
         }
		};
	},


   async created() {
      if (isAuthenticated()) {
         this.userRoleId = getUserRole(); // Make sure you have a way to get the user role
         await this.fetchBooksData();
         await this.fetchLoansData();
         await this.fetchUsersData();

      } else {
         // Redirect to the login page or handle unauthorized access
         this.$router.push("/login");
      }
   },

	methods: {

      async fetchBooksData() {
         try {
            const response = await bookChart();
            this.booksData = response.data;
         } catch (errors) {
               console.error("Error fetching books data:", errors);
         }
      },

      async fetchLoansData() {
         try {
            const response = await loanChart();
            this.loansData = response.data;
         } catch (errors) {
            console.error("Error fetching loans data:", errors);
         }
      },

      async fetchUsersData() {
         try {
            const response = await userChart();
            this.usersData = response.data;
         } catch (errors) {
            console.error("Error fetching users data:", errors);
         }
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