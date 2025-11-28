



import { Card, CardContent, Typography, Grid, Stack, Chip, Box } from '@mui/material';

import { Iconify } from 'src/components/iconify';

interface CompanyProfileOverviewProps {
  company: any;
}

export function CompanyProfileOverview({ company }: CompanyProfileOverviewProps) {
  return (
    <Grid container spacing={3}>
      {/* Company Description */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              About Company
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {company.description}
            </Typography>
            {company.missionStatement && (
              <>
                <Typography variant="subtitle2" gutterBottom>
                  Mission Statement
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {company.missionStatement}
                </Typography>
              </>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* Contact Information */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body2">{company.email}</Typography>
              </Box>
              
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Phone
                </Typography>
                <Typography variant="body2">{company.phoneNumber}</Typography>
                {company.alternatePhone && (
                  <Typography variant="body2" color="text.secondary">
                    Alternate: {company.alternatePhone}
                  </Typography>
                )}
              </Box>
              
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Website
                </Typography>
                <Typography variant="body2">{company.website}</Typography>
              </Box>
              
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Address
                </Typography>
                <Typography variant="body2">
                  {company.address}, {company.city}, {company.state}, {company.country}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      {/* Business Details */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Business Details
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Industry
                </Typography>
                <Typography variant="body2">{company.industry}</Typography>
              </Box>
              
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Company Size
                </Typography>
                <Typography variant="body2">{company.companySize}</Typography>
              </Box>
              
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Founded Year
                </Typography>
                <Typography variant="body2">{company.foundedYear}</Typography>
              </Box>
              
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Business Type
                </Typography>
                <Typography variant="body2">{company.businessType}</Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      {/* Social Media & Certifications */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              {company.certifications && company.certifications.length > 0 && (
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Certifications
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {company.certifications.map((cert: string, index: number) => (
                      <Chip key={index} label={cert} variant="outlined" />
                    ))}
                  </Stack>
                </Grid>
              )}
              
              {company.tags && company.tags.length > 0 && (
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Tags
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {company.tags.map((tag: string, index: number) => (
                      <Chip key={index} label={tag} variant="outlined" color="primary" />
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