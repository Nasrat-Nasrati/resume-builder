import { Box, Typography, Chip, Stack, Avatar } from '@mui/material';

import { Iconify } from 'src/components/iconify';

interface CompanyProfileCoverProps {
  name: string;
  logo?: string;
  coverImage?: string;
  industry: string;
  companySize: string;
  status: string;
  isVerified: boolean;
}

export function CompanyProfileCover({
  name,
  logo,
  coverImage,
  industry,
  companySize,
  status,
  isVerified,
}: CompanyProfileCoverProps) {
  return (
    <Box sx={{ position: 'relative', height: '100%' }}>
      {/* Cover Image */}
      <Box
        sx={{
          height: 200,
          backgroundImage: `url(${coverImage || '/assets/images/covers/cover-1.jpg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Company Info Overlay */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 80,
          left: 24,
          display: 'flex',
          alignItems: 'flex-end',
          gap: 2,
        }}
      >
        <Avatar
          src={logo}
          alt={name}
          sx={{
            width: 100,
            height: 100,
            border: '4px solid',
            borderColor: 'background.paper',
          }}
        />
        
        <Box sx={{ color: 'common.white', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Typography variant="h4" sx={{ color: 'common.white' }}>
              {name}
            </Typography>
            {isVerified && (
              <Iconify icon="solar:verified-check-bold" width={24} color="primary.main" />
            )}
          </Box>
          
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip
              label={status}
              size="small"
              color={status === 'active' ? 'success' : 'default'}
              variant="filled"
            />
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              {industry} • {companySize}
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}