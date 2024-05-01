<script setup>
</script>

<template>
    <div class="navbar">
        <div class="lettering-logo">CozyStay</div>
        <p class="selected">Overview</p>
        <p>Accomodation</p>
        <p>Reviews</p>
        <p>Location</p>
        <p>Host</p>
    </div>
    <div>
        <h1>Property View</h1>
        <p>Property ID: {{ $route.params.id }}</p>
    </div>

</template>
