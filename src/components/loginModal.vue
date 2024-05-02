<template>
    <v-dialog 
        v-model="loginDialog"
        @update:model-loginDialog="$emit('input', false)"
        width="auto">
      <v-card max-width="1700" class="overflow-hidden">
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
                <div class="title">
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
                <!-- Conteúdo da aba de registro -->
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
        loginDialog: false,
        activeTab: 'Login',
        overlayToLeft: true,
        email: "",
        password: "",
        rules: {
          required: value => !!value || 'Field is required',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
          
        },
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
      }
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
@font-face {
      font-family: 'Montserrat Light';
      src: url(../assets/fonts/Montserrat-Light.ttf);
}

@font-face {
      font-family: 'Montserrat Medium';
      src: url(../assets/fonts/Montserrat-Medium.ttf);
}

@font-face {
      font-family: 'Montserrat SemiBold';
      src: url(../assets/fonts/Montserrat-SemiBold.ttf);
}

@font-face {
      font-family: 'Montserrat Regular';
      src: url(../assets/fonts/Montserrat-Regular.ttf);
}

.outer-div {
    width: 120rem;
    height: 50rem;
    border-radius: 5%; 
}
  
.inner-div {
    position: relative; 
    width: 107.125rem;
    height: 50rem;
    background-image: url('../assets/img/login/login-background.webp'); 
    background-size: cover;
    border-radius: inherit; 
}
  
.overlay {
    position: absolute; 
    top: 0; 
    left: 0; 
    width: 50%; 
    height: 100%; 
    background-color: rgba(231, 230, 211, 0.7); 
    z-index: 1; 
    transition: left 0.3s; 
    border-radius: 5% 0 0 5%; 
}
  
.overlay-right {
    left: 40%; 
    border-radius: 0 5% 5% 0;
}
  
.tab-text {
    position: absolute;
    top: 5%; 
    left: 35%; 
    color: #193D4E; 
    font-family: Montserrat Light;
    font-size: 1.5rem;
    font-style: normal;
    line-height: normal;
    cursor: pointer; 
    z-index: 50;
    transition: left 0.3s; 
}

.tab-text-right {
  left: auto; 
  right: 18%; 
  transition: left 0.3s; 
}
  
.tab-text .active-tab {
    font-family: Montserrat Medium;
    text-decoration: underline; 
    font-weight: 500;
}

.lineLoginRegister {
    font-size: 2rem;
}

.v-dialog > .v-overlay__content > .v-card, .v-dialog > .v-overlay__content > form > .v-card {
    border-radius: 5%;
}

.title {
  position: fixed;
  z-index: 3;
  top: 25%;
  left: 29%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.loginText {
  color: #193D4E!important;
  font-family: Montserrat SemiBold;
  font-size: 4rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.loginButton {
  background-color: #193D4E!important;
  margin-top: 4em;
  font-family: Montserrat Regular;
  font-size: 1.5em;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.login-section {
  z-index: 3;
  position: relative;
  bottom: 50%;
  left: 25%;
  transform: translate(-50%, -50%);
  padding-top: 65em;
}

.form-background{
  background-color: transparent;
}


.custom-class-text-input {
  font-family: Montserrat SemiBold;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  color: #193D4E;
}
</style>
  