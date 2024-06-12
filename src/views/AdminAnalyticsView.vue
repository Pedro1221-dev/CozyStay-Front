<template>
    <Sidebar />

    <div class="main"> 
        <h1>Analytics</h1>

        <div class="analytics-cards">
            
            <div class="usersCard">
                <p>{{ numberOfUsers }}173</p>
                <p>Users Registered</p>
                <p>Last Month : <span class="bold">+181</span><span class="bold">Up 25%</span></p>
            </div>

            <div class="registeredPropertiesCard">
                <p>{{ numberOfProperties }}45</p>
                <p>Properties Registered</p>
                <p>Last Month : <span class="bold">+181</span><span class="bold">Up 25%</span></p>
            </div>

            <div class="rentedPropertiesCard">
                <p>{{ numberOfRenteds }}125</p>
                <p>Properties Renteded</p>
                <p>Last Month : <span class="bold">+181</span><span class="bold">Up 25%</span></p>
            </div>

            <div class="propertiesByMonthCard">
                <!-- <h3>Rented Properties by Year</h3> -->
                <BarChart />
            </div>

            <div class="propertiesByCategoryCard">
                <!-- <h3>Rented Properties by Month</h3> -->
                <div class="pieChart">
                    <PieChart />
                </div>
            </div>

            <div class="propertiesByLocationCard">
                <h3>Properties by Location</h3>
                <img src="../assets/img/map.png" alt="" class="map">
            </div>
        </div>
       
    </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue';
import BarChart from '../components/BarChartComponent.vue';
import PieChart from '../components/PieChartComponent.vue';
</script>

<style scoped>
    .main{
        margin-left: 20%;
    }

    h1 {
        color: #193D4E;
        font-size: 32px;
        font-weight: 800;
        padding: 2%;
    }

    h3{
        color: #193D4E;
        font-size: 18px;
        font-weight: 800;
        margin: 10px 0 0 15px;
    }

    p{
        color: #193D4E;
        font-size: 18px;
        font-weight: 400;
        margin: 10px 0 5px 15px;
    }

    .usersCard p:first-of-type,
    .registeredPropertiesCard p:first-of-type,
    .rentedPropertiesCard p:first-of-type,
    .propertiesByMonthCard p:first-of-type,
    .propertiesByCategoryCard p:first-of-type,
    .propertiesByLocationCard p:first-of-type {
        font-size: 35px;
        font-weight: 600;
    }

    .usersCard p:nth-of-type(3),
    .registeredPropertiesCard p:nth-of-type(3),
    .rentedPropertiesCard p:nth-of-type(3) {
        font-weight: 200;
        font-size: 14px;
    }

    .bold{
        font-weight: 800;   
    }

    .bold:first-of-type {
        margin-right: 40px; 
    }

    /*  */

    .analytics-cards{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1.5fr;
        grid-template-rows: 1fr 1.7fr 1.7fr;        
        gap: 15px; 
        margin: 0% 2% 2% 2%;
        
    }

    .usersCard, .registeredPropertiesCard, .rentedPropertiesCard {
        background-color: rgba(165, 232, 226, 0.4);        
        height: 100%;
        width: 100%;
        grid-row: 1;
        border-radius: 15px;
    }

    .propertiesByMonthCard, .propertiesByCategoryCard {
        grid-column: 1 / span 3;
        background-color: rgba(165, 232, 226, 0.4);        
        height: 100%;
        max-height: 250px;
        width: 100%;
        border-radius: 15px;
    }

    .propertiesByLocationCard {
        grid-column: 4; 
        grid-row: 1 / span 3; 
        background-color: rgba(165, 232, 226, 0.4);        
        height: 100%; 
        width: 100%;
        border-radius: 15px;
    }

    /*  */

    .pieChart {
        height: 230px;
        width: 400px;
    }

    /*  */

    .map{
        height: 640px;
        width: 350px;
    }
    
</style>
