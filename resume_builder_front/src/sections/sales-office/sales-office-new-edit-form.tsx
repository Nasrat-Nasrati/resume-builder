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
import { useParams } from 'src/routes/hooks'; // این خط را اضافه کنید
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function SalesOfficeNewEditForm() {
  const { companyId } = useParams(); // این خط را اضافه کنید

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Card>
        <CardHeader title="Office Information" />
        <CardContent>
          <Stack spacing={3}>
            <TextField fullWidth label="Office Name" name="name" />
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField fullWidth label="Office Code" name="officeCode" />
              <TextField fullWidth type="number" label="Established Year" name="establishedYear" />
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
              <TextField fullWidth label="Phone" name="phoneNumber" />
              <TextField fullWidth label="Alternate Phone" name="alternatePhone" />
            </Stack>
            <TextField fullWidth label="Website" name="website" />
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Location Information" />
        <CardContent>
          <Stack spacing={3}>
            <TextField fullWidth multiline rows={3} label="Address" name="address" />
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField fullWidth label="City" name="city" />
              <TextField fullWidth label="State" name="state" />
              <TextField fullWidth label="Country" name="country" />
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Personnel Information" />
        <CardContent>
          <Stack spacing={3}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField fullWidth label="Office Manager" name="officeManagerName" />
              <TextField fullWidth label="Regional Director" name="regionalDirector" />
            </Stack>
            <TextField fullWidth label="Company" name="companyId" select SelectProps={{ native: true }}>
              <option value="" />
              <option value="comp_001">Tech Innovators Inc.</option>
              <option value="comp_002">Green Energy Solutions</option>
              <option value="comp_003">Creative Design Studio</option>
              <option value="comp_004">Healthcare Partners LLC</option>
              <option value="comp_005">Global Logistics Corp</option>
            </TextField>
          </Stack>
        </CardContent>
      </Card>

      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button
          component={RouterLink}
          href={`/dashboard/company/${companyId}/sales-office/list`}
          color="inherit"
          variant="outlined"
        >
          Cancel
        </Button>
        <Button variant="contained">Create Sales Office</Button>
      </Stack>
    </Box>
  );
}