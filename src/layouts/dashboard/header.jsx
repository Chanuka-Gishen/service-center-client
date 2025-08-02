import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import MenuIcon from '@mui/icons-material/Menu';

import { bgBlur } from 'src/theme/css';

import { NAV, HEADER } from './config-layout';
import AccountPopover from './common/account-popover';
import { ColorSwitch } from 'src/components/color-switch';
import { Chip, Stack, Typography } from '@mui/material';
import { fDateTime } from 'src/utils/format-time';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

export default function Header({ onOpenNav }) {
  const theme = useTheme();

  const lgUp = false;

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    // Update time immediately and every second
    const updateTime = () => {
      setCurrentDateTime(new Date());
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <MenuIcon />
        </IconButton>
      )}

      <Box sx={{ flexGrow: 1 }} />
      <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
        {/* <Typography sx={{ color: theme.palette.mode === 'dark' ? 'white' : 'black' }}>
          {fDateTime(currentDateTime)}
        </Typography> */}
        <Chip
          label={fDateTime(currentDateTime)}
          sx={{
            fontSize: '1rem',
            padding: 2,
            bgcolor: 'background.paper',
          }}
        />
        <ColorSwitch />
        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.WIDTH + 1}px)`,
          height: HEADER.H_DESKTOP,
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};
