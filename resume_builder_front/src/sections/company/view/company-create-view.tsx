import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { CompanyNewEditForm } from '../company-new-edit-form';

// ----------------------------------------------------------------------

export function CompanyCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Create a new company"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Company', href: `${paths.dashboard.root}/company` }, // Changed from User to Company
          { name: 'New company' }, // Changed from New user
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <CompanyNewEditForm />
    </DashboardContent>
  );
}
