import { defineStore } from 'pinia';
import * as api from '../api/api.js';
import { post } from '../api/api.js';

export const useBookingStore = defineStore('booking', {
  state: () => ({
    bookings: [],
    booking:null,
  }),
  actions: {
    async createBooking(booking) {
        try {
          const token = sessionStorage.getItem('jwt')
          const response = await post('/bookings', booking, token);
          this.bookings.push(response.data);
          return response.data;
        } catch (error) {
          console.error('Error in store creating booking:', error);
          throw error; 
          // Handle error gracefully
        }
      },
    },
});