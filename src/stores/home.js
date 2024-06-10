import { defineStore } from 'pinia';
import * as api from '../api/api.js';

export const useHomeStore = defineStore('home', {
    state: () => ({
      home: [],
      cityImages: {}
    }),
    getters: {
      getHome: (state) => state.home,
      getCityImages: (state) => state.cityImages
    },
    actions: {
        async fetchHome() {
            try {
              const data = await api.get('/home');
              this.home = data;
              console.log(data);
              
              // Fetch city images
              const client_id = '946mlRav1bsEoSbBfObnsgHvVrsm5favi1Hw3XL50sw';
              for (let destination of data.topDestinations) {
                  const url = `https://api.unsplash.com/search/photos?query=${destination.city}&client_id=${client_id}`;
                  try {
                      const response = await fetch(url);
                      if (response.ok) {
                          const imageData = await response.json();
                          if (imageData.results.length > 0) {
                              this.cityImages[destination.city] = imageData.results[Math.floor(Math.random() * imageData.results.length)].urls.regular;
                          } else {
                              this.cityImages[destination.city] = 'Nenhuma foto encontrada para a cidade especificada.';
                          }
                      } else {
                          this.cityImages[destination.city] = `Erro na requisição: ${response.status}`;
                      }
                  } catch (error) {
                      console.error('Error fetching city image:', error);
                  }
              }
              
              return data;
              } catch (error) {
                  console.error('Error in store fetching objects:', error);
                  // Handle error gracefully
              }
        },
    },
});