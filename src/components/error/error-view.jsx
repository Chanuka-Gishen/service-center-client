import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default ErrorView = () => {
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
          Sorry, some error occured!
        </Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          Sorry, we couldn’t find the data you are looking for. Try reloading the page or going
          back.
        </Typography>

        <Box
          component="img"
          src="/assets/illustrations/warning.png"
          sx={{
            mx: 'auto',
            height: 260,
            my: { xs: 5, sm: 10 },
          }}
        />
      </Box>
    </Container>
  );
};
