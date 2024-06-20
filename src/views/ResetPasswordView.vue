<template>
  <form class="form">
    <h2>Reset Password</h2>
    <v-text-field 
        clearable
        v-model="password" 
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
    class="registerButton" @click="resetPassword">Continue</v-btn>
  </form>
  
</template>
  
<script>
  import { patch } from '@/api/api'; 
  import { useToast } from "vue-toastification";
  import router from '@/router'; 

  export default {
    setup() {
      // Get toast interface
      const toast = useToast();

      // Make it available inside methods
      return { toast }
    },
    data() {
      return {
        token: this.$route.params.token,
        password: "",
        confirmPassword: "",
        rules:{
          password: [
            v => !!v || 'Password is required',
            v => (v && v.length >= 8) || 'Password must be at least 8 characters',
            v => (v && /\W/.test(v)) || 'Password must contain at least one special character'
          ],
          confirmPassword: [
            v => !!v || 'Password confirmation is required',
            v => (v && v === this.password) || 'Passwords must match'
          ],
        } 
      };
    },
    methods: {
      async resetPassword() {
        try {
          const response = await patch(`users/reset-password/${this.token}`, { password: this.password, confirmPassword: this.confirmPassword});
          console.log(response);
          this.toast.success('Password reset successfully!');
          setTimeout(() => {
            router.push({
              path: '/',
            });
          }, 3000);
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
  </script>
  
<style scoped>

  h2{
    display: flex;
    color: #193D4E;
    justify-content: center;
    font-size: 26px;
    font-weight: 400;
  }

  .form{
    background: rgba(165, 232, 226, 0.45);
    width: 50%;
    height: 450px;
    border-radius: 20px;
    padding: 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 8% 25% 5% 25%;

  }

  .custom-class-text-input {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    color: #193D4E;
  }

  .registerButton {
    width: 10px !important;
    background-color: #193D4E!important;
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  ::v-deep .registerButton .v-btn__content {
    width: 10px !important; /* Set the width as per your requirement */
  }

</style>
