import { Col, Form, Input, InputNumber, Modal, Row, Select, TimePicker } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';
import { useStations } from '~/features/trains/api/get-stations';
import { searchWithoutDiacritics } from '~/utils/searchWithoutDiacritics';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const UpdateStopPointModal = ({ open, closeModal, handleUpdateItem, dataSource, selectedRow }) => {
  const { data } = useStations();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    handleUpdateItem(values);
  };

  const initialValues = useMemo(
    () => ({
      station_id: selectedRow?.station.id,
      station_name: selectedRow?.station.name,
      distance: selectedRow?.distance,
      day_number: selectedRow?.day_number,
      departure_time: dayjs(selectedRow?.departure_time, 'HH:mm'),
      arrival_time: dayjs(selectedRow?.arrival_time, 'HH:mm'),
    }),
    [selectedRow],
  );

  useEffect(() => {
    if (open) {
      form.setFieldsValue(initialValues);
    }
  }, [form, open, initialValues]);

  return (
    <Modal title="Cập nhật điểm dừng" open={open} onOk={form.submit} onCancel={closeModal} maskClosable={false}>
      <Form form={form} initialValues={initialValues} layout="vertical" variant="filled" onFinish={onFinish}>
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
                    if (
                      dataSource.some(
                        (item) => item.station.id != initialValues.station_id && item.station.id === value,
                      )
                    ) {
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
              <InputNumber placeholder="Nhập cự ly" min={0} className="w-full" changeOnWheel />
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
              <InputNumber placeholder="Ngày thứ" min={0} max={7} className="w-full" changeOnWheel />
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

export default UpdateStopPointModal;
