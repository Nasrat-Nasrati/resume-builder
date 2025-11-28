import { Button } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useParams } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components/router-link';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { EmployeeList } from '../employee-list';

// ----------------------------------------------------------------------

export function EmployeeListView() {
  const params = useParams();


  // همه روش‌های ممکن برای گرفتن companyId
  const companyId = 
    params.companyId || // اول از params با نام companyId
    params.id ||        // سپس از params با نام id  
    extractCompanyIdFromPath(location.pathname) || // سپس از URL
    'comp-001';        // در نهایت مقدار پیش‌فرض

  function extractCompanyIdFromPath(pathname: string) {
    const segments = pathname.split('/');
    const companyIndex = segments.indexOf('company');
    return companyIndex !== -1 ? segments[companyIndex + 1] : null;
  }

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Employee List"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Company', href: paths.dashboard.company.list },
          { name: 'Employees' },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.company.employee.new(companyId)}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Employee
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <EmployeeList />
    </DashboardContent>
  );
}