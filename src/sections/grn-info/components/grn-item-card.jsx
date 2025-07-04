import {
  alpha,
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  styled,
  Typography,
} from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import { formatCurrency } from 'src/utils/format-number';
import { useState } from 'react';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: 'rgb(55, 65, 81)',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
    ...theme.applyStyles('dark', {
      color: theme.palette.grey[300],
    }),
  },
}));

export const GrnItemCard = ({ item, handleToggleCreateReturn }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClickStockMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseStockMenu = () => {
    setAnchorEl(null);
  };

  const handleToggle = () => {
    handleCloseStockMenu();
    handleToggleCreateReturn(item);
  };

  return (
    <Card sx={{ minWidth: 275, mb: 2, boxShadow: 3 }}>
      <CardContent>
        <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div" gutterBottom>
            {item.itemName}
          </Typography>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={openMenu ? 'long-menu' : undefined}
            aria-expanded={openMenu ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClickStockMenu}
          >
            <MoreVertIcon />
          </IconButton>
          <StyledMenu
            id="long-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleCloseStockMenu}
          >
            <MenuItem onClick={handleToggle} disableRipple>
              <AssignmentReturnIcon />
              Return Items
            </MenuItem>
          </StyledMenu>
        </Stack>

        <Divider sx={{ my: 1 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            Quantity:
          </Typography>
          <Typography variant="body2">{item.stockQuantity}</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            Unit Price:
          </Typography>
          <Typography variant="body2">{formatCurrency(item.stockUnitPrice)}</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="subtitle2">Total Price:</Typography>
          <Typography variant="subtitle2" fontWeight="bold">
            {formatCurrency(item.stockTotalPrice)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
