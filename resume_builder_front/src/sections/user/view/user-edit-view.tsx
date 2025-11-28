import type { IUserItemListView } from 'src/types/user';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { UserNewEditForm } from '../user-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  // user?: IUserItem;
  user?: IUserItemListView;
};

export function UserEditView({ user: currentUser }: Props) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Edit"
        backHref={paths.dashboard.user.list}
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'User', href: paths.dashboard.user.root },
          // { name: currentUser?.name },
          { name: `${currentUser?.firstname || ''} ${currentUser?.lastname || ''}` },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <UserNewEditForm currentUser={currentUser} />
    </DashboardContent>
  );
}
