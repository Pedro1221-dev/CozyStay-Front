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
                        <input type="text" v-model="searchInput" placeholder="Search a User">                    
                    </div>
                </div>
            
                <div class="filterBtn">
                    <span class="material-icons">tune</span>
                    <button>Filter</button>
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
                        <span class="material-icons">admin_panel_settings</span>  
                        <span class="material-icons">block</span>
                        <span class="material-icons">delete</span>                
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
            itemsPerPage: 5,
            headers: [
                { title: 'Photo', align: 'center', sortable: false, key: 'photo' },
                { title: 'Name', key: 'name', align: 'start' },
                { title: 'Email', key: 'email', align: 'start' },
                { title: 'Properties', key: 'properties', align: 'start' },
                { title: 'Rentals', key: 'rentals', align: 'start' },
                { title: 'Status', key: 'status', align: 'center' },
                { title: 'Actions', key: 'actions', sortable: false, align: 'start' }
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
            // For now, we just leave it empty
        },
    },
    computed: {
        filteredItems() {
            if (!this.searchInput) {
                return this.serverItems;
            }
            const searchLower = this.searchInput.toLowerCase();
            return this.serverItems.filter(item => 
                item.name.toLowerCase().includes(searchLower) ||
                item.email.toLowerCase().includes(searchLower) ||
                item.status.toLowerCase().includes(searchLower)
            );
        },
        usersTotal() {
            return this.serverItems.length;
        }
    },
    mounted() {
        const users = [
            { photo: '', name: 'John Doe', email: 'useremail@gmail.com', properties: 15, rentals: 4, status: 'active' },
            { photo: '', name: 'Jane Doe', email: 'janeemail@gmail.com', properties: 10, rentals: 2, status: 'blocked' },
            { photo: '', name: 'Jim Beam', email: 'jimemail@gmail.com', properties: 22, rentals: 7, status: 'active' },
            { photo: '', name: 'Jack Daniels', email: 'jackemail@gmail.com', properties: 8, rentals: 1, status: 'active' },
            { photo: '', name: 'Johnny Walker', email: 'johnnyemail@gmail.com', properties: 12, rentals: 3, status: 'blocked' },
            { photo: '', name: 'Jill Scott', email: 'jillemail@gmail.com', properties: 20, rentals: 5, status: 'active' }
        ];
        this.serverItems = users;
        this.totalItems = users.length;
        this.loading = false;
    }
};
</script>



<style>
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

    ::v-deep .v-data-table__th{
        font-weight: bold !important;
    }
</style>