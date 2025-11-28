/* eslint-disable perfectionist/sort-imports */
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';

import { useParams } from 'src/routes/hooks';

import { PlanEditView } from 'src/sections/plan/view';

import { CONFIG } from 'src/global-config';

import { getAllPlans } from 'src/auth/context/jwt/plan-action';

// ----------------------------------------------------------------------

const metadata = { title: `Plan edit | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  const { id = '' } = useParams();
  const [currentplan, setcurrentplan] = useState<any>(null);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const plans = await getAllPlans();
        const foundPLan = plans.find((plan: any) => String(plan.id) === String(id));
        setcurrentplan(foundPLan || null);
      } catch (error) {
        console.error('Error fetching lan:', error);
      }
    };

    fetchPlan();
  }, [id]);

  console.log('current plan is ', currentplan);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <PlanEditView plan={currentplan} />
    </>
  );
}
