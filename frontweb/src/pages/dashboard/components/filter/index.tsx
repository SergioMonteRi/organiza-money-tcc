import { useEffect, useState } from 'react';
import FlatPicker from 'react-flatpickr';
import Select, { SingleValue } from 'react-select';

// 3RD PARTY
import flatpickrLib from 'flatpickr';
import { Portuguese } from 'flatpickr/dist/l10n/pt';

// TYPES
import { FilterData, SpendType } from 'utils/types/types';

// STYLES
import 'flatpickr/dist/themes/material_green.css';
import './styles.css';
import { AxiosRequestConfig } from 'axios';
import { SwalRequestError } from 'utils/constants';
import { requestBackend } from 'utils/requests/request';

flatpickrLib.localize(Portuguese);

type Props = {
  onFilterChange: (filter: FilterData) => void;
};

const requestParams: AxiosRequestConfig = {
  method: 'GET',
  url: '/expenseType',
  withCredentials: true,
};

const Filter = ({ onFilterChange }: Props) => {
  console.log('filter');
  const [dates, setDates] = useState<Date[]>([]);
  const [expenseType, setExpenseType] = useState<SpendType>();
  const [expenseTypeOptions, setExpenseTypeOptions] = useState<SpendType[]>([]);

  const onChangeDate = (dates: Date[]) => {
    if (dates.length === 2) {
      setDates(dates);
      onFilterChange({ dates, expenseType: expenseType?.id });
    }
  };

  const onChangeSpendType = (options: SingleValue<SpendType>) => {
    const spendTypeOption: SpendType = options as SpendType;
    setExpenseType(spendTypeOption);
    onFilterChange({ dates, expenseType: spendTypeOption?.id });
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
    <div className="dashboard-card filter-container">
      <FlatPicker
        className="filter-input"
        placeholder="Selecione um período"
        onChange={onChangeDate}
        options={{
          mode: 'range',
          dateFormat: 'd/m/Y',
          showMonths: 2,
        }}
      />

      <Select
        options={expenseTypeOptions}
        classNamePrefix="filter-input"
        placeholder="Selecione um tipo de gasto"
        getOptionLabel={(spendType: SpendType) => spendType.name}
        getOptionValue={(spendType: SpendType) => String(spendType.id)}
        onChange={(options) => onChangeSpendType(options)}
      />
    </div>
  );
};

export default Filter;
