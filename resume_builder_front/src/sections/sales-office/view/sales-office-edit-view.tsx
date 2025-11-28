import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { SalesOfficeNewEditForm } from '../sales-office-new-edit-form';

// ----------------------------------------------------------------------

export function SalesOfficeEditView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Edit sales office"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Company', href: `${paths.dashboard.root}/company` },
          { name: 'Sales Offices', href: `${paths.dashboard.root}/company/sales-office` },
          { name: 'Edit sales office' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <SalesOfficeNewEditForm />
    </DashboardContent>
  );
}