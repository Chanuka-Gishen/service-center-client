import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function ComingSoonView() {
  return (
    <Container>
      <Box
        sx={{
          py: 12,
          maxWidth: 480,
          mx: 'auto',
          display: 'flex',
          minHeight: '100vh',
          textAlign: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h3" sx={{ mb: 3 }}>
          Development In Progress!
        </Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          Sorry, we will deliver new content here soon.
        </Typography>

        <Box
          component="img"
          src="/assets/illustrations/programing.svg"
          sx={{
            mx: 'auto',
            height: 260,
            my: { xs: 5, sm: 10 },
          }}
        />
      </Box>
    </Container>
  );
}
