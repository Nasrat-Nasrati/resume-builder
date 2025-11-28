import type { SalesOffice } from 'src/types/salesoffice';

import { useState, useMemo } from 'react';
import { usePopover } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import { Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useParams, useRouter } from 'src/routes/hooks';

import { _companyList } from 'src/_mock/_company';
import { DashboardContent } from 'src/layouts/dashboard';
import { _salesOfficeList } from 'src/_mock/sales_office';

import { Iconify } from 'src/components/iconify';
import { CustomPopover } from 'src/components/custom-popover';
import { SearchNotFound } from 'src/components/search-not-found';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

// ----------------------------------------------------------------------

export function SalesOfficeProfileView() {
  const { id: companyId } = useParams(); // تغییر مهم: استفاده از id به جای companyId
  const router = useRouter();
  const [searchOffices, setSearchOffices] = useState('');

  // پیدا کردن شرکت بر اساس companyId
  const company = _companyList.find(comp => comp.id === companyId);

  // فیلتر کردن دفاتر فروش مربوط به این شرکت
  const companySalesOffices = useMemo(() => {
    if (!companyId) return _salesOfficeList;
    
    return _salesOfficeList.filter(office => {
      const matchesById = office.companyId === companyId;
      const matchesByName = office.companyName === company?.name;
      
      // اگر با underline/dash مشکل داریم
      const normalizedCompanyId = companyId?.replace('-', '_');
      const normalizedOfficeCompanyId = office.companyId?.replace('-', '_');
      const matchesByNormalizedId = normalizedOfficeCompanyId === normalizedCompanyId;
      
      return matchesById || matchesByName || matchesByNormalizedId;
    });
  }, [companyId, company?.name]);

  const dataFiltered = useMemo(() => applyFilter({
      inputData: companySalesOffices,
      query: searchOffices,
    }), [companySalesOffices, searchOffices]);

  const notFound = !dataFiltered.length && !!searchOffices;

  const handleSearchOffices = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchOffices(event.target.value);
  };

  // اگر companyId undefined است، به کاربر اطلاع بده
  if (!companyId) {
    return (
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Sales Offices"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Companies', href: paths.dashboard.company.list },
            { name: 'Sales Offices' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Alert severity="info" sx={{ mb: 3 }}>
          Showing all sales offices. Company context not available.
        </Alert>
        
        <Box
          sx={{
            my: 5,
            gap: 2,
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Typography variant="h4">All Sales Offices ({_salesOfficeList.length})</Typography>
          
          <TextField
            value={searchOffices}
            onChange={handleSearchOffices}
            placeholder="Search sales offices..."
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              },
            }}
            sx={{ width: { xs: 1, sm: 260 } }}
          />
        </Box>

        {notFound ? (
          <SearchNotFound query={searchOffices} sx={{ py: 10 }} />
        ) : (
          <Box
            sx={{
              gap: 3,
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
            }}
          >
            {dataFiltered.map((office) => (
              <SalesOfficeCard key={office.id} office={office} companyId={companyId} />
            ))}
          </Box>
        )}
      </DashboardContent>
    );
  }

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Sales Offices"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Companies', href: paths.dashboard.company.list },
          { name: company?.name || 'Company', href: paths.dashboard.company.profile(companyId) },
          { name: 'Sales Offices' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Box
        sx={{
          my: 5,
          gap: 2,
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Typography variant="h4">
          {company?.name} Sales Offices ({companySalesOffices.length})
        </Typography>

        <Button
          component={Link}
          href={`/dashboard/company/${companyId}/sales-office`}
          variant="contained"
          startIcon={<Iconify icon="solar:building-bold" />}
        >
          Manage Sales Offices
        </Button>

        <TextField
          value={searchOffices}
          onChange={handleSearchOffices}
          placeholder="Search sales offices..."
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{ width: { xs: 1, sm: 260 } }}
        />
      </Box>

      {notFound ? (
        <SearchNotFound query={searchOffices} sx={{ py: 10 }} />
      ) : (
        <Box
          sx={{
            gap: 3,
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
          }}
        >
          {dataFiltered.map((office) => (
            <SalesOfficeCard key={office.id} office={office} companyId={companyId} />
          ))}
        </Box>
      )}
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

type SalesOfficeCardProps = {
  office: SalesOffice;
  companyId?: string;
};

function SalesOfficeCard({ office, companyId }: SalesOfficeCardProps) {
  const menuActions = usePopover();

  // Generate avatar initials from office name
  const getAvatarInitials = (name: string) => {
    const words = name.split(' ');
    if (words.length >= 2) {
      return `${words[0].charAt(0)}${words[1].charAt(0)}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Status color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'error';
      case 'pending': return 'warning';
      case 'under-construction': return 'warning';
      case 'closed': return 'error';
      default: return 'default';
    }
  };

  // Office type color mapping
  const getOfficeTypeColor = (type: string) => {
    switch (type) {
      case 'headquarters': return 'primary';
      case 'regional': return 'secondary';
      case 'branch': return 'info';
      default: return 'default';
    }
  };

  return (
    <Card
      sx={{
        py: 5,
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {/* Sales Office Avatar with Initials */}
      <Avatar 
        sx={{ 
          width: 64, 
          height: 64, 
          mb: 3,
          bgcolor: 'primary.main',
          fontSize: '1.5rem',
          fontWeight: 'bold'
        }}
      >
        {getAvatarInitials(office.name)}
      </Avatar>

      {/* Office Name */}
      <Link 
        variant="subtitle1" 
        color="text.primary" 
        sx={{ fontWeight: 600, textAlign: 'center' }}
        href={companyId ? paths.dashboard.company.salesOffice.details(companyId, office.officeCode) : '#'}
      >
        {office.name}
      </Link>

      {/* Office Code */}
      <Typography variant="caption" sx={{ color: 'text.disabled', mb: 1 }}>
        {office.officeCode}
      </Typography>

      {/* Office Type */}
      <Chip 
        label={office.officeType} 
        size="small"
        color={getOfficeTypeColor(office.officeType)}
        variant="soft"
        sx={{ mb: 1 }}
      />

      {/* Location */}
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5, textAlign: 'center' }}>
        {office.city}, {office.state}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
        {office.country}
      </Typography>

      {/* Manager */}
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
        Manager: {office.officeManagerName}
      </Typography>

      {/* Contact Info */}
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
          {office.email}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
          {office.phoneNumber}
        </Typography>
      </Box>

      {/* Employee Count */}
      <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1 }}>
        {office.totalEmployees} employees
      </Typography>

      {/* Status Badge */}
      <Chip 
        label={office.status} 
        size="small"
        color={getStatusColor(office.status)}
        variant="soft"
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  query: string;
  inputData: SalesOffice[];
};

function applyFilter({ inputData, query }: ApplyFilterProps) {
  if (!query) return inputData;

  return inputData.filter((office) =>
    [office.name, office.officeCode, office.city, office.state, office.country, office.officeManagerName, office.email]
      .some((field) => field?.toLowerCase().includes(query.toLowerCase()))
  );
}