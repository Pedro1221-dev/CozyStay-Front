<template>
    <!-- 
    <div class="badges">
        <div class="badge" v-for="(badge, index) in badges" :key="index">
            {{ badge }}
        </div>
    </div>
    https://res.cloudinary.com/dc8ckrwlq/image/upload/v1716974274/badges/property/property_bronze_xwrwv2.png
     -->

    <div class="badges">
        <div :class="{'disable':isClassActiveProperty}" @click="toggleModal('property')">
            <img :src="property_image" alt="">
        </div>

        <div :class="{'disable':isClassActiveBooking}" @click="toggleModal('booking')">
            <img :src="booking_image" alt="">
        </div>

        <div :class="{'disable':isClassActiveFavorite}" @click="toggleModal('favorite')">
            <img :src="favorite_image" alt="">
        </div>

        <div :class="{'disable':isClassActiveReview}" @click="toggleModal('review')">
            <img :src="review_image" alt="">
        </div>

        <div :class="{'disable':isClassActiveCountry}" @click="toggleModal('country')">
            <img :src="country_image" alt="">
        </div>

        <div class="overlay" v-if="showModal"></div>

        <div class="badges-modal" v-if="showModal">

            <img :src="activeImage" alt="Badge Image">

            <div >
                <span class="badge-text">{{ this.activeBadge.title }}</span>
                <div class="badge-description">{{ this.activeBadge.description }}</div>
            </div>
            
            <v-progress-linear color="primary" :model-value="this.progressValue" :height="20" class="progress-badges"></v-progress-linear>
            <div class="progress-description">
                {{ allCompleted === true ? 'Congratulations! You completed this badge.' : this.message }}
            </div>

            <div class="close" @click="closeModal">
                <span class="material-symbols-outlined close-icon">close</span>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    props: {
            user: {
                type: Array,
                required: true,
            },
        },
    created () {
        this.checkBadgeIdAndUpdateImage();
    },
    data() {
        return {
            badges: this.user.badge,
            showModal: false,
            activeBadge: null, 
            property_image: 'https://res.cloudinary.com/dc8ckrwlq/image/upload/v1716974274/badges/property/property_bronze_xwrwv2.png',
            booking_image: 'https://res.cloudinary.com/dc8ckrwlq/image/upload/v1716974613/badges/booking/booking_bronze_uteeou.png',
            favorite_image: 'https://res.cloudinary.com/dc8ckrwlq/image/upload/v1716974913/badges/favorite/favourite_bronze_pt0l9c.png',
            review_image: 'https://res.cloudinary.com/dc8ckrwlq/image/upload/v1716975258/badges/review/review_bronze_b7vmqz.png',
            country_image: 'https://res.cloudinary.com/dc8ckrwlq/image/upload/v1716975471/badges/country/country_bronze_zfpc8k.png',
            isClassActiveProperty: true,
            isClassActiveBooking: true,
            isClassActiveFavorite: true,
            isClassActiveReview: true,
            isClassActiveCountry: true,
            progress: 0,
            progressValue: 0,
            allCompleted: false,
            message: '',
        }
    },
    methods: {
        toggleModal(badge) {
            
            if(badge == 'property' && this.isClassActiveProperty == false) {
                this.showModal = !this.showModal;
                this.badges.forEach(badge => {
                if ([1, 2, 3].includes(badge.user_badge.badge_id)) {
                    this.activeBadge = badge
                    this.activeImage = badge.url_badge
                    this.progress = this.user.totalOwnedProperties
                    this.progressValue = (this.progress / 5) * 100
                    if (this.progress > 5) {
                        this.allCompleted = true
                    }
                    this.remaining = 5 - this.progress
                    this.message = `You have registered ${this.progress} house(s) so far. ${this.remaining} more to go. Keep it up!` 
                }
                /* else{
                    this.activeBadge = {title: 'Property Debut',description:'Register 1st property'}
                    this.activeImage = 'https://res.cloudinary.com/dc8ckrwlq/image/upload/v1716974274/badges/property/property_bronze_xwrwv2.png'
                    this.progress= this.user.totalOwnedProperties
                    this.progressValue = (this.progress / 5) * 100
                    this.message = `You need to register one property to earn this badge.`
                } */
            });
            }
            if(badge == 'booking' && this.isClassActiveBooking == false){
                this.showModal = !this.showModal;
                this.badges.forEach(badge => {
                if ([4, 5, 6].includes(badge.user_badge.badge_id)) {
                    this.activeBadge = badge
                    this.activeImage = badge.url_badge
                    this.progress = this.user.totalRentedProperties
                    this.progressValue = (this.progress / 5) * 100
                    if (this.progress > 5) {
                        this.allCompleted = true
                    }
                    this.remaining = 5 - this.progress
                    this.message = `You have booked ${this.progress} house(s) so far. ${this.remaining} more to go. Keep it up!` 
                }
                /* else{
                    this.activeBadge = {title: 'First Time Booker',description:'First booking'}
                    this.activeImage = 'https://res.cloudinary.com/dc8ckrwlq/image/upload/v1716974613/badges/booking/booking_bronze_uteeou.png'
                    this.progress= this.user.totalRentedProperties
                    this.progressValue = (this.progress / 5) * 100
                    this.message = `You need to booked one property to earn this badge.`
                } */
            });
            }
            if(badge == 'favorite' && this.isClassActiveFavorite == false) {
                this.showModal = !this.showModal;
                this.badges.forEach(badge => {
                if ([7, 8, 9].includes(badge.user_badge.badge_id)) {
                    this.activeBadge = badge
                    this.activeImage = badge.url_badge
                    this.progress = this.user.totalFavoriteProperties
                    this.progressValue = (this.progress / 5) * 100
                    if (this.progress > 5) {
                        this.allCompleted = true
                    }
                    this.remaining = 5 - this.progress
                    this.message = `You have favorited ${this.progress} house(s) so far. ${this.remaining} more to go. Keep it up!` 
                }
                /* else{
                    this.activeBadge = {title: 'Favorite Finder',description:'Add 1st property to fav'}
                    this.activeImage = 'https://res.cloudinary.com/dc8ckrwlq/image/upload/v1716974913/badges/favorite/favourite_bronze_pt0l9c.png'
                    this.progress= this.user.totalFavoriteProperties
                    this.progressValue = (this.progress / 5) * 100
                    this.message = `You need to add one property to your favorited list to earn this badge.`
                } */
            });
            }
            if(badge == 'review' && this.isClassActiveReview == false) {
                this.showModal = !this.showModal;
                this.badges.forEach(badge => {
                if ([10, 11, 12].includes(badge.user_badge.badge_id)) {
                    this.activeBadge = badge
                    this.activeImage = badge.url_badge
                    this.progress = this.user.totalPropertyReviews
                    this.progressValue = (this.progress / 5) * 100
                    if (this.progress > 5) {
                        this.allCompleted = true
                    }
                    this.remaining = 5 - this.progress
                    this.message = `You have reviewed ${this.progress} house(s) so far. ${this.remaining} more to go. Keep it up!` 
                }
                /* else{
                    this.activeBadge = {title: 'Review Rookie',description:'Register 1st review'}
                    this.activeImage = 'https://res.cloudinary.com/dc8ckrwlq/image/upload/v1716975258/badges/review/review_bronze_b7vmqz.png'
                    this.progress= this.user.totalPropertyReviews
                    this.progressValue = (this.progress / 5) * 100
                    this.message = `You need to review one property to earn this badge.`
                } */
            });
            }
            if(badge == 'country' && this.isClassActiveCountry == false){
                this.showModal = !this.showModal;
                this.badges.forEach(badge => {
                if ([13, 14, 15].includes(badge.user_badge.badge_id)) {
                    this.activeBadge = badge
                    this.activeImage = badge.url_badge
                    this.progress = this.user.totalUniqueCountries
                    this.progressValue = (this.progress / 6) * 100
                    if (this.progress >6) {
                        this.allCompleted = true
                    }
                    this.remaining = 6 - this.progress
                    this.message = `You have visited ${this.progress} country(s) so far. ${this.remaining} more to go. Keep it up!` 
                }
               /*  else{
                    this.activeBadge = {title: 'Adventure Seeker',description:'Booking in 2 different countries'}
                    this.activeImage = 'https://res.cloudinary.com/dc8ckrwlq/image/upload/v1716975471/badges/country/country_bronze_zfpc8k.png'
                    this.progress= this.user.totalUniqueCountries
                    this.progressValue = (this.progress / 6) * 100
                    this.message = `You need to visited two countries to earn this badge.`
                } */
            });
            }
            
        },
        closeModal() {
            this.showModal = false;
        },
         checkBadgeIdAndUpdateImage() {
            this.badges.forEach(badge => {
                if ([1, 2, 3].includes(badge.user_badge.badge_id)) {
                    this.property_image = badge.url_badge;
                    this.isClassActiveProperty = false;
                }
                if ([4, 5, 6].includes(badge.user_badge.badge_id)) {
                    this.booking_image = badge.url_badge;
                    this.isClassActiveBooking = false;
                }
                if ([7, 8, 9].includes(badge.user_badge.badge_id)) {
                    this.favorite_image = badge.url_badge;
                    this.isClassActiveFavorite = false;
                }
                if ([10, 11, 12].includes(badge.user_badge.badge_id)) {
                    this.review_image = badge.url_badge;
                    this.isClassActiveReview = false;
                }
                if ([13, 14, 15].includes(badge.user_badge.badge_id)) {
                    this.country_image = badge.url_badge;
                    this.isClassActiveCountry = false;
                }
            });
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
        cursor: pointer;
    }

    .disable{
        filter: brightness(30%) contrast(80%);
    }

    .badge-card{
        img{
            width: 120px;
            /* opacity: 0.5; 
            filter:grayscale(1); */
            
        }
    }

    .badges-modal{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%); 
        width: 40%;
        height: 60%;
        border: 1px solid black;
        border-radius: 20px;
        background-color: white;
        align-items: center;
        display: flex;
        flex-direction: column;
        z-index: 1000; 
        padding: 3%;   
        img{
            width: 120px;
            margin-bottom: 5%;
        }    
    }

    .badge-text{
        font-size: 28px;
        font-weight: 700;
        color: #193D4E;
        display: flex;
        justify-content: center;
        margin-bottom: 5%;
    }

    .badge-description{
        font-size: 18px;
        font-weight: 300;
        color: #193D4E;
        text-align: center;
    }

    .progress-badges{
        margin-top: 7%;
        width: 50%;
        border-radius: 20px;
    }

    .progress-description{
        font: 16px;
        font-weight: 100;
        margin-top: 2%;

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

    ::v-deep #my-chart-id {
        background-color: #193D4E !important;
        height: 1px !important;
    }

</style>
