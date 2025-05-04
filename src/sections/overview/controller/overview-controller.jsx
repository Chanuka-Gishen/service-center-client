import React, { useEffect, useState } from 'react';
import { Overview } from '../view/overview-view';
import useInventory from 'src/hooks/useInventory';
import { ITEM_STS_OUTOFSTOCK } from 'src/constants/item-status';
import useWorkOrder from 'src/hooks/useWorkorder';

const stockTableColumns = ['Code', 'Item', 'Quantity'];

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Overview
      selectedInvStatus={selectedInvStatus}
      setSelectedInvStatus={setSelectedInvStatus}
      stockTableColumns={stockTableColumns}
      invStockStats={invStockStats}
      invStockStatsCount={invStockStatsCount}
      chartTotalRevenueData={chartTotalRevenueData}
      charTotalJobsData={charTotalJobsData}
      activeJobsCount={activeJobsCount}
      todayRevenue={todayRevenue}
      totalReceivables={totalReceivables}
      isLoadingChartRevenueData={isLoadingChartRevenueData}
      isLoadingChartTotalJobs={isLoadingChartTotalJobs}
      isLoadingStockAvailabilityStats={isLoadingStockAvailabilityStats}
      isLoadingActiveJobsCount={isLoadingActiveJobsCount}
      isLoadingTodayRevenue={isLoadingTodayRevenue}
      isLoadingReceivables={isLoadingReceivables}
    />
  );
};

export default OverviewController;
