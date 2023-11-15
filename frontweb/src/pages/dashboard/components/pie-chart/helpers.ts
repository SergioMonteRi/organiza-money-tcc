import { ApexOptions } from 'apexcharts';

export const buildPieChartConfig = (labels: string[] = [], name: string) => {
  return {
    labels,
    legend: {
      position: 'bottom',
      fontSize: '14px',
      fontWeight: 'normal',
      fontFamily: 'Montserrat, sans-serif',
    },
    noData: {
      text: 'Sem resultados',
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: '#FFF',
        fontSize: '16px',
        fontFamily: 'Roboto, sans-serif',
      },
    },
    chart: {
      width: '100%',
      height: '100%',
      offsetY: 0,
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '16px',
              formatter: function () {
                return name;
              },
            },
            total: {
              show: true,
              showAlways: true,
              fontSize: '22px',
              color: '#ABB1C0',
              fontFamily: 'Roboto, sans-serif',
              formatter: function () {
                return '%';
              },
            },
          },
        },
      },
    },
  } as ApexOptions;
};
