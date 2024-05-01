<template>
    <Sidebar />
    <div class="main">
        <h1>Notifications</h1>
        <div class="search-bar-admin">Found a User</div>
        <button>Filter</button>
        <div class="notification">
            <div class="icon">imagem icon</div>
            <div class="content">
                <h3>Notification Title</h3>
                <p>Date</p>
                <p>Notification Content</p>
            </div>
            <div class="checkmark">icon check</div>
        </div>

    </div>
</template> 

<script setup>
import Sidebar from '../components/Sidebar.vue';
</script>