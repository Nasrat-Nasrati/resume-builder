


import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { _companyCards } from 'src/_mock/_company';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { CompanyCardList } from '../company-card-list';

export function CompanyCardsView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Company Cards"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Company', href: `${paths.dashboard.root}/company` },
          { name: 'Cards' },
        ]}
        action={
          <Button
            component={RouterLink}
            href={`${paths.dashboard.root}/company/new`}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Company
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <CompanyCardList companies={_companyCards} />
    </DashboardContent>
  );
}