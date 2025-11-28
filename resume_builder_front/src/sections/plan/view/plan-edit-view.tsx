import type { IPlanItem } from 'src/types/plan';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { PlanNewEditForm } from '../plan-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  plan?: IPlanItem;
};

export function PlanEditView({ plan: currentplan }: Props) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Edit"
        backHref={paths.dashboard.user.list}
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'plan', href: paths.dashboard.plan.root },
          { name: currentplan?.name },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <PlanNewEditForm currentPlan={currentplan} />
    </DashboardContent>
  );
}
