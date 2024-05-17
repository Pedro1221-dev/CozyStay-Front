import { defineStore } from 'pinia';
import { post } from '../api/api.js';

export const useUserStore = defineStore('users', {
  state: () => ({
    users: [],
  }),
  getters: {
    getUsers: (state) => state.users,
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
      } catch (error) {
        console.error('Error in store creating user:', error);
        throw error; 
        // Handle error gracefully
      }
    },
  },
});