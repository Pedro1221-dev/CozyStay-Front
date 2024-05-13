<script setup>
import Navbar from '@/components/Navbar.vue';
</script>

<script>
export default {
  data() {
    return {
      isModalOpen: false,
      picture: 'images/test',
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    changePicture() {
      this.picture = 'images/test2';
    },
  },
};

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
                <button class="edit-btn" type="button" @click="openModal">Edit Profile</button>
            </div>
            <div class="modal" v-if="isModalOpen">
                <div>
                    <h2>Edit Profile</h2>
                    <div class="close" @click="closeModal">
                        <span class="material-symbols-outlined close-icon">close</span>
                    </div>
                </div>

                <div class="container">
                    <div class="changers">
                        <div class="pictures">
                            <img src="/src/assets/img/propertie/image.png" alt="">
                            <button class="change-btn" @click="changePicture">Change Picture</button>
                        </div>
                        <div class="color">
                            <input type="color" id="color" name="color" value="#red">
                            <button class="change-btn">Change Color</button>
                        </div>
                    </div>

                    <div class="form-inputs">
                        <input type="text" class="email" placeholder="Email">
                        <input type="password" class="password" placeholder="Password">
                        <input type="password" class="confirm-password" placeholder="Password Confirmation">
                    </div>

                    <div class="buttons">
                        <div class="save-btn">
                            <button class="save-btn">Save</button>
                        </div>
                        <div class="delete-btn">
                            <button class="delete-btn">Delete Account</button>
                        </div>
                    </div>
                </div>

                
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
    grid-template-rows: 10vh 100vh 10vh;
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
    top: 25%;
/*     border: 1px solid #A5E8E2;
    border-radius: 50%;  */
}

/* Modal */

.modal{
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    background-color: #FFF;
    border-radius: 40px;
    border: 1px solid;
    margin-left: 10%;
    margin-right: 10%;
    padding: 2%;
    width: 80%;
    height: 70%;
    top: 20%;
    h2{
        display: flex;
        flex-direction: row;
        justify-content: center;
        color: #193D4E;
        font-weight: 600;
    }
}

.container{
    margin-top: 5%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
}

.changers{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}


.close-icon{
    position: absolute;
    right: 50px;
    top: 40px;
    cursor: pointer;
    color: #193D4E;
}

.pictures{
    display: flex;
    flex-direction: column;
    justify-content: flex;
    align-items: center;
    grid-column: 1;
    img{
        width: 70%;
        height: 40%;    
    }
}

.change-btn{
    border: 1px solid #193D4E;
    border-radius: 40px;
    background-color: #FFF;
    width: 150px;
}

.form-inputs{
    display: flex;
    flex-direction: column;
    grid-column: 2;
    row-gap: 20px;
}

.form-inputs input::placeholder {
    color: #193D4E;
}

.form-inputs input {
    width: 400px;
    border-left: none;
    border-right: none;
    border-top: none;
}
.buttons{
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
}

/* */

.navbar > * {
    height: 80px;
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
    margin-top: 2%;
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