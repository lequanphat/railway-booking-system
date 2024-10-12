import { Button, Table } from 'antd';
import { useMemo } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const SelectedCarriagesTable = ({ data, handleRemoveItem }) => {
  const columns = useMemo(
    () => [
      {
        title: 'Tên toa tàu',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Kết cấu toa',
        dataIndex: 'structure',
        key: 'structure',
      },
      {
        title: 'Số chỗ',
        dataIndex: 'seats',
        key: 'seats',
      },
      {
        title: '',
        dataIndex: 'index',
        key: 'index',
        render: (index) => (
          <Button
            onClick={() => {
              handleRemoveItem(index);
            }}
            type="text"
            icon={<CloseOutlined />}
            size="small"
          />
        ),
      },
    ],
    [],
  );
  return <Table columns={columns} dataSource={data} size="middle" pagination={false} />;
};

SelectedCarriagesTable.propTypes = {
  data: PropTypes.array,
  handleRemoveItem: PropTypes.func,
};

export default SelectedCarriagesTable;
