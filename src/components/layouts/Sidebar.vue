<template>
<div>
<div v-if="!receivedMenu" ref="goMenu">    
    
<div class="md:block">
<!-- <div class=""> -->
    <div class="bg-green-500 py-3 px-2 ml-0">
        <div class="flex">
            <!-- hide the sidebar -->
            <button v-on:click="toggleShowMenu" class="border border-white rounded-md p-1">
                <svg xmlns="http://www.w3.org/2000/svg"  class="w-7 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/> 
                </svg>
            </button>

            <h1 v-if="showMenu" class="bg-white text-center text-green-500 text-xl px-2 py-1 ml-5 rounded">Library</h1>    

            <!-- show the side bar -->
        </div>
    </div>

    <!-- SIDEBAR WITH TITLE -->
    <div v-if="showMenu" class="sidebar pt-3 mb-5 px-2 md:w-36 bg-white">


        <ul class="mt-8">
            <li class="p-2 hover:bg-[#F5F7FB] hover:rounded">
                <a href="" class="text-gray-900 uppercase" > <router-link :to="{ name: 'home' }"><i class="fa fa-home"></i> Dashboard </router-link> </a>
            </li>
        </ul>

        <ul class="mt-5">
            <li class="ml-0 mt-2 p-2 hover:bg-[#F5F7FB] hover:rounded">
                <a href="" class="text-gray-900 uppercase"> <router-link :to="{ name: 'IndexBook' }"> <i class="fa fa-book"></i> Books</router-link></a>
            </li>
        </ul>

        <ul class="mt-5">
            <li class="ml-0 mt-2 p-2 hover:bg-[#F5F7FB] hover:rounded">
                <a href="" class="text-gray-900 uppercase"> <router-link :to="{ name: 'IndexLoan' }"> <i class="fa-solid fa-rectangle-list"></i> Loans</router-link></a>
            </li>
        </ul>

        <ul class="mt-5">
            <li class="ml-0 mt-2 p-2 hover:bg-[#F5F7FB] hover:rounded">
                <a href="" class="text-gray-900 uppercase"> <router-link :to="{ name: 'IndexCategory' }"> <i class="fa-solid fa-rectangle-list"></i> Category</router-link></a>
            </li>
        </ul>

        <ul class="mt-5">
            <li class="ml-0 mt-2 p-2 hover:bg-[#F5F7FB] hover:rounded">
                <a href="" class="text-gray-900 uppercase"> <router-link :to="{ name: 'IndexUser' }"> <i class="fa fa-users"></i> Users</router-link></a>
            </li>
        </ul>

    </div>

    <!-- SIDEBAR WITHOUT TITLE -->
    <!-- <div :class="{  'md:hidden' : !showMenu }"  class="sidebar pt-3 pl-3 pr-3 bg-white text-center"> -->
    <div v-if="!showMenu" class="sidebar pt-3 pl-3 pr-3 bg-white text-center">

        <ul class="mt-8">
            <li class="">
                <a href="" title="Dashboard"> <router-link :to="{ name: 'home' }"><i class="fa fa-home"></i>  </router-link> </a>
            </li>
        </ul>        

        <ul class="mt-8">
            <li class="ml-0 mt-3">
                <a href="" title="Book"> <router-link :to="{ name: 'IndexBook' }"> <i class="fa fa-book"></i> </router-link></a>
            </li>
        </ul>

        <ul class="mt-8">
            <li class="ml-0 mt-3">
                <a href="" title="Loans"> <router-link :to="{ name: 'IndexLoan' }"> <i class="fa-solid fa-rectangle-list"></i> </router-link></a>
            </li>
        </ul>

        <ul class="mt-8">
            <li class="ml-0 mt-3">
                <a href="" title="Categories"> <router-link :to="{ name: 'IndexCategory' }"> <i class="fa-solid fa-rectangle-list"></i> </router-link></a>
            </li>
        </ul>

        <ul class="mt-8">
            <li class="ml-0 mt-3">
                <a href="" title="Users"> <router-link :to="{ name: 'IndexUser' }"> <i class="fa fa-users"></i> </router-link></a>
            </li>
        </ul>
    </div>
</div>
</div>

</div>
</template>

<script>
import Header from "./Header.vue";

export default {
  name: "Sidebar",
  components: { Header },

  data() {
    return {
      showMenu: true,

      receivedMenu: ""
    };
  },

  props: ["data"],

  mounted() {
    this.newMenu();
  },

  methods: {
    toggleShowMenu() {
      this.showMenu = !this.showMenu;
    },

    newMenu() {
      this.receivedMenu = this.$refs.goMenu;
      if (!this.receivedMenu) {
        return this.receivedMenu;
      }

      return this.receivedMenu;
      console.log("Menu Hidden");

      // console.log(this.receivedMenu);
    }
  },

  watch: {
    data: function() {
      // Render menu
      this.newMenu();
    }
  }
};
</script>

<style>
.sidebar {
  color: gray;
  letter-spacing: 1px;
  font-size: 13px;
  height: 100vh;
  /* position: fixed; */
}

/* .sidebar ul li{
    width: 100%;
 } */

.sidebar ul li a {
  letter-spacing: 1px;
}

@media (max-width: 900px) {
  /* .sidebar {
  } */
}
</style>
