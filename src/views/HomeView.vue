<script setup>
import Footer from '../components/Footer.vue';
import Navbar from '../components/Navbar.vue';
</script>

<template>
    <div class="landing-page">
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap" rel="stylesheet">
        <div class="navbar">
            <Navbar/>
        </div>
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

            <div class="top-destinations">
                <h1>Top Destinations</h1>

                <p>Lorem ipsum dolor sit amet consectetur. Sed cum urna orci ac accumsan. Et non congue morbi nisl lacus tristique faucibus odio eget. 
                    Elementum porta enim praesent ultrices aliquet. Viverra fermentum vulputate at et pellentesque suspendisse.</p>

                <div class="grid-destinations">
                    <div class="destination">
                        <img class="destination-img" src="/src/assets/img/destinations/barcelona.webp" alt="Barcelona"/>
                        <div class="location">
                            <img class="icon" src="/src/assets/img/icons/LocationPin.webp" alt="">
                            <p>Barcelona, Spain</p>
                        </div>
                    </div>
                    <div class="destination">
                        <img class="destination-img" src="/src/assets/img/destinations/iceland.webp" alt="Iceland"/>
                        <div class="location">
                            <img class="icon" src="/src/assets/img/icons/LocationPin.webp" alt="">
                            <p>Reykjavik, Iceland</p>
                        </div>
                    </div>
                    <div class="destination">
                        <img class="destination-img" src="/src/assets/img/destinations/dubai.webp" alt="Dubai"/>
                        <div class="location">
                            <img class="icon" src="/src/assets/img/icons/LocationPin.webp" alt="">
                            <p>Dubai, UAE</p>
                        </div>

                    </div>
                </div>

            </div>

            <div class="rentals">
                <h1>Rentals</h1>

                <p>Lorem ipsum dolor sit amet consectetur. Sed cum urna orci ac accumsan. Et non congue morbi nisl lacus tristique faucibus odio eget. 
                    Elementum porta enim praesent ultrices aliquet. Viverra fermentum vulputate at et pellentesque suspendisse.</p>
            </div>

            <div class="promo">
                <h2>Ready to Cozy Up?</h2>
                <p>Welcome to Cozystay, where cozy homes meet happy travelers! Got a spare room, a cozy cabin, or a chic apartment? Put it to work and let it earn for you. 
        Join our community of hosts and unlock the potential of your space</p>
                <button class="btn-promo">List Your Space Now !</button>
                <img src="../assets/img/house_1.png" alt="">
            </div>

            <div class="about-us">
                <h1>About Us</h1>
                <div>
                    <p>Bem-vindo ao CozyStay: Encontre o seu Refúgio Perfeito</p>
                    <p>Explore uma variedade de propriedades acolhedoras em destinos deslumbrantes ao redor do mundo com o CozyStay. Encontre o lugar ideal para sua próxima aventura, onde o conforto e a segurança se encontram. Reserve agora e embarque em uma jornada inesquecível.</p>
                </div>
                <div class="about-us-images">
                    <div class="left">
                        <div>
                            <img src="/src/assets/img/about-us/bailey-zindel-NRQV-hBF10M-unsplash.webp" alt="">
                        </div>
                        <div>
                            <img src="/src/assets/img/about-us/lustig-photography-1vPblXnxhds-unsplash.webp" alt="">
                        </div>
                    </div>
                    <div class="middle">
                        <div>
                            <img src="/src/assets/img/about-us/damiano-baschiera-nijeOSzlaMs-unsplash.webp" alt="">
                        </div>
                    </div>
                    <div class="right">
                        <div>
                            <img src="/src/assets/img/about-us/braden-jarvis-prSogOoFmkw-unsplash.webp" alt="">
                        </div>
                        <div>
                            <img src="/src/assets/img/about-us/janis-wolf-rUbjtcDhxBE-unsplash.webp" alt="">
                        </div>
                    </div>
                </div>
            </div>

            <div class="overview">
                <h1>Overview</h1>
                <div class="overview-content">
                    <div class="overview-properties">
                        <div class="number">140</div>
                        <div class="description">
                            <span>Registered</span>
                            <span>Properties</span>
                        </div>
                    </div>
                    <div class="overview-rentals">
                        <div class="number">1324</div>
                        <div class="description"> 
                            <span>Total</span>
                            <span>Rentals</span>
                        </div>
                    </div>
                    <div class="overview-rating">
                        <div class="number">4.7</div>
                        <div class="description"> 
                            <span>Average</span>
                            <span>Rating</span>
                        </div>
                    </div>
                    <div class="overview-users">
                        <div class="number">798</div>
                        <div class="description"> 
                            <span>Registered</span>
                            <span>Users</span>
                        </div>
                    </div>
                </div>
            
            </div>

            <div class="faqs">
                <h1>Frequently Asked Questions</h1>
                    <div class="accordion">
                        <div class="accordion-item">
                        <button id="accordion-button-1" aria-expanded="false"><span class="accordion-title">Why is the moon sometimes out during the day?</span><span class="icon" aria-hidden="true"></span></button>
                        <div class="accordion-content">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut. Ut tortor pretium viverra suspendisse potenti.</p>
                        </div>
                        </div>
                        <div class="accordion-item">
                        <button id="accordion-button-2" aria-expanded="false"><span class="accordion-title">Why is the sky blue?</span><span class="icon" aria-hidden="true"></span></button>
                        <div class="accordion-content">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut. Ut tortor pretium viverra suspendisse potenti.</p>
                        </div>
                        </div>
                        <div class="accordion-item">
                        <button id="accordion-button-3" aria-expanded="false"><span class="accordion-title">Will we ever discover aliens?</span><span class="icon" aria-hidden="true"></span></button>
                        <div class="accordion-content">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut. Ut tortor pretium viverra suspendisse potenti.</p>
                        </div>
                        </div>
                        <div class="accordion-item">
                        <button id="accordion-button-4" aria-expanded="false"><span class="accordion-title">How much does the Earth weigh?</span><span class="icon" aria-hidden="true"></span></button>
                        <div class="accordion-content">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut. Ut tortor pretium viverra suspendisse potenti.</p>
                        </div>
                        </div>
                        <div class="accordion-item">
                        <button id="accordion-button-5" aria-expanded="false"><span class="accordion-title">How do airplanes stay up?</span><span class="icon" aria-hidden="true"></span></button>
                        <div class="accordion-content">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut. Ut tortor pretium viverra suspendisse potenti.</p>
                        </div>
                        </div>
                    </div>
            </div>

            <div class="footer">
                <Footer/>
            </div>
        
    </div>
</template>

<script>
export default {
  mounted() {
    this.setupAccordion();
  },
  methods: {
    setupAccordion() {
      const items = document.querySelectorAll(".accordion button");

      function toggleAccordion() {
        const itemToggle = this.getAttribute('aria-expanded');

        for (let i = 0; i < items.length; i++) {
          items[i].setAttribute('aria-expanded', 'false');
        }

        if (itemToggle == 'false') {
          this.setAttribute('aria-expanded', 'true');
        }
      }

      items.forEach(item => item.addEventListener('click', toggleAccordion));
    }
  }
}
</script>

<style scoped>
    .landing-page {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 0vh 100vh 80vh 200vh 70vh 140vh 60vh 70vh 10vh;
    }

    /* Main Page */

    .main-content {
        font-family: 'Montserrat', sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .main-content img {
        background: lightgray url('/src/assets/img/wallpaper/landingPageWallpaper.webp') no-repeat center / cover;
    }
    
    .slogan {
        position: absolute;
        top: 48%;
        left: 15%;
        transform: translate(-50%, -50%);
        color: #FFFEFF;
        font-size: 60px;
        font-family: 'Montserrat', sans-serif;
        line-height: normal;   
        backdrop-filter: blur(1px);
    }

    pre {
        font-family: 'Montserrat', sans-serif;
        font-weight: 400; /* Medium */     
    }
    
    /* Top Destinations */

    .top-destinations {
        font-family: 'Montserrat', sans-serif;
        align-items: center;
        margin-top: 0px;
        justify-content: center;
        display: flex;
        flex-direction: column;
        background: linear-gradient(0deg, #FFF 0%, rgba(255, 255, 255, 0.00) 100%), linear-gradient(90deg, #0A6D5F 0%, #42927D 19.34%, #549F8B 40.75%, #68A18C 64.77%, #619A88 97.9%);
        h1 {
            color: var(--Background, #FFFFFF);
            font-family: Montserrat;
            font-size: 40px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            align-items: center;
            margin-top: 5%;
        }
        p {
            font-family: Montserrat;
            color: #FFF;
            font-size: 20px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            text-align: center;
            margin-top: 3%;
            margin-left: 20%;
            margin-right: 20%;
        }
    }

    /* Top Destinations Cards  */

    .grid-destinations {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        border-radius: 10%;
        width: 80%;
        height: 100%;
        margin-top: 50px;
        align-items: center;
        justify-items: center;
        grid-gap: 20px;
    }

    .destination {
        position: relative;
        margin: 20px;
        width: 100%;
        height: 300px;
        justify-content: flex-start;
        justify-items: center;
        align-items: center;
        display: flex; 
        flex-direction: column;
    }

    .destination-img{
        width: 100%;
        height: 90%;
        border-radius: 10%;
    } 

    .location {
        position: absolute;
        top: 3%;
        left: 3%;
        color: black;
        background: white;
        width: 70%;
        height: 18%;
        text-align: left;
        opacity: 0.8;
        border-radius: 40px;
        display: flex;
        align-items: center;
        justify-content: flex-end; 
        
        p {
            display: flex;
            align-items: flex-start;
            font-size: 18px;
            color: black;
        }
    }

    .icon {
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        margin-left: 15px;
    }

    /* Rentals */

     .rentals {
        font-family: 'Montserrat', sans-serif;
        align-items: center;
        margin-top: 0px;
        margin-bottom: 50px;
        justify-content: flex-start;
        display: flex;
        flex-direction: column;
        h1{
            color: var(--Background, #000000);
            font-family: Montserrat;
            font-size: 40px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            align-items: center;
            margin-top: 5%;
        }
        p{
            color: var(--Background, #000000);
            font-family: Montserrat;
            font-size: 20px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            align-items: center;
            margin-top: 3%;
            margin-left: 10%;
            margin-right: 10%; 
        }
    }

    /* Promotion */ 



    .promo {
        background-color: #A9E3D3;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(3, 1fr);
        grid-gap: 20px;
        justify-items: center;
        align-items: center;
        margin-bottom: 100px;
        max-height: 600px;
    }

    .promo img {
        grid-column: 2;
        grid-row: 1 / span 3;
        align-self: self-end;
        position: relative;
        top: -40px;
        right: -24px;
        width: 500px;
    }

    .promo h2,
    .promo p,
    .promo .btn-promo {
        grid-column: 1;
        margin-left: 100px;
    }

    .promo h2 {
        font-family: 'Montserrat', sans-serif;
        font-weight: 400; /* Medium */
        font-size: 45px;
        color: #193D4E;
    }

    .promo p {
        font-family: 'Montserrat', sans-serif;
        font-weight: 300; /* Regular */
        font-size: 20px;
        color: #193D4E;
    }

    .promo .btn-promo {
        background-color: #20A89C;
        color: #fff;
        font-family: 'Montserrat', sans-serif;
        font-weight: 300; /* Medium */
        font-size: 20px;
        padding: 10px 80px 10px 80px;
        border-radius: 20px;
        border: 0px;
    }


    /* About Us */

    .about-us {
        margin-bottom: 5%;
        font-family: 'Montserrat', sans-serif;
        align-items: center;
        justify-content: flex-end;
        display: flex;
        flex-direction: column;
        
        h1{
            color: var(--Background, #000000);
            font-family: Montserrat;
            font-size: 40px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            align-items: center;
            margin-bottom: 4%;
        }
        p {
            text-align: center;
            font-size: 20px;
            margin-left: 10%;
            margin-right: 10%; 
        };
    }
    .about-us p:first-of-type {
        margin-bottom: 10px; /* Adjust as needed */
    }

    .about-us-images{
        margin-top: 5%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr ;
        grid-template-rows: 1fr;
        grid-column-gap: 50px;  
        margin-left: 10%;
        margin-right: 10%;

    }

    .left img, .right img {
        width: 390px;
        height: 260px;
        border-radius: 40px;
    }

    .left div:first-child img, .right div:first-child img {
        margin-bottom: 50px; /* Adjust as needed */
    }

    .middle {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            border-radius: 40px;
            width: 400px;
            height: 550px;
        }
    }

    /* Overview */
    
    .overview {
        font-family: 'Montserrat', sans-serif;
        justify-content: flex-start;
        display: flex;
        flex-direction: column;
        background-color: #193D4E;
        h1{
            margin-top: 5%;
            text-align: center;
            color: var(--Background, #FFF);
            font-family: Montserrat;
            font-size: 40px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            align-items: center;
        }
    }
    
    .overview-content {
        margin-top: 5%;
        color: #FFF;
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        width: 60%;
        margin-left: 20%;
        margin-right: 20%;
        
    }

    .number {
        color: var(--Contraste-2, #A5E8E2);
        text-align: center;
        font-family: Montserrat;
        font-size: 60px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        margin-bottom: 10px;
    }

    .description {
        color: #FFF;
        text-align: center;
        font-family: Montserrat;
        font-size: 20px;
        font-style: normal;
        font-weight: 300;
        line-height: normal;
    }
    .description span {
        white-space: pre;
        display: block;
        margin-bottom: 5spx;
    }

    .faqs {
        font-family: 'Montserrat', sans-serif;
        align-items: center;
        justify-content: center;
        display: flex;
        flex-direction: column;
        margin-left: 10%;
        margin-right: 10%;
        h1{
            color: var(--Background, #000000);
            font-family: Montserrat;
            font-size: 40px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            margin-top: 0%;
            margin-bottom: 3%;
        }
    }



    /* FAQS */

    * {
	    box-sizing: border-box;
    }
    *::before, *::after {
        box-sizing: border-box;
    }
    body {
        margin: 0;
        padding: 0;
        font-family: Montserrat;
        background: #fff;
        color: #4d5974;
        display: flex;
        min-height: 100vh;
    } 

    /* Isto está a mexer com o footer */
/*     .container {
        margin: 0 auto;
        padding: 4rem;
        width: 48rem;
    } */

    .accordion .accordion-item {
        border-bottom: 1px solid #e5e5e5;
    }
    .accordion .accordion-item button[aria-expanded='true'] {
        border-bottom: 1px solid #03b5d2;
    }
    .accordion button {
        position: relative;
        display: block;
        text-align: left;
        width: 100%;
        padding: 1em 0;
        color: #7288a2;
        font-size: 1.15rem;
        font-weight: 400;
        border: none;
        background: none;
        outline: none;
    }
    .accordion button:hover, .accordion button:focus {
        cursor: pointer;
        color: #03b5d2;
    }
    .accordion button:hover::after, .accordion button:focus::after {
        cursor: pointer;
        color: #03b5d2;
        border: 1px solid #03b5d2;
    }
    .accordion button .accordion-title {
        padding: 1em 1.5em 1em 0;
    }
    .accordion button .icon {
        display: inline-block;
        position: absolute;
        top: 18px;
        right: 0;
        width: 22px;
        height: 22px;
        border: 1px solid;
        border-radius: 22px;
    }
    .accordion button .icon::before {
        display: block;
        position: absolute;
        content: '';
        top: 9px;
        left: 5px;
        width: 10px;
        height: 2px;
        background: currentColor;
    }
    .accordion button .icon::after {
        display: block;
        position: absolute;
        content: '';
        top: 5px;
        left: 9px;
        width: 2px;
        height: 10px;
        background: currentColor;
    }
    .accordion button[aria-expanded='true'] {
        color: #03b5d2;
    }
    .accordion button[aria-expanded='true'] .icon::after {
        width: 0;
    }
    .accordion button[aria-expanded='true'] + .accordion-content {
        opacity: 1;
        max-height: 9em;
        transition: all 200ms linear;
        will-change: opacity, max-height;
    }
    .accordion .accordion-content {
        opacity: 0;
        max-height: 0;
        overflow: hidden;
        transition: opacity 200ms linear, max-height 200ms linear;
        will-change: opacity, max-height;
    }
    .accordion .accordion-content p {
        font-size: 1rem;
        font-weight: 300;
        margin: 2em 0;
    }
</style>