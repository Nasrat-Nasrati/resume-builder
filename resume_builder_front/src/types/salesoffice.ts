import { ReactNode } from "react";

// SINGLE SalesOffice interface that matches BOTH your mock data and component expectations
export interface SalesOffice {
 
  // ==================== IDENTIFICATION ====================
  id: string;
  officeCode: string;
  name: string;
  officeType: OfficeType;

  // ==================== VISUAL IDENTITY ====================
  logo?: string;
  coverImage?: string;
  
  // ==================== CONTACT INFORMATION ====================
  email: string;
  phoneNumber: string;
  alternatePhone?: string;
  website?: string;

  // ==================== LOCATION INFORMATION ====================
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode?: string;
  timezone?: string;
  
  // ==================== KEY PERSONNEL ====================
  officeManager?: string;
  officeManagerName: string;
  regionalDirector: string;
  salesTeamLead?: string;
  supportStaffContact?: string;
  
  // ==================== OFFICE INFORMATION ====================
  companyId: string;
  companyName: string;
  establishedYear: number;
  totalEmployees: number;
  officeSize: string;
  facilities: string[];
  
  // ==================== OPERATIONAL INFORMATION ====================
  operatingHours: OperatingHours;
  servicesOffered: string[];
  targetRegions: string[];
  
  // ==================== STATUS & METADATA ====================
  status: SalesOfficeStatus;
  isVerified: boolean;
  tags: string[];
  notes?: string;
  
  // ==================== TIMESTAMPS ====================
  createdAt: Date;
  updatedAt: Date;
  lastActivityAt?: Date;
}

// ALIAS - This makes ISalesOfficeItem the SAME as SalesOffice
export type ISalesOfficeItem = SalesOffice;

export type SalesOfficeStatus = 'active' | 'inactive' | 'pending' | 'closed' | 'under-construction';
export type OfficeType = 'headquarters' | 'regional' | 'branch' | 'satellite' | 'showroom';

export interface OperatingHours {
  weekdays: string;
  saturday: string;
  sunday: string;
}

export interface ISalesOfficeCard {
  id: string;
  officeCode: string;
  name: string;
  logo?: string;
  coverImage?: string;
  email: string;
  phoneNumber: string;
  officeType: OfficeType;
  companyName: string;
  officeManagerName: string;
  status: SalesOfficeStatus;
  isVerified: boolean;
  address: string;
  city: string;
  state: string;
  country: string;
  totalEmployees: number;
  establishedYear: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISalesOfficeTableFilters {
  name: string;
  officeType: string[];
  status: string;
  company: string[];
  city: string[];
}