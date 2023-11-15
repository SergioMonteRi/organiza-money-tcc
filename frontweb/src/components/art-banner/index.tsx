import FinancialGrowth from 'assets/images/financial-growth.png';

import './styles.css';

const ArtBanner = () => {
  return (
    <div className="login-img-container">
      <div className="login-img-background bg-green-1">
        <div className="login-img-background bg-green-2">
          <div className="login-img-background bg-secondary">
            <img
              className="login-img"
              src={FinancialGrowth}
              alt="Crescimento financeiro"
            />
            <p>É hora de se organizar, visualizar e poupar.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtBanner;
