import { ChangeEvent } from 'react'; // این خط را اضافه کنید

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';



// If you need to modify the EmployeeTableToolbar component
interface EmployeeTableToolbarProps {
  filterName: string;
  onFilterName: (event: ChangeEvent<HTMLInputElement>) => void;
  onResetFilter: () => void;
  canReset: boolean;
  companyName?: string;
  employeeCount?: number;
}

export function EmployeeTableToolbar({
  filterName,
  onFilterName,
  onResetFilter,
  canReset,
  companyName,
  employeeCount
}: EmployeeTableToolbarProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {companyName && (
        <Box>
          <Typography variant="h6">
            {companyName} Employees ({employeeCount})
          </Typography>
        </Box>
      )}
      
      <TextField
        value={filterName}
        onChange={onFilterName}
        placeholder="Search employees..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
        sx={{ width: { xs: 1, sm: 260 } }}
      />

      {canReset && (
        <Button
          color="error"
          onClick={onResetFilter}
          startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
        >
          Clear
        </Button>
      )}
    </Box>
  );
}



