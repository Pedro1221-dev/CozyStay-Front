import { defineStore } from 'pinia';
import * as api from '../api/api.js';

export const usePropertiesStore = defineStore('properties', {
  state: () => ({
    properties: [],
  }),
  getters: {
    getProperties: (state) => state.properties,
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
  },
});