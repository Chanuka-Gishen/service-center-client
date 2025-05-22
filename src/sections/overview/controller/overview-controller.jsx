import React, { useEffect, useState } from 'react';
import { Overview } from '../view/overview-view';
import useInventory from 'src/hooks/useInventory';
import { ITEM_STS_OUTOFSTOCK } from 'src/constants/item-status';
import useWorkOrder from 'src/hooks/useWorkorder';
import usePayment from 'src/hooks/usePayment';

const stockTableColumns = ['Code', 'Item', 'Quantity'];
const pendingPayColumns = ['vehicle No', 'Customer Name', 'Amount', 'Transaction Id', 'Created At']

const OverviewController = () => {
  const {
    invStockStats,
    invStockStatsCount,
    isLoadingStockAvailabilityStats,
    fetchStockStatistics,
  } = useInventory();

  const {
    chartTotalRevenueData,
    charTotalJobsData,
    activeJobsCount,
    todayRevenue,
    totalReceivables,
    isLoadingChartRevenueData,
    isLoadingChartTotalJobs,
    isLoadingActiveJobsCount,
    isLoadingTodayRevenue,
    isLoadingReceivables,
    fetchTotalRevenueChartData,
    fetchTotalJobsCountChartData,
    fetchActiveJobsCount,
    fetchTodayTotalRevenue,
    fetchTotalReceivables,
  } = useWorkOrder();

  const {pendingPayments, isLoadingPendingPayments, fetchPendingPayments} = usePayment()

  const [selectedInvStatus, setSelectedInvStatus] = useState(ITEM_STS_OUTOFSTOCK);

  useEffect(() => {
    fetchStockStatistics(selectedInvStatus);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedInvStatus]);

  useEffect(() => {
    fetchTotalRevenueChartData();
    fetchTotalJobsCountChartData();
    fetchActiveJobsCount();
    fetchTodayTotalRevenue();
    fetchTotalReceivables();
    fetchPendingPayments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Overview
      selectedInvStatus={selectedInvStatus}
      setSelectedInvStatus={setSelectedInvStatus}
      stockTableColumns={stockTableColumns}
      pendingPayColumns={pendingPayColumns}
      invStockStats={invStockStats}
      invStockStatsCount={invStockStatsCount}
      chartTotalRevenueData={chartTotalRevenueData}
      charTotalJobsData={charTotalJobsData}
      activeJobsCount={activeJobsCount}
      todayRevenue={todayRevenue}
      totalReceivables={totalReceivables}
      pendingPayments={pendingPayments}
      isLoadingChartRevenueData={isLoadingChartRevenueData}
      isLoadingChartTotalJobs={isLoadingChartTotalJobs}
      isLoadingStockAvailabilityStats={isLoadingStockAvailabilityStats}
      isLoadingActiveJobsCount={isLoadingActiveJobsCount}
      isLoadingTodayRevenue={isLoadingTodayRevenue}
      isLoadingReceivables={isLoadingReceivables}
      isLoadingPendingPayments={isLoadingPendingPayments}
    />
  );
};

export default OverviewController;
