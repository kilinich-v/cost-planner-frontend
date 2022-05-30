import axios from 'axios';

import { servicesConfig } from './servicesConfig';
import { handleServerRequestError } from '../helpers';

class AuthService {
  constructor(api) {
    this.api = api;
    this.path = {
      register: `${this.api}/register`,
      login: `${this.api}/login`,
      logout: `${this.api}/logout`,
      current: `${this.api}/current`
    };
  }

  async register(user) {
    try {
      const res = await servicesConfig.post(this.path.register, user);
      console.log(res);
      return res.data;
    } catch (error) {
      handleServerRequestError(error);
    }
  }

  async login(user) {
    try {
      const res = await servicesConfig.post(this.path.login, user);

      return res.data;
    } catch (error) {
      handleServerRequestError(error);
    }
  }

  async logout(id, token) {
    servicesConfig.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    try {
      const res = await servicesConfig.post(this.path.login, { user: { id } });

      return res.data;
    } catch (error) {
      handleServerRequestError(error);
    }
  }
}

export const authService = new AuthService(`/user`);
