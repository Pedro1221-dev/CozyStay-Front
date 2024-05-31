<script setup>
import Navbar from '@/components/Navbar.vue';
import { useUserStore } from "@/stores/user";
</script>

<script>
import BookingsComponent from '@/components/BookingsComponent.vue';
import HistoryComponent from '@/components/HistoryComponent.vue';
import PropertiesComponent from '@/components/PropertiesComponent.vue';
import BadgesComponent from '@/components/BadgesComponent.vue';
import FavoritesComponent from '@/components/FavoritesComponent.vue';
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
            isModalOpen: false,
            isDeleteModalOpen: false,
            selectedFile: null,
            email: '',
            password: '',
            confirmpassword: '',
            bannerImage: 'https://res.cloudinary.com/dc8ckrwlq/image/upload/v1716975931/banner/nature.webp', // Default image   
            selectedItem: 'default',
            currentComponent: 'BookingsComponent',
            rules: {
                required: value => !!value || 'Required Field.',
                email: value => {
                    const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
                    return pattern.test(value) || 'Invalid e-mail.';
                },
            },
            items: [
                { title: 'City', image: 'https://res.cloudinary.com/dc8ckrwlq/image/upload/v1716975933/banner/city.webp'},
                { title: 'Beach', image: 'https://res.cloudinary.com/dc8ckrwlq/image/upload/v1716975932/banner/beach.webp' },
                { title: 'Nature', image: 'https://res.cloudinary.com/dc8ckrwlq/image/upload/v1716975931/banner/nature.webp' },
            ],
            user:null,
            apiRequestComplete: false,
                
        };
    },
    async created() {
        await this.fetchLoggedUser();
        this.apiRequestComplete = true;
    },
    methods: {
        openModal() {
        this.isModalOpen = true;
        },
        closeModal() {
        this.isModalOpen = false;
        },
        openDeleteModal() {
            this.isDeleteModalOpen = true;
        },
        closeDeleteModal() {
            this.isDeleteModalOpen = false;
        },
        openFileInput() {
            const fileInput = this.$refs.fileInput.$el.querySelector('input');
            fileInput.click();
            fileInput.onchange = (e) => {
            this.selectedFile = URL.createObjectURL(e.target.files[0]);
            };
        },
        changeBanner() {
            const selectedItem = this.items.find(item => item.title === this.selectedItem);
            this.bannerImage = selectedItem ? selectedItem.image : null;
        }, 

        showComponent(componentName) {
            this.currentComponent = componentName;
        },
        changeBanner() {
            const selectedItem = this.items.find(item => item.title === this.selectedItem);
            this.bannerImage = selectedItem ? selectedItem.image : null;
        },
        async saveChanges() {
            const updates = new FormData();
            if (this.email) updates.append('email', this.email);
            if (this.password) updates.append('password', this.password);
            if (this.bannerImage) updates.append('url_banner', this.bannerImage);
            if (this.selectedFile) {
                updates.append('url_avatar', this.selectedFile, this.selectedFile.name);
                console.log('Selected file:', this.selectedFile);
            }
            try {
                const token = sessionStorage.getItem('jwt'); // get token from session storage
                const response = await useUserStore().updateUser(updates, token);
                console.log('User updated:', response)
                // Handle the response here, e.g. show a success message
            } catch (error) {
                // Handle the error here, e.g. show an error message
            }
            this.fetchLoggedUser();
            this.isModalOpen = false;
        },
        fileSelected(event) {
            this.selectedFile = event.target.files[0];
        },
        deleteAccount(){

        },
        async fetchLoggedUser() {
            const token = sessionStorage.getItem('jwt'); // get token from session storage
            try {
                const response = await useUserStore().getLoggedUser(token);
                this.user = response;
                this.bannerImage = this.user.url_banner;
                console.log("USER:",this.user);
            } catch (error) {
                console.error('Error getting logged user:', error);
            }
        },
    },
    watch: {
        selectedItem() {
            this.changeBanner();
        },
    },
};
</script>

<template >
    <div class="profile" v-if="apiRequestComplete">
        <div class="navbar">
            <Navbar />
        </div>

        <div class="main">
            <div class="banner">
                <img :src="user.url_banner" alt="bannerImage">
            </div>
            <div class="profile-pic">
                <img :src="user.url_avatar" alt="">
            </div>
            <div class="profile-owner">
                <p class="profile-name">{{ user.name }}</p>
                <p style="text-transform: capitalize;">{{ user.userType }}</p>
                <div class="profile-history">
                    <p>{{ user.totalPropertyReviews }} Reviews</p>
                    <p>10 Years</p>
                </div>
            </div>

            <div>
                <button class="edit-btn" type="button" @click="openModal">Edit Profile</button>
            </div>

            <div class="overlay" v-if="isModalOpen"></div>

            <div class="modal" v-if="isModalOpen">
                <div>
                    <h1>Edit Profile</h1>
                    <div class="close" @click="closeModal">
                        <span class="material-symbols-outlined close-icon">close</span>
                    </div>
                </div>

                <div class="container">
                    <div class="changers">
                        <div class="pictures">
                            <div class="photo">
                                <img :class="{ 'photo-selected': selectedFile }" :src="selectedFile" alt="Selected picture">                            
                            </div>
                            <v-file-input label="File input" ref="fileInput" @change="fileSelected" style="display: none" class="photo-input"></v-file-input>
                            <button class="change-btn" @click="openFileInput">Change Picture</button>
                        </div>
                        <div class="theme">
                            <div class="edit">
                                <span class="material-symbols-outlined editIcon hover-show">edit</span>

                                <div v-if="bannerImage">
                                    <img :src="bannerImage" class="theme-image" alt="Theme image">
                                </div>
                            </div>

                            <select v-model="selectedItem" class="change-btn">
                                <option disabled value="default" selected>Change Theme</option>
                                <option v-for="item in items" :key="item.title" :value="item.title">
                                    {{ item.title }}
                                </option>
                            </select>

                        </div>
                    </div>

                    <div class="form-inputs">
                        <v-text-field 
                            clearable
                            v-model="email" 
                            label="Email"
                            variant="underlined"
                            placeholder="example@gmail.com"
                            class="mt-1 text-h1 custom-class-text-input field-380"
                            :rules="[rules.required, rules.email]"
                            ></v-text-field>
                        <v-text-field 
                            clearable
                            v-model="password" 
                            label="Password"
                            type="password" 
                            variant="underlined"
                            class="mt-1 text-h1 custom-class-text-input field-380"
                            :rules="[rules.required, rules.password]"

                        ></v-text-field>
                        <v-text-field 
                            clearable
                            v-model="confirmpassword" 
                            label="Confirm Password"
                            type="password" 
                            variant="underlined"
                            class="mt-1 text-h1 custom-class-text-input field-380"
                            :rules="[rules.required, rules.password]"
                        ></v-text-field>
                    </div>
                </div>

                <div class="buttons">
                    <div class="save-btn">
                        <button @click="saveChanges" class="save-btn">Save</button>
                    </div>
                    <div class="delete-btn">
                        <button @click="openDeleteModal" class="delete-btn">Delete Account</button>
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
                        <button @click="DeleteAccount" class="delete-button-modal">Delete</button>
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
                        <p>{{ user.totalGuestReviews }}</p>
                    </div>
                </div>

                <div class="average-rating">
                    <div class="rating-icon">
                        <span class="material-symbols-outlined icon">bar_chart</span>
                    </div>
                    <div class="rating-info">
                        <p>Average Rating</p>
                        <p>{{ user.averagePropertyRating }}</p>
                    </div>
                </div>

                <div class="rented-propreties">
                    <div class="rented-icon">
                        <span class="material-symbols-outlined icon">other_houses</span>
                    </div>
                    <div class="rented-info">
                        <p>Rented Propreties</p>
                        <p>{{ user.totalRentedProperties }}</p>
                    </div>
                </div>

                <div class="registered-propreties">
                    <div class="registered-icon">
                        <span class="material-symbols-outlined icon">bedroom_parent</span>
                    </div>
                    <div class="registered-info">
                        <p>Registered Propreties</p>
                        <p>{{ user.totalOwnedProperties }}</p>
                    </div>
                </div>

            </div>

            <div class="profile-navbar">
                <a @click="showComponent('BookingsComponent')" :class="{ 'current-page': currentComponent === 'BookingsComponent' }">Bookings</a>
                <a @click="showComponent('HistoryComponent')" :class="{ 'current-page': currentComponent === 'HistoryComponent' }">History</a>
                <a @click="showComponent('PropertiesComponent')" :class="{ 'current-page': currentComponent === 'PropertiesComponent' }">Properties</a>
                <a @click="showComponent('BadgesComponent')" :class="{ 'current-page': currentComponent === 'BadgesComponent' }">Badges</a>
                <a @click="showComponent('FavoritesComponent')" :class="{ 'current-page': currentComponent === 'FavoritesComponent' }">Favorites</a>
            </div>
            <hr>
            <div class="profile-content">
                <component :is="currentComponent" />
            </div>
        </div>

    <!--<div class="footer">   
        <Footer />
        </div> -->
    </div>
    
</template>

<style scoped>
.profile{
    background-color: #FFF;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 10vh 100vh 10vh;
}

.main{
    color: black;
}

.banner{
    width: 100%;
    height: 180px;
}

.banner img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
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
}

/* Modal */

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(3px);
    z-index: 1; 
}

.modal{
    z-index: 10000;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 40px;
    border: 1px solid #193D4E;
    margin-left: 10%;
    margin-right: 10%;
    padding: 2%;
    width: 80%;
    height: 70%;
    top: 20%;
    h1{
        display: flex;
        flex-direction: row;
        justify-content: center;
        color: #193D4E;
        font-weight: 600;
    }
}

/* Delete Confirmation Modal */

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
    margin-left: 20%;
    margin-right: 20%;
    padding: 4%;
    width: 50%;
    height: 65%;
    top: 20%;

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

/* */

.container{
    margin-top: 5%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 140px;
    row-gap: 20px;
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
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    img{
        display: flex;
        align-items: center;
        max-width: 100px;
        max-height: 100px;
        min-height: 150px;
        max-width: 150px;
    }; 
}

.photo{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
/*  width: 60%;
    height: 0; */
    padding: 30%;
    margin: auto;
    border: 1px solid #193D4E;
    width: 150px;
    height: 150px;  
    border-radius: 50%;
    z-index: 1;
}

.photo-selected {
    width: 500%;
    border-radius: 50%;
    border: 1px solid #193D4E;
}

.theme{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.theme-image{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 150px;  
    border-radius: 0%;
    z-index: 1;
    object-fit: cover;
}



.photo-input{
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    label{
        display: block;
        text-align: center;
    }
}

.edit {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 150px;
    height: 150px;
    padding: 0;
    margin: auto;
    border: 1px solid #193D4E;
    overflow: hidden;
}

.edit .edit-image {
    width: 10px

}

.edit .hover-show {
    visibility: hidden;
}

.edit:hover .hover-show {
    visibility: visible;
}

.editIcon {    
    color: rgba(28, 27, 31, 0.6);
    font-size: 40px;
}

.change-btn{
    margin-top: 5%;
    border: 1px solid #193D4E;
    border-radius: 40px;
    background-color: #FFF;
    width: 150px;
    height: 35px;
    text-transform: none;
    text-align: center
}

/* Drop Menu */


/* Form Vuetify */
.form-inputs{
    display: flex;
    flex-direction: column;
    grid-column: 2;
}

.field-380 {
    width: 380px !important;
}

.buttons{
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    gap: 30px;
    margin-top: 7%;
}

.save-btn{
    background-color: #193D4E;
    color: #FFF;
    width: 200px;
    height: 40px;
    border-radius: 20px;
    font-weight: 500;
}   

.delete-btn{
    background-color: #F5D0CD;
    color: #193D4E;
    width: 200px;
    height: 40px;
    border-radius: 20px;
    font-weight: 500;
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
    font-weight: 400;
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
    margin-top: 6%;
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
