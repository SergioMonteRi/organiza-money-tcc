import qs from 'qs';
import axios from 'axios';

import { LoginRequest, UserRegisterRequest } from 'utils/types/request-types';

import { BASE_URL, CLIENT_ID, CLIENT_SECRET } from './request-config';

export const requestBackendLogin = (loginData: LoginRequest) => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_SECRET),
  };

  const data = qs.stringify({
    ...loginData,
    grant_type: 'password',
  });

  return axios({
    method: 'POST',
    baseURL: BASE_URL,
    url: '/oauth/token',
    data,
    headers,
  });
};

export const requestBackendUserRegister = (
  userRegisterData: UserRegisterRequest
) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_SECRET),
  };

  const data = JSON.stringify(userRegisterData);

  return axios({
    method: 'POST',
    baseURL: BASE_URL,
    url: '/users',
    data,
    headers,
  });
};
