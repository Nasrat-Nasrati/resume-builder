import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import * as CompanyView from 'src/sections/company/view';

// Fallback if CompanyCardsView is not exported from the module
const CompanyCardsView =
  (CompanyView as any).CompanyCardsView ||
  (() => <div>CompanyCardsView not found in src/sections/company/view</div>);

// ----------------------------------------------------------------------

const metadata = { title: `company cards | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <CompanyCardsView />
    </>
  );
}
