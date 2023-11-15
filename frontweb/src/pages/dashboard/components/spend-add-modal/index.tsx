import { useEffect, useState } from 'react';

import Swal from 'sweetalert2';
import Select from 'react-select';
import FlatPicker from 'react-flatpickr';
import { AxiosRequestConfig } from 'axios';
import { useForm, Controller } from 'react-hook-form';
import CurrencyInput from 'react-currency-input-field';

import { requestBackend } from 'utils/requests/request';
import { SpendAddRequest } from 'utils/types/request-types';

import { bouncy } from 'ldrs';

import './styles.css';
import { SwalRequestError } from 'utils/constants';
import { SpendType } from 'utils/types/types';
import { DateFormatter } from 'utils/requests/formatters';

bouncy.register();

const requestParams: AxiosRequestConfig = {
  method: 'GET',
  url: '/expenseType',
  withCredentials: true,
};

const SpendAddModal = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMsg, setLoadingMsg] = useState<string>();
  const [expenseTypeOptions, setExpenseTypeOptions] = useState<SpendType[]>([]);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<SpendAddRequest>();

  const onSubmit = (formData: SpendAddRequest) => {
    setIsLoading(true);

    const data = {
      ...formData,
      value: String(formData.value).replace(',', '.'),
      date: DateFormatter(formData.date),
    };

    setLoadingMsg('R$ ' + formData.value + ' em ' + formData.expenseType.name);

    const params: AxiosRequestConfig = {
      method: 'POST',
      url: '/expense',
      data: data,
      withCredentials: true,
    };

    requestBackend(params)
      .then(() => {
        Swal.fire({
          title: 'Sucesso!',
          text: 'Valor cadastrado',
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

  useEffect(() => {
    requestBackend(requestParams)
      .then((response) => {
        setExpenseTypeOptions(response.data);
      })
      .catch(() => {
        SwalRequestError();
      });
  }, []);

  return (
    <div className="spend-modal-container spend-add">
      {isLoading ? (
        <div className="spend-modal-load-container">
          <h1>{loadingMsg}</h1>

          <l-bouncy size="45" speed="1.75" color="green" />
          <h2>adicionando</h2>
        </div>
      ) : (
        <>
          <h1>Adicionar gasto</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="categories" className="d-none">
                Categorias
              </label>
              <Controller
                name="expenseType"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={expenseTypeOptions}
                    classNamePrefix="product-crud-select"
                    placeholder="Categoria de gasto"
                    getOptionLabel={(category: SpendType) => category.name}
                    getOptionValue={(category: SpendType) =>
                      String(category.id)
                    }
                    noOptionsMessage={() => 'Categoria de gasto não cadastrada'}
                    inputId="categories"
                  />
                )}
              />
              {errors.expenseType && (
                <div className="invalid-feedback d-block">
                  Campo obrigatório
                </div>
              )}
            </div>

            <div className="mb-3">
              <Controller
                name="value"
                rules={{ required: 'Campo obrigatório' }}
                control={control}
                render={({ field }) => (
                  <CurrencyInput
                    placeholder="Valor"
                    className={`form-control base-input ${
                      errors.value ? 'is-invalid' : ''
                    }`}
                    disableGroupSeparators={true}
                    value={field.value}
                    onValueChange={field.onChange}
                    data-testid="price"
                  />
                )}
              />
              <div className="invalid-feedback d-block">
                {errors.value?.message}
              </div>
            </div>

            <div className="mb-3">
              <Controller
                name="date"
                rules={{ required: 'Campo obrigatório' }}
                control={control}
                render={({ field }) => (
                  <FlatPicker
                    {...field}
                    className="add-spend-date-input"
                    placeholder="Data"
                    options={{
                      dateFormat: 'd/m/Y',
                    }}
                  />
                )}
              />
              <div className="invalid-feedback d-block">
                {errors.value?.message}
              </div>
            </div>

            <div className="spend-modal-form-button-container">
              <button className="spend-modal-form-button" type="submit">
                Adicionar
              </button>
              <button
                className="spend-modal-form-button bg-danger"
                type="button"
                onClick={() => Swal.close()}
              >
                Cancelar
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default SpendAddModal;
