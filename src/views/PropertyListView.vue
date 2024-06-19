<script>
import { usePropertiesStore } from "@/stores/property";
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import CardPropriedade from '../components/CardPropriedade.vue';
import Footer from '../components/Footer.vue';
import Navbar from '../components/Navbar.vue';

export default {
    data() {
        return {
            currentPage: 1,
            totalPages: 0,
            isOpen: false,
            selectedOption: 'Sort',
            options: ['Latest', 'Oldest', 'Highest Rated', 'Lowest Rated'],
            isModalOpen: false,
            isFilterModalOpen: false,
            value: [100, 400],
            optionNumbers: ['Any', 1, 2, 3, 4, 5, '6+'],
            numberBedrooms: 'Any',
            numberBeds: 'Any',
            numberBathrooms: 'Any',
            selectedPropertyType: '',
            propertyTypes: [
                { name: 'House', icon: 'cottage' },
                { name: 'Apartment', icon: 'apartment' },
                { name: 'Guest House', icon: 'house_siding' },
                { name: 'Hotel', icon: 'villa' },
            ],
            selectedFacilities: [],
            facilities: [
                { name: 'Free Wi-Fi', icon: 'wifi' },
                { name: 'Parking', icon: 'local_parking' },
                { name: 'Swimming Pool', icon: 'pool' },
                { name: 'Fitness Center', icon: 'fitness_center' },
                { name: 'Restaurant', icon: 'restaurant' },
                { name: 'Non-smoking Rooms', icon: 'smoke_free' },
                { name: 'Airport Shuttle', icon: 'airport_shuttle' },
                { name: 'Facilities for Disabled Guests', icon: 'accessible' },
                { name: 'Family Rooms', icon: 'family_restroom' },
                { name: 'Spa and Wellness Center', icon: 'spa' },
                { name: 'Bar', icon: 'local_bar' },
                { name: '24-hour Front Desk', icon: 'hotel' }
            ],
            selectedLanguages: [],
            languages: [
                { name: 'English', icon: 'gb' },
                { name: 'French', icon: 'fr' },
                { name: 'German', icon: 'de' },
                { name: 'Portuguese', icon: 'pt' },
                { name: 'Spanish', icon: 'es' },
                { name: 'Italian', icon: 'it' },
                { name: 'Russian', icon: 'ru' },
                { name: 'Mandarin', icon: 'cn' },
            ],
            rating: 4,
            location: 200,
                
        };
    },
    components: {
        Navbar,
        Footer,
        CardPropriedade
    },
    setup() {
        let totalPages =0;
        const router = useRouter();
        const propertyStore = usePropertiesStore();

        const campo1 = ref('');
        const campo2 = ref('');
        const campo3 = ref('');
        const campo4 = ref('');

        let focusInput = (id) => {
            let inputElement = document.getElementById(id);
            if (inputElement) {
                inputElement.focus();
            }
        }

        let search = () => {
            const destination = document.getElementById('where-to').value;
            const checkIn = document.getElementById('check-in').value;
            const checkOut = document.getElementById('check-out').value;
            const guests = document.getElementById('guests').value;

            let query = {};

            if (destination) query.destination = destination;
            if (checkIn) query.checkIn = checkIn;
            if (checkOut) query.checkOut = checkOut;
            if (guests) query.guests = guests;

            router.push({
                path: '/properties',
                query
            });
            propertyStore.fetchProperties(query);
        }

        let updateMinCheckoutDate = () => {
            const checkIn = document.getElementById('check-in').value;
            const checkOutInput = document.getElementById('check-out');

            let checkInDate = new Date(checkIn);
            checkInDate.setDate(checkInDate.getDate() + 1);

            let minCheckoutDate = checkInDate.toISOString().split('T')[0];
            checkOutInput.min = minCheckoutDate;
        }

        onMounted(async () => {
            let query = router.currentRoute._rawValue.query;
            campo1.value = router.currentRoute._rawValue.query.destination || '';
            campo2.value = router.currentRoute._rawValue.query.checkIn || '';
            campo3.value = router.currentRoute._rawValue.query.checkOut || '';
            campo4.value = router.currentRoute._rawValue.query.guests || ''; 
            const response = await propertyStore.fetchProperties(query);
            
            totalPages = Math.ceil(response.pagination.total / response.pagination.limit);
            console.log("TOTAL PAGES",totalPages);
        });

        return {
            propertyStore,
            campo1,
            campo2,
            campo3,
            campo4,
            focusInput,
            search,
            updateMinCheckoutDate,
        }
    },
    computed: {
        properties() {
            return this.propertyStore.getProperties; 
        },
        pages() {
            return Array.from({ length: this.totalPages }, (_, i) => i + 1);
        },
    },
    methods: {
        closeDropdown() {
            this.isOpen = false;
        },
        selectPropertyType(name) {
            if (this.selectedPropertyType !== name) {
                this.selectedPropertyType = name;
            } else {
                this.selectedPropertyType = name;
            }
        },
        openFilterModal() {
            this.isFilterModalOpen = true;
            document.body.classList.add('no-scroll');
        },
        closeFilterModal() {
            this.isFilterModalOpen = false;
            document.body.classList.remove('no-scroll');
        },
        selectOption(option) {
            this.selectedOption = option;
            this.isOpen = false;
        },
        changePage(page) {
            this.currentPage = page;
            this.fetchData();
        },
        goToProperty(propertyId) {
            this.$router.push({ path: `/property/${propertyId}` });
        },
        async fetchData() {
            const response = await this.propertyStore.fetchProperties({ 
                ...this.$route.query, 
                page: this.currentPage 
            });
            console.log('Resposta Fetch:',response);
            if (response) {
                this.totalPages = Math.ceil(response.pagination.total / response.pagination.limit);
                // Keep the old queries and only update the page query
                this.$router.push({ 
                    path: '/properties', 
                    query: { 
                        ...this.$route.query, 
                        page: this.currentPage 
                    } 
                });
            }
        },
    },
    created() {
        this.fetchData();
    },
}
</script>

<template>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap" rel="stylesheet">
    <Navbar />
    <div class="search-bar">
        <div class="search-input" @click="focusInput('where-to')">
            <label for="where-to">Where to</label>
            <input id="where-to" type="text" placeholder="Search Destination" v-model="campo1">
        </div>
        <div class="search-input" @click="focusInput('check-in')">
            <label for="check-in">Check-in</label>
            <input id="check-in" type="date" placeholder="Arrival Date" @change="updateMinCheckoutDate" v-model="campo2">
        </div>
        <div class="search-input" @click="focusInput('check-out')">
            <label for="check-out">Check-out</label>
            <input id="check-out" type="date" placeholder="Leaving Date" v-model="campo3">
        </div>
        <div class="search-input" @click="focusInput('guests')">
            <label for="guests">With who</label>
            <input id="guests" type="number" placeholder="How many Guests" v-model="campo4" min="1">
        </div>
        <span class="material-symbols-outlined" @click="search">search</span>
    </div>
    <hr /> <!-- Linha de separação -->
    <div class="optionsLine">
        <div class="houseTypes">
            <div class="house-type">
                <span class="material-symbols-outlined">houseboat</span>
                <p>House</p>
            </div>
            <div class="house-type">
                <span class="material-symbols-outlined">apartment</span>
                <p>Apartment</p>
            </div>
            <div class="house-type">
                <span class="material-symbols-outlined">house_siding</span>
                <p>Guest House</p>
            </div>
            <div class="house-type">
                <span class="material-symbols-outlined">villa</span>
                <p>Hotel</p>
            </div>
        </div>


        <div class="overlay" v-if="isFilterModalOpen"></div>

        <div class="modal" v-if="isFilterModalOpen">
            <div class="close" @click="closeFilterModal">
                <span class="material-symbols-outlined close-icon">close</span>
            </div>
            <div class="modal-filter-info">
                <h1 class="ModalTitle">Filters</h1>
                <br><hr>
                <div class="priceRange">
                    <h2>Price Range</h2>
                    <p>Prices include fees and taxes</p>
                    <v-range-slider
                        v-model="value"
                        step="10"
                        thumb-label="always"
                        max="1000"
                    ></v-range-slider>
                </div>
                <hr>
                <div class="optionsNumber">
                    <h2>Rooms and Beds</h2>
                    <div>
                        <div class="bedrooms">
                            <br>
                            <h4>Bedrooms</h4>
                            <div class="optionNumbers">
                                <button
                                    v-for="(option, index) in optionNumbers"
                                    :key="index"
                                    class="number"
                                    :class="{ 'selected-option': numberBedrooms === option }"
                                    @click="numberBedrooms = option"
                                    >
                                    {{ option }}
                                </button>
                            </div>
                        </div>
                        <div class="beds">
                            <h4>Beds</h4>
                            <div class="optionNumbers">
                                <button
                                    v-for="(option, index) in optionNumbers"
                                    :key="index"
                                    class="number"
                                    :class="{ 'selected-option': numberBeds === option }"
                                    @click="numberBeds = option"
                                    >
                                    {{ option }}
                                </button>
                            </div>
                        </div>
                        <div class="bathrooms">
                            <h4>Bathrooms</h4>
                            <div class="optionNumbers">
                                <button
                                    v-for="(option, index) in optionNumbers"
                                    :key="index"
                                    class="number"
                                    :class="{ 'selected-option': numberBathrooms === option }"
                                    @click="numberBathrooms = option"
                                    >
                                    {{ option }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="propertyType">
                    <h2>Property Type</h2>
                    <div class="propertyTypes">
                        <div
                            v-for="(propertyType, index) in propertyTypes"
                            :key="index"
                            class="type"
                            :class="{ 'selected-option': selectedPropertyType === propertyType.name }"
                            @click="selectPropertyType(propertyType.name)"
                        >
                            <span class="material-symbols-outlined icon">{{ propertyType.icon }}</span>
                            <p>{{ propertyType.name }}</p>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="amenities">
                    <h2>Amenities</h2>
                    <p>Select your property's amenities</p>
                    <v-container class="mt-8 d-flex justify-center align-center">                        
                        <v-row justify="center" dense class="text-left mt-8">
                            <v-col
                                v-for="(facility, index) in facilities"
                                :key="index"
                                cols="6"
                                class="d-flex align-center mt-n9 ml-n9 mr-n9 privacyPolicyCheckbox"
                            >
                                <v-checkbox
                                    class="ml-1 mr-1 mb-5 facility-style"
                                    :label="facility.name"
                                >
                                    <template v-slot:prepend>
                                        <span class="material-symbols-outlined facility-icon">{{ facility.icon }}</span>
                                  </template>
                                </v-checkbox>                    
                            </v-col>
                        </v-row>
                    </v-container>
                </div>
                <hr>
                <div class="languages">
                    <h2>Host Languages</h2>
                    <v-container class="mt-8 d-flex justify-center align-center">                        
                        <v-row justify="center" dense class="text-left mt-8">
                            <v-col
                                v-for="(language, index) in languages"
                                :key="index"
                                cols="6"
                                class="d-flex align-center mt-n9 ml-n9 mr-n9 privacyPolicyCheckbox"
                            >
                                <v-checkbox
                                    class="ml-1 mr-1 mb-5 facility-style"
                                    :label="language.name"
                                >
                                    <template v-slot:prepend>
                                        <i :class="`flag-icon flag-icon-${language.icon}`"></i>
                                    </template>
                                </v-checkbox>                  
                            </v-col>
                        </v-row>
                    </v-container>
                </div>
                <hr>

                <div class="rating">
                    <h2>Average Rating</h2>
                    <v-slider
                        show-ticks="always"
                        step="1"
                        max="5"
                        tick-size="4"
                        thumb-label
                    ></v-slider>
                </div>
                <hr>

                <div class="location">
                    <h2>Location</h2>
                    <v-slider v-model="location" thumb-label step="1" max="400"></v-slider>
                </div>
               
            </div>
        </div>

        <div class="sort-btn">
            <div class="filterBtn">
                <button @click="openFilterModal" class="filterBtn">
                    <span class="material-symbols-outlined filter-icon">tune</span>
                    <span class="sort-text">Filters</span>
                </button>            
            </div>
            <div class="dropdown" v-click-outside="closeDropdown">
            <button class="dropdown" @click.stop="isOpen = !isOpen">
                <span class="material-symbols-outlined dropdown-icon">swap_vert</span>
                <span class="sort-text">{{ selectedOption }}</span>
            </button>
            <ul v-if="isOpen">
                <li v-for="option in options" :key="option" @click.stop="selectOption(option)">
                {{ option }}
                </li>
            </ul>
            </div>
        </div>

    </div>

    <div class="containt">
        <CardPropriedade
        v-for="property in properties.slice(0,12)"
        :key="property.property_id"
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRYg2rNFiJzTCRPXETBxp80WLKVMxeLZZbxMGqdKlkAg&s"
        :location="`${property.city}, ${property.country}`"
        :title="property.title"
        :rating="property.averageRating"
        :price="`€${property.price} per night`"
        :beds="property.number_beds"
        :rooms="property.number_bedrooms"
        @click="goToProperty(property.property_id)"
        />
    </div>
    <div class="promotation">
        <h2>Ready to Cozy Up?</h2>
        <p>Welcome to Cozystay, where cozy homes meet happy travelers! Got a spare room, a cozy cabin, or a chic apartment? Put it to work and let it earn for you. 
Join our community of hosts and unlock the potential of your space</p>
        <button class="btn-promotation">List Your Space Now !</button>
        <img src="../assets/img/house_1.png" alt="">
    </div>
    <div class="containt">
        <CardPropriedade
        v-for="property in properties.slice(12,24)"
        :key="property.property_id"
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRYg2rNFiJzTCRPXETBxp80WLKVMxeLZZbxMGqdKlkAg&s"
        :location="`${property.city}, ${property.country}`"
        :title="property.title"
        :rating="property.averageRating"
        :price="`€${property.price} per night`"
        :beds="property.number_beds"
        :rooms="property.number_bedrooms"
        @click="goToProperty(property.property_id)"
        />
    </div>
    <div class="pagination">
        <button @click="changePage(1)" :disabled="currentPage === 1">First</button>
        <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">&lt; Previous</button>
        <button v-for="page in pages" @click="changePage(page)" :disabled="currentPage === page">{{ page }}</button>
        <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">Next ></button>
        <button @click="changePage(totalPages)" :disabled="currentPage === totalPages">Last</button>
    </div>
    <Footer />
</template>

<style scoped>
@import '../assets/flag-icons.min.css';    
    body{
        background-color: #fff;
    }
    .containt{
        margin: 50px 100px 200px 100px;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 20px;
        justify-content: center;
    }

    .promotation {
        background-color: #A5E8E2;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(3, 1fr);
        grid-gap: 20px;
        justify-items: center;
        align-items: center;
        margin-bottom: 100px;
        max-height: 450px;
    }

    .promotation img {
        grid-column: 2;
        grid-row: 1 / span 3;
        align-self: self-end;
        position: relative;
        left: 12%;
        width: 77%;
    }

    .promotation h2,
    .promotation p,
    .promotation .btn-promotation {
        grid-column: 1;
        margin-left: 100px;
    }

    .promotation h2 {
        font-family: 'Montserrat', sans-serif;
        font-weight: 500; /* Medium */
        font-size: 55px;
        color: #193D4E;
    }

    .promotation p {
        font-family: 'Montserrat', sans-serif;
        font-weight: 400; /* Regular */
        font-size: 20px;
        color: #193D4E;
    }

    .promotation .btn-promotation {
        background-color: #20A89C;
        color: #fff;
        font-family: 'Montserrat', sans-serif;
        font-weight: 500; /* Medium */
        font-size: 30px;
        padding: 10px 120px 10px 100px;
        border-radius: 20px;
        border: 0px;
    }
    
    .optionsLine{
        display: flex;
        flex-direction: row;
    }

    .houseTypes {
        width: 80%;
        display: flex;
        justify-content: flex-start;
        margin-bottom: 20px;
        margin-top: 20px;
        margin-left: 100px;
        color: #193D4E;
        
    }

    .house-type {
        margin-right: 45px;
        display: flex;
        flex-direction: column;
        align-items: center; /* Alinha o ícone e o texto ao centro */
    }

    .house-type span.material-symbols-outlined {
        width: 35px;
        height: 35px;
        font-size:35px;
    }

    .house-type p {
        font-family: 'Montserrat', sans-serif;
        font-weight: 400;
        font-size: 15px;
    }

    .search-bar {
        display: flex;
        justify-content: space-around;
        width: 1336px;
        height: 112px;
        border: 1px solid #193D4E;
        margin: 0 auto;
        margin-top: 150px;
        margin-bottom: 20px;
        color: #193D4E;
        align-items: center;
        border-radius: 70px;
    }

    .search-input {
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-right: 1px solid #193D4E;
        padding: 0 10px;
    }

    .search-input:last-of-type {
        border-right: none;
    }

    .search-input label {
        font-family: 'Montserrat', sans-serif;
        font-weight: 500;
        font-size: 24px;
        color: #193D4E;
    }

    .search-input input {
        font-family: 'Montserrat', sans-serif;
        font-weight: 300;
        font-size: 20px;
        color: #193D4E;
        border: none;
    }

    .search-bar span {
        font-size:50px;
        cursor:pointer;
    }

    .search-input input:focus {
        outline: none;
    }

    .pagination {
        display: flex;
        justify-content: center;
        padding: 15px;
        background-color: rgba(25, 61, 78, 0.9);
        width: 50%; /* Define a largura para 845px */
        border-radius: 50px; /* Define o raio da borda para 50px */
        margin: 0 auto; /* Centraliza a barra de paginação horizontalmente */
        margin-bottom: 100px;
    }

    .pagination button {
        font-family: 'Montserrat', sans-serif;
        font-weight: 400;
        font-size: 16px;
        padding: 10px 20px;
        background-color: transparent;
        border: none;
        color: #fff;
        cursor: pointer;
    }
    .pagination span {
        font-family: 'Montserrat', sans-serif;
        font-weight: 400;
        font-size: 16px;
        padding: 10px 20px;
        color: #fff;
    }

    .pagination button:hover {
        background-color: rgba(165, 232, 226, 0.70);
        border-radius:50px
    }

    /* Filter Modal */

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        backdrop-filter: blur(5px);
        z-index: 1; 
    }

    .modal{
        z-index: 10000;
        display: flex;
        flex-direction: column;
        /* align-items: center; */
        position: absolute;
        background-color: rgba(255, 255, 255, 1);
        border-radius: 40px;
        border: 1px solid #193D4E;
        margin-left: 20%;
        margin-right: 20%;
        padding: 2%;
        width: 60%;
        height: 85%;
        top: 10%;
        overflow: auto;

    }

    .modal-filter-info{
        display: flex;
        flex-direction: column;
        /* align-items: center;
        justify-content: center; */
        h1{
            color: #193D4E;
        }
        h2{
            color: #193D4E;
            margin-top: 2%;
            margin-left: 5%;
        }
        h4{
            color: #193D4E;
            font-weight: 300;
            margin-left: 5%;
        }
        p{
            color: #193D4E;
            font-weight: 200;
            margin-left: 5%;

        }
    }

    .ModalTitle{
        color: #193D4E;
        align-items: center;
        justify-content: center;
        display: flex;
        font-size: 30px;
    }

    .priceRange{
        margin: 2% 0% 2% 0%;
    }

    ::v-deep .v-slider__container {
        width: 50%;
        color: #193D4E;
        margin: 5% 25% 0 25%;
    }

    ::v-deep .v-slider-track__fill {
        background-color: #193D4E;
    }

    ::v-deep .v-slider-track__background {
        background-color: #193D4E;
    }

    ::v-deep .v-slider-thumb {
        touch-action: none;
        color: #193D4E;
    }

    ::v-deep .v-slider-thumb__label {
        background: #193D4E;
        color: #fff;
        width: 50px;
        height: 30px;
        border-radius: 20px;
    }

    /* Buttons */



    .optionNumbers{
        margin-top: 2%;
        display: flex;
        flex-direction: row;        
        justify-content: center;        
        gap: 20px;   
    }

    .selected-option {
        background-color: #193D4E; 
        color: white !important;
        p{
            color: white !important;
        }
        .icon{
            color: inherit !important;        
        }

    }

    .number{
        width: 80px;
        height: 50px;
        border: 0.2px solid #193D4E;
        border-radius: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #193D4E;
        margin-bottom: 3%;
    }

    .propertyTypes{
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 30px;   

    }

    .type{
        width: 150px;
        height: 100px;
        border: 0.2px solid #193D4E;
        border-radius: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #193D4E;
        margin-top: 3%;
        margin-bottom: 3%;
        flex-direction: column;
        p{
            font-size: 16px;
            font-weight: 250;
        }
        h2{
            margin-bottom: 2%;
        }

    }

    .icon {
        font-size: 45px;
        color: #193D4E;
    }

    .amenities{
    }

    .facility-style {
        color: #193D4E;
        font-size: 14px;
    }

    .facility-icon {
        color: #193D4E;
        font-size: 20px !important;
    }

    .close-icon{
        position: absolute;
        right: 50px;
        top: 40px;
        cursor: pointer;
        color: #193D4E;
    }

    /* Filte Btn */

    .filterBtn{
        width: 98%;
        color: white;
        background-color: rgba(25, 61, 78, 1);    
        border-radius: 20px;
        width: 130px;
        white-space: wrap;
        height: 50px;
        font-size: 20px;
        position: relative;
        display: inline-block;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        box-shadow: none;      
    }

    .filter-icon{
        color: white;
        text-align: center;
    }

    /* Sort Btn */

    .sort-btn{
        width: auto;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-top: 20px;
        margin-right: 60px;
        gap: 20px;
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

</style>