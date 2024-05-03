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
                      v-model="email" 
                      label="Email" 
                      variant="underlined"
                      hint="Enter your email to access this website"
                      placeholder="johndoe@gmail.com"
                      :rules="[rules.email]"
                      class="p-5 mb-5 text-h1 custom-class-text-input"
                      ></v-text-field>
                      <v-text-field 
                      clearable
                      v-model="password" 
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
                      type="submit" 
                      block 
                      class="loginButton"
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
                <v-stepper editable :items="['Account Information', 'Personal Details', 'Additional Information']" class="register-section">
                  <template v-slot:item.1>
                    <v-card 
                    class="mt-n9 mb-5 custom-card-color" 
                    flat>
                      <v-sheet width="300" class="form-background mx-auto">
                        <v-form @submit.prevent="login" class="form">
                          <v-text-field 
                          clearable
                          v-model="email" 
                          label="Email" 
                          variant="underlined"
                          hint="Enter your email to access this website"
                          placeholder="johndoe@gmail.com"
                          :rules="[rules.email, rules.required]"
                          class="mt-15 text-h1 custom-class-text-input"
                          ></v-text-field>
                          <v-text-field 
                          clearable
                          v-model="password" 
                          type="password" 
                          label="Password" 
                          variant="underlined"
                          hint="Must have at least 6 characters"
                          :rules="[rules.required]"
                          class="mt-2 text-h1 custom-class-text-input" 
                          ></v-text-field>
                          <v-text-field 
                          clearable
                          v-model="confirmPassword" 
                          type="password" 
                          label="Password Confirmation" 
                          variant="underlined"
                          hint="The password should match"
                          :rules="[rules.required]"
                          class="mt-2 mb-8 text-h1 custom-class-text-input" 
                          ></v-text-field>
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
                          :rules="[rules.required]"
                          ></v-text-field>
                          <v-text-field 
                          clearable
                          v-model="lastName" 
                          type="password" 
                          label="Last Name" 
                          variant="underlined"
                          hint="Enter your last name to access this website"
                          placeholder="Doe"
                          class="mt-2 text-h1 custom-class-text-input" 
                          :rules="[rules.required]"
                          ></v-text-field>
                          <v-text-field 
                          clearable
                          v-model="vatNumber" 
                          label="Vat Number" 
                          variant="underlined"
                          hint="Enter your vat number to access this website"
                          class="mt-2 text-h1 custom-class-text-input" 
                          :rules="[rules.required]"
                          ></v-text-field>
                          <v-combobox
                            clearable
                            chips
                            multiple
                            label="Nationality"
                            :items="['Portuguese', 'French', 'Spanish', 'German', 'Italian', 'Chinese', 'American']"
                            class="mb-n5 custom-class-text-input" 
                            variant="underlined"
                            :rules="[rules.required]"
                          ></v-combobox>
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
                              v-model="selectedNationalities"
                              :label="''"
                              :value="nationality.name"
                              class="ml-n2 privacyPolicyCheckbox"
                              :rules="[rules.required]"
                            ></v-checkbox>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card>
                    <div class="d-flex align-center mt-n15">
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
                      type="submit" 
                      block 
                      class="registerButton"
                      :disabled="!privacyPolicyAccepted"
                      >Register</v-btn>
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
export default {
    data() {
      return {
        privacyPolicyAccepted: false,
        loginDialog: false,
        activeTab: 'Login',
        overlayToLeft: true,
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        vatNumber: "",
        rules: {
          required: value => !!value || 'Field is required',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
          
        },
        nationalities: [
          { name: 'English', flag: '../src/assets/img/register/uk.png' },
          { name: 'French', flag: '../src/assets/img/register/fr.png' },
          { name: 'German', flag: '../src/assets/img/register/de.png' },
          { name: 'Portuguese', flag: '../src/assets/img/register/pt.png' },
          { name: 'Spanish', flag: '../src/assets/img/register/es.png' },
          { name: 'Italian', flag: '../src/assets/img/register/it.png' },
          { name: 'Russian', flag: '../src/assets/img/register/ru.png' },
          { name: 'Mandarim', flag: '../src/assets/img/register/cn.png' }
        ],
        selectedNationalities: []

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
        login() {
          console.log(this.email,this.password);
        },
        
        },
        mounted () {
            this.toggleTab();
        },
};
</script>
  
<style scoped>
.outer-div {
    width: 120rem;
    height: 50rem;
    border-radius: 5%; 
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
    left: 55%; 
    border-radius: 0 5% 5% 0;
}
  
.tab-text {
    position: absolute;
    top: 5%; 
    left: 28%; 
    color: #193D4E; 
    font-family: 'Montserrat', sans-serif;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    cursor: pointer; 
    z-index: 50;
    transition: right 0.4s; 
}

.tab-text-right {
  left: auto; 
  right: 3%; 
  transition: left 0.4s; 
}
  
.tab-text .active-tab {
  font-family: 'Montserrat', sans-serif;
  text-decoration: underline; 
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
}

.lineLoginRegister {
    font-size: 2rem;
}

.v-dialog > .v-overlay__content > .v-card, .v-dialog > .v-overlay__content > form > .v-card {
    border-radius: 5%;
}

.titleLogin {
  position: fixed;
  z-index: 3;
  top: 25%;
  left: 22.5%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.titleRegister {
  position: fixed;
  z-index: 3;
  top: 22%;
  left: 77.5%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 35%;
}

.loginText {
  color: #193D4E!important;
  font-family: 'Montserrat', sans-serif;
  font-size: 4rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.registerText {
  color: #193D4E!important;
  font-family: 'Montserrat', sans-serif;
  font-size: 4rem;
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
  left: 55%;
  max-width: 45%;
  margin-top: 12em;
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
}

.selectLanguages {
  color: #193D4E;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-style: normal;
  font-weight: 100;
  line-height: normal;
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
</style>
  