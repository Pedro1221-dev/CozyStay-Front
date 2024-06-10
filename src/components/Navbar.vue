<template>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@400" rel="stylesheet" />
    
    <div class="navbar" :class="{'home-page': $route.name === 'home'}">
      <!-- Base da navbar que é sempre igual -->
      <router-link to="/">
        <img src="../assets/img/logo/logo.png" alt="Home" @click="setActiveSection('section1')">
      </router-link>

      
  
      <!-- Opções de navegação que mudam com base na página atual -->
      <div v-if="$route.name === 'home'">
        <a href="#home" :class="{ active: activeSection === 'home' }" @click="setActiveSection('home')">Home</a>
        <a href="#top-destinations" :class="{ active: activeSection === 'top-destinations' }" @click="setActiveSection('top-destinations')">Top Destinations</a>
        <a href="#rentals" :class="{ active: activeSection === 'rentals' }" @click="setActiveSection('rentals')">Rentals</a>
        <a href="#about-us" :class="{ active: activeSection === 'about-us' }" @click="setActiveSection('about-us')">About Us</a>
        <a href="#faqs" :class="{ active: activeSection === 'faqs' }" @click="setActiveSection('faqs')">FAQ's</a>
      </div>
      <div v-else-if="$route.name === 'property'">
        <a href="#overview" :class="{ active: activeSection === 'overview' }" @click="setActiveSection('overview')">Overview</a>
        <a href="#accommodation" :class="{ active: activeSection === 'accommodation' }" @click="setActiveSection('accommodation')">Accommodation</a>
        <a href="#reviews" :class="{ active: activeSection === 'reviews' }" @click="setActiveSection('reviews')">Reviews</a>
        <a href="#location" :class="{ active: activeSection === 'location' }" @click="setActiveSection('location')">Location</a>
        <a href="#host" :class="{ active: activeSection === 'host' }" @click="setActiveSection('host')">Host</a>
      </div>
      
      <!-- Ícone do usuário ou foto do usuário com base no status de login -->
      <div v-if="!isLoggedIn">
        <span class="material-symbols-outlined login-icon" @click="openModal">account_circle</span>
      </div>
      <div v-else>
        <div class="text-center">
          <v-menu location="bottom">
            <template v-slot:activator="{ props }">
              <img v-if="apiRequestComplete" :src="userPhoto" class="login-icon" alt="User Photo" v-bind="props">
            </template>
            <v-list>
              <v-list-item @click="changeToProfile">
                <v-list-item-title>Profile</v-list-item-title>
              </v-list-item>
              <v-list-item @click="changeToRegisterProperty">
                <v-list-item-title>Register Property</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title @click="logout">Logout</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>

    </div>

    <LoginModal v-model="loginModal" @login-success="loginModal = false"></LoginModal>    

  </template>
  
  <script>
  import LoginModal from '../components/loginModal.vue';
  import { useUserStore } from "@/stores/user";

  export default {
    components: {
      LoginModal
    },
    data() {
      return {
        isLoggedIn: false, // Altere isso para refletir o status de login real
        apiRequestComplete: false,
        userPhoto: '', // Altere isso para a URL da foto do usuário real
        activeSection: 'home',
        loginModal: false
      };
    },
    created() {
      this.isLoggedIn = this.checkIfUserIsLoggedIn();
      this.setActiveSectionBasedOnRoute(this.$route);

      // Verificar a cada segundo se o JWT mudou
      this.jwtInterval = setInterval(() => {
        const isLoggedInNow = this.checkIfUserIsLoggedIn();
        if (this.isLoggedIn !== isLoggedInNow) {
          this.isLoggedIn = isLoggedInNow;
          console.log("Logged? ", this.isLoggedIn);
          if (this.isLoggedIn) {
            this.fetchLoggedUser();
          }
        }
      }, 1000);
    },
    beforeDestroy() {
        // Limpar o intervalo quando o componente é destruído
        clearInterval(this.jwtInterval);
    },
    watch: {
      $route(to) {
        this.setActiveSectionBasedOnRoute(to);
    },
        
    },
    methods: {
      
      navigate(page) {
        this.currentPage = page;
      },
      setActiveSection(section) {
        this.activeSection = section;
        console.log(this.activeSection)
      },
      openModal() {
        this.loginModal = true;
      },
      setActiveSectionBasedOnRoute(route) {
        this.activeSection = window.location.hash ? window.location.hash.substring(1) : (route.name === 'home' ? 'home' : 'overview');
      },
      checkIfUserIsLoggedIn() {
        return !!sessionStorage.getItem('jwt');
      },
      logout() {
        sessionStorage.removeItem('jwt');
        this.isLoggedIn = false;
      },
      changeToProfile() {
        this.$router.push('/profile');
      },
      changeToRegisterProperty() {
        this.$router.push('/property/register');
      },
      async fetchLoggedUser() {
        const token = sessionStorage.getItem('jwt'); // get token from session storage
        try {
          const response = await useUserStore().getLoggedUser(token);
          console.log("RESPONSE NAVBAR:",response);
          this.userPhoto= response.url_avatar;
          this.user = response;
          this.apiRequestComplete = true;
          console.log("API REQUEST COMPLETE:",this.apiRequestComplete);
          console.log("USER:",this.user);
        } catch (error) {
          console.error('Error getting logged user:', error);
          if (error.response && error.response.data.msg === 'Your token has expired. Please login again.') {
            this.logout();
          }
        }
      },
      logout() {
        sessionStorage.removeItem('jwt');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Seu CSS aqui */
   .navbar {
     position: fixed;
     top: 0;
     left: 0;
     right: 0;
     display: flex;
     justify-content: space-between;
     align-items: center;
     padding: 20px 100px;
     background-color: rgba(25, 61, 78, 1);
     color: white;
     z-index: 10;
   }
   .navbar.home-page {
      background-color: rgba(25, 61, 78, 0.8); /* 80% opacity */
    }
   .navbar a {
     font-family: 'Montserrat', sans-serif;
     font-weight: 200; /* Medium */
     font-size: 20px;
     color: #FFFEF2;
     margin-right: 55px;
     cursor:pointer;
    }
    span {
     cursor: pointer;
    }
    .login-icon{
     font-size: 35px;
     max-width: 35px;
     cursor: pointer;
    }
    .navbar a.active {
        text-decoration: underline !important;
        text-decoration-color: #A5E8E2 !important;
        text-underline-offset: 10px !important;
    }
    ::v-deep .v-list-item__content {
      cursor: pointer !important;
    }
  </style>
  
  