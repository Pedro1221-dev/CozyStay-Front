<template>
    <div>
      <Navbar />
  
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step :complete="step > 1" step="1">Step 1</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="step > 2" step="2">Step 2</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3">Step 3</v-stepper-step>
        </v-stepper-header>
  
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-text-field v-model="name" label="Name"></v-text-field>
            <v-text-field v-model="city" label="City"></v-text-field>
            <!-- Add other fields here -->
            <v-btn @click="step++">Continue</v-btn>
          </v-stepper-content>
  
          <v-stepper-content step="2">
            <v-select v-model="type" :items="['Option 1', 'Option 2']" label="Type"></v-select>
            <v-text-field v-model="rooms" label="No of rooms"></v-text-field>
            <!-- Add other fields here -->
            <v-btn @click="step++">Continue</v-btn>
          </v-stepper-content>
  
          <v-stepper-content step="3">
            <v-text-field v-model="price" label="Base Price Number"></v-text-field>
            <!-- Add other fields here -->
            <v-btn @click="confirm">Confirm</v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </div>
  </template>
  
  <script>
  import Navbar from '../components/Navbar.vue';
  
  export default {
    components: {
      Navbar,
    },
    data() {
      return {
        step: 1,
        name: '',
        city: '',
        // Add other data properties here
      };
    },
    methods: {
      confirm() {
        // Handle confirmation here
      },
    },
  };
  </script>
  
  <style scoped>
   body{
         background-color: #fff !important;
   }
  </style>