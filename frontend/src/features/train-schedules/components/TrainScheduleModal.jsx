import { App, Button, Drawer, Flex, Form, Popconfirm, Select, Space, Table, Tag } from 'antd';
import { useMemo } from 'react';
import { PlusOutlined, DeleteOutlined, FieldTimeOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { useGetAllTrain } from '~/features/trains/api/get-all-train';
import { useScheduleByDate } from '~/features/train-schedules/api/get-schedule-by-date';
import { useDeleteSchedule } from '~/features/train-schedules/api/delete-schedule';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateSchedules } from '~/features/train-schedules/api/create-schedules';

const TrainScheduleModal = ({ date, open, onCancel }) => {
  const queryClient = useQueryClient();
  const { message } = App.useApp();
  const { data, isLoading } = useScheduleByDate({ date: date?.format('YYYY-MM-DD') });

  const deleteScheduleMutation = useDeleteSchedule({
    mutationConfig: {
      onSuccess: () => {
        message.success('Xoá chuyến thành công !');
        queryClient.invalidateQueries({
          queryKey: ['schedule', date?.format('YYYY-MM-DD')],
        });
      },
      onError: (error) => {
        message.error(error?.response?.data?.detail);
      },
    },
  });

  const columns = useMemo(
    () => [
      {
        title: '#',
        dataIndex: 'id',
        key: 'id',
        width: 70,
        align: 'center',
      },
      {
        title: 'Mác tàu',
        dataIndex: ['train', 'name'],
        key: 'name',
        width: 80,
        align: 'center',
        render: (label, record) => (
          <Tag color="orange-inverse" key={record.train.id}>
            {record.train.name}
          </Tag>
        ),
      },
      {
        title: 'Tuyến đường',
        dataIndex: ['train', 'route', 'name'],
        key: 'route',
      },
      {
        render: (label, record) => (
          <Space>
            <Button size="small" icon={<UserSwitchOutlined />} variant="filled" color="default">
              Hành khách
            </Button>
            <Button
              size="small"
              icon={<FieldTimeOutlined />}
              variant="filled"
              color="primary"
              href={`/admin/trains/${record.train.id}/route-segments`}
              target="_blank"
            >
              Giờ tàu
            </Button>
            <Popconfirm
              title="Xoá chuyến?"
              description="Bạn có chắc chắn xoá không ?"
              okText="Yes"
              cancelText="No"
              placement="topRight"
              onConfirm={() => deleteScheduleMutation.mutate({ id: record.id })}
            >
              <Button size="small" icon={<DeleteOutlined />} color="danger" variant="filled" />
            </Popconfirm>
          </Space>
        ),
        fixed: 'right',
        width: 250,
      },
    ],
    [deleteScheduleMutation],
  );

  return (
    <Drawer
      title={`Danh sách tàu chạy ${date?.format('dddd')} ngày ${date?.format('DD-MM-YYYY')}`}
      open={open}
      onClose={onCancel}
      size="large"
      centered
    >
      <AddTrainScheduleForm date={date} currentList={data} />
      <Table
        rowKey="id"
        size="small"
        columns={columns}
        dataSource={data}
        loading={isLoading}
        pagination={false}
        bordered
      />
    </Drawer>
  );
};

const AddTrainScheduleForm = ({ date, currentList }) => {
  const { data } = useGetAllTrain();
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const createSchedules = useCreateSchedules({
    mutationConfig: {
      onSuccess: () => {
        message.success('Thêm chuyến thành công!');
        form.resetFields();
      },
      onError: (error) => {
        message.error(error?.response?.data?.detail);
      },
    },
  });

  const options = useMemo(
    () =>
      data?.map((item) => ({
        ...item,
        disabled: currentList?.some((current) => current.train.id === item.id),
      })),
    [data, currentList],
  );

  const onFinish = (values) => {
    createSchedules.mutate({ data: values });
  };

  return (
    <Form
      form={form}
      initialValues={{
        trains: [],
        date: date?.format('YYYY-MM-DD'),
      }}
      onFinish={onFinish}
      layout="vertical"
      variant="filled"
    >
      <Form.Item name="date" noStyle />
      <Form.Item
        name="trains"
        label="Chọn tàu chạy"
        rules={[
          {
            required: true,
            message: 'Vui lòng chọn tàu chạy',
          },
        ]}
      >
        <Select
          placeholder="Chọn tàu"
          options={options}
          fieldNames={{ label: 'name', value: 'id' }}
          optionRender={(option) => {
            const { name = '', route = {} } = option.data;
            return (
              <Flex justify="space-between">
                <span>{name}</span>
                <Space>
                  <Tag color="cyan">{route.name}</Tag>
                  {option.data.disabled && <Tag color="red">Đã chọn</Tag>}
                </Space>
              </Flex>
            );
          }}
          filterOption={(input, option) => option.name.toLowerCase().includes(input.toLowerCase())}
          mode="multiple"
          allowClear
          showSearch
        />
      </Form.Item>
      <Form.Item>
        <Button
          className="w-full"
          type="primary"
          htmlType="submit"
          icon={<PlusOutlined />}
          loading={createSchedules.isPending}
        >
          Thêm chuyến
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TrainScheduleModal;
