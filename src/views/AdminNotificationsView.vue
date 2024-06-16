<template>
    <div>
        <Sidebar />
        <div class="main">
            <h1>Notifications</h1>
            
            <div class="container" ref="notificationContainer">
                <div class="notificationsCounter">
                    <p><b>Total Notifications:</b> <span>{{ filteredItems.length }}</span></p>
                </div>

                <div class="search-bar-container">
                    <div class="search-bar-admin">
                        <span class="material-icons searchIcon">search</span>
                        <input type="text" v-model="searchInput" placeholder="Search notifications..." />
                    </div>
                </div>

                <div class="notificationContainer">
                    <div v-for="(item, index) in filteredItems" :key="item.id">
                        <div class="notification">
                            <div class="notificationLeft">
                                <div class="iconBackground">
                                    <span class="material-icons icon">{{ item.icon }}</span>
                                </div>
                            </div>
                            <div class="notificationInfo">
                                <div class="notificationTitle">{{ item.title }}</div>
                                <div class="time">
                                    <div class="notificationDate">{{ item.date }}</div>
                                    <div class="notificationAge">{{ item.age }}</div>
                                </div>
                                <div class="notificationDesc">{{ item.description }}</div>
                            </div>
                            <div class="checkIconR">
                                <span class="material-icons checkIcon">bookmark_added</span>
                            </div>
                        </div>
                        <hr v-if="index < filteredItems.length - 1">
                    </div>
                </div>
            </div>
        
            <div class="filterContainer">
                <div class="filterBox">
                    <div class="filter">
                        <span class="material-icons">tune</span>
                        <span>Filter</span>
                    </div>
                    <div class="filters">
                        <div class="checkbox"><input type="checkbox"> Filter 1</div>
                        <div class="checkbox"><input type="checkbox"> Filter 2</div>
                        <div class="checkbox"><input type="checkbox"> Filter 3</div>
                    </div>
                </div>
            </div>
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
            searchInput: '',
            serverItems: [
                {
                    id: 1,
                    title: 'Notification 1',
                    date: '25/12/2000',
                    age: '12h',
                    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus magnam et itaque',
                    icon: 'cottage'
                },
                {
                    id: 2,
                    title: 'Notification 2',
                    date: '25/12/2000',
                    age: '12h',
                    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus magnam et itaque',
                    icon: 'cottage'
                },
                {
                    id: 3,
                    title: 'Notification 3',
                    date: '25/12/2000',
                    age: '12h',
                    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus magnam et itaque',
                    icon: 'cottage'
                }
            ]
        };
    },
    computed: {
        filteredItems() {
            if (!this.searchInput) {
                return this.serverItems;
            }
            const searchInputLower = this.searchInput.toLowerCase();
            return this.serverItems.filter(item =>
                item.title.toLowerCase().includes(searchInputLower) ||
                item.description.toLowerCase().includes(searchInputLower)
            );
        }
    }
};
</script>


<style scoped>
.main {
    margin-left: 20%;
    position: relative;
}

.container {
    display: flex;
    flex-direction: column;
}

.notificationContainer {
    flex: 1;
    margin: 1% 3%;   
    background-color: #F3F3F3;
    color: #193D4E;
    width: 70%;
    height: auto;
    border-radius: 10px;
    padding: 20px;
    position: relative; /* Ensure relative positioning */
}

.notification {
    display: flex;
    flex-direction: row;
    padding: 10px 0;
}

.notificationInfo {
    display: flex;
    flex-direction: column;
    gap: 5px;
    flex: 1;
}

.notificationTitle {
    margin-top: 20px;
    font-size: 20px;
    font-weight: 500;
}

.time {
    display: flex;
    flex-direction: row;
    gap: 20px;
}

.notificationDate, .notificationAge {
    font-size: 14px;
    font-weight: lighter;
}

.notificationDesc {
    width: 500px;
    margin-bottom: 20px;
    font-size: 14px;
}

.icon {
    color: white;
    display: flex;
    font-size: 30px;
}

.iconBackground {
    background-color: #193D4E;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.notificationLeft {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
}

.checkIcon {
    color: #193D4E;
    font-size: 30px;
}

.checkIconR {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
}

h1 {
    color: #193D4E;
    font-size: 32px;
    font-weight: 800;
    padding: 2%;
}

.search-bar-container {
    width: 70%;
    margin-left: 3%;
    display: flex;
    justify-content: flex-end;
}

.search-bar-admin {
    background-color: rgba(165, 232, 226, 0.40);
    width: 350px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #193D4E;
    gap: 20px;
}

.searchIcon {
    margin-left: 15px;
}

.filterBox {
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: #193D4E;
    background-color: #F3F3F3;
    border-radius: 10px;
    width: 250px;
    height: auto;
    font-size: 16px;
    font-weight: 400;
    padding: 20px;
    position: absolute;
    right: 3%;
    top: -14px;
}

.filterContainer {
    position: fixed;
    top: 20%;
    right: 3%;
}

.filter {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 10px;
    font-size: 18px;
}

.filters {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 10px;
}

.checkbox {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.notificationsCounter {
    display: flex;
    justify-content: flex-end;
    margin: 0 45px 10px 0;
    p {
        color: #193D4E;
        font-size: 16px;
    }
    span {
        font-weight: 300;
    }
}

hr {
    border: 0;
    height: 1px;
    background-color: #193D4E;
    margin: 10px 0;
}
</style>
