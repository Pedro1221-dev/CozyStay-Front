<template>
    <Sidebar />
    <div class="main">
        <h1>Properties</h1>
        <p>Total Properties: {{ PropertiesTotal }}</p>
        <div class="search-bar-admin">Found a Property</div>
        <button>Filter</button>
        <table>
            <tr>
                <th>Photo</th>
                <th>Name</th> 
                <th>Owner</th>
                <th>Reviews</th>
                <th>Rented</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
            <tr v-for="property in properties" :key="property.id">
                <td>{{ property.photo }}</td>
                <td>{{ property.name }}</td>
                <td>{{ property.owner }}</td>
                <td>{{ property.reviews }}</td>
                <td>{{ property.rented }}</td>
                <td>{{ property.status }}</td>
                <td>
                    <button>Approved</button>
                    <button>Reject</button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue';
</script>