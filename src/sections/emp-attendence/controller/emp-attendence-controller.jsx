import { useEffect, useState } from 'react';

import { EmpAttendenceView } from '../view/emp-attendence-view';

const EmpAttendenceController = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleSelectTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <EmpAttendenceView selectedTab={selectedTab} handleSelectTab={handleSelectTab} />;
};

export default EmpAttendenceController;
