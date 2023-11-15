import { SalesByPaymentMethod, SpendByTypeData } from 'utils/types/types';

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    style: 'currency',
    currency: 'BRL',
  }).format(price);
};

export const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString();
};

export const formatDateToTable = (date: string) => {
  const hourDate = new Date(date);
  const day = hourDate.getUTCDate().toString().padStart(2, '0');
  const month = (hourDate.getUTCMonth() + 1).toString().padStart(2, '0');
  const year = hourDate.getUTCFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
};

export const formatDateToServe = (date?: Date) => {
  if (date) {
    return date?.toISOString().substring(0, 10);
  }
};

export function DateFormatter(date: string) {
  const dateType = new Date(date);
  const year = dateType.getFullYear();
  const month = (dateType.getMonth() + 1).toString().padStart(2, '0');
  const day = dateType.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export const buildSalesByStoreChart = (spends: SpendByTypeData[]) => {
  const labels = spends.map((spend) => spend.expenseType);
  const series = spends.map((spend) => spend.sum);

  return {
    labels,
    series,
  };
};

export const buildSalesByPaymentMethod = (spends: SalesByPaymentMethod[]) => {
  const labels = spends.map((spend) => spend.description);
  const series = spends.map((spend) => spend.sum);

  return {
    labels,
    series,
  };
};
