<template>
    <v-dialog 
        v-model="loginDialog"
        @update:model-loginDialog="$emit('input', false)"
        width="auto">
      <v-card max-width="1700">
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
        }
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
    left: 50%; 
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
    z-index: 2;
    transition: left 0.3s; 
}

.tab-text-right {
  left: auto; 
  right: 5%; 
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
</style>
  