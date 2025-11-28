import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { CompanyListView } from 'src/sections/company/view';

// ----------------------------------------------------------------------

const metadata = { title: `Company list | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
       <CompanyListView />
    </>
  );
}
