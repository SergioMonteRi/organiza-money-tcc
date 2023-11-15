import { useState } from 'react';

import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { BsArrowRight } from 'react-icons/bs';

import { SpendType } from 'utils/types/types';

import './styles.css';
import { SwalRequestError } from 'utils/constants';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'utils/requests/request';

const EditSpendModal = (props: SpendType) => {
  const [newSpendName, setNewSpendName] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SpendType>();

  const onSubmit = (formData: SpendType) => {
    const requestData = { name: formData.name };

    const requestParams: AxiosRequestConfig = {
      method: 'PUT',
      url: `/expenseType/${props.id}`,
      data: requestData,
      withCredentials: true,
    };

    requestBackend(requestParams)
      .then(() => {
        Swal.fire({
          title: 'Alterado com sucesso',
          timer: 2200,
          icon: 'success',
          showConfirmButton: false,
        });
      })
      .catch(() => {
        SwalRequestError();
      });
  };

  return (
    <div className="spend-modal-container">
      <h1>Edição de tipo de gasto</h1>
      <div className="edit-spend-modal-name-change">
        <h2>{props.name}</h2>
        <BsArrowRight />
        <h2>{newSpendName}</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="spend-modal-form-container">
          <input
            {...register('name', {
              required: 'Campo obrigatório',
            })}
            type="text"
            className="spend-modal-form-field-input"
            placeholder="Inserir novo nome para seu gasto"
            name="name"
            onChange={(e) => setNewSpendName(e.target.value)}
            maxLength={20}
          />
          <div className="invalid-feedback d-block">{errors.name?.message}</div>

          <div className="spend-modal-form-button-container">
            <button className="spend-modal-form-button">Concluir</button>
            <button
              className="spend-modal-form-button bg-danger"
              type="button"
              onClick={() => Swal.close()}
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditSpendModal;
