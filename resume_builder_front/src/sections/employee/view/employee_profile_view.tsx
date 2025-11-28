import type { Employee } from 'src/types/employee';

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
import { _employeeList } from 'src/_mock/employees';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { CustomPopover } from 'src/components/custom-popover';
import { SearchNotFound } from 'src/components/search-not-found';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

// ----------------------------------------------------------------------

export function EmployeeProfileView() {
  const { id: companyId } = useParams(); // تغییر مهم: استفاده از id به جای companyId
  const router = useRouter();
  const [searchEmployees, setSearchEmployees] = useState('');

  // پیدا کردن شرکت بر اساس companyId
  const company = _companyList.find(comp => comp.id === companyId);

  // فیلتر کردن کارمندان مربوط به این شرکت
  const companyEmployees = useMemo(() => {
    if (!companyId) return _employeeList;
    
    return _employeeList.filter(employee => {
      const matchesById = employee.companyId === companyId;
      const matchesByName = employee.companyName === company?.name;
      
      // اگر با underline/dash مشکل داریم
      const normalizedCompanyId = companyId?.replace('-', '_');
      const normalizedEmployeeCompanyId = employee.companyId?.replace('-', '_');
      const matchesByNormalizedId = normalizedEmployeeCompanyId === normalizedCompanyId;
      
      return matchesById || matchesByName || matchesByNormalizedId;
    });
  }, [companyId, company?.name]);

  const dataFiltered = useMemo(() => applyFilter({
      inputData: companyEmployees,
      query: searchEmployees,
    }), [companyEmployees, searchEmployees]);

  const notFound = !dataFiltered.length && !!searchEmployees;

  const handleSearchEmployees = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchEmployees(event.target.value);
  };

  // اگر companyId undefined است، به کاربر اطلاع بده
  if (!companyId) {
    return (
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Employees"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Companies', href: paths.dashboard.company.list },
            { name: 'Employees' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Alert severity="info" sx={{ mb: 3 }}>
          Showing all employees. Company context not available.
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
          <Typography variant="h4">All Employees ({_employeeList.length})</Typography>
          
          <TextField
            value={searchEmployees}
            onChange={handleSearchEmployees}
            placeholder="Search employees..."
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
          <SearchNotFound query={searchEmployees} sx={{ py: 10 }} />
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
            {dataFiltered.map((employee) => (
              <EmployeeCard key={employee.id} employee={employee} companyId={companyId} />
            ))}
          </Box>
        )}
      </DashboardContent>
    );
  }

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Employees"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Companies', href: paths.dashboard.company.list },
          { name: company?.name || 'Company', href: paths.dashboard.company.profile(companyId) },
          { name: 'Employees' },
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
          {company?.name} Employees ({companyEmployees.length})
        </Typography>

            <Button
            component={Link}
            href={`/dashboard/company/${companyId}/employee`}
            variant="contained"
            startIcon={<Iconify icon="solar:users-group-rounded-bold" />}
          >
            Manage Employees
          </Button>

        <TextField
          value={searchEmployees}
          onChange={handleSearchEmployees}
          placeholder="Search employees..."
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
        <SearchNotFound query={searchEmployees} sx={{ py: 10 }} />
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
          {dataFiltered.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} companyId={companyId} />
          ))}
        </Box>
      )}
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

type EmployeeCardProps = {
  employee: Employee;
  companyId?: string;
};

function EmployeeCard({ employee, companyId }: EmployeeCardProps) {
  const menuActions = usePopover();

  // Generate avatar initials
  const getAvatarInitials = (firstName: string, lastName: string) => 
    `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();

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
      {/* Employee Avatar with Initials */}
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
        {getAvatarInitials(employee.firstName, employee.lastName)}
      </Avatar>

      {/* Employee Name */}
      <Link 
        variant="subtitle1" 
        color="text.primary" 
        sx={{ fontWeight: 600 }}
        href={companyId ? paths.dashboard.company.employee.details(companyId, employee.id) : '#'}
      >
        {employee.fullName}
      </Link>

      {/* Job Title */}
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5, mt: 0.5 }}>
        {employee.jobTitle}
      </Typography>

      {/* Department */}
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
        {employee.department}
      </Typography>

      {/* Employee Code */}
      <Typography variant="caption" sx={{ color: 'text.disabled', mb: 1 }}>
        {employee.employeeCode}
      </Typography>

      {/* Contact Info */}
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
          {employee.email}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
          {employee.phone}
        </Typography>
      </Box>

      {/* Status Badge */}
      <Chip 
        label={employee.status} 
        size="small"
        color={
          employee.status === 'active' ? 'success' : 
          employee.status === 'inactive' ? 'error' : 'default'
        }
        variant="soft"
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  query: string;
  inputData: Employee[];
};

function applyFilter({ inputData, query }: ApplyFilterProps) {
  if (!query) return inputData;

  return inputData.filter((employee) =>
    [employee.fullName, employee.jobTitle, employee.department, employee.email]
      .some((field) => field?.toLowerCase().includes(query.toLowerCase()))
  );
}

