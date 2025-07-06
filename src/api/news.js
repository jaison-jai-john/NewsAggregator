import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_dev
    ? `http://${import.meta.env.VITE_dev_api}/api/news`
    : `https://${import.meta.env.VITE_prod_api}/api/news`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTopHeadlines = async (params) => {
  try {
    const response = await api.post('/top-headlines', params);
    return response.data;
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    throw error.response ? error.response.data : error;
  }
};

export const getEverything = async (params) => {
  try {
    const response = await api.post('/everything', params);
    return response.data;
  } catch (error) {
    console.error('Error fetching everything:', error);
    throw error.response ? error.response.data : error;
  }
};
