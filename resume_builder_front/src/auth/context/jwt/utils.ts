// ===========================
// src/auth/context/jwt/utils.ts
// ===========================

import axios from 'src/lib/axios';

import { JWT_STORAGE_KEY } from './constant';

// توکن معتبر است یا نه؟
// فعلاً فقط چک می‌کنیم وجود دارد یا نه
// اگر خواستی می‌توانی بعداً exp را با jwt-decode چک کنی
export function isValidToken(token: string | null) {
  return !!token;
}

// ذخیره/حذف توکن و تنظیم روی axios
export function setSession(accessToken: string | null) {
  if (accessToken) {
    localStorage.setItem(JWT_STORAGE_KEY, accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem(JWT_STORAGE_KEY);
    delete axios.defaults.headers.common.Authorization;
  }
}
