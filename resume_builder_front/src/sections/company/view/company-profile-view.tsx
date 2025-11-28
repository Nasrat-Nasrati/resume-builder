import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { usePathname, useSearchParams } from 'src/routes/hooks';

import { _companyList } from 'src/_mock/_company';
import { _employeeList } from 'src/_mock/employees';
import { DashboardContent } from 'src/layouts/dashboard';
import { _salesOfficeList } from 'src/_mock/sales_office';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

// Import your simple components
import { EmployeeProfileView } from 'src/sections/employee/view/employee_profile_view';
import { SalesOfficeProfileView } from 'src/sections/sales-office/view/sales_office_profile_view';

import { CompanyProfileTeam } from '../company-profile-team';
import { CompanyProfileCover } from '../company-profile-cover';
import { CompanyProfileOverview } from '../company-profile-overview';
import { CompanyProfileServices } from '../company-profile-services';
import { CompanyProfileSalesOffices } from '../company-profile-sales-offices';

// ----------------------------------------------------------------------

const NAV_ITEMS = [
  {
    value: '',
    label: 'Overview',
    icon: <Iconify width={24} icon="solar:home-2-bold" />,
  },
  {
    value: 'team',
    label: 'Employees',
    icon: <Iconify width={24} icon="solar:users-group-rounded-bold" />,
  },
  {
    value: 'sales-offices',
    label: 'Sales Offices',
    icon: <Iconify width={24} icon="solar:building-bold" />,
  },
  {
    value: 'projects',
    label: 'Projects',
    icon: <Iconify width={24} icon="solar:folder-with-files-bold" />,
  },
];

// ----------------------------------------------------------------------

const TAB_PARAM = 'tab';

export function CompanyProfileView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedTab = searchParams.get(TAB_PARAM) ?? '';

  // استخراج صحیح companyId از URL با دیباگ
  const pathSegments = pathname.split('/');
  const companyIndex = pathSegments.indexOf('company');
  const companyIdFromURL = companyIndex !== -1 ? pathSegments[companyIndex + 1] : pathSegments[pathSegments.length - 1];

  
  // پیدا کردن شرکت - با تطبیق مختلف
  const company = _companyList.find(comp => comp.id === companyIdFromURL);
  
  
 

  const createRedirectPath = (currentPath: string, query: string) => {
    // For all tabs, use query parameters to stay on the same page
    const queryString = new URLSearchParams({ [TAB_PARAM]: query }).toString();
    return query ? `${currentPath}?${queryString}` : currentPath;
  };

  // Render content for all tabs
 const renderTabContent = () => {
  switch (selectedTab) {
    case '':
      return <CompanyProfileOverview company={company} />;
    case 'team':
      return <EmployeeProfileView />; // این خط باید کار کند
    case 'sales-offices':
      return <SalesOfficeProfileView />;
    case 'projects':
      return <CompanyProfileServices company={company} />;
    default:
      return null;
  }
};

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Company Profile"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Companies', href: paths.dashboard.company.list },
          { name: company?.name },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card sx={{ mb: 3, height: 290 }}>
  <CompanyProfileCover
    name={company?.name || 'Unknown Company'}
    logo={company?.logo}
    coverImage={company?.coverImage}
    industry={company?.industry || 'Not specified'}
    companySize={company?.companySize || 'Not specified'}
    status={company?.status || 'unknown'}
    isVerified={company?.isVerified || false}
  />

        <Box
          sx={{
            width: 1,
            bottom: 0,
            zIndex: 9,
            px: { md: 3 },
            display: 'flex',
            position: 'absolute',
            bgcolor: 'background.paper',
            justifyContent: { xs: 'center', md: 'flex-end' },
          }}
        >
          <Tabs value={selectedTab}>
            {NAV_ITEMS.map((tab) => (
              <Tab
                component={RouterLink}
                key={tab.value}
                value={tab.value}
                icon={tab.icon}
                label={tab.label}
                href={createRedirectPath(pathname, tab.value)}
              />
            ))}
          </Tabs>
        </Box>
      </Card>

      {renderTabContent()}
    </DashboardContent>
  );
}