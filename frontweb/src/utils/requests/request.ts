import axios, { AxiosRequestConfig } from 'axios';

import { getAuthData } from 'utils/storage';

import { BASE_URL } from './request-config';
import { FilterData } from 'utils/types/types';
import { formatDateToServe } from './formatters';

export const requestBackend = (config: AxiosRequestConfig) => {
  const headers = config.withCredentials
    ? {
        ...config.headers,
        Authorization: 'Bearer ' + getAuthData().access_token,
      }
    : config.headers;

  return axios({ ...config, baseURL: BASE_URL, headers });
};

export const buildFilterParams = (filterData?: FilterData) => {
  return {
    startDate: formatDateToServe(filterData?.dates?.[0]),
    endDate: formatDateToServe(filterData?.dates?.[1]),
    expenseType: filterData?.expenseType,
  };
};
