<template>
    <div class="sidebar">
        <ul>
            <li>
                <img src="#" alt="me"><!-- user Image-->
                <br>
                User Name
                <br>
                Adminstrator
            </li>
            <li>
                <router-link to="/admin">Analytics</router-link>
            </li>
            <li>
                <router-link to="/admin/users">Users</router-link>
            </li>
            <li>
                <router-link to="/admin/properties">Properties</router-link>
            </li>
            <li>
                <router-link to="/admin/notifications">Notifications</router-link>
            </li>
            <li>
                <router-link to="/logout">Logout</router-link>
            </li>
        </ul>
    </div>
</template>

<script>

</script>

<style scoped>
/* Seu CSS aqui */
</style>