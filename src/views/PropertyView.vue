<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { usePropertiesStore } from "@/stores/property";
import Footer from '@/components/Footer.vue';
import Navbar from '../components/Navbar.vue';

export default {
  components: {
    Footer,
    Navbar
  },
  setup() {
    // Variables
    const facilitySymbols = {
        lift: 'elevator',
        "wi-fi": 'wifi',
        parking: 'local_parking',
        tv: 'desktop_windows',
        kitchen: 'skillet',
        "laundry machine": 'local_laundry_service',
        fridge: 'kitchen',
        microwave:'microwave_gen',
        "air conditioning": "mode_fan"
        
        // adicione mais pares de chave-valor conforme necessário
    };
    const route = useRoute();
    const propertyId = ref(route.params.id);
    const property = ref(null);  // create a reactive reference

    // Methods
    const fetchProperty = async () => {
      const response = await usePropertiesStore().fetchOneProperty(propertyId.value);
      property.value = response.data;  // assuming the API response has a 'data' field
      console.log(property.value);
    };

    const logFacilitySymbol = (facilityName) => {
        console.log(facilityName);
        console.log(facilitySymbols[facilityName]);
        return facilitySymbols[facilityName];
    };

    // Lifecycle hooks
    onMounted(fetchProperty);


    return {
      propertyId,
      fetchProperty,
      property,  // return the property reference from setup
      facilitySymbols,
      logFacilitySymbol
    };
  },
  computed: {
    today() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    },
  },
  data() {
    return {
      isOpen: false,
      selectedOption: 'Sort',
      options: ['Latest', 'Oldest', 'Highest Rated', 'Lowest Rated'],
      checkInDate: '',
      checkOutDate: '',
      errorMessage: null,
      reviews: [],
      nights: 0,
      total: 0,
    };
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option;
      this.isOpen = false;
    },
    validateDates() {
      const checkIn = new Date(this.checkInDate);
      const checkOut = new Date(this.checkOutDate);

      if (checkOut <= checkIn) {
        this.errorMessage = 'Check-out date must be after the check-in date.';
      } else {
        this.errorMessage = null;
      }
      this.calculateNights(this.checkInDate, this.checkOutDate);
      this.calculateTotal(this.property.price);
    },
    formatFacilityName(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    },
    calculateWeeks(rating_date) {
        const weeks = Math.floor((new Date() - new Date(rating_date)) / (1000 * 60 * 60 * 24 * 7));
        return weeks === 1 ? weeks + ' week ago' : weeks + ' weeks ago';
    },
    calculateNights(checkInDate, checkOutDate) {
        this.nights = Math.floor((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24));
        if (isNaN(this.nights)) {
            this.nights = 0;
        }
    },
    calculateTotal(pricePerNight) {
        this.total = this.nights * pricePerNight;
    }
  },
};

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

    <div class="property-page" v-if="property"> 
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <div class="navbar">
            <Navbar />
        </div>

        <div class="overview" id="overview">
            <div class="name-location">
                <p class="local">{{ property.city }}, {{ property.country }}</p>
                <p class="name">{{property.title}}</p>
            </div>

            <div class="main-info">
                <div class="info">
                    <div class="price">
                        <p class="price-number">€ {{property.price}}</p>
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
                        <p class="rating">{{property.averageRating}}</p>

                    </div> 
                </div>
            </div>

            <div class="description">
                <p>{{property.description}}</p>
            </div>

            <div class="host-info">
                <p class="host-title">Host</p>
                <p class="host-name">{{property.host.name}}</p>
            </div>
            <p class="host-years">{{ Math.floor((new Date() - new Date(property.host.host_since)) / (1000 * 60 * 60 * 24 * 365)) }} Year Hosting</p>

            <div class="images">
                <div class="left">
                    <img :src="property.photos[0].url_photo" alt="Image1">

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
        
        <div class="accommodation" id="accommodation">
            <hr>
            <h1>Accommodation</h1>

            <div class="bedrooms">
                <div class="bedroom">
                    <div class="bedroom"> 
                        <span class="material-symbols-outlined bed-icon">bed</span>                                                        
                        <p>{{property.number_bedrooms}} Bedrooms</p>
                        <p>{{property.number_beds}} Beds</p>
                        <p>{{property.number_guests_allowed}} Guest Allowed</p>
                    </div>
                </div>
            </div>   
        </div>

        <div class="booking-form">
                <div class="form-place">
                    <div class="form-image">
                        <img src="/src/assets/img/propertie/2092a005-6ff9-4a63-a355-cac12c980dab.webp" alt="Image1">
                    </div>
                    <div class="form-city">
                            <p>{{property.title}}</p>
                            <p>{{property.city}}, {{property.country}}</p>
                            <div class="form-rating">
                                <span class="material-symbols-outlined form-star">star</span>
                                <p>{{property.averageRating}} ({{ property.rating.length }})</p>
                            </div>
                    </div>
                </div>

                <div class="form-dates">
                    <div class="check-in">
                        <p>Check-in</p>
                        <input type="date" :min="today" @change="validateDates" v-model="checkInDate">
                    </div>
                    <div class="vertical-line"></div>
                    <div class="check-out">
                        <p>Check-out</p>
                        <input type="date" :min="today" @change="validateDates" v-model="checkOutDate">                    
                    </div>                
                </div>

                <div class="form-guests">
                    <p>Guests</p>
                    <input type="number" min="1" max="10" placeholder="01">
                </div>

                <div class="form-prices">
                    <div class="price-night">
                        <p>€ {{property.price}} x {{ nights }} nights</p>
                        <p>€ {{ total }}</p>
                    </div>

                    <div class="tax">
                        <p>Tax</p>
                        <p>€ 10</p>
                    </div>
                    <hr>
                    <div class="total">
                        <p>Total</p>
                        <p>€ {{ parseFloat(total)+10 }}</p>
                    </div>
                </div>

                <div class="form-btn">
                    <button class="bookNow-btn" type="button">Book Now</button>
                </div>
        </div>

        <div class="conveniences" id="conveniences">
            <hr>
            <h1>Conveniences</h1>

            <div class="convens">
                <div class="column-1">
                    <div v-for="facility in property.facilities" :key="facility.name" class="icon-text">
                        <span class="material-symbols-outlined">{{ logFacilitySymbol(facility.name) }}</span>
                        <p>{{ formatFacilityName(facility.name) }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="reviews" id="reviews">
            <hr>
            <h1>Reviews</h1>

            <div class="sort-btn">
                <div class="dropdown">
                    <button class="dropdown" @click="isOpen = !isOpen">
                        <span class="material-symbols-outlined dropdown-icon">swap_vert</span>
                    {{ selectedOption }}
                    </button>
                    <ul v-if="isOpen">
                    <li v-for="option in options" :key="option" @click="selectOption(option)">
                        {{ option }}
                    </li>
                    </ul>
                </div>
            </div>
            
            <div class="grid-reviews">
                <div class="review-card-1" v-for="(review, index) in property.rating" :key="index">
                    <div class="top">
                        <div class="icon">
                            <!-- <span class="material-symbols-outlined review-icon">account_circle</span> --> 
                            <img :src="review.User.url_avatar" alt="" class="review-icon">             
                        </div>
                        <div class="top-right">
                            <div class="author">
                                <h3>{{ review.User.name }}</h3>
                            </div>
                            <div class="country">
                                <p style="text-transform: capitalize;">{{ review.User.nationality }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="rate">
                        <div class="stars">
                            <span class="material-symbols-outlined review-star" v-for="n in review.number_stars">star</span>
                        </div>
                        <p class="time">
                            {{ calculateWeeks(review.rating_date) }}
                        </p>
                    </div>
                    <div class="desc">
                        <p>{{ review.comment }}</p>
                    </div> 
                </div>
            </div>
        </div>

        <div class="location" id="location">
            <hr>
            <h1>Location</h1>
            <p>{{property.address}}, {{property.city}}, {{property.country}}</p>

            <iframe
            width="1200"
            height="400"
            style="border:0"
            loading="lazy"
            :src="`https://www.google.com/maps/embed/v1/place?key=AIzaSyD2zlZkwjQo-ipvO5NX4hDD75bXMX_3sK0&q=${property.address},${property.city}+${property.country}`">
            </iframe>
        </div>

        <div class="host" id="host">
            <hr>
            <h1>Host</h1>

            <div class="host-card">
                <div class="host-personal">
                    <div class="host-left">
                        <P>{{property.host.name}}</P>
                        <img :src="property.host.url_avatar" alt="">
                        <span class="material-symbols-outlined user-verified">verified_user</span>
                    </div>

                    <div class="host-stats">
                        <div>
                            <p>{{property.host.total_reviews}}</p>
                            <p>Reviews</p>  
                        </div>
                        <hr>
                        <div class="rating-reverse">
                            <div class="star">
                                <span class="material-symbols-outlined star-icon">star</span>
                                <p class="host-stats-title">{{ property.host.userRating.average_rating ? parseFloat(property.host.userRating.average_rating).toFixed(1) : '0.0' }}</p>
                            </div>
                            <p>Rating</p>
                        </div>
                        <hr>
                        <div>
                            <p>{{ Math.floor((new Date() - new Date(property.host.host_since)) / (1000 * 60 * 60 * 24 * 365)) }}</p>
                            <p>Years Hosting</p>
                        </div>
                    </div>
                </div>

                <div class="host-right">
                    <div class="host-details">
                        <p>Host Details</p>
                        <p>Response rate: 100%</p>
                        <p>Responds within an hour</p>
                        <p>Languages spoken: 
                            <span v-for="(languageObj, index) in property.host.language" :key="index" style="text-transform: capitalize;">
                                {{ languageObj.language }}{{ index < property.host.language.length - 1 ? ', ' : '' }}
                            </span>
                        </p>
                    </div>
                    <div class="profile-btn">
                        <router-link class="profile-btn" to="/profile">Visit Profile</router-link>
                    </div>
                </div>
            
            </div>
        </div>

        <div class="reservation-info" id="reservation-info">
            <hr>
            <h1>Reservation Information</h1>

            <div class="info-cards">
                <div class="info-card">
                    <h2>House Rules</h2>
                    <p>Check-in: between 14:00 and 00:00</p>
                    <p>Check-out till 12:00</p>
                    <p>Maximum of {{property.number_guests_allowed}} Guest</p>
                </div>

                <div class="info-card">
                    <h2>Property and Security</h2>
                    <p>Carbon monoxide alarm</p>
                    <p>Smoke alarm</p>
                    <p>Not suitable for babies and children up to 2 years old</p>
                </div>

                <div class="info-card">
                    <h2>Cancellation Policy</h2>
                    <p>Free cancellation up to 7 days in advance.</p>
                    <p>Please see this applicable host's full cancellation policy even if you cancel due to illness or COVID-19 related reasons.</p>
                </div>
            </div>

        </div>

        <div class="footer">
            <Footer />
        </div>
    </div>

</template>



<style scoped>

* {
    color: #193D4E;
    font-family: 'Montserrat', sans-serif;
}

hr{
    margin-right: 50%;
    margin-left: 0%;
}

h1{
    margin: 3% 0% 3% 0%;
    font-weight: bold;
}

.property-page {
    background-color: #fff;
    display: grid;
    grid-template-columns: 2fr;
    grid-template-rows: 13vh 90vh 40vh 55vh 95vh 90vh 90vh 50vh 10vh;
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
    
    .host-title {
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
    z-index: 1; 
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

/* .right div:nth-child(1) {
    border-radius: 0px 40px 0px 0px;
}

.right div:nth-child(2) {
    border-radius: 0px 0px 40px 0px;

} */

/* Accomodation */

.accommodation {
    position: relative;
    margin-left: 10%;
    margin-right: 10%;

    .bedrooms {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        gap: 10%;
        /* Não consigo alterar o tamanho dos icons das camas */
    }

    .bed-icon {
        font-size: 50px;
    }
}

/* Booking Form */

.booking-form {
    margin-right: 10%;
    position: absolute;
    right: 0;
    top: 105%;
    width: auto;
    height: auto;
    border-radius: 40px;
    padding: 30px;
    border: 1px solid #193D4E;
    float: right;
    grid-column: 2;
    min-width: 400px;
}

.form-place {
    display: flex;
    flex-direction: row;
    gap: 30px;
}

.form-image img{
    border-radius: 20px;
    width: 100px;
    height: 130px;
}

.form-city{
    display: flex;
    flex-direction: column;
    gap: 10px;    
}
.form-city p:first-child {
    font-size: 22px;
    gap: 20px;
}

.form-city p:nth-child(2) {
    font-size: 14px;
}

.form-rating{
    display: flex;
    flex-direction: row;
    gap: 5px;
    align-items: center;
    p {
        font-size: 14px;
    
    }
}

.form-star{
    font-size: 20px;
}

.form-dates {
    margin-top: 5%;
    border: 1px solid #193D4E;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;    
    align-items: center;
    height: 75px;
}

.check-in p, .check-out p {
  font-weight: bold;
  text-align: center;
}

.vertical-line {
    position: absolute;
    border-left: 1px solid #000;
    height: 10%;
}

.form-guests{
    margin-top: 5%;
    border: 1px solid #193D4E;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;    
    align-items: center;
    height: 75px;
    p {
        font-weight: bold;
        text-align: center;
    }
}

.form-btn{
    margin-bottom: 5%;
    margin-top: 7%;
    text-align: center;
}
.bookNow-btn {
    color: white;
    background-color: #193D4E;
    border-radius: 40px;
    width: 230px;
    height: 50px;
    font-size: 16px;
    font-weight: lighter;
}

.form-prices {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 5%;
    padding: 10px;
    div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        p {
            font-weight: bold;
        }
    }
    hr {
        width: 100%;
    }
    .total p:nth-child(2) {
        font-weight: bold;
        font-size: 20px;
    }

}

/* Conveniences */

.conveniences {
    margin-left: 10%;
    margin-right: 10%;

}

.convens {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 15%;
}

.column-1, 
.column-2{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 25px;
}

.icon-text{
    display: flex;
    flex-direction: row;
    gap: 20px;
}

/* Reviews */

.reviews {
    margin-left: 10%;
    margin-right: 10%;
    h1{
        margin-bottom: 0%;
    }
}

.grid-reviews{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    align-items: center;
    row-gap: 20px;
    margin-top: 2%;
}

.review-card-1 {
    background-color: #193D4E;
    border-radius: 20px;
    padding: 5%;
    width: 370px;
    p{
        color: #A5E8E2;
    }
    h3{
        color: #A5E8E2;
        font-size: 20px;
        font-weight: bold;
    }
    .material-symbols-outlined{
        color: #A5E8E2;
    }
    .country{
        font-size: 15px;
    }
    .time{
        font-size: 11px;
    }
    .desc{
        font-size: 11px;
        font-style: italic;
    }
    .rate{
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 3%;
        gap: 3%;
    }
    .top{
        display: flex;
        flex-direction: row;
        gap: 5%;
        margin-bottom: 3%;
    }
    .top-right{
        display: flex;
        flex-direction: column;
    }
    .icon{
        width: 50px; /* Adjust this value to your needs */
        height: 50px; 
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

.review-card-2 {
    background-color: #A5E8E2;
    border-radius: 20px;
    padding: 5%;
    width: 370px;
    p{
        color: #193D4E;
    }
    h3{
        color: #193D4E;
        font-size: 20px;
        font-weight: bold;
    }
    .material-symbols-outlined{
        color: #193D4E;
        .country{
        font-size: 15px;
        }
    }
    .time{
        font-size: 11px;
    }
    .desc{
        font-size: 11px;
        font-style: italic;
    }
    .rate{
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 3%;
        gap: 3%;
    }
    .top{
        display: flex;
        flex-direction: row;
        gap: 5%;
        margin-bottom: 3%;
    }
    .top-right{
        display: flex;
        flex-direction: column;
    }
    .icon{
        width: 50px; /* Adjust this value to your needs */
        height: 50px; 
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

.review-star{
    font-size: 15px;
}

.review-icon{
    width: 60px;
}

.sort-btn{
    width: 98%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}

.dropdown-icon{
    color: white;
    text-align: center;

}
.dropdown{
    color: white;
    background-color: rgba(25, 61, 78, 1);    
    border-radius: 20px;
    width: 130px;
    white-space: wrap;
    height: 50px;
    font-size: 20px;
    font-weight: lighter;
    position: relative;
    display: inline-block;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    box-shadow: none;
} 

.dropdown ul {
  position: absolute;
  top: 3.5ch;
  right: 0;
  background-color: rgba(25, 61, 78, 1);  
  min-width: 160px;
  padding: 12px 16px;
  z-index: 1;
  border-radius: 20px;
  width: 220px;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  box-shadow: none;
}

.dropdown ul li {
  cursor: pointer;
  color: white;
  text-align: center;
  margin-left: 15%;
}

/* Location */

.location{
    margin-left: 10%;
    margin-right: 10%;
    hr{
        width: 98%;
    }
    img{
        margin-top: 2%;
        width: 98%;
        height: 60%;
    };
}

/* Host */

.host {
    margin-left: 10%;
    margin-right: 10%;
    hr{
        width: 98%;
    }
}

.host-card{
    background-color: rgba(136, 178, 175, 0.6);    
    border-radius: 20px;
    width: 100%;
    height: 70%;
    padding: 30px 60px;
    display: flex;
    flex-direction: row;
    align-items: center
}

.host-personal {
    display: flex;
    flex-direction: row;
    justify-content:  space-evenly; 
    background-color: white;
    border-radius: 20px;
    width: 50%;
    height: 80%;
}

.host-personal div p:first-child {
    font-size: 25px;
    font-weight: 900;
    color: #20A89C;
}

.host-left{
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
}

.host-left img{
    width: 170px;
    height: 170px;
    border-radius: 50%;    
}

.user-verified{
    font-size: 30px;
    color: #20A89C;
    background-color: #A5E8E2;
    border-radius: 50px;
    width: 40px; 
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 28%;
    top: 432%;
}

.host-stats{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly; 
    margin: 40px 0;
}

.host-stats hr {
    border: none;
    height: 1px; /* You can adjust this as needed */
    background-color: #20A89C; /* Replace with the color you want */
}

.host-stats .star {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: flex-end;
    gap: 5px;
}

.star-icon{
    color: #20A89C;
}

.host-stats-title,
.host-stats div p:first-child {
    font-size: 20px;
    font-weight: 900;
    color: #20A89C;
}

.host-right{
    margin-left: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 40px;
    align-items: center
}

.host-details{
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 10px;
    margin-left: 10%;
}

.host-details p:first-child {
    font-size: 20px;
    font-weight: 900;
    color: #193D4E;
}

.profile-btn{
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: #193D4E;
    border-radius: 40px;
    width: 250px;
    height: 50px;
    font-size: 18px;
    font-weight: lighter;
}

/* Reservation Info */

.reservation-info {
    margin-left: 10%;
    margin-right: 10%;

    hr{
        width: 98%;
    }
}

.info-cards {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between; 
    gap: 100px;
    
    h2{
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
    }
}

.info-card {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 5px;
}

</style>
