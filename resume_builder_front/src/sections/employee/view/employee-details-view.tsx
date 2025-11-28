import type { Employee } from 'src/types/employee';

// src/sections/employee/view/employee-details-view.tsx
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { _companyList } from 'src/_mock/_company';
import { _employeeList } from 'src/_mock/employees';
import { DashboardContent } from 'src/layouts/dashboard';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

// ----------------------------------------------------------------------

export function EmployeeDetailsView() {
  const { id: companyId, employeeId } = useParams();
  const router = useRouter();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find employee
    const foundEmployee = _employeeList.find(emp => emp.id === employeeId);
    setEmployee(foundEmployee || null);

    // Find company
    const foundCompany = _companyList.find(comp => comp.id === companyId);
    setCompany(foundCompany || null);

    setLoading(false);
  }, [companyId, employeeId]);

  if (loading) {
    return (
      <DashboardContent>
        <Container>
          <Typography>Loading...</Typography>
        </Container>
      </DashboardContent>
    );
  }

  if (!employee) {
    return (
      <DashboardContent>
        <Container>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Employee Not Found
          </Typography>
          <Button component={RouterLink} href={paths.dashboard.company.employee.list(companyId!)}>
            Back to Employees
          </Button>
        </Container>
      </DashboardContent>
    );
  }

  const statusColor = (status: string): 'success' | 'warning' | 'error' | 'info' | 'default' => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'error';
      case 'on-leave': return 'warning';
      case 'terminated': return 'error';
      case 'probation': return 'info';
      default: return 'default';
    }
  };

  return (
    <DashboardContent>
      <Container maxWidth="lg">
        <CustomBreadcrumbs
          heading="Employee Details"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Companies', href: paths.dashboard.company.list },
            { name: company?.name || 'Company', href: paths.dashboard.company.profile(companyId!) },
            { name: 'Employees', href: paths.dashboard.company.employee.list(companyId!) },
            { name: employee.fullName },
          ]}
        />

        <Grid container spacing={3}>
          {/* Profile Card */}
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 5, textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  mx: 'auto',
                  mb: 3,
                  bgcolor: 'primary.main',
                  fontSize: '2.5rem',
                  fontWeight: 'bold'
                }}
              >
                {employee.firstName?.charAt(0)}{employee.lastName?.charAt(0)}
              </Avatar>

              <Typography variant="h5" gutterBottom>
                {employee.fullName}
              </Typography>

              <Typography variant="body2" color="text.secondary" gutterBottom>
                {employee.jobTitle}
              </Typography>

              <Label
                variant="soft"
                color={statusColor(employee.status)}
                sx={{ mt: 1, mb: 2 }}
              >
                {employee.status}
              </Label>

              <Box sx={{ mt: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<Iconify icon="solar:phone-bold" />}
                  sx={{ mb: 1 }}
                  fullWidth
                >
                  {employee.phone}
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Iconify icon="solar:letter-bold" />}
                  fullWidth
                >
                  {employee.email}
                </Button>
              </Box>
            </Card>
          </Grid>

          {/* Details Card */}
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Full Name
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {employee.fullName}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Employee Code
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {employee.employeeCode || 'N/A'}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Job Title
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {employee.jobTitle}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Department
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {employee.department || 'N/A'}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Company
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {employee.companyName}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Employment Type
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {employee.employeeType || 'N/A'}
                  </Typography>
                </Grid>

              </Grid>

              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Contact Information
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Email
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {employee.email}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Phone
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {employee.phone}
                    </Typography>
                  </Grid>

                </Grid>
              </Box>

              {employee.notes && (
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    Additional Notes
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  <Typography variant="body1">
                    {employee.notes}
                  </Typography>
                </Box>
              )}
            </Card>
          </Grid>
        </Grid>
      </Container>
    </DashboardContent>
  );
}