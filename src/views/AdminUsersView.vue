<template>
    <Sidebar />
    <div class="main">
        <h1>Users</h1>
        <p>Total Users: {{ usersTotal }}</p>
        <div class="search-bar-admin">Found a User</div>
        <button>Filter</button>
        <table>
            <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Properties</th>
                <th>Rentals</th>
                <th>Actions</th>
            </tr>
            <tr v-for="user in users" :key="user.id">
                <td>{{ user.photo }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.nrProperties}}</td>
                <td>{{ user.nrRentals}}</td>
                <td>{{ user.status }}</td>
                <td>
                    <button>Admin</button>
                    <button>Block</button>
                    <button>Delete</button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue';
</script>