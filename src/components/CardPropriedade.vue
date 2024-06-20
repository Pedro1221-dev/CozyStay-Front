<template>
    
    <div class="card">
        <div class="card-image">
            <div class="location">
                <span class="material-symbols-outlined icon-location">location_on</span>
                <span>{{ location }}</span>
            </div>
            <div class="favorite" @click.stop="addFavorite(id_property)">
                <i class="fas fa-heart" :class="{ 'is-favorite': isFavorite }"></i>
            </div>
            <img :src="image" alt="Property Image">
        </div>
        <div class="card-content">
            <div class="title-rating">
                <h2>{{ title }}</h2>
                <div class="rating">
                    <i class="fas fa-star"></i>
                    <span>{{ rating }}</span>
                </div>
            </div>
            <p class="price">{{ price }}</p>
            <p class="info">{{ beds }} beds • {{ rooms }} rooms</p>
        </div>
    </div>
</template>

<script> 
import { useUserStore } from "@/stores/user";
import { useToast } from "vue-toastification";

 export default { 
    setup() {
    // Get toast interface
    const toast = useToast();

    // Make it available inside methods
    return { toast }
  },
    props: ['id_property','image', 'location', 'title', 'rating', 'price', 'beds', 'rooms'],
     methods: { 
        async addFavorite(id){ 
            const response = await useUserStore().addFavorite(id); 
            console.log(response);
            if(response.success != false){ 
                this.isFavorite = true; 
                this.toast.success('Property added to favorites!'); 
            } else { 
                this.toast.error(`Property already on favorites!`); 
            }
        } 
    }, 
}
 </script>

<style scoped>
.card {
    position: relative;
    top: 0rem;
    left: 0rem;
    border-radius: 40px;
    background-color: rgba(255, 255, 255, 0);
    border: 1px solid rgba(0, 0, 0, 0.7);
    box-sizing: border-box;
    width: 20rem;
    height: 22rem;
    color: black;
    cursor: pointer;
}

.card-image {
    width: 100%;
    height: 60%;
    position: relative;
    border-radius: 10px; 

}

.card-image img {
    width: 100%;
    height: 100%;
    border-radius: 40px; 

}

.location, .favorite {
    display: flex;
    position: absolute;
    background-color: rgba(255, 254, 242, 0.8);
    padding: 10px;
    font-size: 18px;
    border-radius: 100px;
    width: 40px;
    height: 40px;
    justify-content: space-around;
    align-items: center;
}

.location {
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

.fa-heart {
        color: grey;
    }
    .fa-heart.is-favorite {
        color: red;
    }
</style>