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
              const data = await api.get('/properties', searchOptions );
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
    }
  },
});