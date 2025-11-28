import type { ICompanyCard } from 'src/types/company';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

type Props = {
  company: ICompanyCard;
};

export function CompanyCard({ company }: Props) {
  const { 
    name, 
    logo, 
    industry, 
    companySize, 
    status, 
    isVerified, 
    description,
    city,
    state,
    country 
  } = company;

  return (
    <Card sx={{ textAlign: 'center', p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ position: 'relative' }}>
        <Avatar
          src={logo}
          alt={name}
          sx={{
            width: 64,
            height: 64,
            mx: 'auto',
            mb: 2
          }}
        />
      </Box>

      <Typography variant="h6" sx={{ mb: 0.5 }}>
        {name}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
        {industry}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 2 }}>
        <Chip 
          label={status} 
          size="small" 
          color={
            status === 'active' ? 'success' :
            status === 'verified' ? 'info' :
            status === 'pending' ? 'warning' : 'error'
          }
        />
        <Chip 
          label={companySize} 
          size="small" 
          variant="outlined" 
        />
      </Box>

      {description && (
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, flexGrow: 1 }}>
          {description.length > 100 ? `${description.substring(0, 100)}...` : description}
        </Typography>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 'auto' }}>
        <div>
          <Typography variant="subtitle1">{city}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            City
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle1">{state}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            State
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle1">{country}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Country
          </Typography>
        </div>
      </Box>
    </Card>
  );
}