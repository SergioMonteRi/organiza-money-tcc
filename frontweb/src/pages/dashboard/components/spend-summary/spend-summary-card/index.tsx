import './styles.css';

type Props = {
  icon: React.ReactNode;
  label: string;
  value: number | string;
};

const SpendSummaryCard = (props: Props) => {
  const { icon, label, value } = props;

  return (
    <div className="spend-summary-card-container dashboard-card">
      {icon}
      <h3 className="spend-summary-card-value">{value}</h3>
      <span className="spend-summary-card-label">{label}</span>
    </div>
  );
};

export default SpendSummaryCard;
