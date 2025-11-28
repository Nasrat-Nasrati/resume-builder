import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify/iconify';

import { Employee } from 'src/types/employee';

// ----------------------------------------------------------------------

interface CompanyProfileTeamProps {
  company: any;
  employees: Employee[];
}

export function CompanyProfileTeam({ company, employees }: CompanyProfileTeamProps) {

  // فیلتر کردن employees با منطق پیشرفته
  const filteredEmployees = employees.filter(employee => {
    const matchesById = employee.companyId === company.id;
    const matchesByName = employee.companyName === company.name;
    
    // اگر با underline/dash مشکل داریم
    const normalizedCompanyId = company.id?.replace('-', '_');
    const normalizedEmployeeCompanyId = employee.companyId?.replace('-', '_');
    const matchesByNormalizedId = normalizedEmployeeCompanyId === normalizedCompanyId;
    
    console.log(`Employee ${employee.fullName}:`, {
      employeeCompanyId: employee.companyId,
      targetCompanyId: company.id,
      matchesById,
      matchesByName,
      normalizedMatch: matchesByNormalizedId
    });
    
    return matchesById || matchesByName || matchesByNormalizedId;
  });

  console.log('Filtering results:', {
    totalEmployees: employees.length,
    filteredCount: filteredEmployees.length,
    filteredEmployees: filteredEmployees.map(e => ({
      name: e.fullName,
      companyId: e.companyId,
      companyName: e.companyName
    }))
  });

  // اگر فیلتر کار نکرد، همه employees را نشان بده (موقتاً برای دیباگ)
  const displayEmployees = filteredEmployees.length > 0 ? filteredEmployees : employees;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          {company.name} Employees ({displayEmployees.length})
          {filteredEmployees.length === 0 && employees.length > 0 && (
            <Typography variant="body2" color="warning.main" sx={{ mt: 1 }}>
              ⚠️ Showing all employees (filter issue - check console)
            </Typography>
          )}
        </Typography>
      </Grid>

          

      {displayEmployees.map((employee) => (
        <Grid item xs={12} sm={6} md={4} key={employee.id}>
          <Card>
            <CardActionArea
              component={RouterLink}
              href={paths.dashboard.company.employee.details(company.id, employee.id)}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                {/* Employee avatar */}
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: '#e3f2fd',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    border: '2px solid #1976d2'
                  }}
                >
                  <Typography variant="h6" color="primary.main" fontWeight="bold">
                    {employee.firstName?.charAt(0)}
                    {employee.lastName?.charAt(0)}
                  </Typography>
                </div>

                <Typography variant="h6" gutterBottom>
                  {employee.fullName}
                </Typography>

                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {employee.jobTitle}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {employee.department}
                </Typography>

                {/* Company Info for Debug */}
                <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mt: 1 }}>
                  Company: {employee.companyName}
                </Typography>

                <Typography
                  variant="caption"
                  sx={{
                    display: 'inline-block',
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    bgcolor: employee.status === 'active' ? 'success.light' : 'grey.300',
                    color: employee.status === 'active' ? 'success.dark' : 'grey.600',
                    mt: 1,
                  }}
                >
                  {employee.status}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}

      {displayEmployees.length === 0 && (
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 6 }}>
              <Typography variant="h6" color="text.secondary">
                No employees found for {company.name}
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