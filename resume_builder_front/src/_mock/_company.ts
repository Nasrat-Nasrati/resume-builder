// src/_mock.ts

import { CompanySize, CompanyStatus } from "src/types/company";

// ... your existing user mock data ...

// =============================================================================
// COMPANY MOCK DATA
// =============================================================================

export const COMPANY_STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' },
  { value: 'suspended', label: 'Suspended' },
  { value: 'verified', label: 'Verified' },
  { value: 'rejected', label: 'Rejected' },
];

export const COMPANY_SIZE_OPTIONS = [
  { value: '1-10', label: '1-10 Employees' },
  { value: '11-50', label: '11-50 Employees' },
  { value: '51-200', label: '51-200 Employees' },
  { value: '201-500', label: '201-500 Employees' },
  { value: '501-1000', label: '501-1000 Employees' },
  { value: '1000+', label: '1000+ Employees' },
];

export const BUSINESS_TYPE_OPTIONS = [
  { value: 'sole-proprietorship', label: 'Sole Proprietorship' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'llc', label: 'LLC' },
  { value: 'corporation', label: 'Corporation' },
  { value: 'non-profit', label: 'Non-Profit' },
  { value: 'government', label: 'Government' },
];

export const _companyList = [
  {
    // ==================== IDENTIFICATION ====================
    id: 'comp_001',
    companyCode: 'TAX-001-2024',
    name: 'Tech Innovators Inc.',

    // ==================== VISUAL IDENTITY ====================
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop&crop=center',
    coverImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=400&fit=crop',
    
    // ==================== CONTACT INFORMATION ====================
    email: 'contact@techinnovators.com',
    phoneNumber: '+1-555-0101',
    alternatePhone: '+1-555-0102',
    website: 'https://techinnovators.com',

    // ==================== LOCATION INFORMATION ====================
    address: '123 Tech Park Drive',
    city: 'San Francisco',
    state: 'California',
    country: 'United States',
    timezone: 'America/Los_Angeles',
    
    // ==================== SOCIAL MEDIA ====================
    facebookUrl: 'https://facebook.com/techinnovators',
    instagramUrl: 'https://instagram.com/techinnovators',
    linkedinUrl: 'https://linkedin.com/company/techinnovators',
    youtubeUrl: 'https://youtube.com/techinnovators',

    // ==================== KEY PERSONNEL ====================
    ceoName: 'Ahmad Khan', // From employees
    contactPerson: 'Fatima Rahimi', // From employees
    contactPosition: 'Sales Manager', // From employees
    salesContact: 'Mohammad Nazari', // From employees
    technicalContact: 'David Kim',
    
    // ==================== BUSINESS INFORMATION ====================
    industry: 'Technology',
    subIndustry: 'Software Development',
    companySize: '51-200',
    foundedYear: 2018,
    businessType: 'corporation',
    description: 'Leading provider of innovative software solutions for enterprise businesses.',
    missionStatement: 'To transform businesses through cutting-edge technology solutions.',
    
    // ==================== SERVICES & OPERATIONS ====================
    services: ['Web Development', 'Mobile App Development', 'Cloud Solutions', 'IT Consulting'],
    products: ['Enterprise CRM', 'Project Management Suite', 'Analytics Dashboard'],
    targetMarket: 'Medium to Large Enterprises',
    certifications: ['ISO 27001', 'Microsoft Gold Partner', 'AWS Advanced Consulting'],
    paymentMethods: ['Credit Card', 'Bank Transfer', 'PayPal', 'Stripe'],
    
    // ==================== SALES OFFICE INFORMATION ====================
    salesOffice: {
      id: '1',
      name: 'New York Downtown Sales Office',
      officeManager: 'Sarah Johnson'
    },
    
    // ==================== STATUS & METADATA ====================
    status: 'active',
    isVerified: true,
    tags: ['Technology', 'Enterprise', 'SaaS', 'B2B'],
    notes: 'Premium client with excellent payment history',
    
    // ==================== TIMESTAMPS ====================
    createdAt: new Date('2020-03-15'),
    updatedAt: new Date('2024-01-10'),
    lastActivityAt: new Date('2024-01-15'),
    verifiedAt: new Date('2020-06-20'),
  },
  {
    // ==================== IDENTIFICATION ====================
    id: 'comp_002',
    companyCode: 'TAX-002-2024',
    name: 'Green Energy Solutions',

    // ==================== VISUAL IDENTITY ====================
    logo: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=200&h=200&fit=crop&crop=center',
    coverImage: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=400&fit=crop',
    
    // ==================== CONTACT INFORMATION ====================
    email: 'info@greenenergy.com',
    phoneNumber: '+1-555-0202',
    alternatePhone: '+1-555-0203',
    website: 'https://greenenergy.com',

    // ==================== LOCATION INFORMATION ====================
    address: '456 Eco Park Avenue',
    city: 'Denver',
    state: 'Colorado',
    country: 'United States',
    timezone: 'America/Denver',
    
    // ==================== SOCIAL MEDIA ====================
    facebookUrl: 'https://facebook.com/greenenergy',
    linkedinUrl: 'https://linkedin.com/company/greenenergy',

    // ==================== KEY PERSONNEL ====================
    ceoName: 'Robert Green',
    contactPerson: 'Jennifer Martinez',
    contactPosition: 'Project Coordinator',
    salesContact: 'Kevin Wilson',
    technicalContact: 'Lisa Thompson',
    
    // ==================== BUSINESS INFORMATION ====================
    industry: 'Energy',
    subIndustry: 'Renewable Energy',
    companySize: '11-50',
    foundedYear: 2015,
    businessType: 'llc',
    description: 'Provider of sustainable energy solutions for residential and commercial properties.',
    missionStatement: 'Making renewable energy accessible to everyone.',
    
    // ==================== SERVICES & OPERATIONS ====================
    services: ['Solar Panel Installation', 'Energy Audits', 'Maintenance Services'],
    products: ['Residential Solar Kits', 'Commercial Energy Systems'],
    targetMarket: 'Homeowners and Small Businesses',
    certifications: ['NABCEP Certified', 'LEED Accredited'],
    paymentMethods: ['Credit Card', 'Financing', 'Bank Transfer'],
    
    // ==================== SALES OFFICE INFORMATION ====================
    salesOffice: {
      id: '8',
      name: 'Denver Mountain Region Office',
      officeManager: 'Amanda Lee'
    },
    
    // ==================== STATUS & METADATA ====================
    status: 'verified',
    isVerified: true,
    tags: ['Renewable Energy', 'Sustainability', 'Green Tech'],
    notes: 'Fast-growing company in renewable sector',
    
    // ==================== TIMESTAMPS ====================
    createdAt: new Date('2019-08-22'),
    updatedAt: new Date('2024-01-08'),
    lastActivityAt: new Date('2024-01-12'),
    verifiedAt: new Date('2020-01-15'),
  },
  {
    // ==================== IDENTIFICATION ====================
    id: 'comp_003',
    companyCode: 'TAX-003-2024',
    name: 'Creative Design Studio',

    // ==================== VISUAL IDENTITY ====================
    logo: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=200&fit=crop&crop=center',
    coverImage: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=800&h=400&fit=crop',
    
    // ==================== CONTACT INFORMATION ====================
    email: 'hello@creativedesign.com',
    phoneNumber: '+1-555-0303',
    website: 'https://creativedesign.com',

    // ==================== LOCATION INFORMATION ====================
    address: '789 Design District',
    city: 'New York',
    state: 'New York',
    country: 'United States',
    timezone: 'America/New_York',
    
    // ==================== SOCIAL MEDIA ====================
    instagramUrl: 'https://instagram.com/creativedesign',
    behanceUrl: 'https://behance.net/creativedesign',

    // ==================== KEY PERSONNEL ====================
    ceoName: 'Amanda Rodriguez',
    contactPerson: 'Thomas Brown',
    contactPosition: 'Creative Director',
    salesContact: 'Jessica Lee',
    
    // ==================== BUSINESS INFORMATION ====================
    industry: 'Design',
    subIndustry: 'Brand Identity',
    companySize: '1-10',
    foundedYear: 2020,
    businessType: 'partnership',
    description: 'Boutique design agency specializing in brand identity and digital experiences.',
    missionStatement: 'Creating memorable brand experiences that drive results.',
    
    // ==================== SERVICES & OPERATIONS ====================
    services: ['Brand Identity', 'UI/UX Design', 'Web Design', 'Print Design'],
    products: ['Brand Guidelines', 'Design Systems'],
    targetMarket: 'Startups and Small Businesses',
    certifications: ['Adobe Certified'],
    paymentMethods: ['Credit Card', 'Bank Transfer', 'Stripe'],
    
    // ==================== SALES OFFICE INFORMATION ====================
    salesOffice: {
      id: '1',
      name: 'New York Downtown Sales Office',
      officeManager: 'Sarah Johnson'
    },
    
    // ==================== STATUS & METADATA ====================
    status: 'active',
    isVerified: false,
    tags: ['Design', 'Creative', 'Branding', 'UI/UX'],
    notes: 'New client with great potential',
    
    // ==================== TIMESTAMPS ====================
    createdAt: new Date('2022-05-10'),
    updatedAt: new Date('2024-01-05'),
    lastActivityAt: new Date('2024-01-14'),
  },
  {
    // ==================== IDENTIFICATION ====================
    id: 'comp_004',
    companyCode: 'TAX-004-2024',
    name: 'Healthcare Partners LLC',

    // ==================== VISUAL IDENTITY ====================
    logo: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=200&fit=crop&crop=center',
    coverImage: 'https://images.unsplash.com/photo-1516549655669-df6654e35e01?w=800&h=400&fit=crop',
    
    // ==================== CONTACT INFORMATION ====================
    email: 'admin@healthcarepartners.com',
    phoneNumber: '+1-555-0404',
    alternatePhone: '+1-555-0405',
    website: 'https://healthcarepartners.com',

    // ==================== LOCATION INFORMATION ====================
    address: '321 Medical Center Drive',
    city: 'Boston',
    state: 'Massachusetts',
    country: 'United States',
    timezone: 'America/New_York',
    
    // ==================== SOCIAL MEDIA ====================
    linkedinUrl: 'https://linkedin.com/company/healthcarepartners',

    // ==================== KEY PERSONNEL ====================
    ceoName: 'Dr. James Wilson',
    contactPerson: 'Maria Garcia',
    contactPosition: 'Administrative Director',
    salesContact: 'Brian Taylor',
    technicalContact: 'Dr. Susan Clark',
    
    // ==================== BUSINESS INFORMATION ====================
    industry: 'Healthcare',
    subIndustry: 'Medical Services',
    companySize: '201-500',
    foundedYear: 2010,
    businessType: 'llc',
    description: 'Comprehensive healthcare provider offering specialized medical services.',
    missionStatement: 'Providing exceptional healthcare with compassion and innovation.',
    
    // ==================== SERVICES & OPERATIONS ====================
    services: ['Medical Consultations', 'Diagnostic Services', 'Treatment Programs'],
    products: ['Healthcare Plans', 'Medical Equipment'],
    targetMarket: 'Patients and Healthcare Institutions',
    certifications: ['JCI Accredited', 'HIPAA Compliant'],
    paymentMethods: ['Insurance', 'Credit Card', 'Payment Plans'],
    
    // ==================== SALES OFFICE INFORMATION ====================
    salesOffice: {
      id: '7',
      name: 'Boston New England Sales Office',
      officeManager: 'Thomas Anderson'
    },
    
    // ==================== STATUS & METADATA ====================
    status: 'verified',
    isVerified: true,
    tags: ['Healthcare', 'Medical', 'Wellness'],
    notes: 'Established healthcare provider with excellent reputation',
    
    // ==================== TIMESTAMPS ====================
    createdAt: new Date('2018-11-30'),
    updatedAt: new Date('2024-01-03'),
    lastActivityAt: new Date('2024-01-11'),
    verifiedAt: new Date('2019-03-15'),
  },
  {
    // ==================== IDENTIFICATION ====================
    id: 'comp_005',
    companyCode: 'TAX-005-2024',
    name: 'Global Logistics Corp',

    // ==================== VISUAL IDENTITY ====================
    logo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=200&h=200&fit=crop&crop=center',
    coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop',
    
    // ==================== CONTACT INFORMATION ====================
    email: 'support@globallogistics.com',
    phoneNumber: '+1-555-0505',
    website: 'https://globallogistics.com',

    // ==================== LOCATION INFORMATION ====================
    address: '555 Shipping Lane',
    city: 'Miami',
    state: 'Florida',
    country: 'United States',
    timezone: 'America/New_York',
    
    // ==================== SOCIAL MEDIA ====================
    facebookUrl: 'https://facebook.com/globallogistics',
    linkedinUrl: 'https://linkedin.com/company/globallogistics',

    // ==================== KEY PERSONNEL ====================
    ceoName: 'Carlos Mendez',
    contactPerson: 'Sophia Williams',
    contactPosition: 'Logistics Manager',
    salesContact: 'Daniel Johnson',
    technicalContact: 'Rachel Adams',
    
    // ==================== BUSINESS INFORMATION ====================
    industry: 'Logistics',
    subIndustry: 'Supply Chain',
    companySize: '501-1000',
    foundedYear: 2005,
    businessType: 'corporation',
    description: 'International logistics and supply chain management company.',
    missionStatement: 'Connecting businesses worldwide through efficient logistics.',
    
    // ==================== SERVICES & OPERATIONS ====================
    services: ['Freight Shipping', 'Warehousing', 'Supply Chain Management'],
    products: ['Logistics Software', 'Tracking Systems'],
    targetMarket: 'Import/Export Businesses',
    certifications: ['ISO 9001', 'Customs Broker License'],
    paymentMethods: ['Bank Transfer', 'Credit Card', 'Letters of Credit'],
    
    // ==================== SALES OFFICE INFORMATION ====================
    salesOffice: {
      id: '4',
      name: 'Miami Beachfront Sales Office',
      officeManager: 'Carlos Martinez'
    },
    
    // ==================== STATUS & METADATA ====================
    status: 'pending',
    isVerified: false,
    tags: ['Logistics', 'Shipping', 'Supply Chain', 'International'],
    notes: 'New application under review',
    
    // ==================== TIMESTAMPS ====================
    createdAt: new Date('2023-12-01'),
    updatedAt: new Date('2024-01-02'),
  }
];


// Add this to your src/_mock.ts file after _companyList

export const _companyCards = [
  {
    id: 'comp_001',
    name: 'Tech Innovators Inc.',
    logo: '/assets/images/company/company-avatar-1.jpg',
    coverImage: '/assets/images/company/company-1.jpg',
    email: 'contact@techinnovators.com',
    phoneNumber: '+1-555-0101',
    industry: 'Technology',
      companySize: '51-200' as CompanySize, // Add type assertion
    status: 'active' as CompanyStatus,
    isVerified: true,
    description: 'Leading provider of innovative software solutions for enterprise businesses.',
    address: '123 Tech Park Drive',
    city: 'San Francisco',
    state: 'California',
    country: 'United States',
    website: 'https://techinnovators.com',
    createdAt: new Date('2020-03-15'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    id: 'comp_002',
    name: 'Green Energy Solutions',
    logo: '/assets/images/company/company-avatar-2.jpg',
    coverImage: '/assets/images/company/company-2.jpg',
    email: 'info@greenenergy.com',
    phoneNumber: '+1-555-0202',
    industry: 'Energy',
    companySize: '11-50' as CompanySize, // Add type assertion
    status: 'verified' as CompanyStatus,
    isVerified: true,
    description: 'Provider of sustainable energy solutions for residential and commercial properties.',
    address: '456 Eco Park Avenue',
    city: 'Denver',
    state: 'Colorado',
    country: 'United States',
    website: 'https://greenenergy.com',
    createdAt: new Date('2019-08-22'),
    updatedAt: new Date('2024-01-08'),
  },
  {
    id: 'comp_003',
    name: 'Creative Design Studio',
    logo: '/assets/images/company/company-avatar-3.jpg',
    coverImage: '/assets/images/company/company-3.jpg',
    email: 'hello@creativedesign.com',
    phoneNumber: '+1-555-0303',
    industry: 'Design',
    companySize: '1-10' as CompanySize, // Add type assertion
    status: 'active' as CompanyStatus,
    isVerified: false,
    description: 'Boutique design agency specializing in brand identity and digital experiences.',
    address: '789 Design District',
    city: 'New York',
    state: 'New York',
    country: 'United States',
    website: 'https://creativedesign.com',
    createdAt: new Date('2022-05-10'),
    updatedAt: new Date('2024-01-05'),
  },
  {
    id: 'comp_004',
    name: 'Healthcare Partners LLC',
    logo: '/assets/images/company/company-avatar-4.jpg',
    coverImage: '/assets/images/company/company-4.jpg',
    email: 'admin@healthcarepartners.com',
    phoneNumber: '+1-555-0404',
    industry: 'Healthcare',
      companySize: '51-200' as CompanySize, // Add type assertion
    status: 'active' as CompanyStatus,
    isVerified: true,
    description: 'Comprehensive healthcare provider offering specialized medical services.',
    address: '321 Medical Center Drive',
    city: 'Boston',
    state: 'Massachusetts',
    country: 'United States',
    website: 'https://healthcarepartners.com',
    createdAt: new Date('2018-11-30'),
    updatedAt: new Date('2024-01-03'),
  },
  {
    id: 'comp_005',
    name: 'Global Logistics Corp',
    logo: '/assets/images/company/company-avatar-5.jpg',
    email: 'support@globallogistics.com',
    phoneNumber: '+1-555-0505',
    industry: 'Logistics',
    companySize: '501-1000' as CompanySize,
    status: 'pending' as CompanyStatus,
    isVerified: false,
    description: 'International logistics and supply chain management company.',
    address: '555 Shipping Lane',
    city: 'Miami',
    state: 'Florida',
    country: 'United States',
    website: 'https://globallogistics.com',
    createdAt: new Date('2023-12-01'),
    updatedAt: new Date('2024-01-02'),
  }
];

export const _industries = [
  { value: 'technology', label: 'Technology' },
  { value: 'energy', label: 'Energy' },
  { value: 'design', label: 'Design' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'finance', label: 'Finance' },
  { value: 'education', label: 'Education' },
  { value: 'logistics', label: 'Logistics' },
  { value: 'retail', label: 'Retail' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'construction', label: 'Construction' },
];