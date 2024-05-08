<template>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@400" rel="stylesheet" />
    <div class="navbar">
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
        <img :src="userPhoto" alt="User Photo" @click="openDropdown">
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isLoggedIn: false, // Altere isso para refletir o status de login real
        userPhoto: '', // Altere isso para a URL da foto do usuário real
        activeSection: 'home',
      };
    },
    created() {
        this.setActiveSectionBasedOnRoute(this.$route);
    },
    watch: {
        $route(to, from) {
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
        // Abra a modal aqui
        alert(this.$route.name);
      },
      openDropdown() {
        // Abra o menu dropdown aqui
      },
      setActiveSectionBasedOnRoute(route) {
        // Quando a rota muda, defina a seção ativa para a seção na URL, se houver uma, ou para a primeira seção da nova rota
        this.activeSection = window.location.hash ? window.location.hash.substring(1) : (route.name === 'home' ? 'home' : 'overview');
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
     background-color: rgba(25, 61, 78, 1); /* 80% opacity */
     color: white;
     z-index: 10;
   }
   .navbar a {
     font-family: 'Montserrat', sans-serif;
     font-weight: 500; /* Medium */
     font-size: 20px;
     color: #FFFEF2;
     margin-right: 55px;
    }
    span {
     cursor: pointer;
    }
    .login-icon{
     font-size: 35px;
    }
    .navbar a.active {
        text-decoration: underline !important;
        text-decoration-color: #A5E8E2 !important;
        text-underline-offset: 5px;

    }
  </style>
  
  