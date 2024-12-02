import { Alert, App, Button, Card, Checkbox, DatePicker, Flex, Form, Select, Space, Tag } from 'antd';
import { useState } from 'react';
import PageHeader from '~/components/ui/page-header';
import { useSeedSchedules } from '~/features/train-schedules/api/seed-schedule';
import { useGetAllTrain } from '~/features/trains/api/get-all-train';
const { RangePicker } = DatePicker;

const GenerateSchedules = () => {
  const [checkedDays, setCheckedDays] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [messageResponse, setMessageResponse] = useState({
    isError: false,
    message: '',
  });
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const { data: trains } = useGetAllTrain();

  const handleSelectAll = (e) => {
    const { checked } = e.target;
    setCheckedDays((prev) => prev.map(() => (checked ? 1 : 0)));
  };

  const handleDayChange = (day) => (e) => {
    setCheckedDays((prev) => prev.map((value, index) => (index === day ? (e.target.checked ? 1 : 0) : value)));
  };

  const isAllChecked = checkedDays.every((value) => value == 1);

  const seedScheduleMutation = useSeedSchedules({
    mutationConfig: {
      onSuccess: () => {
        setMessageResponse({
          isError: false,
          message: 'Tạo lịch trình thành công',
        });
        form.resetFields();
      },
      onError: (error) => {
        setMessageResponse({
          isError: true,
          message: error.response.data.detail,
        });
      },
    },
  });

  const onSubmit = (values) => {
    if (checkedDays.every((value) => value === 0)) {
      return message.error('Vui lòng chọn ít nhất một ngày trong tuần');
    }
    const obj = {
      startDate: values.date_range[0].format('YYYY-MM-DD'),
      endDate: values.date_range[1].format('YYYY-MM-DD'),
      trainIds: values.train_id,
      daysOfWeek: checkedDays.join(''),
    };
    seedScheduleMutation.mutate(obj);
  };

  return (
    <>
      <Flex align="center" justify="space-between" className="mb-2">
        <PageHeader
          heading="Tạo lịch trình"
          links={[{ title: 'Trang chủ', href: '/admin' }, { title: 'Tạo lịch trình' }]}
        />
      </Flex>
      <Card>
        <Alert
          description="Khi tạo lịch trình, hệ thống sẽ tạo ra các lịch trình tàu dựa trên thông tin bạn cung cấp. Tuy nhiên bạn cần chắc chắn rằng thông tin bạn cung cấp là chính xác và không bị trùng lặp với lịch trình hiện tại."
          type="info"
          className="mb-6"
          showIcon
        />

        {messageResponse.message && (
          <Alert
            message={messageResponse.message}
            type={messageResponse.isError ? 'error' : 'success'}
            className="mb-6"
            showIcon
          />
        )}

        <Form form={form} layout="vertical" variant="filled" onFinish={onSubmit}>
          <Form.Item
            label="Chọn tàu"
            name="train_id"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn tàu',
              },
            ]}
          >
            <Select
              placeholder="Chọn tàu"
              options={trains}
              fieldNames={{
                label: 'name',
                value: 'id',
              }}
              showSearch
              allowClear
              mode="multiple"
              filterOption={(input, option) => option.name.toLowerCase().includes(input.toLowerCase())}
              optionRender={(option) => {
                const { name = '', route = {} } = option.data;
                return (
                  <Flex justify="space-between">
                    <span>{name}</span>
                    <Space>
                      <Tag color="cyan">{route.name}</Tag>
                    </Space>
                  </Flex>
                );
              }}
            />
          </Form.Item>
          <Form.Item
            label="Chọn khoảng thời gian"
            name="date_range"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn khoảng thời gian',
              },
            ]}
          >
            <RangePicker />
          </Form.Item>
          <Form.Item label="Lịch chạy">
            <Space>
              <Checkbox checked={isAllChecked} onChange={handleSelectAll}>
                Chọn tất cả
              </Checkbox>
              <Checkbox checked={checkedDays[1]} onChange={handleDayChange(1)}>
                Thứ hai
              </Checkbox>
              <Checkbox checked={checkedDays[2]} onChange={handleDayChange(2)}>
                Thứ ba
              </Checkbox>
              <Checkbox checked={checkedDays[3]} onChange={handleDayChange(3)}>
                Thứ tư
              </Checkbox>
              <Checkbox checked={checkedDays[4]} onChange={handleDayChange(4)}>
                Thứ năm
              </Checkbox>
              <Checkbox checked={checkedDays[5]} onChange={handleDayChange(5)}>
                Thứ sáu
              </Checkbox>
              <Checkbox checked={checkedDays[6]} onChange={handleDayChange(6)}>
                Thứ bảy
              </Checkbox>
              <Checkbox checked={checkedDays[0]} onChange={handleDayChange(0)}>
                Chủ nhật
              </Checkbox>
            </Space>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Tạo lịch trình
              </Button>
              <Button
                type="default"
                onClick={() => {
                  form.resetFields();
                  setCheckedDays([0, 0, 0, 0, 0, 0, 0]);
                }}
              >
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default GenerateSchedules;
