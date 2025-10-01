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

  // useEffect(() => {
  //   // Update time immediately and every second
  //   const updateTime = () => {
  //     setCurrentDateTime(new Date());
  //   };

  //   updateTime();
  //   const interval = setInterval(updateTime, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  const targetDate = new Date(2025, 9, 7, 23, 59, 59, 999);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeLeft = () => {
    const difference = targetDate.getTime() - new Date().getTime();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const { days, hours, minutes, seconds } = timeLeft;

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
        {/* <Chip
          label={fDateTime(currentDateTime)}
          sx={{
            fontSize: '1rem',
            padding: 2,
            bgcolor: 'background.paper',
          }}
        /> */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
          <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'row', gap: 2 }}>
            <Typography variant="h4" color="error" fontWeight="bold">
              {days.toString().padStart(2, '0')}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Days
            </Typography>
          </Box>

          <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'row', gap: 2 }}>
            <Typography variant="h4" color="error" fontWeight="bold">
              {hours.toString().padStart(2, '0')}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Hours
            </Typography>
          </Box>

          <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'row', gap: 2 }}>
            <Typography variant="h4" color="error" fontWeight="bold">
              {minutes.toString().padStart(2, '0')}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Min
            </Typography>
          </Box>
        </Box>
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
