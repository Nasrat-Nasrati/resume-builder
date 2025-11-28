import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function EmployeeNewEditForm() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Card>
        <CardHeader title="Employee Information" />
        <CardContent>
          <Stack spacing={3}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField fullWidth label="First Name" name="firstName" />
              <TextField fullWidth label="Last Name" name="lastName" />
              <TextField fullWidth label="Father Name" name="fatherName" />
            </Stack>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField fullWidth label="Tazkira Number" name="tazkiraNumber" />
              <TextField fullWidth type="date" label="Date of Birth" InputLabelProps={{ shrink: true }} />
            </Stack>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField fullWidth label="Gender" name="gender" select SelectProps={{ native: true }}>
                <option value="" />
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </TextField>
              <TextField fullWidth label="Marital Status" name="maritalStatus" select SelectProps={{ native: true }}>
                <option value="" />
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </TextField>
              <TextField fullWidth label="Nationality" name="nationality" />
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Contact Information" />
        <CardContent>
          <Stack spacing={3}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField fullWidth label="Email" name="email" />
              <TextField fullWidth label="Phone" name="phone" />
            </Stack>
            <TextField fullWidth multiline rows={3} label="Address" name="address" />
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Employment Information" />
        <CardContent>
          <Stack spacing={3}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField fullWidth label="Company" name="companyId" select SelectProps={{ native: true }}>
                <option value="" />
                <option value="comp_001">Tech Innovators Inc.</option>
                <option value="comp_002">Green Energy Solutions</option>
                <option value="comp_003">Creative Design Studio</option>
                <option value="comp_004">Healthcare Partners LLC</option>
                <option value="comp_005">Global Logistics Corp</option>
              </TextField>
              <TextField fullWidth label="Position" name="position" select SelectProps={{ native: true }}>
                <option value="" />
                <option value="software-engineer">Software Engineer</option>
                <option value="senior-engineer">Senior Software Engineer</option>
                <option value="team-lead">Team Lead</option>
                <option value="project-manager">Project Manager</option>
                <option value="sales-manager">Sales Manager</option>
                <option value="account-executive">Account Executive</option>
                <option value="hr-specialist">HR Specialist</option>
                <option value="financial-analyst">Financial Analyst</option>
                <option value="operations-coordinator">Operations Coordinator</option>
                <option value="customer-support">Customer Support</option>
              </TextField>
            </Stack>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField fullWidth label="Job Title" name="jobTitle" />
              <TextField fullWidth type="date" label="Hire Date" InputLabelProps={{ shrink: true }} />
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Education" />
        <CardContent>
          <Stack spacing={3}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField fullWidth label="Degree" name="degree" />
              <TextField fullWidth label="Field" name="field" />
              <TextField fullWidth label="Grade" name="grade" />
            </Stack>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField fullWidth label="Year" name="year" type="number" />
              <TextField fullWidth label="Institution" name="institution" />
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button
          component={RouterLink}
          href={paths.dashboard.root}
          color="inherit"
          variant="outlined"
        >
          Cancel
        </Button>
        <Button variant="contained">Create Employee</Button>
      </Stack>
    </Box>
  );
}