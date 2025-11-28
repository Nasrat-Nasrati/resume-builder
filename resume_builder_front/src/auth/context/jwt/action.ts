// ===========================
// src/auth/context/jwt/action.ts
// ===========================

import axios from 'src/lib/axios';

import { setSession } from './utils';
import { endpoints } from './constant';

// ---------------------------------------
// Types
// ---------------------------------------
export type LoginParams = {
  username: string; // اگر بک‌اند email می‌خواهد، این را email کن
  password: string;
};

export type User = {
  id?: string | number;
  username?: string;
  email?: string;
  [key: string]: any;
};

// پارامترهای sign-in / sign-up که view ها استفاده می‌کنند
export type SignInWithPasswordParams = {
  email?: string;
  username?: string;
  identifier?: string; // برای jwt-sign-in-view
  password: string;
  firstName?: string;  // برای jwt-sign-up-view (الان استفاده نمی‌کنیم)
  lastName?: string;   // برای jwt-sign-up-view (الان استفاده نمی‌کنیم)
};

// ---------------------------------------
// داخلی: login (مستقیماً username + password می‌گیرد)
// ---------------------------------------
export async function login({ username, password }: LoginParams): Promise<User> {
  const response = await axios.post(endpoints.auth.login, {
    username,
    password,
  });

  // بک‌اند در پاسخ چیزی شبیه این برمی‌گرداند:
  // { "id_token": "eyJhbGciOiJIUzUxMiJ9..." }
  const { id_token } = response.data;

  if (!id_token) {
    // اگر ساختار پاسخ عوض شده باشد، این کمک می‌کند زود بفهمی
    throw new Error('No id_token returned from API');
  }

  // توکن را ذخیره و روی axios ست کن
  setSession(id_token);

  // اگر بک‌اند یوزر را هم برگرداند، استفاده می‌کنیم؛
  // در غیر این صورت حداقل username را ذخیره می‌کنیم.
  const user: User = response.data.user ?? { username };

  // ذخیره‌ی یوزر در localStorage (اختیاری)
  localStorage.setItem('user', JSON.stringify(user));

  return user;
}

// ---------------------------------------
// signInWithPassword (تابعی که view لاگین استفاده می‌کند)
// ---------------------------------------
export async function signInWithPassword(
  params: SignInWithPasswordParams
): Promise<User> {
  const { email, username, identifier, password } = params;

  // اولویت: username → email → identifier
  const loginUsername = username ?? email ?? identifier ?? '';

  if (!loginUsername) {
    throw new Error('Username, email, or identifier is required');
  }

  const user = await login({ username: loginUsername, password });
  return user;
}

// ---------------------------------------
// signUp (برای اینکه TypeScript خوشحال باشد)
// الان فقط مثل signInWithPassword عمل می‌کند
// ---------------------------------------
export async function signUp(
  params: SignInWithPasswordParams
): Promise<User> {
  // اگر بعداً بک‌اند signup واقعی داشتی، اینجا عوضش می‌کنی
  return signInWithPassword(params);
}

// ---------------------------------------
// signOut (برای دکمه خروج)
// ---------------------------------------
export function signOut() {
  setSession(null);
  localStorage.removeItem('user');
}

// برای استفاده احتمالی در جای دیگر
export function getUser(): User | null {
  const data = localStorage.getItem('user');
  return data ? JSON.parse(data) : null;
}
