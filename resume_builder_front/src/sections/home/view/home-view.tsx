import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';

export function HomeView() {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          py: 15,
          position: 'relative',
          background: 'linear-gradient(to right bottom, #103783, #9bafd9)',
          color: 'common.white',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        <Container>
          <Typography variant="h2" sx={{ mb: 3, fontWeight: 'fontWeightBold' }}>
            Create a Professional Afghan Civil Service Resume in 5 Minutes.
          </Typography>
          <Typography variant="h6" sx={{ mb: 5, opacity: 0.8, maxWidth: 640, mx: 'auto' }}>
            Empowering Afghan Job Seekers with standardized, bilingual (Dari/Pashto & English) resumes perfectly tailored for Civil Service and Private Sector.
          </Typography>
          <Button
            component={RouterLink}
            href="/auth/jwt/sign-up"
            size="large"
            variant="contained"
            color="primary"
            sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
          >
            Build Free CV Now
          </Button>
        </Container>
      </Box>

      <Box sx={{ py: 10, bgcolor: 'background.default' }}>
        <Container>
          <Typography variant="h3" sx={{ textAlign: 'center', mb: 8 }}>
            📊 Live Platform Statistics
          </Typography>
          
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={3}>
              <Stack alignItems="center" spacing={1}>
                <Typography variant="h2" color="primary">1,245</Typography>
                <Typography variant="subtitle1" color="text.secondary">CVs Created Today</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Stack alignItems="center" spacing={1}>
                <Typography variant="h2" color="info.main">89,432</Typography>
                <Typography variant="subtitle1" color="text.secondary">Total CVs Created</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Stack alignItems="center" spacing={1}>
                <Typography variant="h2" color="warning.main">312</Typography>
                <Typography variant="subtitle1" color="text.secondary">Active Premium Members</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Stack alignItems="center" spacing={1}>
                <Typography variant="h2" color="success.main">45k+</Typography>
                <Typography variant="subtitle1" color="text.secondary">Page Views This Month</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
