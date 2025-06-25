import React from 'react';
import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import { formatCurrency } from 'src/utils/format-number';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  borderLeft: `4px solid ${theme.palette.primary.main}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[6],
  },
}));

const Divider = styled('hr')(({ theme }) => ({
  borderColor: theme.palette.divider,
  margin: theme.spacing(0, 2),
}));

export const SummaryCard = ({ selectedItems }) => {
  const theme = useTheme();

  // Calculate totals
  const totalItems = selectedItems.length;
  const totalValue = selectedItems
    .filter((item) => item)
    .reduce((sum, item) => {
      const value =
        typeof item.stockUnitPrice === 'number'
          ? item.stockQuantity * item.stockUnitPrice
          : Number(item.stockQuantity * item.stockUnitPrice) || 0;
      return sum + value;
    }, 0);

  console.log(totalValue);

  return (
    <StyledCard elevation={3}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Typography variant="subtitle2" color="textSecondary">
              Selected Items
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {totalItems}
            </Typography>
          </Box>

          <Divider orientation="vertical" flexItem />

          <Box textAlign="right">
            <Typography variant="subtitle2" color="textSecondary">
              Total Value
            </Typography>
            <Typography variant="h4" fontWeight="bold" color={theme.palette.success.main}>
              {formatCurrency(totalValue)}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default SummaryCard;
