<template>
    <div class="sidebar"> 

        <div class="admin-user-info" v-if="apiRequestComplete==true">
             <img :src="user.url_avatar" alt="me" class="profile">                    
            <!-- <i class="material-icons profile">account_circle</i> -->
            <p class="user-name">{{ user.name }}</p>
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
                    
            <div class="admin-logout" @click="logout">
                <i class="material-icons">logout</i>
                <router-link to="/">Logout</router-link>
            </div>
        </div>
       
                
    </div>
</template>

<script>
  import { useUserStore } from "@/stores/user";
  export default{
    data() {
        return {
            user: null,
            userPhoto: '',
            isLoggedIn: false,
            apiRequestComplete: false,
        }
    },
    created () {
      this.isLoggedIn = this.checkIfUserIsLoggedIn();

      if (this.isLoggedIn) {
        this.fetchLoggedUser();
      }

      // Verificar a cada segundo se o JWT mudou
      this.jwtInterval = setInterval(() => {
        const isLoggedInNow = this.checkIfUserIsLoggedIn();
        if (this.isLoggedIn !== isLoggedInNow) {
          this.isLoggedIn = isLoggedInNow;
          console.log("Logged? ", this.isLoggedIn);
          if (this.isLoggedIn) {
            this.fetchLoggedUser();
          }
        }
      }, 1000);
    },
    methods: {
        checkIfUserIsLoggedIn() {
            return !!sessionStorage.getItem('jwt');
        },
        async fetchLoggedUser() {
            const token = sessionStorage.getItem('jwt'); // get token from session storage
            try {
                const response = await useUserStore().getLoggedUser(token);
                console.log("RESPONSE NAVBAR:",response);
                this.userPhoto= response.url_avatar;
                this.user = response;
                this.apiRequestComplete = true;
                console.log("API REQUEST COMPLETE:",this.apiRequestComplete);
                console.log("USER:",this.user);
            } catch (error) {
                console.error('Error getting logged user:', error);
                if (error.response && error.response.data.msg === 'Your token has expired. Please login again.') {
                    this.logout();
                }
            }
        },
        logout() {
            sessionStorage.removeItem('jwt');
            this.isLoggedIn = false;
        },
    },
  }
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
    font-size: 28px;
    font-weight: 600;
}

.user-rank{
    font-size: 16px;
    font-weight: lighter;
}

.sidebar{
    position: fixed;
    height: 100%;
    width: 20%;
    padding: 2%;
    justify-content: space-between;
    border-right: 2px solid #193D4E;
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
    font-size: 20px;
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
    left: -74px;
    border-left: 8px solid #193D4E;
}

a{
    color: #193D4E;
}

</style>
