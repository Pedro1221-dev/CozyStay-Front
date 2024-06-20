import { defineStore } from 'pinia';
import { post } from '../api/api.js';
import * as api from '../api/api.js';

export const useUserStore = defineStore('users', {
  state: () => ({
    users: [],
    user: null,
  }),
  getters: {
    getUsers: (state) => state.users,
    getUser: (state) => state.user,
  },
  actions: {
    async fetchUsers() {
      try {
        const data = await api.get('/users');
        this.users = data.data;
        console.log(this.users);
      } catch (error) {
        console.error('Error in store fetching objects:', error);
        // Handle error gracefully
      }
    },
    async createUser(user) {
      try {
        const response = await post('/users', user);
        this.users.push(response.data);
        return response.data;
      } catch (error) {
        console.error('Error in store creating user:', error);
        throw error; 
        // Handle error gracefully
      }
    },
    async validateOTP(user_id,otp) {
      try {
        const response = await post(`/users/verify-email`, {user_id: user_id, otp: otp});
        return response.data;
      } catch (error) {
        console.error('Error in store validating OTP:', error);
        throw error; 
        // Handle error gracefully
      }
    },
    async login(email, password) {
      try {
        const response = await post('/users/login', { email: email, password: password });
        console.log(response);
        sessionStorage.setItem('jwt', response.accessToken);
        return response.data;
      } catch (error) {
        console.error('Error in store logging in:', error);
        throw error; 
        // Handle error gracefully
      }
    },
    async getLoggedUser(token) {
      try {
          const response = await api.get(`/users/current`, {}, token);
          this.user = response.data;
          return response.data;
      } catch (error) {
          console.error('Error in store getting logged user:', error);
          throw error; 
          // Handle error gracefully
      }
    },
    async updateUser(updates, token) {
        try {
          const response = await api.patch(`/users/current`, updates, token);
          console.log('Response:', response);
          this.user = response.data;
          return response.data;
      } catch (error) {
          console.error('Error response:', error.response);
          console.error('Error in store updating user:', error);
          throw error; 
      }
    },
    async fetchBookingsUser(token,query){
      try {
        const response = await api.get(`/users/current/bookings`, query, token);
        return response.data;
      } catch (error) {
        console.error('Error in store fetching bookings:', error);
        throw error; 
        // Handle error gracefully
      }
    },
    async fetchFavoritesProperties(token){
      try {
        const response = await api.get(`/users/current/favorites`, {}, token);
        return response.data[0].favoriteProperty;
      } catch (error) {
        console.error('Error in store fetching favorite bookings:', error);
        throw error; 
        // Handle error gracefully
      }
    },
  },
});