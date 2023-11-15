import { useEffect, useMemo, useState } from 'react';

// COMPONENTS
import BarChart from 'pages/dashboard/components/bar-chart';

// UTILS
import { buildFilterParams, requestBackend } from 'utils/requests/request';
import { formatDate, formatPrice } from 'utils/requests/formatters';

// HELPERS
import { buildChartSeries, sumSpendsByDate } from '../bar-chart/helpers';

// TYPES
import { AxiosRequestConfig } from 'axios';
import { ChartSeriesData, FilterData, SpendByDate } from 'utils/types/types';

// STYLES
import './styles.css';

type Props = {
  filterData?: FilterData;
};

const SpendsByDate = ({ filterData }: Props) => {
  const [chartSeries, setChartSeries] = useState<ChartSeriesData[]>([]);
  const [totalSum, setTotalSum] = useState(0);

  const requestParams = useMemo(
    () => buildFilterParams(filterData),
    [filterData]
  );

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: '/expense/filter?',
      params: requestParams,
      withCredentials: true,
    };

    requestBackend(params).then((response) => {
      const spendsByDateResponse: SpendByDate[] = response.data;
      const newChartSeries = buildChartSeries(spendsByDateResponse);
      const newTotalSum = sumSpendsByDate(spendsByDateResponse);

      setTotalSum(newTotalSum);
      setChartSeries(newChartSeries);
    });
  }, [requestParams]);

  return (
    <div className="dashboard-card spends-by-date-container">
      <div className="spends-by-date-information">
        <div>
          <h4 className="spends-by-date-title">Gastos no período</h4>
          {filterData?.dates && (
            <span className="spends-by-date-period">
              {`${formatDate(filterData?.dates?.[0])} até 
              ${formatDate(filterData?.dates?.[1])}`}
            </span>
          )}
        </div>

        <div className="spends-by-date-quantity-container">
          <h2 className="spends-by-date-quantity">{formatPrice(totalSum)}</h2>
          <span className="spends-by-date-quantity-label">
            Gastos totais no período
          </span>
        </div>
      </div>

      <BarChart chartData={chartSeries} />
    </div>
  );
};

export default SpendsByDate;
