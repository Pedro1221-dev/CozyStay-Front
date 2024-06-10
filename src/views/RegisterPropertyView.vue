<template>
    <div>
      <Navbar />
  
      <div class="form">
          <v-stepper alt-labels hide-actions :items="['Step 1', 'Step 2', 'Step 3']" class="no-border" v-model="step">
            <div class="form-wrapper"></div>
            <template v-slot:item.1>
              <v-form ref="form">
              <v-text-field 
              clearable
              v-model="name" 
              label="Name" 
              variant="underlined"
              hint="Enter your property´s name"
              placeholder="Property´s name"
              class="mt-12 text-h1 custom-class-text-input field-426"
              :rules="[v => !!v || 'Campo obrigatório']"
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
                    :rules="[v => !!v || 'Campo obrigatório']"
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
                    :rules="[v => !!v || 'Campo obrigatório']"
                  ></v-text-field>
                </v-col>
              </v-row>
              <!-- <vue-google-autocomplete
                id="map"
                v-model="address"
                class="frame-child"
                placeholder="Address"
                v-on:placechanged="getAddressData"
              ></vue-google-autocomplete> -->
              <v-text-field 
              clearable
              v-model="address" 
              label="Address"
              variant="underlined"
              hint="Enter your property´s Address"
              placeholder="Property´s Address"
              class="mt-12 text-h1 custom-class-text-input field-670"
              :rules="[v => !!v || 'Campo obrigatório']"
              ></v-text-field>
              <v-text-field 
              clearable
              v-model="description" 
              label="Description"
              variant="underlined"
              hint="Enter your property´s Description"
              placeholder="Property´s Description"
              class="mt-12 text-h1 custom-class-text-input field-670"
              :rules="[v => !!v || 'Campo obrigatório']"
              ></v-text-field>
              <v-btn variant="tonal"
              size="x-large"
              rounded="lg"
              color="white"
              block 
              class="registerButton button-316" @click="next">Continue</v-btn>

            </v-form>
            </template>
            
            <template v-slot:item.2>
              <v-form ref="form">
              <v-select
                v-model="type"
                :items="propertyTypes"
                variant="underlined"
                label="Select Type"
                class="mt-8 text-h1 custom-class-text-input field-670"
                :rules="[v => !!v || 'Campo obrigatório']"
              ></v-select>
              <v-row>
                <v-col cols="3">
                  <v-text-field
                    v-model="rooms"
                    variant="underlined"
                    label="No. of rooms"
                    class="mt-6 text-h1 custom-class-text-input field-250"
                    :rules="[v => !!v || 'Campo obrigatório']"
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="beds"
                    variant="underlined"
                    label="No. of beds"
                    class="mt-6 text-h1 custom-class-text-input field-250"
                    :rules="[v => !!v || 'Campo obrigatório']"
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="guests"
                    variant="underlined"
                    label="No. of guests allowed"
                    class="mt-6 text-h1 custom-class-text-input field-250"
                    :rules="[v => !!v || 'Campo obrigatório']"
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="wcs"
                    variant="underlined"
                    label="No. of wcs"
                    class="mt-6 text-h1 custom-class-text-input field-250"
                    :rules="[v => !!v || 'Campo obrigatório']"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-container class="mt-8">
                <span class="facilities">Facilities</span>
                <div class="selectFacilities">Select your property's facilities</div>
                <v-row justify="center" dense class="text-left mt-8">
                  <v-col
                    v-for="(facility, index) in facilities"
                    :key="index"
                    cols="4"
                    class="d-flex align-center mt-n9 ml-n9 mr-n9 privacyPolicyCheckbox"
                  >
                    <div class="ml-1 mr-1 mb-5">{{ facility }}</div>
                    <v-checkbox
                      v-model="selectedFacilities"
                      :label="''"
                      :value="facility"
                      class="ml-n2 privacyPolicyCheckbox"
                      :rules="[rules.required]"
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </v-container>
              <v-btn
                variant="tonal"
                size="x-large"
                rounded="lg"
                color="white"
                block
                class="registerButton button-316"
                @click="next"
              >
                Continue
              </v-btn>
            </v-form>
            </template>

            <template v-slot:item.3>
              <v-container class="mt-8">
              <v-text-field
                v-model="basePrice"
                variant="underlined"
                label="Enter base price"
                class="mt-6 text-h1 custom-class-text-input field-250"
                :rules="[v => !!v || 'Campo obrigatório']"
              ></v-text-field>

              <span class="section-price">Section Price</span>
              <v-row justify="center" dense class="text-left mt-8">
                <v-col cols="6">
                  <v-card class="price-option" @click="openModal('fixed')" :class="{ 'selected': selectedOption === 'fixed' }">
                    <v-card-title class="justify-center">
                      <h3 class="title">Fixed Price</h3>
                    </v-card-title>
                    <v-card-text class="justify-center">
                      <span class="material-symbols-outlined" style="font-size:85px">bedroom_parent</span>
                      <p class="price">{{basePrice}}€</p>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="6">
                  <v-card class="price-option" @click="openModal('seasonal')" :class="{ 'selected': selectedOption === 'seasonal' }">
                    <v-card-title class="justify-center">
                      <h3 class="title">Seasonal Price</h3>
                    </v-card-title>
                    <v-card-text class="justify-center">
                      <span class="material-symbols-outlined" style="font-size:85px">sunny_snowing</span>
                      <v-btn color="#193D4E" class="mt-7">Configure</v-btn>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>

              <v-dialog v-model="dialog" persistent max-width="800px">
                <v-card>
                  <v-card-title>
                    <span class="headline">Define Seasonal Price Parameters</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="4">
                          <Datepicker
                            v-model="seasonStartDate"
                            :enable-time-picker="false"
                          />
                        </v-col>
                        <v-col cols="12" sm="4">
                          <Datepicker
                            v-model="seasonEndDate"
                            :enable-time-picker="false"
                          />
                        </v-col>
                        <v-col cols="12" sm="4">
                          <v-text-field
                            v-model="priceIncrease"
                            label="Acréscimo de Preço (%)"
                            type="number"
                            :rules="[v => !!v || 'Campo obrigatório']"
                          ></v-text-field>
                        </v-col>
                      </v-row>    
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#193D4E" class="cancelButton" @click="dialog = false">Cancelar</v-btn>
                    <v-btn color="white" class="registerButton" @click="confirmSeasonalPrice">Confirmar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-btn variant="tonal" size="x-large" rounded="lg" color="white" block class="registerButton" @click="register">
                Register
              </v-btn>
            </v-container>
            </template>
          </v-stepper>
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from '../components/Navbar.vue';
  import VueGoogleAutocomplete from 'vue-google-autocomplete'
  import { format } from 'date-fns'
  import { ref } from 'vue';
  import Datepicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';
  
export default {
  components: {
    Navbar,
    VueGoogleAutocomplete,
    Datepicker,
  },
  data() {
    return {
      date : ref(),
      step: 1,
    name: '',
    city: '',
    address: '',
    country: '',
    description: '',
    propertyType: '',
    rooms: '',
    beds: '',
    wcs: '',
    guests: '',
    selectedFacilities: [],
    type: '',
    propertyTypes: [
      'Apartment',
      'House',
      'Townhouse',
      'Condominium',
      'Bungalow',
      'Cottage',
      'Villa',
      'Mansion'
    ],
    facilities: [
        'Free Wi-Fi',
        'Parking',
        'Swimming Pool',
        'Fitness Center',
        'Restaurant',
        'Non-smoking Rooms',
        'Airport Shuttle',
        'Facilities for Disabled Guests',
        'Family Rooms',
        'Spa and Wellness Center',
        'Bar',
        '24-hour Front Desk'
      ],
      basePrice: '',
      dialog: false,
      menu1: false,
      menu2: false,
      seasonStartDate: null,
      seasonEndDate: null,
      selectedOption: 'fixed',
      priceIncrease: '',
    rules: {
      required: value => !!value || 'Required.'
    },
    };
  },
  methods: {
    confirm() {
      // Handle confirmation here
    },
    next() {
      console.log('Hello')
      console.log(this.step)
      if (this.$refs.form.validate()) {
        // All fields are valid, continue to the next step
        console.log('Valid');
      }
      if(this.step==1 && (!this.name || !this.country || !this.city || !this.city || !this.address || !this.description)) {
            //fazer validaçoes com bd
            console.log("Erro 1");
            return;
          }
      if(this.step==2 && (!this.type || !this.rooms || !this.beds || !this.wcs || !this.guests || this.selectedFacilities.length == 0)) {
        console.log("Erro 2");
        return;
      }
      this.step++;
    },
    openModal(selectedOption) {
      if (selectedOption === 'seasonal') {
        this.dialog = true;
        this.selectedOption = 'seasonal';
      }
      else{
        this.selectedOption = 'fixed';	
      }
    },
    confirmSeasonalPrice() {
      // Confirm seasonal price logic here
      this.dialog = false;
    },
    register() {
      // Register logic here
      alert('Registo Feito!');
    },
    formatDate(date) {
      return format(date, 'dd-MM-yyyy');
    },
    getAddressData: function (addressData, placeResultData, id) {
      this.address = addressData;
      console.log('City:',addressData);
      this.city = addressData.administrative_area_level_2;
      this.country = addressData.country;
    },
  },
  watch: {
  /* seasonStartDate(newStartDate, oldStartDate) {
    newStartDate = this.formatDate(newStartDate);
    this.seasonStartDate = newStartDate
    console.log('Season start date changed from', oldStartDate, 'to', newStartDate);
  },
  seasonEndDate(newEndDate, oldEndDate) {
    newEndDate = this.formatDate(newEndDate);
    this.seasonEndDate = newEndDate
    console.log('Season end date changed from', oldEndDate, 'to', newEndDate);
  } */
}
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
  ::v-deep .v-container[data-v-2042d686]{
    margin-left:20%;
  }
  .registerButton {
    background-color: #193D4E!important;
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-top:46px !important;
    width: 316px !important;
  }
  .cancelButton {
    background-color: #ffffff!important;
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-top:46px !important;
  }
  .cancelButton:hover {
    border: 2px solid #193D4E;
  }
  .field-426 {
    width: 426px !important;
  }
  .field-250 {
    width: 250px !important;
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
  
  .frame-child.pac-target-input {
  width: 670px;
  height: 56px;
  border: none;
  border-bottom: 1px solid rgba(44, 62, 80, 0.42);
  background-color: transparent;
  font-size: 16px;
  color: rgba(44, 62, 80, 0.87);
  margin-top: 20px;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
  padding-top: 25px ;
}

.frame-child.pac-target-input::placeholder {
  color: rgba(44, 62, 80, 0.6);
  font-size: 16px;
  opacity: 1;
}

.frame-child.pac-target-input:focus {
  outline: none;
  border-bottom: 2px solid #193D4E;
}

.frame-child.pac-target-input:focus::placeholder {
  color: transparent;
}

.privacyPolicyCheckbox {
  color: #193D4E;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
}

.facilities {
  color: #193D4E;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.selectFacilities {
  color: #193D4E;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  font-style: normal;
  font-weight: 100;
  line-height: normal;
}

.v-container {
    width: 100%;
    padding: 0px;
    margin-right: 0px;
    margin-left: 0px;
}

.price-option {
  cursor: pointer;
  text-align: center;
  padding: 20px;
}

.start-date-picker{
  margin-left:160%;
  margin-top: 130%;
}

.end-date-picker{
  margin-left:260%;
  margin-top: 130%;
}

::v-deep .v-date-picker-month__day {
  width: 30px;
  height: 30px;
}
::v-deep .v-date-picker-header__content {
  font-size: 25px;
}

::v-deep .v-picker-title{
  padding-bottom: 0px;
}

::v-deep .v-date-picker-month__day .v-btn.v-date-picker-month__day-btn {
    --v-btn-height: 15px;
    --v-btn-size: 0.85rem;
}

::v-deep .dp__input{
  background-color: #f6f7f8 !important;
  height: 56px;  
}

::v-deep .dp__menu_inner {
  z-index: 9999 !important;
}

::v-deep .v-card-text {
    height:365px !important;
}

::v-deep .v-card{
  border-radius: 20px !important;
}

.price-option {
  width: 267px;
  height: 267px;
  background-color: rgba(165, 232, 226, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.price-option.selected {
  border: 3px solid #193D4E;
}

.title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
}

.price {
  font-size: 24px;
  font-weight: 600;
  margin-top: 20px;
}
.price-option.selected {
  border: 3px solid #193D4E;
}
  </style>