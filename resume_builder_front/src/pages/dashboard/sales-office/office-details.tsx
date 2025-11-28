import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { SalesOfficeDetailsView } from 'src/sections/sales-office/view/sales_office_details_view';



// ----------------------------------------------------------------------

const metadata = { title: `Sales Office Details | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <SalesOfficeDetailsView />
    </>
  );
}