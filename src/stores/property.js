import { defineStore } from 'pinia';
import * as api from '../api/api.js';

export const usePropertiesStore = defineStore('properties', {
  state: () => ({
    properties: [],
    property:null,
  }),
  getters: {
    getProperties: (state) => state.properties,
    getProperty: (state) => state.property,
  },
  actions: {
      async fetchProperties(searchOptions) {
          try {
            console.log('search options:', searchOptions)
              const data = await api.get('/properties', searchOptions );
              this.properties = data.data;
              return data;
          } catch (error) {
              console.error('Error in store fetching objects:', error);
              // Handle error gracefully
          }
      },
      async getPendingProperties() {
        try {
            const data = await api.get('/properties',{status: 'pending'});
            this.properties = data.data;
            return data;
        } catch (error) {
            console.error('Error in store fetching objects:', error);
            // Handle error gracefully
        }
    },
      async fetchOneProperty(id) {
          try {
              const data = await api.get(`/properties/${id}`);
              this.property = data.data;
              return data;
          } catch (error) {
              console.error('Error in store fetching objects:', error);
              // Handle error gracefully
          }
      },
      async createProperty(property,token) {
          try {
              const data = await api.post('/properties', property, token, 'multipart/form-data');
              this.properties.push(data.data);
              return data;
          } catch (error) {
              console.error('Error in store creating object:', error);
              // Handle error gracefully
          }
      },
      async changeStatus(id_property){
        try {
            const data = null;
            const token = sessionStorage.getItem('jwt');
            const response = await api.patch(`/properties/${id_property}/confirm`,data,token);
            return response;
        } catch (error) {
            console.error('Error in store fetching objects:', error);
            // Handle error gracefully
        }
      }
  },
});