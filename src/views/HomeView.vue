<template>
   <div class="m-0">
      <Head/>
      
      <div class="flex">

         <Sidebar/>

         <div class="content px-5 py-3 bg-[#F5F7FB] mt-0">

            <Header/>

            <!-- <div class="mb-2 mt-3 flex">
               <h1 class="mr-24"><i class="fa fa-home text-[#111827]"></i> Dashboard</h1>
            </div> -->
            <div class="rounded-md bg-white py-7 flex items-stretch mt-10 ">

               <a href="" class="text-gray-500 flex-1 text-center"><router-link :to="{ }"> <i class="fa fa-users"></i> Etudiants </router-link></a>

            </div>


            <div class="rounded-md mt-5">
               
               <div class="md:grid grid-flow-col justify-stretch gap-5">
                  <div class="">
                     <div class="rounded-md bg-red-50 p-4 text-[#111827] staff">
                        <h2 class="font-bolder"> Nombre Total du Staff</h2>
                        <div class="flex mt-3 relative">
                           <div>
                              <h1 class="text-2xl">200</h1>
                           </div>
                           <div class="mt-1 absolute right-0">
                              <span class="bg-white rounded-full text-xs p-1 " ><i class="fa fa-check"></i> Actif 10</span>
                           </div>
                        </div>
                     </div>
                     <div class="rounded-md bg-red-50 p-4 mt-5 text-[#111827] staff">
                        <h2 class="">Staff</h2>
                        <div class="flex mt-2 relative">
                           <div>
                              <h1 class="text-2xl">300</h1>
                           </div>
                           <div class="mt-1 absolute right-0">
                              <span class="bg-white rounded-full  border-red-300 text-xs ml-3 p-1"><i class="fa fa-check"></i> Actif 200</span>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div class="rounded-md bg-blue-100 p-4 text-[#111827] staff">
                     <h2 class=""> </h2>
                     <div class="flex mt-2">
                        <div>
                           <h1 class="text-2xl"> </h1>
                        </div>
                        <div class="mt-2 ml-10">
                           <div class="mx-auto w-3/5 overflow-hidden">
                              <canvas id="bar-chart-custom-tooltip"></canvas>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div class="rounded-md bg-green-100 p-4 payment">
                     <div class="flex">
                        <h2 class="">Paiements</h2>
                        <div >
                           <p class="text-white bg-green-500 p-1 rounded-md ml-24 " >70%</p>
                        </div>
                     </div>
                     <div class="text-center mt-4">
                        <div class="radial-progress text-green-500 border-green-500" style="--value:70;">70%</div>
                        <div class="m-4">
                           <a href="" class="w-60 rounded-md text-white bg-green-500 p-2">Voir plus</a>
                        </div>
                     </div>
                  </div>
               </div>
                  
                  
               <div class="md:grid grid-flow-col justify-stretch gap-5">
                     <div class="rounded-md bg-white p-4 mt-5 text-[#111827] staff ">
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
                     <div class="rounded-md p-4 mt-5 bg-white text-[#111827]  staff">
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

               <div class="rounded-md bg-white  p-4 mt-5 w-6/7 text-[#111827] staff ">
                  <div class="flex">
                     <h2 class="">Evolution de l'année académique</h2>
                     <div >
                        <p class="text-white bg-green-500 p-1 rounded-md absolute right-14" >45%</p>
                     </div>
                  </div>
                  
                  <div class="w-full bg-green-300 rounded-full mt-5">
                     <div class="bg-green-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style="width: 45%"> <i class="fa fa-check"></i>45%</div>
                  </div>
               </div>   

               <div class="md:grid grid-flow-col justify-stretch gap-5">
                  <div class="rounded-md bg-green-100 p-4 mt-5">
                     <div class="flex1">
                        <h2 class="">Horreur</h2>
                     </div>
                     <div class="text-center mt-4">
                        <div class="m-4">
                           <a href="" class="w-60 rounded-md text-white bg-green-500 p-2"> Voir plus</a>
                        </div>
                     </div>
                  </div>

                  <div class="rounded-md bg-green-100 p-4 mt-5">
                     <div class="flex1">
                        <h2 class="">Points</h2>
                     </div>
                     <div class="text-center mt-4">
                        <div class="m-4">
                           <a href="" class="w-60 rounded-md text-white bg-green-500 p-2"> Voir plus </a>
                        </div>
                     </div>
                  </div>

                  <div class="rounded-md bg-green-100 p-4 mt-5">
                     <div class="flex">
                        <h2 class="">Activités académiques</h2>
                     </div>
                     <div class="text-center mt-4">
                        <div class="m-4">
                           <a href="" class="w-60 rounded-md text-white bg-green-500 p-2"> Voir plus</a>
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

export default {
  name: "HomeView",
  components: { Head, Header, Sidebar, Footer },

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