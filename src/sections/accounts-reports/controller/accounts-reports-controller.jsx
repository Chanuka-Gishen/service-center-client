import { useEffect, useState } from 'react';
import usePayment from 'src/hooks/usePayment';
import { AccountsReportsView } from '../view/accounts-reports-view';

const AccountsReportsController = () => {
  const {
    accSummary,
    finSummary,
    expSummary,
    isLoadingAccSummary,
    isLoadingFinSummary,
    isLoadingExpenseSummary,
    isLoadingFinReportDownload,
    fetchAccountsSummary,
    fetchFinancialSummary,
    fetchExpenseSummary,
    downloadFinancialReport,
  } = usePayment();

  const [timeRangeFin, setTimeRangeFin] = useState('7days');
  const [isOpenDownload, setIsOpenDownload] = useState(false);

  const handleOpenDownloadDialog = () => {
    setIsOpenDownload(!isOpenDownload);
  };

  const handleDownloadReport = async (params) => {
    await downloadFinancialReport(params);
    handleOpenDownloadDialog()
  };

  useEffect(() => {
    fetchAccountsSummary();
    fetchFinancialSummary();
    fetchExpenseSummary();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AccountsReportsView
      accSummary={accSummary}
      finSummary={finSummary}
      expSummary={expSummary}
      timeRangeFin={timeRangeFin}
      isLoadingAccSummary={isLoadingAccSummary}
      isLoadingFinSummary={isLoadingFinSummary}
      isLoadingExpenseSummary={isLoadingExpenseSummary}
      isLoadingFinReportDownload={isLoadingFinReportDownload}
      isOpenDownload={isOpenDownload}
      handleOpenDownloadDialog={handleOpenDownloadDialog}
      handleDownloadReport={handleDownloadReport}
    />
  );
};

export default AccountsReportsController;
