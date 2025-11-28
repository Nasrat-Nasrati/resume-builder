// src/pages/dashboard/employee/employee-details.tsx
import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { EmployeeDetailsView } from 'src/sections/employee/view';

// ----------------------------------------------------------------------

const metadata = { title: `Employee Details | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <EmployeeDetailsView />
    </>
  );
}