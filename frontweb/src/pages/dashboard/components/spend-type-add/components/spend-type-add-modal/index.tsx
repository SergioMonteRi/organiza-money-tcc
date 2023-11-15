import { useState } from 'react';

import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { AxiosRequestConfig } from 'axios';

import { requestBackend } from 'utils/requests/request';

import { bouncy } from 'ldrs';

import './styles.css';

type SpendRequest = {
  name: string;
};

bouncy.register();

const SpendTypeAddModal = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMsg, setLoadingMsg] = useState<string>('Cadastrando: Mercado');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SpendRequest>();

  const onSubmit = (formData: SpendRequest) => {
    setIsLoading(true);
    setLoadingMsg('Cadastrando: ' + formData.name);

    const params: AxiosRequestConfig = {
      method: 'POST',
      url: '/expenseType',
      data: formData,
      withCredentials: true,
    };

    requestBackend(params)
      .then(() => {
        Swal.fire({
          title: 'Sucesso!',
          text: `${formData.name} foi cadastrado`,
          icon: 'success',
          showConfirmButton: false,
          timer: 2200,
        });
      })
      .catch(() => {
        Swal.fire({
          title: 'Oops...',
          text: 'Algo não ocorreu bem',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="spend-modal-container">
      {isLoading ? (
        <div className="spend-modal-load-container">
          <h1>{loadingMsg}</h1>
          <l-bouncy size="45" speed="1.75" color="green" />
        </div>
      ) : (
        <>
          <h1>Cadastre um tipo de gasto</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="spend-modal-form-container">
              <input
                {...register('name', {
                  required: 'Campo obrigatório',
                })}
                type="text"
                className="spend-modal-form-field-input"
                placeholder="Inserir tipo de gasto"
                name="name"
              />
              <div className="invalid-feedback d-block">
                {errors.name?.message}
              </div>

              <div className="spend-modal-form-button-container">
                <button className="spend-modal-form-button">Cadastrar</button>
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
        </>
      )}
    </div>
  );
};

export default SpendTypeAddModal;
