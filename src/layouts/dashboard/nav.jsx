import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Stack,
  Drawer,
  Avatar,
  Typography,
  ListItemButton,
  Badge,
  Collapse,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { alpha, styled, useTheme } from '@mui/material/styles';

import { usePathname, useRouter } from 'src/routes/hooks';
import Scrollbar from 'src/components/scrollbar';
import { NAV } from './config-layout';
import navConfig from './config-navigation';
import { NAVBAR_ITEMS } from './common/navigation-names';
import useAuthStore from 'src/store/auth-store';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export default function Nav({ openNav, onCloseNav }) {
  const pathname = usePathname();
  const theme = useTheme();
  const router = useRouter();

  const { auth } = useAuthStore.getState();

  const user = auth.user;

  const [selected, setSelected] = useState(NAVBAR_ITEMS.DASHBOARD);
  const [expandedMenus, setExpandedMenus] = useState({});

  const upLg = false;

  const handleMenuToggle = (menuName) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const handleItemClick = (item) => {
    setSelected(item.name);
    if (item.path) {
      router.push(item.path);
    }
  };

  useEffect(() => {
    const initialExpanded = {};
    navConfig.forEach((item) => {
      if (item.isParent) {
        // Check if any child's path matches current pathname
        const hasActiveChild = item.children?.some((child) => pathname.includes(child.path));
        if (hasActiveChild) {
          initialExpanded[item.name] = true;
        }
      }
    });
    setExpandedMenus(initialExpanded);
  }, [pathname]);

  useEffect(() => {
    navConfig.forEach((item) => {
      if (item.isParent) {
        item.children?.forEach((child) => {
          if (pathname.includes(child.path)) {
            setSelected(child.name);
          }
        });
      } else {
        if (pathname.includes(item.path)) {
          setSelected(item.name);
        }
      }
    });
  }, [pathname]);

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      {/* <Avatar src={account.photoURL} alt="photoURL" /> */}
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
        <Avatar src={'/assets/main-logo.png'} alt="photoURL" />
      </StyledBadge>

      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">{user.name}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {user.userRole}
        </Typography>
      </Box>
    </Box>
  );

  const renderNavItem = (item, level = 0) => {
    const isActive = selected === item.name;
    const isParent = item.isParent;
    const isExpanded = expandedMenus[item.name];

    // if (
    //   item.children &&
    //   !item.children.some((child) =>
    //     child.permissions ? child.permissions.includes(user.userRole) : true
    //   )
    // ) {
    //   return null;
    // }

    return (
      <Box key={item.name}>
        <ListItemButton
          onClick={() => {
            if (isParent) {
              handleMenuToggle(item.name);
            } else {
              handleItemClick(item);
            }
          }}
          sx={{
            minHeight: 44,
            borderRadius: 0.75,
            ml: '10px',
            mr: '10px',
            typography: 'body2',
            color: 'text.secondary',
            textTransform: 'capitalize',
            fontWeight: 'fontWeightMedium',
            pl: level > 0 ? 4 + level * 2 : 2,
            ...(isActive && {
              color: 'primary.main',
              fontWeight: 'fontWeightSemiBold',
              bgcolor: alpha(theme.palette.primary.main, 0.08),
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.16),
              },
            }),
          }}
        >
          <Box
            component="span"
            sx={{
              width: 24,
              height: 24,
              mr: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {item.icon}
          </Box>

          <Box component="span" sx={{ flexGrow: 1 }}>
            {item.title}
          </Box>

          {isParent && <Box component="span">{isExpanded ? <ExpandLess /> : <ExpandMore />}</Box>}
        </ListItemButton>

        {isParent && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <Stack component="nav" spacing={0.5} sx={{ pl: 2 }}>
              {item.children?.map((child) => (
                <ListItemButton
                  key={child.name}
                  onClick={() => handleItemClick(child)}
                  sx={{
                    minHeight: 36,
                    pl: 8,
                    borderRadius: 0.75,
                    typography: 'body2',
                    color: 'text.secondary',
                    ...(selected === child.name && {
                      color: 'primary.main',
                      fontWeight: 'fontWeightSemiBold',
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.16),
                      },
                    }),
                  }}
                >
                  <Box component="span">{child.title}</Box>
                </ListItemButton>
              ))}
            </Stack>
          </Collapse>
        )}
      </Box>
    );
  };

  const renderMenu = (
    <Stack component="nav" spacing={0.5}>
      {navConfig.map((item) => renderNavItem(item))}
    </Stack>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {renderAccount}
      {renderMenu}
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV_WIDTH,
            borderRight: `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          slotProps={{
            paper: {
              sx: {
                width: NAV.WIDTH,
                bgcolor: 'background.default',
              },
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

function NavItem({ item, pathName, handleSelect }) {
  const router = useRouter();

  const active = pathName.includes(item.name);

  const handleClick = () => {
    handleSelect(item.name);
    router.push(item.path);
  };

  return (
    <ListItemButton
      onClick={handleClick}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        ...(active && {
          color: 'primary.main',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>

      <Box component="span">{item.title} </Box>
    </ListItemButton>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};
