import {
  Avatar,
  Badge,
  Box,
  Chip,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

import { fDateTime } from 'src/utils/format-time';
import { WO_STATUS_COMPLETED, WO_STATUS_OPEN } from 'src/constants/workorderStatus';

export const ActiveWorkorderList = ({ selectedId, workorders, isLoading, handleSelect }) => {
  const theme = useTheme();

  // Loading skeletons
  if (isLoading) {
    return (
      <Box>
        <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
          {[1, 2, 3].map((i) => (
            <Box key={i} sx={{ mb: 1 }}>
              <Skeleton variant="rectangular" height={60} sx={{ borderRadius: 1 }} />
            </Box>
          ))}
        </Paper>
      </Box>
    );
  }

  if (!workorders.length) {
    return (
      <Box>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            textAlign: 'center',
            bgcolor: 'background.default',
            borderRadius: 2,
          }}
        >
          <DirectionsCarFilledIcon
            sx={{ fontSize: 48, color: 'text.secondary', opacity: 0.3, mb: 2 }}
          />
          <Typography color="text.secondary">No active work orders found</Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box>
      {/* Desktop: Vertical List (Column) */}
      <Paper
        elevation={0}
        sx={{
          display: { xs: 'none', lg: 'block' },
          maxHeight: 'calc(100vh - 200px)',
          overflow: 'auto',
          bgcolor: 'background.default',
          borderRadius: 2,
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.divider,
            borderRadius: '4px',
          },
        }}
      >
        <List sx={{ p: 1 }}>
          {workorders.map((order) => (
            <ListItemButton
              key={order._id}
              onClick={() => handleSelect(order)}
              selected={order._id === selectedId}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                '&.Mui-selected': {
                  backgroundColor: theme.palette.primary.light + '20',
                  borderLeft: `4px solid ${theme.palette.primary.main}`,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.light + '30',
                  },
                },
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: theme.palette.primary.main + '20',
                    color: theme.palette.primary.main,
                  }}
                >
                  <DirectionsCarFilledIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography sx={{ fontWeight: 600 }}>
                    {order.workorderCustomer?.customerName || 'Unknown Customer'}
                  </Typography>
                }
                secondary={
                  <Stack spacing={0.5} sx={{ mt: 0.5 }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <PersonIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                      <Typography color="text.secondary">
                        {order.workorderVehicle?.vehicleNumber || 'No Vehicle'}
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <AccessTimeIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                      <Typography color="text.secondary">{fDateTime(order.createdAt)}</Typography>
                    </Stack>
                  </Stack>
                }
              />
            </ListItemButton>
          ))}
        </List>
      </Paper>

      {/* Mobile/Tablet: Horizontal Scrollable Row */}
      <Box
        sx={{
          display: { xs: 'flex', lg: 'none' },
          flexDirection: 'row',
          overflowX: 'auto',
          gap: 2,
          pb: 2,
          '&::-webkit-scrollbar': {
            height: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.divider,
            borderRadius: '3px',
          },
        }}
      >
        {workorders.map((order) => (
          <Paper
            key={order._id}
            elevation={0}
            onClick={() => handleSelect(order)}
            sx={{
              minWidth: 280,
              maxWidth: 300,
              cursor: 'pointer',
              border: '1px solid',
              borderColor: order._id === selectedId ? 'primary.main' : 'divider',
              bgcolor: order._id === selectedId ? 'primary.light' + '10' : 'background.paper',
              borderRadius: 2,
              p: 2,
              transition: 'all 0.2s',
              '&:hover': {
                borderColor: 'primary.main',
                bgcolor: 'action.hover',
                transform: 'translateY(-2px)',
                boxShadow: theme.shadows[4],
              },
            }}
          >
            <Stack spacing={1.5}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                  {order.workorderCustomer?.customerName || 'Unknown'}
                </Typography>
                <Chip
                  label={order.workorderStatus}
                  size="small"
                  color={
                    order.workorderStatus === WO_STATUS_OPEN
                      ? 'info'
                      : order.workorderStatus === WO_STATUS_COMPLETED
                        ? 'success'
                        : 'default'
                  }
                  sx={{ height: 24, fontSize: '0.7rem' }}
                />
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.light' + '20' }}>
                  <DirectionsCarIcon sx={{ fontSize: 18 }} />
                </Avatar>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {order.workorderVehicle?.vehicleNumber || 'No Vehicle'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {order.workorderVehicle?.vehicleManufacturer || ''}{' '}
                    {order.workorderVehicle?.vehicleModel || ''}
                  </Typography>
                </Box>
              </Stack>

              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="caption" color="text.secondary">
                  Mileage: {order.workorderMileage || 0} km
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {fDateTime(order.createdAt)}
                </Typography>
              </Stack>

              {order.workorderInvoiceNumber && (
                <Typography variant="caption" color="primary.main" sx={{ mt: 0.5 }}>
                  Invoice: #{order.workorderInvoiceNumber}
                </Typography>
              )}
            </Stack>
          </Paper>
        ))}
      </Box>

      {/* Empty state for mobile/tablet */}
      {workorders.length === 0 && (
        <Paper
          elevation={0}
          sx={{
            p: 3,
            textAlign: 'center',
            bgcolor: 'background.default',
            borderRadius: 2,
          }}
        >
          <Typography color="text.secondary">No active work orders</Typography>
        </Paper>
      )}
    </Box>
  );
};
