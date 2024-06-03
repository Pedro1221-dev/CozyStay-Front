<template>
    <Sidebar />

    <div class="main"> 
        <h1>Analytics</h1>
        <div class="analytics-card" style="border: 1px black solid;">
            <h3>Users Register</h3>
            <p>{{ numberOfUsers }}</p>
            <p>Last Month : <b>+181</b></p>
        </div>
        <div class="analytics-card" style="border: 1px black solid;">
            <h3>Properties Register</h3>
            <p>{{ numberOfProperties }}</p>
            <p>Last Month : <b>+108</b></p>
        </div>
        <div class="analytics-card" style="border: 1px black solid;">
            <h3>Properties Rented</h3>
            <p>{{ numberOfRenteds }}</p>
            <p>Last Month : <b>+56</b></p>
        </div>

        <div class="analytics-card-big">
            <h3>Rented Properties by Year</h3>
            <canvas id="myChart">GRAFICOS</canvas>
        </div>

        <div class="analytics-card-big">
            <h3>Rented Properties by Month</h3>
            <canvas id="myChart">GRAFICOS</canvas>
        </div>

        <div class="analytics-card-vertical">
            <h3>Properties by Location</h3>
            <canvas id="myChart">GRAFICOS</canvas>
        </div>
    </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue';
</script>
