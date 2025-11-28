import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography'; // حتماً این import را اضافه کنید
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  filterName: string;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onResetFilter: () => void;
  canReset: boolean;
  companyName?: string; // این خط را اضافه کنید
  salesOfficeCount: number; // این خط را اضافه کنید
};

export function SalesOfficeTableToolbar({
  filterName,
  onFilterName,
  onResetFilter,
  canReset,
  companyName, // این پراپ را اضافه کنید
  salesOfficeCount, // این پراپ را اضافه کنید
}: Props) {
  return (
    <Box
      gap={1}
      display="flex"
      flexWrap="wrap"
      alignItems="center"
      justifyContent="space-between"
    >
      <TextField
        size="small"
        value={filterName}
        onChange={onFilterName}
        placeholder="Search sales office..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
        sx={{
          width: { xs: 1, md: 260 },
        }}
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