import { AppBar, Box, Button, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CustomDialogHeader = ({ title, isLoading, handleClose }) => (
  <AppBar sx={{ position: 'relative' }}>
    <Toolbar>
      <Stack
        direction={'row'}
        alignItems="center"
        justifyContent="space-between"
        sx={{ minWidth: '100%' }}
      >
        <Box display="flex" flexDirection="row" gap={1} alignItems="center">
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            disabled={isLoading}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1, cursor: 'pointer' }} variant="h6" component="div">
            {title}
          </Typography>
        </Box>
        <Box flexGrow={1} />
        <Button
          variant="outlined"
          sx={{ color: 'white', borderColor: 'white' }}
          type="submit"
          disabled={isLoading}
        >
          Confirm
        </Button>
      </Stack>
    </Toolbar>
  </AppBar>
);

export default CustomDialogHeader;
