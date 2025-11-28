import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { SalesOfficeCreateView } from 'src/sections/sales-office/view';

// ----------------------------------------------------------------------

const metadata = { title: `Create sales office | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <SalesOfficeCreateView />
    </>
  );
}