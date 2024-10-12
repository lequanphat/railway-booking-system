import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const SeatPricesTable = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        title: '#',
        dataIndex: 'index',
        key: 'index',
      },
      {
        title: 'Loại ghế',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Giá vé / km',
        dataIndex: 'price',
        key: 'price',
      },
    ],
    [],
  );
  return <Table columns={columns} dataSource={data} size="middle" pagination={false} />;
};

SeatPricesTable.propTypes = {
  data: PropTypes.array,
};

export default SeatPricesTable;
