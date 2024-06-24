<template>
    <div class="cards">
        <div class="card" v-for="booking in bookings" :key="booking.booking_id" @click="goToProperty(booking.Property.property_id)">
            <div class="card-image">
                <div class="location">
                    <span class="material-symbols-outlined icon-location">location_on</span>
                    <span>{{ booking.Property.city }}, {{ booking.Property.country }}</span>
                </div>
                <div class="cancel" @click.stop="openDeleteModal(booking.booking_id)">
                    <span class="material-symbols-outlined icon-cancel">close</span>
                </div>
                <img :src="booking.Property.photos[0].url_photo" alt="Property Image">
            </div>
            <div class="card-content">
                <div class="title-rating">
                    <h2>{{ booking.Property.title}}</h2>
                </div>
                <p class="info">{{ booking.check_in_date }}  • {{ booking.check_out_date }} </p> 
                <!-- Remover datas -->
            </div>
        </div>
    </div>

    <div class="overlay-2" v-if="isDeleteModalOpen"></div>

    <div class="modal-2" v-if="isDeleteModalOpen">
        <div class="close" @click="closeDeleteModal">
            <span class="material-symbols-outlined close-icon">close</span>
        </div>
        <div class="modal-close-info">
            <span class="material-symbols-outlined cancelIcon">cancel</span>
            <h1>Are you sure?</h1>
            <h3>Do you really want to delete these records? This process cannot be undone</h3>
        </div>
        <div class="delete-modal-buttons">
            <button @click="closeDeleteModal" class="cancel-button-modal">Cancel</button>
            <button @click="cancel()" class="delete-button-modal">Delete</button>
        </div>
    </div>
    

</template>


<script>
import { useBookingStore } from "@/stores/booking";
import { useToast } from "vue-toastification";

export default {
    setup() {
    // Get toast interface
    const toast = useToast();

    // Make it available inside methods
    return { toast }
  },
    props: {
        bookings: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            booking_id: '',
            isDeleteModalOpen: false,
        }
    },
    methods: {
        async cancel() {
            const response = await useBookingStore().cancelBooking(this.booking_id);
            console.log(response);
            if (!response.success) {
                this.toast.error(response.msg);
            }
            else {
                this.toast.success('Booking canceled successfully!');
            }
            setTimeout(() => {
                window.location.reload();
            }, 3000); // 3 seconds timeout
        },
        openDeleteModal(id) {
            this.isDeleteModalOpen = true;
            this.booking_id = id;
            document.body.style.overflow = 'hidden';            
            document.body.classList.add('no-scroll');
        },
        closeDeleteModal() {
            this.isDeleteModalOpen = false;
            document.body.style.overflow = 'hidden';            
            document.body.classList.remove('no-scroll');
        },
        goToProperty(propertyId) {
            this.$router.push({ path: `/property/${propertyId}` });
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

.location, .cancel {
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

.cancel{
    background-color: #F5D0CD;
    border: 2px solid #fff;
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

.icon-cancel{
    color: rgba(173, 22, 25, 0.8);
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

.overlay-2 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(5px);
    z-index: 1; 
}

.modal-2{
    z-index: 10000;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 40px;
    border: 1px solid #193D4E;
    margin-left: 25%;
    margin-right: 20%;
    padding: 4%;
    width: 50%;
    height: 45%;
    top: 20%;
    overflow: hidden;

}

.modal-close-info{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h1{
        color: #193D4E;
        font-weight: 400;
    }
    h3{
        color: #193D4E;
        font-weight: 200;
        text-align: center;
    
    }
}

.delete-modal-buttons{
    display: flex;
    flex-direction: row;
    gap: 30px;
    margin-top: 5%
}

.cancel-button-modal{
    border-radius: 10px;
    border: 1px solid #193D4E;
    width: 150px;
    height: 40px;

}

.delete-button-modal{
    border-radius: 10px;
    border: 1 solid #193D4E;
    background-color: #AD1619;
    color: #FFF;
    width: 150px;
    height: 40px

}

.cancelIcon{
    font-size: 70px;
    color: #AD1619;
    align-items: center;
    margin-bottom: 3%
}

.close-icon{
    position: absolute;
    right: 50px;
    top: 40px;
    cursor: pointer;
    color: #193D4E;
}
</style>