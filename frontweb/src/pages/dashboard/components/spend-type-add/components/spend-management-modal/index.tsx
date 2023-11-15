import { useEffect, useState } from 'react';

import Swal from 'sweetalert2';
import { AxiosRequestConfig } from 'axios';
import withReactContent from 'sweetalert2-react-content';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

import EditSpendModal from './components/edit-spend-modal';

import { SpendType } from 'utils/types/types';
import { requestBackend } from 'utils/requests/request';

import './styles.css';
import SpendTypeAddModal from '../spend-type-add-modal';
import { SwalRequestError } from 'utils/constants';

const requestParams: AxiosRequestConfig = {
  method: 'GET',
  url: '/expenseType',
  withCredentials: true,
};

const SpendManagementModal = () => {
  const MySwal = withReactContent(Swal);

  const [expenseType, setExpenseType] = useState<SpendType[]>([]);

  const onClickManagementSpend = (spend: SpendType) => {
    MySwal.fire({
      html: <EditSpendModal id={spend.id} name={spend.name} />,
      showConfirmButton: false,
    });
  };

  const onClickAddSpendType = () => {
    MySwal.fire({
      html: <SpendTypeAddModal />,
      showConfirmButton: false,
    });
  };

  const onClickDeleteSpend = (spend: SpendType) => {
    Swal.fire({
      title: `Deseja excluir: ${spend.name}?`,
      showCancelButton: true,
      confirmButtonText: 'Excluir',
      confirmButtonColor: '#29e589',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d35c5c',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        const requestParams: AxiosRequestConfig = {
          method: 'DELETE',
          url: `/expenseType/${spend.id}`,
          withCredentials: true,
        };

        requestBackend(requestParams)
          .then(() => {
            Swal.fire({
              title: 'Deletado com sucesso',
              timer: 2200,
              icon: 'success',
              showConfirmButton: false,
            });
          })
          .catch(() => {
            SwalRequestError();
          });
      }
    });
  };

  useEffect(() => {
    requestBackend(requestParams)
      .then((response) => {
        setExpenseType(response.data);
      })
      .catch(() => {
        SwalRequestError();
      });
  }, []);

  return (
    <div className="spend-management-modal-container">
      <h1>Gerencie seus tipos de gastos</h1>

      {expenseType?.length <= 0 ? (
        <>
          <h2>Nenhuma categoria de gasto cadastrada</h2>
          <div className="spend-modal-form-button-container">
            <button
              className="spend-modal-form-button"
              onClick={onClickAddSpendType}
            >
              Cadastrar agora
            </button>
          </div>
        </>
      ) : (
        <div className="spend-management-modal-wrapper">
          {expenseType.map((spend) => (
            <div
              key={spend.id}
              className="spend-management-modal-item-container"
            >
              <p>{spend.name}</p>
              <div className="spend-management-modal-icons-container">
                <AiOutlineEdit
                  className="spend-management-modal-icons-edit"
                  onClick={() => onClickManagementSpend(spend)}
                />
                <AiOutlineDelete
                  className="spend-management-modal-icons-delete"
                  onClick={() => onClickDeleteSpend(spend)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpendManagementModal;
