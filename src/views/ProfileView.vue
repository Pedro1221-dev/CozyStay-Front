<script setup>
import Navbar from '@/components/Navbar.vue';
</script>

<script>
/* import BadgesComponent from './BadgesComponent.vue';
import BookingsComponent from './BookingsComponent.vue';
import FavoritesComponent from './FavoritesComponent.vue';
import HistoryComponent from './HistoryComponent.vue';
import PropertiesComponent from './PropertiesComponent.vue';

export default {
    components: {
        BookingsComponent,
        HistoryComponent,
        PropertiesComponent,
        BadgesComponent,
        FavoritesComponent,
    },
    data() {
        return {
            currentComponent: 'BookingsComponent',
        };
    },
    methods: {
        showComponent(componentName) {
            this.currentComponent = componentName;
        },
    },
}; */
</script>

<template>
    <div class="profile">
        <div class="navbar">
            <Navbar />
        </div>

        <div class="main">
            <div class="banner">
                <img src="/src/assets/img/banner.png" alt="">
            </div>
            <div class="profile-pic">
                <img src="/src/assets/img/propertie/image.png" alt="">
            </div>
            <div class="profile-owner">
                <p class="profile-name">John Doe</p>
                <p>Guest</p>
                <div class="profile-history">
                    <p>33 Reviews</p>
                    <p>10 Years</p>
                </div>
            </div>

            <div>
                <button class="edit-btn" type="button">Edit Profile</button>
            </div>

            <div class="profile-stats">

                <div class="total-reviews">
                    <div class="reviews-icon">
                        <span class="material-symbols-outlined icon">reviews</span>
                    </div>
                    <div class="reviews-info">
                        <p>Total Reviews</p>
                        <p>42</p>
                    </div>

                </div>

                <div class="average-rating">
                    <div class="rating-icon">
                        <span class="material-symbols-outlined icon">bar_chart</span>
                    </div>
                    <div class="rating-info">
                        <p>Average Rating</p>
                        <p>42</p>
                    </div>
                </div>

                <div class="rented-propreties">
                    <div class="rented-icon">
                        <span class="material-symbols-outlined icon">other_houses</span>
                    </div>
                    <div class="rented-info">
                        <p>Rented Propreties</p>
                        <p>42</p>
                    </div>
                </div>

                <div class="registered-propreties">
                    <div class="registered-icon">
                        <span class="material-symbols-outlined icon">bedroom_parent</span>
                    </div>
                    <div class="registered-info">
                        <p>Registered Propreties</p>
                        <p>42</p>
                    </div>
                </div>

            </div>

            <div class="profile-navbar">
                <a @click="showComponent('BookingsComponent')" class="current-page">Bookings</a>
                <a @click="showComponent('HistoryComponent')">History</a>
                <a @click="showComponent('PropertiesComponent')">Properties</a>
                <a @click="showComponent('BadgesComponent')">Badges</a>
                <a @click="showComponent('FavoritesComponent')">Favorites</a>
            </div>
            <hr>
            <div class="profile-content">
                <component :is="currentComponent" />
            </div>


        </div>

<!--         <div class="footer">   
        </div> -->
    </div>
    
</template>

<style scoped>
.profile{
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 13vh 120vh 10vh;
}

.main{
    color: black;
}

.banner img{
    width: 100%;
    height: 180px;
}

.profile-pic img{
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 10%;
    height: 20%;
    left: 45%;
    top: 28%;
/*     border: 1px solid #A5E8E2;
    border-radius: 50%;  */
}

.edit-btn {
    position: relative;
    color: white;
    background-color: #193D4E;
    border-radius: 10px;
    width: 150px;
    height: 40px;
    font-size: 16px;
    font-weight: lighter;
    float: right;
    margin-right: 10%;
    margin-top: -80px;
    outline: 0;
}

.profile-owner{
    position: relative;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    top: 75px;
}

.profile-name{
    font-size: 20px;
}

.profile-owner p:nth-child(2){
    font-size: 18px;
    font-weight: lighter;
}

.profile-history{
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
    gap: 40px;
    margin-top: 10px; 
    p{
        font-size: 16px;
        font-weight: lighter;
    }
}

/* Profile Stats */


.profile-stats {
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 8%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    align-content: center;   
}

.reviews-info p:nth-child(2),
.rating-info p:nth-child(2),
.rented-info p:nth-child(2),
.registered-info p:nth-child(2){
    font-size: 20px;
    font-weight: bold;
}

.reviews-icon,
.rating-icon,
.rented-icon,
.registered-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #193D4E;
    border-radius: 50%;
    width: 50px;
    height: 50px;
}


.icon {
    font-size: 30px;
    font-weight: 400 ;
    color: #FFF;
    background-color: #193D4E;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center; 
    align-items: center; 
}

.total-reviews,
.average-rating,
.rented-propreties,
.registered-propreties{
    display: flex;
    flex-direction: row;
    background-color: #A5E8E2;
    width: 270px;
    padding: 10px;
    border-radius: 7px;
    gap: 40px;
}

.reviews-info,
.rating-info,
.rented-info,
.registered-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
}

/* Profile Menu */

.profile-navbar{
    display: flex;
    flex-direction: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    margin-top: 5%;
    margin-left: 15%;
    margin-right: 10%;
    gap: 20px;
}

.navbar-content{
    margin-left: 10%;
    margin-right: 10%;
}

.current-page{
    text-decoration: 2px solid underline;
    text-decoration-color: #193D4E;
    text-underline-offset: 8px;
}

hr{
    margin-left: 10%;
    margin-right: 10%;
}

/* Footer */

.footer {
    background: linear-gradient(180deg, #193D4E 0%, rgba(16, 5, 5, 0.80) 100%);
}
</style>