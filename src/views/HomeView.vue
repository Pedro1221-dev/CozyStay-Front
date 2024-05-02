<script setup>
import Footer from '../components/Footer.vue';
import Navbar from '../components/Navbar.vue';
</script>

<template>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap" rel="stylesheet">
    <Navbar/>
        <div class="main-content">
            <img src="/src/assets/img/wallpaper/landingPageWallpaper.webp" width="100%" height="750px">
            <div class="slogan">
                <pre>
                    Where dreams 
                    take flight,in
                    clouds of
                    delight</pre>
            </div>
        </div>
        <div class="fade-1"></div>
        <div class="top-destinations">
            <h1>Top Destinations</h1>
        </div>
    <Footer/>
</template>

<style>

    /* Main Page */

    .main-content {
        font-family: 'Montserrat', sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .slogan {
        position: absolute;
        top: 50%;
        left: 15%;
        transform: translate(-50%, -50%);
        color: #FFFEFF;
        font-size: 60px;
        font-family: 'Montserrat', sans-serif;
        font-weight: 500; /* Medium */     
        line-height: normal;   
        backdrop-filter: blur(1px);
    }

    pre{
        font-family: 'Montserrat', sans-serif;

    }

    .fade-1 {
        position: absolute;
        top: 0;
        left: 0;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%);
    }

    /* Top Destinations */

    .top-destinations {
        font-family: 'Montserrat', sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 50px;
        margin-bottom: 50px;
    }

    .top-destinations h1 {
        color: var(--Background, #FFFEF2);
        font-family: Montserrat;
        font-size: 48px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }
     
</style>
