import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { ISalesOfficeItem as SalesOffice } from 'src/types/salesoffice';

// ----------------------------------------------------------------------

interface CompanyProfileSalesOfficesProps {
  company: any;
  salesOffices: SalesOffice[];
}

export function CompanyProfileSalesOffices({ company, salesOffices }: CompanyProfileSalesOfficesProps) {

  // فیلتر کردن salesOffices با منطق پیشرفته مشابه بخش کارمندان
  const filteredSalesOffices = salesOffices.filter(office => {
    const matchesById = office.companyId === company.id;
    const matchesByName = office.companyName === company.name;
    
    // اگر با underline/dash مشکل داریم
    const normalizedCompanyId = company.id?.replace('-', '_');
    const normalizedOfficeCompanyId = office.companyId?.replace('-', '_');
    const matchesByNormalizedId = normalizedOfficeCompanyId === normalizedCompanyId;
  
    
    return matchesById || matchesByName || matchesByNormalizedId;
  });



  // اگر فیلتر کار نکرد، همه salesOffices را نشان بده (موقتاً برای دیباگ)
  const displaySalesOffices = filteredSalesOffices.length > 0 ? filteredSalesOffices : salesOffices;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          {company.name} Sales Offices ({displaySalesOffices.length})
          {filteredSalesOffices.length === 0 && salesOffices.length > 0 && (
            <Typography variant="body2" color="warning.main" sx={{ mt: 1 }}>
              ⚠️ Showing all sales offices (filter issue - check console)
            </Typography>
          )}
        </Typography>
      </Grid>

      {displaySalesOffices.map((office) => (
        <Grid item xs={12} sm={6} md={4} key={office.id}>
          <Card>
            <CardActionArea
              component={RouterLink}
              href={paths.dashboard.company.salesOffice.details(company.id, office.officeCode)}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                {office.logo ? (
                  <img
                    src={office.logo}
                    alt={office.name}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      marginBottom: 16,
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      backgroundColor: '#f0f0f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                    }}
                  >
                    <Typography variant="h6" color="text.secondary">
                      {office.name.charAt(0)}
                    </Typography>
                  </div>
                )}

                <Typography variant="h6" gutterBottom>
                  {office.name}
                </Typography>

                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {office.city}, {office.state}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {office.country}
                </Typography>

                <Typography variant="caption" color="primary" sx={{ mt: 1, display: 'block' }}>
                  Office Manager: {office.officeManagerName}
                </Typography>

                {/* Company Info for Debug */}
                <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mt: 1 }}>
                  Company: {office.companyName}
                </Typography>

                <Typography
                  variant="caption"
                  sx={{
                    display: 'inline-block',
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    bgcolor: office.status === 'active' ? 'success.light' : 'grey.300',
                    color: office.status === 'active' ? 'success.dark' : 'grey.600',
                    mt: 1,
                  }}
                >
                  {office.status}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}

      {displaySalesOffices.length === 0 && (
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 6 }}>
              <Typography variant="h6" color="text.secondary">
                No sales offices found for {company.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Company ID: {company.id}
              </Typography>
              <Typography variant="caption" color="text.disabled" sx={{ mt: 2, display: 'block' }}>
                Check console for debugging information
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  );
}