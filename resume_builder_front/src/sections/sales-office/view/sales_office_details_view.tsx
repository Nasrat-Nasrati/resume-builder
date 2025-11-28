import type { SalesOffice } from 'src/types/salesoffice';

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
import { DashboardContent } from 'src/layouts/dashboard';
import { _salesOfficeList } from 'src/_mock/sales_office';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

// ----------------------------------------------------------------------

export function SalesOfficeDetailsView() {
  const { id: companyId, salesOfficeId } = useParams();
  const router = useRouter();
  const [salesOffice, setSalesOffice] = useState<SalesOffice | null>(null);
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('URL Parameters:', { companyId, salesOfficeId });
    console.log('All Sales Offices:', _salesOfficeList);
    
    // Enhanced ID matching for sales office
    const foundSalesOffice = _salesOfficeList.find(office => {
      // Try multiple matching strategies
      const directMatch = office.id === salesOfficeId;
      const stringMatch = office.id?.toString() === salesOfficeId?.toString();
      
      console.log('Sales Office Matching:', {
        officeId: office.id,
        salesOfficeId,
        directMatch,
        stringMatch
      });
      
      return directMatch || stringMatch;
    });
    
    console.log('Found Sales Office:', foundSalesOffice);
    
    // Enhanced company matching with ID normalization
    const foundCompany = _companyList.find(comp => {
      const directMatch = comp.id === companyId;
      const normalizedMatch = comp.id?.replace('-', '_') === companyId?.replace('-', '_');
      
      console.log('Company Matching:', {
        compId: comp.id,
        companyId,
        directMatch,
        normalizedMatch
      });
      
      return directMatch || normalizedMatch;
    });
    
    console.log('Found Company:', foundCompany);

    setSalesOffice(foundSalesOffice || null);
    setCompany(foundCompany || null);
    setLoading(false);
  }, [companyId, salesOfficeId]);

  if (loading) {
    return (
      <DashboardContent>
        <Container>
          <Typography>Loading...</Typography>
        </Container>
      </DashboardContent>
    );
  }

  if (!salesOffice) {
    return (
      <DashboardContent>
        <Container>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Sales Office Not Found
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Sales Office ID: {salesOfficeId} | Company ID: {companyId}
          </Typography>
          <Button component={RouterLink} href={paths.dashboard.company.salesOffice.list(companyId!)}>
            Back to Sales Offices
          </Button>
        </Container>
      </DashboardContent>
    );
  }

  const statusColor = (status: string): 'success' | 'warning' | 'error' | 'info' | 'default' => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'error';
      case 'pending': return 'warning';
      case 'under-construction': return 'warning';
      case 'closed': return 'error';
      default: return 'default';
    }
  };

  const officeTypeColor = (type: string): 'primary' | 'secondary' | 'info' | 'default' => {
    switch (type) {
      case 'headquarters': return 'primary';
      case 'regional': return 'secondary';
      case 'branch': return 'info';
      default: return 'default';
    }
  };

  // Generate avatar initials from office name
  const getAvatarInitials = (name: string) => {
    const words = name.split(' ');
    if (words.length >= 2) {
      return `${words[0].charAt(0)}${words[1].charAt(0)}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <DashboardContent>
      <Container maxWidth="lg">
        <CustomBreadcrumbs
          heading="Sales Office Details"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Companies', href: paths.dashboard.company.list },
            { name: company?.name || 'Company', href: paths.dashboard.company.profile(companyId!) },
            { name: 'Sales Offices', href: paths.dashboard.company.salesOffice.list(companyId!) },
            { name: salesOffice.name },
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
                {getAvatarInitials(salesOffice.name)}
              </Avatar>

              <Typography variant="h5" gutterBottom>
                {salesOffice.name}
              </Typography>

              <Typography variant="body2" color="text.secondary" gutterBottom>
                {salesOffice.officeCode}
              </Typography>

              <Label
                variant="soft"
                color={officeTypeColor(salesOffice.officeType)}
                sx={{ mt: 1, mb: 1 }}
              >
                {salesOffice.officeType}
              </Label>

              <Label
                variant="soft"
                color={statusColor(salesOffice.status)}
                sx={{ mt: 1, mb: 2 }}
              >
                {salesOffice.status}
              </Label>

              <Box sx={{ mt: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<Iconify icon="solar:phone-bold" />}
                  sx={{ mb: 1 }}
                  fullWidth
                >
                  {salesOffice.phoneNumber}
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Iconify icon="solar:letter-bold" />}
                  fullWidth
                >
                  {salesOffice.email}
                </Button>
              </Box>
            </Card>
          </Grid>

          {/* Details Card */}
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Office Information
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Office Name
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {salesOffice.name}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Office Code
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {salesOffice.officeCode}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Office Type
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {salesOffice.officeType}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Total Employees
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {salesOffice.totalEmployees}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Company
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {salesOffice.companyName}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Office Manager
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {salesOffice.officeManagerName}
                  </Typography>
                </Grid>
              </Grid>

              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Location Information
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Address
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {salesOffice.address || 'N/A'}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      City
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {salesOffice.city}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      State/Province
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {salesOffice.state}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Country
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {salesOffice.country}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      ZIP Code
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {salesOffice.zipCode || 'N/A'}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Timezone
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {salesOffice.timezone || 'N/A'}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

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
                      {salesOffice.email}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Phone
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {salesOffice.phoneNumber}
                    </Typography>
                  </Grid>

                  {salesOffice.alternatePhone && (
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Alternate Phone
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        {salesOffice.alternatePhone}
                      </Typography>
                    </Grid>
                  )}

                  {salesOffice.website && (
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Website
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <a href={salesOffice.website} target="_blank" rel="noopener noreferrer">
                          {salesOffice.website}
                        </a>
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Box>

              {salesOffice.notes && (
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    Additional Notes
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  <Typography variant="body1">
                    {salesOffice.notes}
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