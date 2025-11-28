import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { PlanListView } from 'src/sections/plan/view/plan-list-view';

//....................................................
const metadata = { title: `Plans list | Dashboard - ${CONFIG.appName}` };
export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <PlanListView />
    </>
  );
}
