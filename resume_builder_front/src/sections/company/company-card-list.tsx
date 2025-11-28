import type { ICompanyCard } from 'src/types/company';

import { useState, useCallback } from 'react';

// FIX: Import order - Box first, then Typography
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';

import { CompanyCard } from './company-card';

// ----------------------------------------------------------------------

type Props = {
  companies: ICompanyCard[];
};

// FIX: Make sure this is exported as default or named export
export function CompanyCardList({ companies }: Props) {
  const [page, setPage] = useState(1);
  const rowsPerPage = 12;

  const handleChangePage = useCallback((event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  }, []);

  return (
    <>
      <Box
        sx={{
          gap: 3,
          display: 'grid',
          gridTemplateColumns: { 
            xs: 'repeat(1, 1fr)', 
            sm: 'repeat(2, 1fr)', 
            md: 'repeat(3, 1fr)' 
          },
        }}
      >
        {companies
          .slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
          .map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
      </Box>

      <Pagination
        page={page}
        shape="circular"
        count={Math.ceil(companies.length / rowsPerPage)}
        onChange={handleChangePage}
        sx={{ mt: { xs: 5, md: 8 }, mx: 'auto' }}
      />
    </>
  );
}