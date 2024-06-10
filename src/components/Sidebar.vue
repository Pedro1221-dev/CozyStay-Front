<template>
    <div class="sidebar"> 

        <div class="admin-user-info">
            <!-- <img src="#" alt="me">-->                    
            <i class="material-icons profile">account_circle</i>
            <p class="user-name">John Doe</p>
            <p class="user-rank">Administrator</p>
        </div>
        
        <div class="sidenav-options">
            <div class="admin-analytics">
                <i class="material-icons">bar_chart</i>
                <router-link to="/admin">Analytics</router-link>
            </div>
                            
            <div class="admin-users">
                <i class="material-icons">group</i>
                <router-link to="/admin/users">Users</router-link>
            </div>
                
            <div class="admin-properties">
                <i class="material-icons">cottage</i>
                <router-link to="/admin/properties">Properties</router-link>
            </div>
                
            <div class="admin-notifications">
                <i class="material-icons">notifications</i>
                <router-link to="/admin/notifications">Notifications</router-link> 
            </div>
                    
            <div class="admin-logout">
                <i class="material-icons">logout</i>
                <router-link to="/logout">Logout</router-link>
            </div>
        </div>
       
                
    </div>
</template>

<script>

</script>

<style scoped>
.profile{
    font-size: 100px;
}


.admin-user-info{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 20%;
    color: #193D4E;
}

.user-name{
    font-size: 32px;
    font-weight: 600;
}

.user-rank{
    font-size: 18px;
    font-weight: lighter;
}

.sidebar{
    position: fixed;
    height: 100%;
    width: 20%;
    padding: 2%;
    justify-content: space-between;
    border-right: 1px solid black;
    background-color: white;
    
}

.admin-analytics,
.admin-users,
.admin-properties,
.admin-notifications,
.admin-logout{
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 22px;
    color: #193D4E;
    margin-bottom: 15%;
    i{
        margin-right: 20px;
    }
}

.admin-logout{
    height: 250px;
}

/* .router-link-exact-active {
    font-weight: bold;
    position: absolute;
    left: 0;
    border-left: 7px solid #193D4E;
} */

.router-link-exact-active {
    font-weight: bold;
    position: relative; /* Changed from absolute to relative */
}

.router-link-exact-active::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: -70px;
    border-left: 10px solid #193D4E;
}

</style>
