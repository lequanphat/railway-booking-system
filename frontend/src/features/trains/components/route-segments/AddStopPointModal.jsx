import { Col, Form, Input, InputNumber, Modal, Row, Select, TimePicker } from 'antd';
import { useStations } from '~/features/trains/api/get-stations';
import { searchWithoutDiacritics } from '~/utils/searchWithoutDiacritics';

const AddStopPointModal = ({ open, closeModal, handleAddItem, dataSource }) => {
  const { data } = useStations();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    const formattedValues = {
      station: {
        id: values.station_id,
        name: values.station_name,
      },
      distance: values.distance,
      day_number: values.day_number,
      departure_time: values.departure_time,
      arrival_time: values.arrival_time,
    };

    handleAddItem(formattedValues);
    form.resetFields();
  };

  return (
    <Modal
      title="Thêm điểm dừng"
      open={open}
      onOk={form.submit}
      onCancel={closeModal}
      maskClosable={false}
      destroyOnClose
    >
      <Form form={form} layout="vertical" variant="filled" onFinish={onFinish} clearOnDestroy>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Ga đi"
              name="station_id"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn ga',
                },
                {
                  validator: (_, value) => {
                    if (dataSource.some((item) => item.station.id === value)) {
                      return Promise.reject('Ga đã tồn tại trong hành trình');
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Select
                placeholder="Chọn ga"
                options={data}
                fieldNames={{ label: 'name', value: 'id' }}
                filterOption={(input, option) => searchWithoutDiacritics(option.name, input)}
                onChange={(value, option) => form.setFieldsValue({ station_name: option.name })}
                allowClear
                showSearch
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Cự ly (Km)"
              name="distance"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập cự ly',
                },
              ]}
            >
              <InputNumber placeholder="Nhập cự ly" min={1} className="w-full" changeOnWheel />
            </Form.Item>
            <Form.Item name="station_name" hidden>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Ngày thứ"
              name="day_number"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập ngày thứ',
                },
              ]}
            >
              <InputNumber placeholder="Ngày thứ" min={1} max={7} className="w-full" changeOnWheel />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Giờ đến"
              name="departure_time"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập giờ đến',
                },
              ]}
            >
              <TimePicker format="HH:mm" className="w-full" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Giờ đi"
              name="arrival_time"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập giờ đi',
                },
              ]}
            >
              <TimePicker format="HH:mm" className="w-full" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddStopPointModal;
