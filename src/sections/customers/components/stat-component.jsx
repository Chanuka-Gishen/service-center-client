import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  useTheme,
  CircularProgress,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export const CustomersStatCard = ({
  icon,
  title,
  count,
  percentageChange = 0,
  includeFooter = false,
  isLoading,
}) => {
  const theme = useTheme();
  const isPositive = percentageChange >= 0;
  const percentageColor = isPositive ? theme.palette.success.main : theme.palette.error.main;

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
        <Box display="flex" flexDirection="column" gap={1}>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            gap={1}
          >
            <Grid container spacing={2}>
              <Grid size={12}>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  sx={{ cursor: 'pointer' }}
                  gutterBottom
                >
                  {title}
                </Typography>
              </Grid>

              <Grid size={12}>
                {isLoading ? (
                  <CircularProgress />
                ) : (
                  <Typography variant="h4" sx={{ cursor: 'pointer' }}>
                    {count}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid size={12}>
                <Avatar
                  sx={{
                    backgroundColor: theme.palette.primary.light,
                    color: theme.palette.primary.main,
                    width: 48,
                    height: 48,
                  }}
                >
                  {icon}
                </Avatar>
              </Grid>
            </Grid>
          </Box>
          {includeFooter && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: percentageColor,
              }}
            >
              {isPositive ? (
                <ArrowUpwardIcon fontSize="small" />
              ) : (
                <ArrowDownwardIcon fontSize="small" />
              )}
              <Typography variant="body2" sx={{ ml: 0.5, fontWeight: 500 }}>
                {percentageChange}% {isPositive ? 'increase' : 'decrease'} from last month
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
