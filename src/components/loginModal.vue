<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
<template>
    <v-dialog 
        v-model="loginDialog"
        @update:model-loginDialog="$emit('input', false)"
        width="auto"
        
        >
      <v-card max-width="1300" class="overflow-hidden">
        <div class="outer-div">
          <!-- Div interior com imagem de fundo e div sobreposta -->
          <div class="inner-div">
            <!-- Conteúdo da div interior -->
            <!-- Div sobreposta -->
            <div :class="overlayClass" @click="toggleOverlay"></div>
            <!-- Texto "Login | Register" -->
            <div :class="tabTextClass" @click="toggleTab">
              <span :class="{ 'active-tab': activeTab === 'login' }">Login</span>
              <span class="lineLoginRegister"> | </span>
              <span :class="{ 'active-tab': activeTab === 'register' }">Register</span>
            </div>
            <!-- Abas de login e registo -->
            <v-window v-model="activeTab">
              <v-window-item value="login">
                <!-- Conteúdo da aba de login -->
                <div class="titleLogin">
                    <v-card-title class="loginText">Login</v-card-title>
                </div>
        
                <v-card-text class="login-section">
                  <v-sheet width="300" class="form-background mx-auto">
                    <v-form @submit.prevent="login" class="form">
                      <v-text-field 
                      clearable
                      v-model="email_login" 
                      label="Email" 
                      variant="underlined"
                      hint="Enter your email to access this website"
                      placeholder="johndoe@gmail.com"
                      :rules="[rules.email]"
                      class="p-5 mb-5 text-h1 custom-class-text-input"
                      ></v-text-field>
                      <v-text-field 
                      clearable
                      v-model="password_login" 
                      type="password" 
                      label="Password" 
                      variant="underlined"
                      hint="Must have at least 6 characters"
                      :rules="[rules.required]"
                      class="p-5 text-h1 custom-class-text-input" 
                      ></v-text-field>
                      <v-btn 
                      variant="tonal"
                      size="x-large"
                      rounded="lg"
                      color="white"
                      block 
                      class="loginButton"
                      @click="login"
                      >Login</v-btn>
                    </v-form>
                  </v-sheet>
                </v-card-text>
              </v-window-item>

              <v-window-item value="register">
                <!-- Conteúdo da aba de registo -->
                <div class="titleRegister">
                    <v-card-title class="registerText">Register</v-card-title>
                </div>
                <v-stepper alt-labels hide-actions :items="['Account Information', 'Personal Details', 'Additional Information', 'Email Confirmation']" class="register-section" v-model="step">
                  <template v-slot:item.1>
                    <v-card 
                    class="mt-n9 mb-5 custom-card-color" 
                    flat>
                      <v-sheet width="300" class="form-background mx-auto">
                        <v-form @submit.prevent="login" class="form">
                          <v-text-field 
                          clearable
                          v-model="email_register" 
                          label="Email" 
                          variant="underlined"
                          hint="Enter your email to access this website"
                          placeholder="johndoe@gmail.com"
                          :rules="[rules.email, rules.required]"
                          class="mt-15 text-h1 custom-class-text-input"
                          ></v-text-field>
                          <v-text-field 
                          clearable
                          v-model="password_resgister" 
                          type="password" 
                          label="Password" 
                          variant="underlined"
                          hint="Must have at least 6 characters"
                          :rules="rules.password"
                          class="mt-2 text-h1 custom-class-text-input" 
                          ></v-text-field>
                          <v-text-field 
                          clearable
                          v-model="confirmPassword" 
                          type="password" 
                          label="Password Confirmation" 
                          variant="underlined"
                          hint="The password should match"
                          :rules="rules.confirmPassword"
                          class="mt-2 mb-8 text-h1 custom-class-text-input" 
                          ></v-text-field>
                          <v-btn variant="tonal"
                      size="x-large"
                      rounded="lg"
                      color="white"
                      block 
                      class="registerButton" @click="next">Seguinte</v-btn>
                        </v-form>
                    </v-sheet>
                    </v-card>
                  </template>
                
                  <template v-slot:item.2>
                    <v-card 
                    class="mt-n9 mb-5 custom-card-color" 
                    flat><v-sheet width="300" class="form-background mx-auto">
                        <v-form @submit.prevent="login" class="form">
                          <v-text-field 
                          clearable
                          v-model="firstName" 
                          label="First Name" 
                          variant="underlined"
                          hint="Enter your first name to access this website"
                          placeholder="John"
                          class="mt-10 text-h1 custom-class-text-input"
                          :rules="rules.firstName"
                          ></v-text-field>
                          <v-text-field 
                          clearable
                          v-model="lastName" 
                          label="Last Name" 
                          variant="underlined"
                          hint="Enter your last name to access this website"
                          placeholder="Doe"
                          class="mt-2 text-h1 custom-class-text-input" 
                          :rules="rules.lastName"
                          ></v-text-field>
                          <v-text-field 
                          clearable
                          v-model="vatNumber" 
                          label="Vat Number" 
                          variant="underlined"
                          hint="Enter your vat number to access this website"
                          class="mt-2 text-h1 custom-class-text-input" 
                          :rules="rules.vatNumber"
                          ></v-text-field>
                          <v-combobox
                            v-model="selectedNationalities"
                            clearable
                            chips
                            label="Nationality"
                            :items="['Portuguese', 'French', 'Spanish', 'German', 'Italian', 'Chinese', 'American']"
                            class="mb-n5 custom-class-text-input" 
                            variant="underlined"
                            :rules="[rules.required]"
                          ></v-combobox>
                          <v-btn variant="tonal"
                      size="x-large"
                      rounded="lg"
                      color="white" 
                      block 
                      class="registerButton margin-42" @click="next">Seguinte</v-btn>
                        </v-form>
                    </v-sheet>
                  </v-card>
                  </template>
                
                  <template v-slot:item.3>
                    <span class="languages">Languages</span>
                    <div class="selectLanguages">Select the languages you speak</div>
                    <v-card 
                    class="mt-n5 mb-5 ml-16 custom-card-color" 
                    flat>
                      <v-container class="mt-10">
                        <v-row justify="center" dense class="text-left">
                          <v-col
                            v-for="(nationality, index) in nationalities"
                            :key="index"
                            cols="6"
                            class="d-flex align-center mt-n9 ml-n9 mr-n9 privacyPolicyCheckbox"
                          >
                            <v-img :src="nationality.flag" class="flag-icon mb-5"></v-img>
                            <div class="ml-1 mr-1 mb-5">{{ nationality.name }}</div>
                            <v-checkbox
                              v-model="selectedLanguages"
                              :label="''"
                              :value="nationality.id"
                              class="ml-n2 privacyPolicyCheckbox"
                              :rules="[rules.required]"
                            ></v-checkbox>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card>
                    <div class="d-flex align-center mt-n15 margin-5">
                      <!-- Checkbox para a política de privacidade -->
                      <v-checkbox
                        v-model="privacyPolicyAccepted"
                        :label="`I accept the `"
                        hide-details
                        class="privacyPolicyCheckbox"
                      ></v-checkbox>
                      <a href="#" class="privacyPolicy">Privacy Policy</a>
                    </div>
                    <v-btn 
                      variant="tonal"
                      size="x-large"
                      rounded="lg"
                      color="white" 
                      class="registerButton"
                      :disabled="!privacyPolicyAccepted"
                      @click="next"
                      style="width: 300px; margin-left:25%;"
                      >Register</v-btn>
                  </template>
                  <template v-slot:item.4>
                    <span class="otp-title">Confirm Your Email</span>
                    <div class="otp-subtitle">Fill in the code sent to the following email address: example@mail.com
Confirm 'Spam' or Trash, as the e-mail can be found there</div>
                    <v-card class="mt-n9 mb-5 custom-card-color" flat>
                      <v-sheet width="300" class="form-background mx-auto">
                        <v-form @submit.prevent="login" class="form">
                          <v-otp-input 
                            v-model="otp" 
                            :length="6"
                            :shouldAutoFocus="true"
                            inputStyle="otp-input"
                            min-height="90"
                            min-width="400"
                            class="mt-9"
                          ></v-otp-input>
                          <v-btn variant="tonal"
                            size="x-large"
                            rounded="lg"
                            color="white" 
                            block 
                            class="registerButton mt-16" 
                            @click="next"
                          >Confirm</v-btn>
                        </v-form>
                      </v-sheet>
                    </v-card>
                  </template>
                </v-stepper>
              </v-window-item>
            </v-window>
          </div>
        </div>
      </v-card>
    </v-dialog>
</template>
  
<script>
import { useUserStore } from "@/stores/user";
import { useToast } from "vue-toastification";

export default {
  setup() {
    // Get toast interface
    const toast = useToast();

    // Make it available inside methods
    return { toast }
  },
    data() {
      return {
        user_id: null,
        step:1,
        privacyPolicyAccepted: false,
        loginDialog: false,
        activeTab: 'Login',
        email_login:"",
        password_login:"",
        overlayToLeft: true,
        email_register: "",
        password_resgister: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        vatNumber: "",
        otp:"",
        rules: {
          required: value => !!value || 'Field is required',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
          password: [
            v => !!v || 'Password is required',
            v => (v && v.length >= 8) || 'Password must be at least 8 characters',
            v => (v && /\W/.test(v)) || 'Password must contain at least one special character'
          ],
          confirmPassword: [
            v => !!v || 'Password confirmation is required',
            v => (v && v === this.password_resgister) || 'Passwords must match'
          ],
          vatNumber: [
            v => !!v || 'VAT number is required',
            v => (v && v.length === 9) || 'VAT number must be 9 digits',
            v => (v && /^\d+$/.test(v)) || 'VAT number must contain only digits'
          ],
          firstName: [
            v => !!v || 'First name is required',
            v => (v && /^[a-zA-Z]+$/.test(v)) || 'First name must contain only letters'
          ],
          lastName: [
            v => !!v || 'Last name is required',
            v => (v && /^[a-zA-Z]+$/.test(v)) || 'Last name must contain only letters'
          ],
          
        },
        nationalities: [
          { id: 1,name: 'English', flag: '../src/assets/img/register/uk.png' },
          { id: 2,name: 'French', flag: '../src/assets/img/register/fr.png' },
          { id: 3,name: 'German', flag: '../src/assets/img/register/de.png' },
          { id: 4,name: 'Portuguese', flag: '../src/assets/img/register/pt.png' },
          { id: 5,name: 'Spanish', flag: '../src/assets/img/register/es.png' },
          { id: 6,name: 'Italian', flag: '../src/assets/img/register/it.png' },
          { id: 7,name: 'Russian', flag: '../src/assets/img/register/ru.png' },
          { id: 8,name: 'Mandarim', flag: '../src/assets/img/register/cn.png' }
        ],
        selectedNationalities: [],
        selectedLanguages: []

      };
    },
    computed: {
      overlayClass() {
        return {
          'overlay': true,
          'overlay-right': !this.overlayToLeft,
        };
      },
      tabTextClass() {
        return {
          'tab-text': true,
          'tab-text-right': !this.overlayToLeft
        };
      },
    },
    methods: {
        toggleOverlay() {
            console.log(this.overlayToLeft);
            this.overlayToLeft = this.activeTab === 'login';
        },
        toggleTab() {
            if (this.activeTab === 'login') {
                this.activeTab = 'register';
                this.overlayToLeft = false;
            } else {
                this.activeTab = 'login';
                this.overlayToLeft = true;
            }
        },
        next() {
          if(this.step==1 && (!this.email_register || !this.password_resgister || !this.confirmPassword || this.confirmPassword != this.password_resgister || this.password_resgister.length < 8 || !/[^A-Za-z0-9]/.test(this.password_resgister))) {
            //fazer validaçoes com bd
            console.log("Erro 1");
            return;
          }
          else if(this.step==2 && (!this.firstName || !this.lastName || !this.vatNumber || this.selectedNationalities.length == 0 || !/^[A-Za-z]+$/.test(this.firstName) || !/^[A-Za-z]+$/.test(this.lastName) || !/^\d{9,}$/.test(this.vatNumber))) {
            //fazer validaçoes com bd
            console.log("Nacionalidades", this.selectedNationalities.length);
            console.log("Erro 2");
            return;
          }
          else if(this.step==3 && (this.selectedLanguages.length == 0 || !this.privacyPolicyAccepted)){
            //fazer validaçoes com bd
            console.log("Erro 3");
            return;
          }
          else if(this.step==4 && (!this.otp || this.otp.length != 6 || !/^\d{6}$/.test(this.otp))) {
            // chamar método da API para verificar o OTP
            console.log("Erro 4");
            return;
          }

          this.step++;

          // If all steps are completed, try to register the user
          if(this.step == 4) {
            this.registerUser();
          }

          if(this.step == 5) {
            this.validateOTPUser();
          }

          return;
        },

        async registerUser() {
          const userStore = useUserStore();
          const user ={
            email: this.email_register,
            password: this.password_resgister,
            name: this.firstName + ' ' + this.lastName,
            vat_number: this.vatNumber,
            nationality: this.selectedNationalities,
            languages: this.selectedLanguages.map(language => ({ language_id: language }))
          };
          try {
            const response = await userStore.createUser(user);
            this.user_id = response.user_id
            console.log("USER ID:",this.user_id);
          } catch (error) {
            // Assume the error response is in the format { success: false, msg: [errorCode] }
            const errorCode = error.response.data.msg[0];
            let errorMessage;
            console.log("ERROR CODE:",errorCode);
            switch (errorCode) {
              case 'email_UNIQUE must be unique':
                errorMessage = 'Registration failed: This email is already registered.';
                break;
              case 'vat_number_UNIQUE must be unique':
                errorMessage = 'Registration failed: This VAT number is already registered.';
                break;
              default:
                errorMessage = 'Registration failed: An unknown error occurred.';
            }

            this.toast.error(errorMessage);
            // Determine the step where the error occurred based on the error code
            const errorStep = this.getErrorStep(errorCode);
            this.step = errorStep;
            return;
          }
        },

        async validateOTPUser() {
          const userStore = useUserStore();
          try {
            await userStore.validateOTP(this.user_id, this.otp);
            this.$emit('login-success');
            this.toast.success('Registration successful!')
          } catch (error) {
            this.toast.error('OTP validation failed: An unknown error occurred.');
            return;
          }
        },

        getErrorStep(errorCode) {
          // Map error codes to step numbers
          const errorStepMap = {
            'email_UNIQUE': 1,
            'vat_number_UNIQUE must be unique': 2,
            // Add more error codes as needed
          };

          return errorStepMap[errorCode] || 1; // Default to step 1 if the error code is not recognized
        },

        async login(){
          try {
            const userStore = useUserStore();
            await userStore.login(this.email_login, this.password_login);
            this.$emit('login-success');
            this.toast.success('Login successful!')
          } catch (error) {
            this.toast.error('Login failed: Email or Password Incorrect.');
            return;
          }
        }
        
        },
        mounted () {
            this.toggleTab();
        },
        
};
</script>
  
<style scoped>
.outer-div {
    width: 70rem;
    height: 40rem;
    border-radius: 4%; 
}
  
.inner-div {
    position: relative; 
    width: 81.25rem;
    height: 100%;
    background-image: url('../assets/img/login/login-background.webp'); 
    background-size: cover;
    border-radius: inherit; 
}
  
.overlay {
    position: absolute; 
    top: 0; 
    left: 0; 
    width: 45%; 
    height: 100%; 
    background-color: rgba(231, 230, 211, 0.7); 
    z-index: 1; 
    transition: left 0.3s; 
    border-radius: 5% 0 0 5%; 
}
  
.overlay-right {
    left: 45%; 
    border-radius: 0 5% 5% 0;
}
  
.tab-text {
    position: absolute;
    top: 5%; 
    left: 32%; 
    color: #193D4E; 
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    cursor: pointer; 
    z-index: 50;
    transition: right 0.4s; 
}

.tab-text-right {
  left: auto; 
  right: 15%; 
  transition: left 0.4s; 
}
  
.tab-text .active-tab {
  font-family: 'Montserrat', sans-serif;
  text-decoration: underline; 
  font-size: 1rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  text-underline-offset: 4px;
}

.lineLoginRegister {
    font-size: 1.2rem;
}

.v-dialog > .v-overlay__content > .v-card, .v-dialog > .v-overlay__content > form > .v-card {
    border-radius: 5%;
}

.titleLogin {
  position: fixed;
  z-index: 3;
  top: 25%;
  left: 26%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.titleRegister {
  position: fixed;
  z-index: 3;
  top: 15%;
  left: 77.5%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 35%;
}

.loginText {
  color: #193D4E!important;
  font-family: 'Montserrat', sans-serif;
  font-size: 3rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.registerText {
  color: #193D4E!important;
  font-family: 'Montserrat', sans-serif;
  font-size: 3rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.loginButton {
  background-color: #193D4E!important;
  margin-top: 4em;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.registerButton {
  background-color: #193D4E!important;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.login-section {
  z-index: 3;
  position: relative;
  bottom: 50%;
  left: 22.5%;
  transform: translate(-50%, -50%);
  padding-top: 58em;
}

.register-section {
  z-index: 3;
  position: relative;
  bottom: 65%;
  left: 44%;
  max-width: 45%;
  margin-top: 9em;
  background-color: transparent;
}



.form-background{
  background-color: transparent;
}

.custom-class-text-input {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  color: #193D4E;
}

.v-dialog {
  backdrop-filter: blur(5px);
}

.custom-card-color {
    background-color: transparent; /* Cor com opacidade */
}

.v-stepper.v-sheet {
    box-shadow: none;
}



::v-deep .v-stepper-window {
    margin: 0 !important;
    
}

.flag-icon {
  max-width: 1.5rem;
  height: auto;
}

.languages{
  color: #193D4E;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-left: 5%;
}

.selectLanguages {
  color: #193D4E;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-style: normal;
  font-weight: 100;
  line-height: normal;
  margin-left: 5%;
}

.privacyPolicy {
  text-decoration: underline;
  color: #193D4E;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
}

.privacyPolicyCheckbox {
  color: #193D4E;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
}

.margin-42 {
  margin-top: 2em;
}

.margin-5{
  margin-left:5%;
}
.otp-title{
  color: #193D4E;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-left: 5%;
  margin-top:1%
}

.otp-subtitle{
  color: #193D4E;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  font-style: normal;
  font-weight: 100;
  line-height: normal;
  margin-left: 5%;
}

</style>
  