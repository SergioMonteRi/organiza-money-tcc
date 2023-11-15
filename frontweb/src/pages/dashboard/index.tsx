import { useEffect, useMemo, useState } from 'react';

// 3RD PARTY
import { AxiosRequestConfig } from 'axios';

// UTILS
import { FilterData, PieChartConfig } from 'utils/types/types';
import { buildFilterParams, requestBackend } from 'utils/requests/request';
import { buildSalesByStoreChart } from 'utils/requests/formatters';

// COMPONENTS
import Filter from './components/filter';
import PieChart from './components/pie-chart';
import SpendTable from './components/spend-table';
import ProfileCard from './components/profile-card';
import SpendSummary from './components/spend-summary';
import NavigationBar from 'components/navigation-bar';
import SpendsByDate from './components/spends-by-date';
import SpendTypeAdd from './components/spend-type-add';

// STYLES
import './styles.css';
import PieChartNoData from './components/pie-chat-no-data';

const Dashboard = () => {
  const [filterData, setFilterData] = useState<FilterData>();
  const [spendByType, setSpendByType] = useState<PieChartConfig>();

  const requestParams = useMemo(
    () => buildFilterParams(filterData),
    [filterData]
  );

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: '/expense/expense-type',
      params: requestParams,
      withCredentials: true,
    };

    requestBackend(params).then((response) => {
      const newSpendsByType = buildSalesByStoreChart(response.data);
      setSpendByType(newSpendsByType);
    });
  }, [requestParams]);

  const onFilterChange = (filter: FilterData) => {
    setFilterData(filter);
  };

  return (
    <div className="dashobard-container">
      <NavigationBar />
      <div className="dashboard-content">
        <ProfileCard />
        <SpendTypeAdd />
        <Filter onFilterChange={onFilterChange} />
        <SpendsByDate filterData={filterData} />
        <div className="spend-overview-container">
          <SpendSummary filterData={filterData} />
          {spendByType?.series.length ? (
            <PieChart
              labels={spendByType?.labels}
              series={spendByType?.series}
            />
          ) : (
            <PieChartNoData />
          )}
        </div>
        <SpendTable filterData={filterData} />
      </div>
    </div>
  );
};

export default Dashboard;
