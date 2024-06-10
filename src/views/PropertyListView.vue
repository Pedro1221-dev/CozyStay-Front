<script>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import CardPropriedade from '../components/CardPropriedade.vue';
import { usePropertiesStore } from "@/stores/property";

export default {
    data() {
        return {
            currentPage: 1,
            totalPages: 0,
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
            <input id="guests" type="number" placeholder="How many Guests" v-model="campo4">
        </div>
        <span class="material-symbols-outlined" @click="search">search</span>
    </div>
    <hr /> <!-- Linha de separação -->
    <div class="home-types">
        <div class="home-type">
            <span class="material-symbols-outlined">houseboat</span>
            <p>Beach House</p>
        </div>
        <div class="home-type">
            <span class="material-symbols-outlined">apartment</span>
            <p>Apartment</p>
        </div>
        <!-- Adicione mais tipos de casa aqui -->
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
    
    .home-types {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 20px;
        margin-top: 20px;
        margin-left: 100px;
        color: #193D4E;
        
    }

    .home-type {
        margin-right: 45px;
        display: flex;
        flex-direction: column;
        align-items: center; /* Alinha o ícone e o texto ao centro */
    }

    .home-type span.material-symbols-outlined {
        width: 35px;
        height: 35px;
        font-size:35px;
    }

    .home-type p {
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

</style>
