import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import SpendAddModal from '../spend-add-modal';
import SpendTypeAddModal from './components/spend-type-add-modal';
import SpendManagementModal from './components/spend-management-modal';

import './styles.css';

const SpendTypeAdd = () => {
  const MySwal = withReactContent(Swal);

  const onClickAddSpendType = () => {
    MySwal.fire({
      html: <SpendTypeAddModal />,
      showConfirmButton: false,
    });
  };

  const onClickManagementSpend = () => {
    MySwal.fire({
      html: <SpendManagementModal />,
      showConfirmButton: false,
    });
  };

  const onClickAddSpend = () => {
    MySwal.fire({
      html: <SpendAddModal />,
      showConfirmButton: false,
    });
  };

  return (
    <div className="spend-type-add-container dashboard-card">
      <button className="spend-type-add-button" onClick={onClickAddSpendType}>
        Adicionar categoria de gasto
      </button>
      <button
        className="spend-type-add-button"
        onClick={onClickManagementSpend}
      >
        Gerenciar categoria de gasto
      </button>
      <button className="spend-add-button" onClick={onClickAddSpend}>
        Adicionar gasto
      </button>
    </div>
  );
};

export default SpendTypeAdd;
