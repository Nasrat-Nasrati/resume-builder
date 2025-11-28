import { ReactNode } from "react";

export type Employee = IEmployeeItem;

export interface IEmployeeItem {
  // ==================== IDENTIFICATION ====================
  id: string;
  employeeCode: string;
  
  // ==================== PERSONAL INFORMATION ====================
  firstName: string;
  lastName: string;
  fatherName: string;
  fullName: string;
  
  // ==================== IDENTITY DOCUMENTS ====================
  tazkiraNumber: string;
  passportNumber?: string;
  dateOfBirth: Date;
  placeOfBirth: string;
  gender: Gender;
  maritalStatus: MaritalStatus;
  nationality: string;
  
  // ==================== CONTACT INFORMATION ====================
  email?: string;
  phone?: string;
  emergencyContact?: EmergencyContact;
  
  // ==================== ADDRESS INFORMATION ====================
  address: Address;
  
  // ==================== EMPLOYMENT INFORMATION ====================
  companyId: string;
  companyName: string;
  department: string;
  position: string;
  jobTitle: string;
  employeeType: EmployeeType;
  hireDate: Date;
  employmentStatus: EmployeeStatus;
  
  // ==================== COMPENSATION & BENEFITS ====================
  salary?: number;
  currency?: string;
  bankAccount?: BankAccount;
  
  // ==================== EDUCATION & QUALIFICATIONS ====================
  education: Education[];
  
  // ==================== WORK INFORMATION ====================
  skills: string[];
  certifications: string[];
  languages: string[];
  
  // ==================== STATUS & METADATA ====================
  status: EmployeeStatus;
  isActive: boolean;
  tags: string[];
  notes?: string;
  
  // ==================== TIMESTAMPS ====================
  createdAt: Date;
  updatedAt: Date;
  lastEvaluationDate?: Date;
}

export type EmployeeStatus = 'active' | 'inactive' | 'on-leave' | 'terminated' | 'probation';
export type Gender = 'male' | 'female' | 'other';
export type MaritalStatus = 'single' | 'married' | 'divorced' | 'widowed';
export type EmployeeType = 'full-time' | 'part-time' | 'contract' | 'temporary' | 'intern';

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

// ADD THIS MISSING INTERFACE
export interface Address {
  street: string;
  city: string;
  state?: string;
  province?: string;
  country: string;
  zipCode?: string;
}

export interface Education {
  degree: string;
  field: string;
  grade: string;
  year: number;
  institution: string;
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  routingNumber?: string;
}

export interface IEmployeeCard {
  id: string;
  employeeCode: string;
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  jobTitle: string;
  companyId: string;
  companyName: string;
  department: string;
  status: EmployeeStatus;
  isActive: boolean;
  hireDate: Date;
  dateOfBirth: Date;
  gender: Gender;
  nationality: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEmployeeTableFilters {
  name: string;
  department: string[];
  status: string;
  position: string[];
  company: string[];
}