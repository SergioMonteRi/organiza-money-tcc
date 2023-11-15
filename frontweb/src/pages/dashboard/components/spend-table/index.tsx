import { useCallback, useEffect, useMemo, useState } from 'react';

// 3RD PARTY
import { AxiosRequestConfig } from 'axios';

// UTILS
import { formatDateToTable } from 'utils/requests/formatters';
import { buildFilterParams, requestBackend } from 'utils/requests/request';

// TYPES
import { FilterData, SpendData, SpringPage } from 'utils/types/types';

// COMPONENTS
import Pagination from 'components/pagination';

// STYLES
import './styles.css';

type Props = {
  filterData?: FilterData;
};

const SpendTable = ({ filterData }: Props) => {
  const [page, setPage] = useState<SpringPage<SpendData>>();

  const requestParams = useMemo(
    () => buildFilterParams(filterData),
    [filterData]
  );

  const getSpends = useCallback(
    (pageNumber: number) => {
      const params: AxiosRequestConfig = {
        method: 'GET',
        url: '/expense',
        params: {
          ...requestParams,
          page: pageNumber,
          size: 8,
        },
        withCredentials: true,
      };

      requestBackend(params)
        .then((response) => {
          setPage(response.data);
        })
        .catch(() => {});
    },
    [requestParams]
  );

  useEffect(() => {
    getSpends(0);
  }, [getSpends]);

  return (
    <div className="dashboard-card">
      <h4 className="spends-by-date-title">Registro dos gastos</h4>

      {page?.content.length ? (
        <>
          <div className="spends-table-container">
            <table className="spends-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Data</th>
                  <th>Categoria</th>
                  <th>Valor R$</th>
                </tr>
              </thead>
              <tbody>
                {page.content.map((spend) => (
                  <tr key={spend.id}>
                    <td>{spend.id}</td>
                    <td>{formatDateToTable(spend.date)}</td>
                    <td>{spend.expenseType.name}</td>
                    <td>{spend.spend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="row">
            <Pagination
              pageCount={page ? page.totalPages : 0}
              range={3}
              onChange={(pageNumber) => getSpends(pageNumber)}
            />
          </div>
        </>
      ) : (
        <h4 className="spend-table-no-data">Ainda não há registro</h4>
      )}
    </div>
  );
};

export default SpendTable;
