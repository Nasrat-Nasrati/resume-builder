import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { SalesOfficeListView } from 'src/sections/sales-office/view';

// ----------------------------------------------------------------------

const metadata = { title: `Sales office list | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <SalesOfficeListView />
    </>
  );
}