import axios from 'axios';
import useStore from '../store/UseStore';

const { setUser } = useStore.getState();

const api = axios.create({
  baseURL: import.meta.env.VITE_dev
    ? `http://${import.meta.env.VITE_dev_api}/api/auth`
    : `https://${import.meta.env.VITE_prod_api}/api/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    // if login is successful, store the user data in the global state
    if (response.data && response.data.user) {
      setUser(response.data.user);
    }
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error.response ? error.response.data : error;
  }
};

export const register = async (email, password) => {
  try {
    const response = await api.post('/register', { email, password });
    // if registration is successful, store the user data in the global state
    if (response.data && response.data.user) {
      setUser(response.data.user);
    }
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error.response ? error.response.data : error;
  }
};

export const logout = async () => {
  try {
    const response = await api.post('/logout');
    return response.data;
  } catch (error) {
    console.error('Logout error:', error);
    throw error.response ? error.response.data : error;
  }
};
