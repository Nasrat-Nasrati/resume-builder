import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { CompanyCreateView } from 'src/sections/company/view';

// ----------------------------------------------------------------------

const metadata = { title: `Create a new user | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <CompanyCreateView />
    </>
  );
}
