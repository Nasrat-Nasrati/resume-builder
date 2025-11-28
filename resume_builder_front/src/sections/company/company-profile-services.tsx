import { Card, CardContent, Typography, Grid, Chip, Stack, Box } from '@mui/material';

import { Iconify } from 'src/components/iconify';

interface CompanyProfileServicesProps {
  company: any;
}

export function CompanyProfileServices({ company }: CompanyProfileServicesProps) {
  return (
    <Grid container spacing={3}>
      {/* Services */}
      {company.services && company.services.length > 0 && (
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Iconify icon="solar:widget-2-bold" width={24} />
                <Typography variant="h6">Services</Typography>
              </Box>
              <Stack spacing={1}>
                {company.services.map((service: string, index: number) => (
                  <Chip
                    key={index}
                    label={service}
                    variant="outlined"
                    sx={{ justifyContent: 'flex-start' }}
                  />
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      )}

      {/* Products */}
      {company.products && company.products.length > 0 && (
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Iconify icon="solar:box-bold" width={24} />
                <Typography variant="h6">Products</Typography>
              </Box>
              <Stack spacing={1}>
                {company.products.map((product: string, index: number) => (
                  <Chip
                    key={index}
                    label={product}
                    variant="outlined"
                    sx={{ justifyContent: 'flex-start' }}
                  />
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      )}

      {/* Target Market & Payment Methods */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              {company.targetMarket && (
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Target Market
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {company.targetMarket}
                  </Typography>
                </Grid>
              )}
              
              {company.paymentMethods && company.paymentMethods.length > 0 && (
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Payment Methods
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {company.paymentMethods.map((method: string, index: number) => (
                      <Chip key={index} label={method} size="small" variant="outlined" />
                    ))}
                  </Stack>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}