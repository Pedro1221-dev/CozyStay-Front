<template>
    <!-- 
    <div class="badges">
        <div class="badge" v-for="(badge, index) in badges" :key="index">
            {{ badge }}
        </div>
    </div>
     -->

    <div class="badges">
        <div class="badge-card" v-for="badge in badges" :key="badge.id">
        <div class="badge-icon">
            <img :src="getUserBadgeLevel(badge.id)" :alt="badge.name">
        </div>
        <div class="badge-info">
            <h2>{{ badge.name }}</h2>
            <p>{{ badge.description }}</p>
        </div>
        </div>
    </div>

</template>

<script>
import { useUserStore } from "@/stores/user";
    export default {
        data() {
            return{
                user:null,
                apiRequestComplete:false,
            }
        },
        methods: {
            async fetchLoggedUser() {
                const token = sessionStorage.getItem('jwt'); // get token from session storage
                try {
                const response = await useUserStore().getLoggedUser(token);
                this.user = response;
                this.apiRequestComplete = true;
                console.log()
                } catch (error) {
                console.error('Error getting logged user:', error);
                if (error.response && error.response.data.msg === 'Your token has expired. Please login again.') {
                    this.logout();
                }
                }
            },
        },
        created () {
            this.fetchLoggedUser();
        },
    };
</script>

<style scoped>
    .badge-info p{
        font-size: 12px;
        font-weight: lighter;

    }
    .badge-info h2{
        font-size: 17px;
        font-weight: 500;
    }

    .badges{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin: 2% 10% 0% 10%;
    }

    .badge-card{
        display: flex;
        flex-direction: row;
        background-color: #c0c0c0;
        width: 270px;
        padding: 10px;
        border-radius: 7px;
        gap: 20px;
    }

    .badge-info {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        align-content: flex-start;
    }

    .badge-icon {
        font-size: 10px;
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

</style>