// ===============================
// src/auth/context/jwt/constant.ts
// ===============================

// کلید ذخیره‌سازی توکن در localStorage
export const JWT_STORAGE_KEY = 'accessToken';

// به جای آدرس کامل سرور، فقط path را می‌گذاریم
// تا ریکوئست از طریق origin فعلی (localhost:3000) رد بشود
export const JWT_API = '/api';

// endpoint ها
export const endpoints = {
  auth: {
    login: `${JWT_API}/authenticate`,
  },
};
