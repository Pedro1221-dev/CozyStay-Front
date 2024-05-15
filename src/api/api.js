import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:3000/', // URL do seu servidor back-end
});

export async function get(endpoint){
    try {
        const response= await api.get(endpoint);
        return handleResponse(response);
    } catch (error) {
        throw error;
    }
}

function handleResponse(response) {
    if (response.status === 200) {
        return response.data;
    } else {
        throw new Error('Error with status: ' + response.status);
    }
}

export default api;