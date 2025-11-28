import { Button } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useParams } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { SalesOfficeList } from '../sales-office-list';

// ----------------------------------------------------------------------

export function SalesOfficeListView() {
  const params = useParams();

  // All possible ways to get companyId
  const companyId = 
    params.companyId || // First from params with name companyId
    params.id ||        // Then from params with name id  
    extractCompanyIdFromPath(location.pathname) || // Then from URL
    'comp-001';        // Finally default value

  function extractCompanyIdFromPath(pathname: string) {
    const segments = pathname.split('/');
    const companyIndex = segments.indexOf('company');
    return companyIndex !== -1 ? segments[companyIndex + 1] : null;
  }

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Sales Offices"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Companies', href: paths.dashboard.company.list },
          { name: 'Sales Offices' },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.company.salesOffice.new(companyId)}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Sales Office
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <SalesOfficeList />
    </DashboardContent>
  );
}