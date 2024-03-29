import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT || '3001'}`,
});

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

export const requestData = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const requestLogin = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const requestWithToken = async (endpoint, body, token) => {
  setToken(token);
  const { data } = await api.post(endpoint, body);
  return data;
};

export const requestUpdate = async (endpoint, body) => {
  const { data } = await api.put(endpoint, body);
  return data;
};

export const requestDelete = async (endpoint, email, token) => {
  setToken(token);
  const { data } = await api.delete(endpoint, { data: email });
  return data;
};

export default api;
