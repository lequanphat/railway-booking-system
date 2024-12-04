import { DeleteOutlined, EditOutlined, ExportOutlined,LockOutlined,UnlockOutlined } from '@ant-design/icons';
import { Button, Flex, Input, Space, Table, Tag } from 'antd';
import { useMemo, useState } from 'react';
import { ROW_PER_PAGE } from '~/config/constants';
import { useCustomers } from '../api/get-customers';
import PropTypes from 'prop-types';

export const CustomerTable = ({handleUpdateStatus}) => {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const { data: customers, isLoading } = useCustomers({
    page,
    keyword,
    size: ROW_PER_PAGE,
  });

  const columns = useMemo(
    () => [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        render: (text) => (text ? text : 'N/A'),
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        render: (text) => (text ? text : 'N/A'),
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        render: (text) => (text ? text : 'N/A'),
      },
      {
        title: 'Status',
        key: 'is_deleted',
        dataIndex: 'is_deleted',
        render: (_, { is_deleted }) => (
          <>
            <Tag color={is_deleted ? 'red' : 'blue'}>{is_deleted ? 'DISABLED' : 'ACTIVE'}</Tag>
          </>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        render: (data) => (
          <Space>
            <Button disabled onClick={null} icon={<EditOutlined />} iconPosition={'end'} />
            <Button disabled onClick={null} icon={<DeleteOutlined />} iconPosition={'end'} />
            <Button
              onClick={() => handleUpdateStatus(data)}
              icon={data?.is_deleted ? <LockOutlined /> : <UnlockOutlined />}
              iconPosition={'end'}
            />
          </Space>
        ),
      },
    ],
    [],
  );

  return (
    <>
      <Table
        columns={columns}
        dataSource={customers?.content}
        size="middle"
        pagination={{
          current: page,
          pageSize: customers?.size,
          total: customers?.totalElements,
        }}
        loading={isLoading}
        onChange={(e) => {
          setPage(e?.current);
        }}
        title={() => (
          <Flex justify="space-between">
            <Input.Search
              placeholder="Tìm kiếm..."
              className="w-[250px]"
              allowClear
              onSearch={(value) => {
                setKeyword(value);
                setPage(1);
              }}
            />
            <Button disabled icon={<ExportOutlined />}>
              Export<Tag color="blue">Coming Soon</Tag>
            </Button>
          </Flex>
        )}
      />
    </>
  );
};

CustomerTable.propTypes = {
  handleUpdateStatus: PropTypes.func,
};