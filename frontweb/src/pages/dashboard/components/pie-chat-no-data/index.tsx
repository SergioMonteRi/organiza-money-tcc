import { ReactComponent as PieChartImg } from 'assets/images/pie-chart.svg';

import './styles.css';

const PieChartNoData = () => {
  return (
    <div className="pie-chart-no-data-container dashboard-card">
      <PieChartImg />
    </div>
  );
};

export default PieChartNoData;
