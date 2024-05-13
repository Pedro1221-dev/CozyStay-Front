<template>
    <div>
      <Navbar />
  
      <div class="form">
          <v-stepper alt-labels hide-actions :items="['Step 1', 'Step 2', 'Step 3']" class="no-border">
            <div class="form-wrapper"></div>
            <template v-slot:item.1>
              <v-text-field 
              clearable
              v-model="name" 
              label="Name" 
              variant="underlined"
              hint="Enter your property´s name"
              placeholder="Property´s name"
              class="mt-12 text-h1 custom-class-text-input field-426"
              ></v-text-field>
              <v-row>
                <v-col cols="6">
                  <v-text-field 
                    clearable
                    v-model="country" 
                    label="Country"
                    variant="underlined"
                    hint="Enter your property's Country"
                    placeholder="Property's Country"
                    class="mt-12 text-h1 custom-class-text-input field-426"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field 
                    clearable
                    v-model="city" 
                    label="City"
                    variant="underlined"
                    hint="Enter your property's City"
                    placeholder="Property's City"
                    class="mt-12 text-h1 custom-class-text-input field-426"
                  ></v-text-field>
                </v-col>
              </v-row>
              <div class="frame-parent">
                <vue-google-autocomplete
                  id="map"
                  class="frame-child"
                  placeholder="Property´s Address"
                  v-on:placechanged="getAddressData"
                ></vue-google-autocomplete>
                <div class="frame-item"></div>
              </div>
              <v-text-field 
              clearable
              v-model="description" 
              label="Description"
              variant="underlined"
              hint="Enter your property´s Description"
              placeholder="Property´s Description"
              class="mt-12 text-h1 custom-class-text-input field-670"
              ></v-text-field>
              <v-btn variant="tonal"
              size="x-large"
              rounded="lg"
              color="white"
              block 
              class="registerButton button-316" @click="next">Seguinte</v-btn>
            </template>
            
            <template v-slot:item.2> </template>

            <template v-slot:item.3> </template>
          </v-stepper>
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from '../components/Navbar.vue';
  import VueGoogleAutocomplete from 'vue-google-autocomplete'
  
export default {
  components: {
    Navbar,
    VueGoogleAutocomplete,
  },
  data() {
    return {
      step: 1,
      name: '',
      city: '',
      address: '', // Adicione esta linha
      country: '', // Adicione esta linha
      // Add other data properties here
    };
  },
  methods: {
    confirm() {
      // Handle confirmation here
    },
    getAddressData: function (addressData, placeResultData, id) {
      this.address = addressData;
      console.log('City:',addressData);
      this.city = addressData.administrative_area_level_2;
      this.country = addressData.country;
    },
  },
};
  </script>
  
  <style scoped>
  body {
    overflow: hidden !important;
    height: 100vh !important;
    width: 100vw !important;
  }
  .form{
    margin-top: 100px;
    margin-left: 100px;
    margin-right: 100px;
  }
  .v-stepper.v-sheet {
    box-shadow: none;
  }
  .v-stepper-header {
    box-shadow:none;
  }
  .registerButton {
    background-color: #193D4E!important;
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-top:46px !important;
  }
  .field-426 {
    width: 426px !important;
  }

  .field-670 {
    width: 670px !important;
  }
  .button-316 {
    width: 316px !important;
    margin: auto !important;
  }
  .v-btn--block {
    min-width: auto !important;
  }
  .v-text-field {
    color: #193D4E !important;
    font-family: 'Montserrat', sans-serif !important;
  }
  

  .frame-parent {
    width: 670px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--gap-mini);
    max-width: 100%;
}

.frame-child {
    width: 100%;
    border: none;
    outline: none;
    background-color: transparent;
    height: 29px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0px var(--padding-base);
    box-sizing: border-box;
    font-family: var(--font-montserrat);
    font-weight: 600;
    font-size: var(--font-size-5xl);
    color: var(--contraste);
}

.frame-item {
    align-self: stretch;
    height: 1px;
    position: relative;
    border-top: 1px solid var(--contraste);
    box-sizing: border-box;
}

/* Estilos para os elementos internos do vue-google-autocomplete */
.vue-google-autocomplete input {
    width: 100%;
    border: none;
    outline: none;
    background-color: transparent;
    height: 29px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0px var(--padding-base);
    box-sizing: border-box;
    font-family: var(--font-montserrat);
    font-weight: 600;
    font-size: var(--font-size-5xl);
    color: var(--contraste);
}
  </style>