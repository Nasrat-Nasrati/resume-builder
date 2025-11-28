// src/types/company.ts

import { ReactNode } from "react";

export interface ICompanyItem {
  // ==================== IDENTIFICATION ====================
  id: string;
  companyCode: string;
  name: string;

  // ==================== VISUAL IDENTITY ====================
  logo: string;
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
  timezone: string;
  
  // ==================== SOCIAL MEDIA ====================
  facebookUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;

  // ==================== KEY PERSONNEL ====================
  ceoName: string;                     // CEO or President full name
  contactPerson: string;               // Primary contact person name
  contactPosition: string;             // Contact person's job title
  salesContact: string;                // Sales department contact person
  technicalContact?: string;           // Technical support contact person
  
  // ==================== BUSINESS INFORMATION ====================
  industry: string;                    // Primary industry category
  subIndustry?: string;                // Specialized industry segment
  companySize: CompanySize;            // Employee count range
  foundedYear?: number;                // Year company was established
  businessType: BusinessType;          // Legal business structure
  description?: string;                // Company overview and background
  missionStatement?: string;           // Company mission and values
  
  // ==================== SERVICES & OPERATIONS ====================
  services: string[];                  // List of services offered
  products: string[];                  // List of products offered
  targetMarket: string;                // Primary target customer segment
  certifications: string[];            // Business certifications held
  paymentMethods: string[];            // Accepted payment methods
  
  // ==================== STATUS & METADATA ====================
  status: CompanyStatus;               // Current business status
  isVerified: boolean;                 // Account verification status
  tags: string[];                      // Categorization tags
  notes?: string;                      // Internal administrative notes
  
  // ==================== TIMESTAMPS ====================
  createdAt: Date;
  updatedAt: Date;
  lastActivityAt?: Date;
  verifiedAt?: Date;
}

export type CompanyStatus = 'active' | 'inactive' | 'pending' | 'suspended' | 'verified' | 'rejected';
export type CompanySize = '1-10' | '11-50' | '51-200' | '201-500' | '501-1000' | '1000+';
export type BusinessType = 'sole-proprietorship' | 'partnership' | 'llc' | 'corporation' | 'non-profit' | 'government';


// Add this to your src/types/company.ts file

export interface ICompanyCard {
  id: string;
  name: string;
  logo: string;
  coverImage?: string;
  email: string;
  phoneNumber: string;
  industry: string;
  companySize: CompanySize;
  status: CompanyStatus;
  isVerified: boolean;
  description?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  website?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICompanyTableFilters {
  name: string;
  industry: string[];
  status: string;
  companySize: string[];
  country: string[];
}