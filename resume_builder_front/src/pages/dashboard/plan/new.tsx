import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { PlanCreateView } from 'src/sections/plan/view';

// ----------------------------------------------------------------------

const metadata = { title: `Create a new plan | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <PlanCreateView />
    </>
  );
}
