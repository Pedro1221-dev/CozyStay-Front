import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:3000/', // URL do seu servidor back-end
});

export async function get(endpoint, params){
  try {
    const response= await api.get(endpoint, { params });
    return handleResponse(response);
  } catch (error) {
      throw error;
  }
}

export async function post(endpoint, data, token = null) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    console.log('POST request to', endpoint, 'with data', data);
    const response = await api.post(endpoint, data, { headers: headers });
    return handleResponse(response);
  } catch (error) {
    console.error(`ENTREIIIIIIIIIIIIIIII Error posting to ${endpoint}:`, error);
    throw error;
  }
}

async function handleResponse(response) {
  if (response.status === 200) {
    return response.data;
  } else {
    const errorBody = await response.json();
    console.error(`Error with status: ${response.status}, body: ${JSON.stringify(errorBody)}, full response: ${JSON.stringify(response)}`);
    throw new Error(`Error with status: ${response.status}, body: ${JSON.stringify(errorBody)}`);
  }
}

export default api;