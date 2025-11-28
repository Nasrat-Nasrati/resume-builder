import type { RouteObject } from 'react-router';

import { Outlet } from 'react-router';
import { lazy, Suspense } from 'react';

import { CONFIG } from 'src/global-config';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AccountLayout } from 'src/sections/account/account-layout';
import { CompanyCardsView } from 'src/sections/company/view/company-cards-view';
// در فایل routing خود این موارد را اضافه کنید
import { EmployeeProfileView } from 'src/sections/employee/view/employee_profile_view';
import { SalesOfficeProfileView } from 'src/sections/sales-office/view/sales_office_profile_view';

import { AuthGuard } from 'src/auth/guard';

import { usePathname } from '../hooks';

// ----------------------------------------------------------------------

// Overview
const IndexPage = lazy(() => import('src/pages/dashboard'));
const OverviewEcommercePage = lazy(() => import('src/pages/dashboard/ecommerce'));
const OverviewAnalyticsPage = lazy(() => import('src/pages/dashboard/analytics'));
const OverviewBankingPage = lazy(() => import('src/pages/dashboard/banking'));
const OverviewBookingPage = lazy(() => import('src/pages/dashboard/booking'));
const OverviewFilePage = lazy(() => import('src/pages/dashboard/file'));
const OverviewCoursePage = lazy(() => import('src/pages/dashboard/course'));
// Product
const ProductDetailsPage = lazy(() => import('src/pages/dashboard/product/details'));
const ProductListPage = lazy(() => import('src/pages/dashboard/product/list'));
const ProductCreatePage = lazy(() => import('src/pages/dashboard/product/new'));
const ProductEditPage = lazy(() => import('src/pages/dashboard/product/edit'));

//Plane Management
const PlanListPage = lazy(() => import('src/pages/dashboard/plan/list'));
const PlanCreatePage = lazy(() => import('src/pages/dashboard/plan/new'));
const PlanEditPage = lazy(() => import('src/pages/dashboard/plan/edit'));
// Order
const OrderListPage = lazy(() => import('src/pages/dashboard/order/list'));
const OrderDetailsPage = lazy(() => import('src/pages/dashboard/order/details'));
// Invoice
const InvoiceListPage = lazy(() => import('src/pages/dashboard/invoice/list'));
const InvoiceDetailsPage = lazy(() => import('src/pages/dashboard/invoice/details'));
const InvoiceCreatePage = lazy(() => import('src/pages/dashboard/invoice/new'));
const InvoiceEditPage = lazy(() => import('src/pages/dashboard/invoice/edit'));
// User
const UserProfilePage = lazy(() => import('src/pages/dashboard/user/profile'));
const UserCardsPage = lazy(() => import('src/pages/dashboard/user/cards'));
const UserListPage = lazy(() => import('src/pages/dashboard/user/list'));
const UserCreatePage = lazy(() => import('src/pages/dashboard/user/new'));
const UserEditPage = lazy(() => import('src/pages/dashboard/user/edit'));



// Company
const CompanyListPage = lazy(() => import('src/pages/dashboard/company/company-list'));
const CompanyProfilePage = lazy(() => import('src/pages/dashboard/company/company-profile'));
const CompanyCreatePage = lazy(() => import('src/pages/dashboard/company/company-new'));
const CompanyEditPage = lazy(() => import('src/pages/dashboard/company/company-edit'));

// Employee
const EmployeeListPage = lazy(() => import('src/pages/dashboard/employee/employee-list'));
const EmployeeCreatePage = lazy(() => import('src/pages/dashboard/employee/employee-create'));
const EmployeeEditPage = lazy(() => import('src/pages/dashboard/employee/employee-edit'));
const EmployeeDetailsPage = lazy(() => import('src/pages/dashboard/employee/employee-details'));

// Sales Office
const SalesOfficeListPage = lazy(() => import('src/pages/dashboard/sales-office/sales-office-list'));
const SalesOfficeCreatePage = lazy(() => import('src/pages/dashboard/sales-office/sales-office-new'));
const SalesOfficeEditPage = lazy(() => import('src/pages/dashboard/sales-office/sales-office-edit'));
const SalesOfficeDetailsPage = lazy(() => import('src/pages/dashboard/sales-office/office-details'));



// Account
const AccountGeneralPage = lazy(() => import('src/pages/dashboard/user/account/general'));
const AccountBillingPage = lazy(() => import('src/pages/dashboard/user/account/billing'));
const AccountSocialsPage = lazy(() => import('src/pages/dashboard/user/account/socials'));
const AccountNotificationsPage = lazy(
  () => import('src/pages/dashboard/user/account/notifications')
);
const AccountChangePasswordPage = lazy(
  () => import('src/pages/dashboard/user/account/change-password')
);
// Blog
const BlogPostsPage = lazy(() => import('src/pages/dashboard/post/list'));
const BlogPostPage = lazy(() => import('src/pages/dashboard/post/details'));
const BlogNewPostPage = lazy(() => import('src/pages/dashboard/post/new'));
const BlogEditPostPage = lazy(() => import('src/pages/dashboard/post/edit'));
// Job
const JobDetailsPage = lazy(() => import('src/pages/dashboard/job/details'));
const JobListPage = lazy(() => import('src/pages/dashboard/job/list'));
const JobCreatePage = lazy(() => import('src/pages/dashboard/job/new'));
const JobEditPage = lazy(() => import('src/pages/dashboard/job/edit'));
// Tour
const TourDetailsPage = lazy(() => import('src/pages/dashboard/tour/details'));
const TourListPage = lazy(() => import('src/pages/dashboard/tour/list'));
const TourCreatePage = lazy(() => import('src/pages/dashboard/tour/new'));
const TourEditPage = lazy(() => import('src/pages/dashboard/tour/edit'));
// File manager
const FileManagerPage = lazy(() => import('src/pages/dashboard/file-manager'));
// App
const ChatPage = lazy(() => import('src/pages/dashboard/chat'));
const MailPage = lazy(() => import('src/pages/dashboard/mail'));
const CalendarPage = lazy(() => import('src/pages/dashboard/calendar'));
const KanbanPage = lazy(() => import('src/pages/dashboard/kanban'));
// Test render page by role
const PermissionDeniedPage = lazy(() => import('src/pages/dashboard/permission'));
// Blank page
const ParamsPage = lazy(() => import('src/pages/dashboard/params'));
const BlankPage = lazy(() => import('src/pages/dashboard/blank'));

// ----------------------------------------------------------------------

function SuspenseOutlet() {
  const pathname = usePathname();
  return (
    <Suspense key={pathname} fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  );
}

const dashboardLayout = () => (
  <DashboardLayout>
    <SuspenseOutlet />
  </DashboardLayout>
);

const accountLayout = () => (
  <AccountLayout>
    <SuspenseOutlet />
  </AccountLayout>
);

// Helper to build company detail route paths
export const companyDetails = (id: string) => `/dashboard/company/${id}`;

export const dashboardRoutes: RouteObject[] = [
  {
    path: 'dashboard',
    element: CONFIG.auth.skip ? dashboardLayout() : <AuthGuard>{dashboardLayout()}</AuthGuard>,
    children: [
      { index: true, element: <IndexPage /> },
      { path: 'ecommerce', element: <OverviewEcommercePage /> },
      { path: 'analytics', element: <OverviewAnalyticsPage /> },
      { path: 'banking', element: <OverviewBankingPage /> },
      { path: 'booking', element: <OverviewBookingPage /> },
      { path: 'file', element: <OverviewFilePage /> },
      { path: 'course', element: <OverviewCoursePage /> },
      {
        path: 'user',
        children: [
          { index: true, element: <UserProfilePage /> },
          { path: 'profile', element: <UserProfilePage /> },
          { path: 'cards', element: <UserCardsPage /> },
          { path: 'list', element: <UserListPage /> },
          { path: 'new', element: <UserCreatePage /> },
          { path: ':id/edit', element: <UserEditPage /> },
          {
            path: 'account',
            element: accountLayout(),
            children: [
              { index: true, element: <AccountGeneralPage /> },
              { path: 'billing', element: <AccountBillingPage /> },
              { path: 'notifications', element: <AccountNotificationsPage /> },
              { path: 'socials', element: <AccountSocialsPage /> },
              { path: 'change-password', element: <AccountChangePasswordPage /> },
            ],
          },
        ],
      },

    
     // COMPANY MANAGEMENT (MAIN HIERARCHY) - EXACT MATCH TO YOUR SCENARIO
{
      path: 'company',
      children: [
        // Company main routes
        { index: true, element: <CompanyListPage /> }, 
        { path: 'employee', element: <EmployeeProfileView /> }, // اضافه کردن این خط
        { path: 'sales-office', element: <SalesOfficeProfileView /> }, // اضافه کردن این خط                   // /dashboard/company ✅
        { path: 'list', element: <CompanyListPage /> },                  // /dashboard/company/list ✅
        { path: 'new', element: <CompanyCreatePage /> },                 // /dashboard/company/new ✅
        { path: 'cards', element: <CompanyCardsView /> },                // /dashboard/company/cards
        
        // Company-specific routes
        { 
          path: ':id', 
          children: [
            { index: true, element: <CompanyProfilePage /> },            // /dashboard/company/comp_001/details ✅
            { path: 'edit', element: <CompanyEditPage /> },  // /dashboard/company/comp_001/edit ✅
            { path: 'profile', element: <CompanyProfilePage  /> },  // /dashboard/company/comp_001/profile ✅
            { path: 'delete', element: <div>Delete Company Page</div> }, // /dashboard/company/comp_001/delete ✅
            
            // EMPLOYEE MANAGEMENT under company - EXACT MATCH
            {
              path: 'employee',
              children: [
                { index: true, element: <EmployeeListPage /> },          // /dashboard/company/comp_001/employee ✅
                { path: 'list', element: <EmployeeListPage /> },         // /dashboard/company/comp_001/employee/list
                { path: 'new', element: <EmployeeCreatePage /> },        // /dashboard/company/comp_001/employee/new ✅
                
                // Employee-specific routes
                {
                  path: ':employeeId',
                  children: [
                    { path: 'details', element: <EmployeeDetailsPage /> }, // /dashboard/company/comp_001/employee/EMP-001/details ✅
                    { path: 'edit', element: <EmployeeEditPage /> },     // /dashboard/company/comp_001/employee/EMP-001/edit ✅
                    { path: 'delete', element: <div>Delete Employee Page</div> }, // /dashboard/company/comp_001/employee/EMP-001/delete ✅
                  ],
                },
              ],
            },
            
            // SALES OFFICE MANAGEMENT under company - EXACT MATCH
            {
              path: 'sales-office',
              children: [
                { index: true, element: <SalesOfficeListPage /> },       // /dashboard/company/comp_001/sales-office ✅
                { path: 'list', element: <SalesOfficeListPage /> },      // /dashboard/company/comp_001/sales-office/list
                { path: 'new', element: <SalesOfficeCreatePage /> },     // /dashboard/company/comp_001/sales-office/new ✅
                
                // Sales Office-specific routes
                {
                  path: ':officeId',
                  children: [
                    { path: 'details', element: <SalesOfficeDetailsPage /> }, // /dashboard/company/comp_001/sales-office/SO-DEN-001/details ✅
                    { path: 'edit', element: <SalesOfficeEditPage /> },   // /dashboard/company/comp_001/sales-office/SO-DEN-001/edit ✅
                    { path: 'delete', element: <div>Delete Sales Office Page</div> }, // /dashboard/company/comp_001/sales-office/SO-DEN-001/delete ✅
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
      

  
      {
        path: 'product',
        children: [
          { index: true, element: <ProductListPage /> },
          { path: 'list', element: <ProductListPage /> },
          { path: ':id', element: <ProductDetailsPage /> },
          { path: 'new', element: <ProductCreatePage /> },
          { path: ':id/edit', element: <ProductEditPage /> },
        ],
      },
      //PLAN MANAGEMENT
      {
        path: 'plan',
        children: [
          { index: true, element: <PlanListPage /> },
          { path: 'list', element: <PlanListPage /> },
          { path: 'new', element: <PlanCreatePage /> },
          { path: ':id/edit', element: <PlanEditPage /> },
        ],
      },
      {
        path: 'order',
        children: [
          { index: true, element: <OrderListPage /> },
          { path: 'list', element: <OrderListPage /> },
          { path: ':id', element: <OrderDetailsPage /> },
        ],
      },
      {
        path: 'invoice',
        children: [
          { index: true, element: <InvoiceListPage /> },
          { path: 'list', element: <InvoiceListPage /> },
          { path: ':id', element: <InvoiceDetailsPage /> },
          { path: ':id/edit', element: <InvoiceEditPage /> },
          { path: 'new', element: <InvoiceCreatePage /> },
        ],
      },
      {
        path: 'post',
        children: [
          { index: true, element: <BlogPostsPage /> },
          { path: 'list', element: <BlogPostsPage /> },
          { path: ':title', element: <BlogPostPage /> },
          { path: ':title/edit', element: <BlogEditPostPage /> },
          { path: 'new', element: <BlogNewPostPage /> },
        ],
      },
      {
        path: 'job',
        children: [
          { index: true, element: <JobListPage /> },
          { path: 'list', element: <JobListPage /> },
          { path: ':id', element: <JobDetailsPage /> },
          { path: 'new', element: <JobCreatePage /> },
          { path: ':id/edit', element: <JobEditPage /> },
        ],
      },
      {
        path: 'tour',
        children: [
          { index: true, element: <TourListPage /> },
          { path: 'list', element: <TourListPage /> },
          { path: ':id', element: <TourDetailsPage /> },
          { path: 'new', element: <TourCreatePage /> },
          { path: ':id/edit', element: <TourEditPage /> },
        ],
      },
      { path: 'file-manager', element: <FileManagerPage /> },
      { path: 'mail', element: <MailPage /> },
      { path: 'chat', element: <ChatPage /> },
      { path: 'calendar', element: <CalendarPage /> },
      { path: 'kanban', element: <KanbanPage /> },
      { path: 'permission', element: <PermissionDeniedPage /> },
      { path: 'params', element: <ParamsPage /> },
      { path: 'blank', element: <BlankPage /> },
    ],
  },
];









