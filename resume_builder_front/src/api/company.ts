// ===============================
// src/api/company.ts
// ===============================

import { COMPANIES_ENDPOINT } from 'src/config/api';

import apiClient from './apiClient';

export type Company = {
  id: number;
  name: string;
  // هر فیلد دیگری که بک‌اند برمی‌گرداند اینجا اضافه کن
  // مثلاً:
  // address?: string;
  // phone?: string;
  [key: string]: any;
};

export async function fetchCompanies(): Promise<Company[]> {
  const response = await apiClient.get<Company[]>(COMPANIES_ENDPOINT);
  return response.data;
}
