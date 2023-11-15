import { ApexOptions } from 'apexcharts';

import { SpendByDate } from 'utils/types/types';

export const chartOptions = {
  legend: {
    show: false,
    position: 'left',
  },
  noData: {
    text: 'Sem resultados',
    align: 'center',
    verticalAlign: 'middle',
    offsetY: -15,
    style: {
      color: '#08B976',
      fontSize: '18px',
      fontFamily: 'Raleway, sans-serif',
    },
  },
  chart: {
    foreColor: '#6b6b6b',
    height: '100%',
    width: '100%',
    fontFamily: 'Raleway, sans-serif',
    offsetX: -10,
    locales: [
      {
        name: 'pt-BR',
        options: {
          months: [
            'Janeiro, Fevereiro, Março, Abril, Maio, Junho, Julho, Agosto, Setembro, Outubro, Novembro, Dezembro',
          ],
          shortMonths: [
            'Jan',
            'Fev',
            'Mar',
            'Abr',
            'Mai',
            'Jun',
            'Jul',
            'Ago',
            'Set',
            'Out',
            'Nov',
            'Dez',
          ],
          days: [
            'Segunda',
            'Terça',
            'Quarta',
            'Quinta',
            'Sexta',
            'Sábado',
            'Domingo',
          ],
          shortDays: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        },
      },
    ],
    defaultLocale: 'pt-BR',
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '20%',
      endingShape: 'rounded',
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: false,
  },
  xaxis: {
    type: 'datetime',
  },
  yaxis: {},
  fill: {
    opacity: 1,
    colors: ['#08B976'],
  },
  tooltip: {
    theme: 'dark',
    y: {
      formatter: function (val: number) {
        return `R$ ${val}`;
      },
    },
  },
} as ApexOptions;

export const buildChartSeries = (spendByDate: SpendByDate[] = []) => {
  return spendByDate.map(({ date, sum }) => ({
    x: date,
    y: sum,
  }));
};

export const sumSpendsByDate = (spendByDate: SpendByDate[] = []) => {
  return spendByDate.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.sum;
  }, 0);
};
