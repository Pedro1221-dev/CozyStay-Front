<template>
    <Sidebar />
    <div class="main">
        <h1>Properties</h1>
        
        <div class="container">
            <div class="propertiesCounter">
                <p><b>Total Properties:</b> <span>{{ filteredItems.length }}</span></p>
            </div>
    
            <div class="container-line">
                <div class="search-bar-container">
                    <div class="search-bar-admin">
                        <span class="material-icons searchIcon">search</span>
                        <input type="text" v-model="searchInput" placeholder="Search for a property">                    
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
                        <input type="checkbox" class="checkbox" v-model="isChecked">Pending
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
                <template v-slot:item.rented="{ item }">
                    <div :class="['status', item.rented === 'Available' ? 'available' : 'booked']">
                        <p>{{ item.rented }}</p>
                    </div>
                </template>

                <template v-slot:item.actions="{ item }">
                    <div class="actions">
                        <span class="material-icons" v-if="item.status === 'pending'" @click="approveProperty(item)">check_circle</span>  
                        <span class="material-icons" v-if="item.status === 'pending'" @click="blockProperty(item)">block</span>
                        <span class="material-icons" v-if="item.status === 'approved'" @click="deleteProperty(item)">delete</span>                    

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
                { title: 'Username', key: 'username', align: 'center' },
                { title: 'Reviews', key: 'reviews', align: 'center' },
                { title: 'Rented', key: 'rented', align: 'center' },
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
            // Check if the clicked element is the checkbox
            if (event.target.type !== 'checkbox') {
                this.expanded = !this.expanded;
            }
        },
        closeFilter(event) {
            if (!this.$el.contains(event.target)) {
                this.expanded = false;
            }
        },
        deleteProperty(property) {
            const index = this.serverItems.indexOf(property);
            if (index !== -1) {
                this.serverItems.splice(index, 1);
            }
        },
        blockProperty(property) {
            const index = this.serverItems.indexOf(property);
            if (property.status === 'pending') {
                if (index !== -1) {
                    this.serverItems.splice(index, 1);
                }            
            }        
        },
        approveProperty(property) {
            if (property.status === 'pending') {
                property.status = 'approved';
            }
        }
    },
    computed: {
        filteredItems() {
            let items = this.serverItems;
            if (this.searchInput) {
                const searchLower = this.searchInput.toLowerCase();
                items = items.filter(item => 
                    item.name.toLowerCase().includes(searchLower) ||
                    item.username.toLowerCase().includes(searchLower)      
                );
            }
            if (this.isChecked) {
                items = items.filter(item => item.status === 'pending');
            }
            return items;
        },
        propertiesTotal() {
            return this.filteredItems.length;
        },
    },
    mounted() {
        const properties = [
            { photo: '', name: 'Cozy Cabin Retreat', username: 'Jane Smith', reviews: 4.5, rented: 'Booked', status: 'approved' },
            { photo: '', name: 'Seaside Paradise', username: 'Michael Johnson', reviews: 4.2, rented: 'Booked', status: 'pending' },
            { photo: '', name: 'Mountain Getaway', username: 'Emily Davis', reviews: 4.8, rented: 'Booked', status: 'approved' },
            { photo: '', name: 'Lakefront Oasis', username: 'David Wilson', reviews: 4.6, rented: 'Available', status: 'approved' },
            { photo: '', name: 'Urban Loft', username: 'Sarah Thompson', reviews: 4.3, rented: 'Available', status: 'pending' },
            { photo: '', name: 'Rustic Cottage', username: 'Daniel Anderson', reviews: 4.7, rented: 'Available', status: 'approved' },
            { photo: '', name: 'Luxury Villa', username: 'Olivia Martinez', reviews: 4.9, rented: 'Booked', status: 'approved' },
            { photo: '', name: 'Beachfront Bungalow', username: 'James Taylor', reviews: 4.4, rented: 'Available', status: 'pending' },
            { photo: '', name: 'Country Farmhouse', username: 'Sophia Hernandez', reviews: 4.6, rented: 'Booked', status: 'approved' },
        ];
        this.serverItems = properties;
        this.totalItems = properties.length;
        this.loading = false;
    }
};
</script>

<style scoped>
    .v-data-table {
        height: 540px;
    }

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
        transition: all 0.3s ease;
        /* position: absolute; */
        z-index: 2;
        overflow: auto;
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

    .propertiesCounter{
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

    .status{
        p{
            font-size: 14px;
        }
    }

    .approved,
    .available{
        align-items: center;
        display: flex;
        justify-content: center;
        width: 100px;
        height: 25px;
        border-radius: 20px;
        background-color: #D2EBD3 ;
        
    }

    .booked{
        align-items: center;
        display: flex;
        justify-content: center;
        width: 100px;
        height: 25px;
        border-radius: 20px;
        background-color: #F5D0CD ;
    }

    .pending{
        align-items: center;
        display: flex;
        justify-content: center;
        width: 100px;
        height: 25px;
        border-radius: 20px;
        background-color: #F5EB9B ;
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