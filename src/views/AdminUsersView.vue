<template>
    <Sidebar />
    <div class="main">
        <h1>Users</h1>
        <div class="container">
            <div class="usersCounter">
                <p><b>Total Users:</b> <span>{{ filteredItems.length }}</span></p>
            </div>
    
            <div class="container-line">
                <div class="search-bar-container">
                    <div class="search-bar-admin">
                        <span class="material-icons searchIcon">search</span>
                        <input type="text" v-model="searchInput" placeholder="Search for a User">                    
                    </div>
                </div>
            
                <div class="filterBtn" 
                    :class="{ 'expanded': expanded }" 
                    v-click-outside="closeFilter" 
                    @click.stop="toggleFilter($event)">
                    <div class="filter">
                        <span class="material-icons">tune</span>
                        <span>Filter</span>
                    </div>
                
                    <div v-if="expanded">
                        <input type="checkbox" class="checkbox" v-model="isChecked">Blocked
                    </div>
                </div>

            </div>    
        </div>
        
        <div class="table">
            <v-data-table
                v-model:items-per-page="itemsPerPage"
                :headers="headers"
                :items="filteredItems"
                :items-length="filteredItems.length"
                :loading="loading"
                item-key="name"
                :footer-props="{ 'items-per-page-options': [5, 10, 15] }"
                @update:options="loadItems"
                >
                <template v-slot:item.photo="{ item }">
                    <v-icon>mdi-account-circle</v-icon>
                </template>
                <template v-slot:item.status="{ item }">
                    <div :class="['status', item.status]">
                        <p>{{ item.status.charAt(0).toUpperCase() + item.status.slice(1) }}</p>
                    </div>
                </template>
                <template v-slot:item.actions="{ item }">
                    <div class="actions">
                        <span class="material-icons" :class="{ disable: item.status === 'blocked' }" @click="grantAdmin(item)">admin_panel_settings</span> 
                        <span class="material-icons" @click="blockUser(item)">block</span>
                        <span class="material-icons" @click="deleteUser(item)">delete</span>                    
                    </div>
                </template>
            </v-data-table>
        </div>
    </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue';

export default {
    components: {
        Sidebar,
    },
    data() {
        return {
            expanded: false,
            isChecked: false,
            itemsPerPage: 5,
            headers: [
                { title: 'Photo', align: 'center', sortable: false, key: 'photo' },
                { title: 'Name', key: 'name', align: 'center' },
                { title: 'Email', key: 'email', align: 'center' },
                { title: 'Role', key: 'role', align: 'center' },
                { title: 'Properties', key: 'properties', align: 'center' },
                { title: 'Rentals', key: 'rentals', align: 'center' },
                { title: 'Status', key: 'status', align: 'center' },
                { title: 'Actions', key: 'actions', sortable: false, align: 'center' }
            ],
            serverItems: [],
            loading: true,
            totalItems: 0,
            searchInput: '',
        };
    },
    methods: {
        loadItems(options) {
            // Here you can request new data from the server using options
        },
        toggleFilter(event) {
            if (event.target.type !== 'checkbox') {
                this.expanded = !this.expanded;
            }
        },
        closeFilter(event) {
            if (!this.$el.contains(event.target)) {
                this.expanded = false;
            }
        },
        deleteUser(item) {
            const index = this.serverItems.indexOf(item);
            if (index !== -1) {
                this.serverItems.splice(index, 1);
            }
        },
        blockUser(user) {
            user.status = 'blocked';
        },
        grantAdmin(user) {
            if (user.status !== 'blocked') {
                if (user.role === 'admin') {
                    user.role = 'user';
                } else {
                    user.role = 'admin';
                }
            }
        },
            
    /*         async deleteUser(item) {
            try {
                const response = await axios.delete(`https://your-api-url/users/${item.id}`);
                if (response.status === 200) {
                    const index = this.serverItems.indexOf(item);
                    if (index !== -1) {
                        this.serverItems.splice(index, 1);
                    }
                } else {
                    console.error('Failed to delete user:', response);
                }
            } catch (error) {
                console.error('Failed to delete user:', error);
            }
        }, */

    },
    computed: {
        filteredItems() {
            let items = this.serverItems;

            if (this.searchInput) {
                const searchLower = this.searchInput.toLowerCase();
                items = items.filter(item => 
                    item.name.toLowerCase().includes(searchLower) ||
                    item.email.toLowerCase().includes(searchLower)      
                );
            }

            if (this.isChecked) {
                items = items.filter(item => item.status === 'blocked');
            }

            return items;
        },
        usersTotal() {
            return this.serverItems.length;
        }
    },
    mounted() {
        const users = [
            { photo: '', name: 'John Doe', email: 'useremail@gmail.com', role: 'admin', properties: 15, rentals: 4, status: 'active' },
            { photo: '', name: 'Jane Doe', email: 'janeemail@gmail.com', role: 'user', properties: 10, rentals: 2, status: 'blocked' },
            { photo: '', name: 'Jim Beam', email: 'jimemail@gmail.com', role: 'admin', properties: 22, rentals: 7, status: 'active' },
            { photo: '', name: 'Jack Daniels', email: 'jackemail@gmail.com', role: 'user', properties: 8, rentals: 1, status: 'active' },
            { photo: '', name: 'Johnny Walker', email: 'johnnyemail@gmail.com', role: 'user', properties: 12, rentals: 3, status: 'blocked' },
            { photo: '', name: 'Jill Scott', email: 'jillemail@gmail.com', role: 'admin', properties: 20, rentals: 5, status: 'active' }
        ];
        this.serverItems = users;
        this.totalItems = users.length;
        this.loading = false;
    }
};
</script>



<style scoped>
    .main{
        margin-left: 20%;
    }

    .v-data-table {
        height: 540px; 
    } 

    h1 {
        color: #193D4E;
        font-size: 32px;
        font-weight: 800;
        padding: 2%;
        margin-left: 1%;
        
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
    }

    .table{
        margin: 0 60px 0 30px;
    }

    .container{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .container-line{
        display: flex;
        flex-direction: row;
        gap: 350px;
    }

    .search-bar-container{
        display: flex;
        justify-content: center;
    }

    .filterBtn{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 10px;
        color: white;
        background-color: #193D4E;
        border-radius: 10px;
        width: 120px;
        height: 40px;
        font-size: 16px;
        font-weight: 400;
        outline: 0;
        float: right;
        margin: 0 40px 10px 0;
    }

    .filter{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .filterBtn.expanded {
        display: flex;
        flex-direction: column;
        height: 80px;  
        z-index: 3; 
    }

    .checkbox{
        margin-right: 10px;
    }

    .usersCounter{
        margin: 0 45px 10px 0;
        p{
            color: #193D4E;
            font-size: 16px;
        }
        span{
            font-weight: 300;
        }
    }

    .search-bar-admin{
        background-color: rgb(165, 232, 226, 0.40 );
        width: 350px;
        height: 40px;
        border-radius: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        color: #193D4E;
        gap: 20px;
        p{
            font-weight: 200;
        }
        .searchIcon{
            margin-left: 15px;
        }
    }

    .actions{
        color: #193D4E;
        display: flex;
        gap: 5px;
        cursor: pointer;
        justify-content: space-evenly;

    }

    .disable{
        color: rgba(25, 61, 78, 0.5); 
        cursor: not-allowed;
    }

    .status{
        p{
            font-size: 14px;
        }
    }

    .active{
        align-items: center;
        display: flex;
        justify-content: center;
        width: 100px;
        height: 25px;
        border-radius: 20px;
        background-color: #D2EBD3 ;
        
    }

    .blocked{
        align-items: center;
        display: flex;
        justify-content: center;
        width: 100px;
        height: 25px;
        border-radius: 20px;
        background-color: #F5D0CD ;
    }

    ::v-deep .v-data-table-header__content span{
        font-weight: bold !important;
        color: #193D4E;
    }

    ::v-deep .v-data-table__td {
        text-align: center !important;
    }

    ::v-deep tbody tr:nth-of-type(odd) {
        background-color: rgba(165, 232, 226, 0.20) !important;    
    }

    ::v-deep .v-data-table{
        border-radius: 15px;
        background-color: rgba(165, 232, 226, 0.10) !important;
    }
</style>