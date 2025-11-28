// src/_mock/employees.ts
import { 
  Employee, 
  EmployeeStatus, 
  Gender, 
  MaritalStatus, 
  EmployeeType,
  EmergencyContact,
  Address,
  Education,
  BankAccount 
} from '../types/employee';

export const _employeeList: Employee[] = [
  {
    // ==================== IDENTIFICATION ====================
    id: '1',
    employeeCode: 'EMP-001',
    
    // ==================== PERSONAL INFORMATION ====================
    firstName: 'Nasrat',
    lastName: 'Nasrati',
    fatherName: 'Mohammad Ali',
    fullName: 'Nasrat Nasrati',
    
    // ==================== IDENTITY DOCUMENTS ====================
    tazkiraNumber: '111111111111111',
    dateOfBirth: new Date('1990-05-15'),
    placeOfBirth: 'Kabul',
    gender: 'male',
    maritalStatus: 'married',
    nationality: 'Afghan',
    
    // ==================== CONTACT INFORMATION ====================
    email: 'nasrat@gmail.com',
    phone: '+93770694437',
    emergencyContact: {
      name: 'Zahra Khan',
      relationship: 'Wife',
      phone: '+93-70-987-6543'
    },
    
    // ==================== ADDRESS INFORMATION ====================
    address: {
      street: 'House 123, Street 15, District 5',
      city: 'Kabul',
      country: 'Afghanistan'
    },
    
    // ==================== EMPLOYMENT INFORMATION ====================
    companyId: 'comp-001',
    companyName: 'Premium Real Estate Group',
    department: 'Sales',
    position: 'senior-sales-agent',
    jobTitle: 'Senior Sales Agent',
    employeeType: 'full-time',
    hireDate: new Date('2018-03-10'),
    employmentStatus: 'active',
    
    // ==================== COMPENSATION & BENEFITS ====================
    salary: 50000,
    currency: 'USD',
    
    // ==================== EDUCATION & QUALIFICATIONS ====================
    education: [
      {
        degree: 'Bachelor',
        field: 'Computer Science',
        grade: 'A',
        year: 2012,
        institution: 'Kabul University'
      }
    ],
    
    // ==================== WORK INFORMATION ====================
    skills: ['Sales', 'Negotiation', 'Customer Relations'],
    certifications: ['Certified Sales Professional'],
    languages: ['Dari', 'Pashto', 'English'],
    
    // ==================== STATUS & METADATA ====================
    status: 'active',
    isActive: true,
    tags: ['top-performer'],
    
    // ==================== TIMESTAMPS ====================
    createdAt: new Date('2018-03-10'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    employeeCode: 'EMP-002',
    firstName: 'Fatima',
    lastName: 'Rahimi',
    fatherName: 'Ali Rahimi',
    fullName: 'Fatima Rahimi',
    tazkiraNumber: 'KBL-1234568',
    dateOfBirth: new Date('1992-08-20'),
    placeOfBirth: 'Herat',
    gender: 'female',
    maritalStatus: 'single',
    nationality: 'Afghan',
    email: 'fatima.rahimi@company.com',
    phone: '+93-70-123-4568',
    address: {
      street: 'House 456, Street 8, District 3',
      city: 'Kabul',
      country: 'Afghanistan'
    },
    companyId: 'comp-002',
    companyName: 'Premium Real Estate Group',
    department: 'Sales Management',
    position: 'sales-manager',
    jobTitle: 'Sales Manager',
    employeeType: 'full-time',
    hireDate: new Date('2019-06-15'),
    employmentStatus: 'active',
    education: [
      {
        degree: 'Master',
        field: 'Marketing',
        grade: 'A+',
        year: 2014,
        institution: 'American University of Afghanistan'
      }
    ],
    skills: ['Team Management', 'Strategic Planning'],
    certifications: ['Project Management Professional'],
    languages: ['Dari', 'Pashto', 'English'],
    status: 'active',
    isActive: true,
    tags: ['manager'],
    createdAt: new Date('2019-06-15'),
    updatedAt: new Date('2024-01-12')
  },
  {
    id: '3',
    employeeCode: 'EMP-003',
    firstName: 'Mohammad',
    lastName: 'Nazari',
    fatherName: 'Hassan Nazari',
    fullName: 'Mohammad Nazari',
    tazkiraNumber: 'KBL-1234569',
    dateOfBirth: new Date('1988-12-05'),
    placeOfBirth: 'Mazar-i-Sharif',
    gender: 'male',
    maritalStatus: 'married',
    nationality: 'Afghan',
    email: 'mohammad.nazari@company.com',
    phone: '+93-70-123-4569',
    address: {
      street: 'House 789, Street 12, District 7',
      city: 'Kabul',
      country: 'Afghanistan'
    },
    companyId: 'comp-003',
    companyName: 'Premium Real Estate Group',
    department: 'Sales',
    position: 'sales-agent',
    jobTitle: 'Sales Agent',
    employeeType: 'full-time',
    hireDate: new Date('2020-01-20'),
    employmentStatus: 'active',
    education: [
      {
        degree: 'Bachelor',
        field: 'Economics',
        grade: 'B+',
        year: 2010,
        institution: 'Balkh University'
      }
    ],
    skills: ['Customer Service', 'Property Valuation'],
    certifications: ['Real Estate Sales Certification'],
    languages: ['Dari', 'Pashto'],
    status: 'active',
    isActive: true,
    tags: ['reliable'],
    createdAt: new Date('2020-01-20'),
    updatedAt: new Date('2024-01-08')
  }
];