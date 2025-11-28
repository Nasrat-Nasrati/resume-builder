import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { EmployeeNewEditForm } from '../employee-new-edit-form';

// ----------------------------------------------------------------------

export function EmployeeCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Create a new employee"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Company', href: `${paths.dashboard.root}/company` },
          { name: 'Employees', href: `${paths.dashboard.root}/company/employee` },
          { name: 'New employee' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <EmployeeNewEditForm />
    </DashboardContent>
  );
}