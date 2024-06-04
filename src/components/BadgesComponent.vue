<template>
    <!-- 
    <div class="badges">
        <div class="badge" v-for="(badge, index) in badges" :key="index">
            {{ badge }}
        </div>
    </div>
     -->

    <div class="badges">
        <div class="badge-card" @click="toggleModal('property')">
            <img src="https://res.cloudinary.com/dc8ckrwlq/image/upload/v1716974613/badges/booking/booking_silver_aedxru.png" alt="">
        </div>

        <div class="badge-card" @click="toggleModal('booking')">
            <img src="https://res.cloudinary.com/dc8ckrwlq/image/upload/v1716975473/badges/country/country_silver_i7ya65.png" alt="">
        </div>

        <div class="badge-card" @click="toggleModal('favorite')">
            <img src="https://res.cloudinary.com/dc8ckrwlq/image/upload/v1716974913/badges/favorite/favourite_silver_taxqsi.png" alt="">
        </div>

        <div class="badge-card" @click="toggleModal('review')">
            <img src="https://res.cloudinary.com/dc8ckrwlq/image/upload/v1716974274/badges/property/property_silver_lsvvin.png" alt="">
        </div>

        <div class="badge-card" @click="toggleModal('country')">
            <img src="https://res.cloudinary.com/dc8ckrwlq/image/upload/v1716975260/badges/review/review_silver_hhdg8v.png" alt="">
        </div>

        <div class="overlay" v-if="showModal"></div>

        <div class="badges-modal" v-if="showModal">
            <h1>Badges</h1>

            <img :src="activeImage" alt="Badge Image">

            <div v-if="activeBadge === 'property'">Property Badge </div>
            <div v-if="activeBadge === 'booking'">Booking Badge </div>
            <div v-if="activeBadge === 'favorite'">Favorite Badge </div>
            <div v-if="activeBadge === 'review'">Review Badge </div>
            <div v-if="activeBadge === 'country'">Country Badge</div>
            
            <div class="close" @click="closeModal">
                <span class="material-symbols-outlined close-icon">close</span>
            </div>
        </div>

    </div>

</template>

<script>
export default {
    data() {
        return {
            showModal: false,
            activeBadge: null, 
            badgeImages: { 
                property: 'https://res.cloudinary.com/dc8ckrwlq/image/upload/v1716974613/badges/booking/booking_silver_aedxru.png',
                booking: 'https://res.cloudinary.com/dc8ckrwlq/image/upload/v1716975473/badges/country/country_silver_i7ya65.png',
                favorite: 'https://res.cloudinary.com/dc8ckrwlq/image/upload/v1716974913/badges/favorite/favourite_silver_taxqsi.png',
                review: 'https://res.cloudinary.com/dc8ckrwlq/image/upload/v1716974274/badges/property/property_silver_lsvvin.png',
                country: 'https://res.cloudinary.com/dc8ckrwlq/image/upload/v1716975260/badges/review/review_silver_hhdg8v.png',
            },
        }
    },
    methods: {
        toggleModal(badge) {
            this.showModal = !this.showModal;
            this.activeBadge = badge; // Set the active badge when a badge-card is clicked
            this.activeImage = imageUrl;
        },
        closeModal() {
            this.showModal = false;
        },
    },
    computed: {
        activeImage() {
            return this.badgeImages[this.activeBadge];
        },
},
}
</script>

<style scoped>


    .badges {
        margin: 2% 15% 0% 15%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

    }

    .badge-card{
        img{
            width: 120px;
            /* opacity: 0.5; */
        }
    }

    .badges-modal{
        position: fixed;
        top: 60%;
        left: 50%;
        transform: translate(-50%, -50%); 
        width: 50%;
        height: 50%;
        border: 1px solid black;
        border-radius: 20px;
        background-color: white;
        align-items: center;
        display: flex;
        flex-direction: column;
        z-index: 1000; 
    }

    .close-icon{
        position: absolute;
        right: 50px;
        top: 40px;
        cursor: pointer;
        color: #193D4E;
    }

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        backdrop-filter: blur(2px);
        z-index: 1; 
    }

</style>