<template>
    <!-- 
    <div class="badges">
        <div class="badge" v-for="(badge, index) in badges" :key="index">
            {{ badge }}
        </div>
    </div>
     -->

    <div class="badges">
        <div class="badge-card">
            <div class="badge-icon">
            </div>
            <div class="badge-info">
                <h2>{{ Nome }}Property  Debut</h2>
                <p>{{ Desc }}Register 1st property</p>
            </div>
        </div>

        <div class="badge-card">
            <div class="badge-icon">
            </div>
            <div class="badge-info">
                <h2>{{ Nome }}</h2>
                <p>{{ Desc }}</p>
            </div>
        </div>

        <div class="badge-card">
            <div class="badge-icon">
            </div>
            <div class="badge-info">
                <h2>{{ Nome }}</h2>
                <p>{{ Desc }}</p>
            </div>
        </div>

        <div class="badge-card">
            <div class="badge-icon">
            </div>
            <div class="badge-info">
                <h2>{{ Nome }}</h2>
                <p>{{ Desc }}</p>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
    
    }
</script>

<style scoped>
    .badges{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin: 2% 10% 0% 10%;
    }

    .badge-card{
        display: flex;
        flex-direction: row;
        background-color: #c0c0c0;
        width: 270px;
        padding: 10px;
        border-radius: 7px;
        gap: 20px;
    }

    .badge-info {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        align-content: flex-start;
    }

    .badge-icon {
        font-size: 10px;
        font-weight: 400 ;
        color: #FFF;
        background-color: #193D4E;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center; 
        align-items: center; 
    }

</style>