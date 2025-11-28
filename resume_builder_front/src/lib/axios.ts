// ===============================
// src/lib/axios.ts
// ===============================

import type { AxiosRequestConfig } from 'axios';

import axios from 'axios';

// --------------------------------------
// axios باید BASE_URL نداشته باشد
// تا تمام request‌ها از Vite Proxy عبور کنند
// --------------------------------------

const axiosInstance = axios.create({
  baseURL: '',   // ❗❗ مهم: هیچ URL نگذار
});

// Error Handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong!')
);

export default axiosInstance;

// ===============================
// fetcher
// ===============================

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
};

// ===============================
// Endpoints (فرانت فقط مسیرها را بداند)
// axios خود مسیر کامل را از proxy می‌گیرد
// ===============================

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {    
    me: '/api/account',          // ✅ پروفایل کاربر لاگین شده (JHipster)
    signIn: '/api/authenticate', // ✅ لاگین
    signUp: '/api/auth/sign-up',
    changePassword: '/api/users/change-password',
  },
  users: {
    all: '/api/users/all',
    register: '/api/users/register',
    delete: (id: string | number) => `/api/users/${id}`,
    update: (id: string | number) => `/api/users/${id}`,
  },

  plans: {
    all: '/api/plans',
    register: '/api/plans',
    delete: (id: string | number) => `/api/plans/${id}`,
    update: (id: string | number) => `/api/plans/${id}`,
  },

  mail: { list: '/api/mail/list', details: '/api/mail/details', labels: '/api/mail/labels' },

  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },

  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
};
