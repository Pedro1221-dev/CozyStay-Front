<template>
    <div class="cards">
        <div class="card" v-for="booking in past_bookings" :key="booking.id" @click="goToProperty(booking.Property.property_id)">
            <div class="card-image">
                <div class="location">
                    <span class="material-symbols-outlined icon-location">location_on</span>
                    <span>{{ booking.Property.city }}, {{ booking.Property.country }}</span>
                </div>
                <div class="review" v-if="canOpenReviewForm(booking)">
                    <span class="material-symbols-outlined icon-review" @click.stop="openReviewForm">reviews</span>                
                </div>
                <img :src="booking.Property.photos[0].url_photo" alt="Property Image">
            </div>
            <div class="card-content">
                <h2>{{ booking.Property.title}}</h2>
                <p class="info">{{ booking.check_in_date }} • {{ booking.check_out_date }}</p>
            </div>
            <ReviewFormComponent 
                v-if="booking && booking.Property && booking.Property.property_id && showReviewForm" 
                :showModal="showReviewForm" 
                @update:showModal="showReviewForm = $event" 
                :idproperty="booking.Property.property_id"
                :propertyName="booking.Property.title"
                @click.stop
            />            
            <div v-if="showReviewForm" class="overlay"></div>
        </div>
    </div>
</template>
 
<script>
import ReviewFormComponent from "../components/ReviewFormComponent.vue"

export default {
    components:{
        ReviewFormComponent,
    },
    data() {
        return {
            showReviewForm: false,
        };
    },
    props: {
        past_bookings: {
            type: Array,
            required: true,
        },
    },
    methods: {
        openReviewForm() {
            this.showReviewForm = true;
        },
        goToProperty(propertyId) {
            this.$router.push({ path: `/property/${propertyId}` });
        },
        canOpenReviewForm(booking) {
            // Check if the booking's property has null values for the specified fields
            return booking.number_stars === null || booking.comment === null || booking.rating_date === null;
        },
    },
};
</script>

<style scoped>
.cards{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 2%;
    gap: 2%;
}

.card {
    position: relative;
    top: 0rem;
    left: 0rem;
    border-radius: 40px;
    background-color: rgba(255, 255, 255, 0);
    border: 1px solid rgba(0, 0, 0, 0.7);
    box-sizing: border-box;
    width: 22rem;
    height: 18rem;
    color: black;
    cursor: pointer;
}

.card-image {
    width: 100%;
    height: 70%;
    position: relative;
    border-radius: 10px; 

}

.card-image img {
    width: 100%;
    height: 100%;
    border-radius: 40px; 
}

.location, .review {
    display: flex;
    position: absolute;
    background-color: rgba(255, 254, 242, 0.8);
    font-size: 18px;
    border-radius: 100px;
    width: 40px;
    height: 40px;
    justify-content: space-around;
    align-items: center;
}

.review{
    top: 1.125rem;
    right: 0.75rem;
}

.location {
    padding: 10px;
    position: absolute;
    top: 1.125rem;
    left: 0.75rem;
    width: 12rem;
    height: 2.5rem;
    opacity: 0.8;
    border-radius: 40px; /* Adiciona cantos arredondados ao fundo da localização */
}

.icon-location{
    font-size: 30px;
    font-weight: 200;
    left: 10px;
}

.icon-review{
    color: #193D4E;
}

.favorite {
    right: 10px;
    top: 1.125rem;
}

.card-content {
    padding: 10px;
}

.title-rating {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.title-rating h2 {
    font-size: 25px;
    font-weight: 600;
}

.rating {
    font-size: 20px;
}

.price {
    font-size: 16px;
}

.info {
    font-size: 14px;
    font-weight: 200;
}
</style>