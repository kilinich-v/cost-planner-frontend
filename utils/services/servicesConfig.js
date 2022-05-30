import axios from 'axios';

export const servicesConfig = axios.create({
  baseURL: 'http://192.168.0.102:8080'
});
