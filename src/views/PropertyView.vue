<script setup>
import Footer from '@/components/Footer.vue';
import Navbar from '../components/Navbar.vue';
</script>

<template>
<!--     <Navbar />
    <div class="navbar">
        <div class="lettering-logo">CozyStay</div>
        <p class="selected">Overview</p>
        <p>Accomodation</p>
        <p>Reviews</p>
        <p>Location</p>
        <p>Host</p>
    </div>
    <div>
        <h1>Property View</h1>
        <p>Property ID: {{ $route.params.id }}</p>
    </div> -->

    <div class="property-page"> 
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap" rel="stylesheet">
        <div class="navbar">
            <Navbar />
        </div>

        <div class="overview" id="overview">
            <div class="name-location">
                <p class="local">Birmingham, United Kingdom</p>
                <p class="name">Birmingham City Centre</p>
            </div>

            <div class="main-info">
                <div class="info">
                    <div class="price">
                        <p class="price-number">€ 122</p>
                        <p class="price-per">night</p>
                    </div>

                    <div class="rating">

                        <div class="stars">
                            <span class="material-symbols-outlined">star</span>
                            <span class="material-symbols-outlined">star</span>                            
                            <span class="material-symbols-outlined">star</span>
                            <span class="material-symbols-outlined">star</span>
                            <span class="material-symbols-outlined">star</span>
                        </div>
                        <p class="rating">4.8</p>

                    </div> 
                </div>
            </div>

            <div class="description">
                <p>Are you looking for a skyscraper view in the heart of Birmingham City Centre? 
                   This flat offers exceptional cleanliness and breathtaking views of the skyline from a high-rise perspective,
                   offering guests an immersive urban experience. 
                   The space is not only aesthetically pleasing but also highly functional, featuring a comfortable double bed 
                   and versatile sofa bed that can comfortably accommodate up to three guests.</p>
            </div>

            <div class="host-info">
                <p class="host">Host</p>
                <p class="host-name">John Doe</p>
            </div>
            <p class="host-years">2 Year Hosting</p>

            <div class="images">
                <div class="left">
                    <img src="/src/assets/img/propertie/2092a005-6ff9-4a63-a355-cac12c980dab.webp" alt="Image1">

                </div>
                <div class="middle">
                    <div>   
                        <img src="/src/assets/img/propertie/161dde4a-8e2b-4f0b-afea-47aafa31b04d.webp" alt="Image2">
                    </div>
                    <div>
                        <img src="/src/assets/img/propertie/63382d24-5712-41d4-93c1-0a4719d02ab7.webp" alt="Image3">
                    </div>
                </div>
                <div class="right">
                    <div class="top-right">
                        <img src="/src/assets/img/propertie/234d9de1-f703-4b74-a958-1a331130d624.webp" alt="Image 4">
                    </div>
                    <div class="bottom-right"> 
                        <img src="/src/assets/img/propertie/3fc1a6d4-848f-4980-ab56-7e10c4630c0e.webp" alt="Image 5">
                    </div>
                </div>
            </div>

            <div class="actions">
                <div>
                    <button class="book-btn" type="button">Book Now</button>
                </div>

                <div class="options">
                    <div class="favorite">
                        <span class="material-symbols-outlined">favorite</span>
                        <div class="favorite-text">Favorite</div>
                    </div>
                    
                    <div class="share">
                        <span class="material-symbols-outlined">ios_share</span>
                        <div class="share-text">Share</div>
                    </div>
                </div>

                </div>
            </div>
         
        
        <div class="accomodation" id="accomodation">
            <hr>
            <h1>Accomodation</h1>
        </div>

        <div class="reviews" id="reviews">
            <h1>Reviews</h1>
            <hr>
        </div>

        <div class="location" id="location">
            <h1>Location</h1>
            <hr>
        </div>

        <div class="host" id="host">
            <h1>Host</h1>
            <hr>
        </div>

        <div class="footer">
            <Footer />
        </div>
    </div>
   

</template>

<style lang="scss" scoped>

* {
    color: #193D4E;
    font-family: 'Montserrat', sans-serif;
}

hr{
    margin-right: 50%;
    margin-left: 10%;
}

.property-page {
    display: grid;
    grid-template-columns: 2fr;
    grid-template-rows: 13vh 90vh 100vh 100vh 100vh 110vh 10vh;
}

/* Overview */

.overview {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    margin-top: 5%;
    margin-left: 10%;
    margin-right: 10%;
} 

.name-location {
    display: flex;
    flex-direction: column;
}

.local {
   font-size: 24px;
   margin-bottom: -1%;
}

.name {
    font-size: 60px;
    margin-bottom: 1%;
}

.main-info {
    margin-bottom: 4%;
}

.info {
    display: flex;
    flex-direction: row;
    gap: 220px;
}

.price{
    display: flex;
    flex-direction: row;
    gap: 5px;
}

.price-number {
    font-size: 20px;
    font-weight: bold;
}

.price-per {
    font-size: 20px;
    font-weight: normal ;
}

.stars{
    display: flex;
    align-content: center;
    flex-direction: row;
    flex-wrap: wrap;   
}

.rating {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 10px;
    p {
        font-size: 19px;
    }
}

.description {
    width: 600px;
    margin-bottom: 3%;
}

.host-info {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 1%;
    
    .host {
        font-size: 20px;
        font-weight: bold;
    }
    .host-name{
        font-size: 20px;
        font-weight: normal;
    }
}
.host-years{
    font-size: 14px;
    font-weight: normal;
    margin-bottom: 3%;
}

.book-btn {
    color: white;
    background-color: #193D4E;
    border-radius: 40px;
    width: 200px;
    height: 50px;
    font-size: 20px;
    font-weight: lighter;
}

.actions {
    display: flex;
    flex-direction: row;
    gap: 12%;
}

.options {
    display: flex;
    flex-direction: row;
    gap: 40px;
    align-items: center;
    font-size: 20px;
    .favorite {
        display: flex;
        flex-direction: row;
        gap: 4%;
        align-items: center;

    }
    .share {
        display: flex;
        flex-direction: row;
        gap: 4%;
        align-items: center;

    }
}

.images {
    z-index: -1; 
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 0%;
    align-items: flex-start;
    margin-left: 45%;
    margin-top: 9%;
    /*     left: 50%;
    top: 42%; */
    .left {
        display: flex;
        flex-direction: column;   
        img{
            border-radius: 40px 0px 0px 40px;
            width: 250px;
            height: 330px;
        } 
    }
    .middle {
        display: flex;
        flex-direction: column;
        img{
            width: 125px;
            height: 160px;
            border-radius: 0px;
        }
    }
    .right {
        display: flex;
        flex-direction: column;
        img{
            width: 125px;
            height: 160px;
            border-radius:  0px;
        }
    }
    .top-right img {
        border-radius: 0px 40px 0px 0px;
    }
    .bottom-right img{
        border-radius: 0px 0px 40px 0px;
    }

}  

/* Accomodation */

h1{
    margin: 2% 0% 0% 10%;
    font-weight: bold;
}
/* Reviews */

/* Location */

/* Host */

</style>
