import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';
import { formatCurrency } from 'src/utils/format-number';
import { fDate } from 'src/utils/format-time';

const StatCard = ({ title, isLoading, value, lastUpdatedAt, icon, type = 'currency' }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: theme.shadows[2],
        '&:hover': {
          boxShadow: theme.shadows[6],
        },
        transition: 'box-shadow 0.3s ease',
      }}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexDirection={'row'}
          textAlign={'left'}
        >
          <Box>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              {title}
            </Typography>
            {isLoading && <CircularProgress size="30px" />}
            {!isLoading && (
              <Typography variant="h4">
                {type === 'currency' ? formatCurrency(value) : value}
              </Typography>
            )}
            {lastUpdatedAt && (
              <Typography variant="caption">{`Last update at ${fDate(new Date())}`}</Typography>
            )}
          </Box>
          <Box
            sx={{
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;
