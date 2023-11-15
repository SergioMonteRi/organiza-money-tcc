import ReactApexChart from 'react-apexcharts';

// HELPERS
import { chartOptions } from './helpers';

// TYPES
import { ChartSeriesData } from 'utils/types/types';

// STYLES
import './styles.css';

type Props = {
  chartData: ChartSeriesData[];
};

const BarChart = ({ chartData }: Props) => {
  return (
    <div className="bar-chart-container">
      <ReactApexChart
        options={chartOptions}
        series={[{ name: 'Mercado', data: chartData }]}
        type="bar"
        height="100%"
        width="100%"
      />
    </div>
  );
};

export default BarChart;
