import { Calendar, Col, Form, Modal, Row, Select, Tag } from 'antd';
import locale from 'antd/es/calendar/locale/vi_VN';
import { useState } from 'react';

const TrainScheDulesPage = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(null);

  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  const onSelect = (value, info) => {
    console.log(value.format('YYYY-MM-DD'));
    console.log(info);
    if (info.source === 'date') {
      setDate(value);
      setOpen(true);
    }
  };

  return (
    <>
      <Calendar
        cellRender={(date, info) => {
          console.log(date.format('YYYY-MM-DD'));
          console.log(info);

          return (
            <Row justify="center">
              <Col>
                <Tag color="cyan">SE1</Tag>
                <Tag color="cyan">SE2</Tag>
                <Tag color="cyan">SE2</Tag>
                <Tag color="cyan">SE2</Tag>
                <Tag color="cyan">SE2</Tag>
                <Tag color="cyan">SE2</Tag>
                <Tag color="cyan">SE2</Tag>
                <Tag color="cyan">SE2</Tag>
                <Tag color="cyan">SE2</Tag>
                <Tag color="cyan">SE2</Tag>
                <Tag color="cyan">SE2</Tag>
                <Tag color="cyan">SE2</Tag>
                <Tag color="cyan">SE2</Tag>
                <Tag color="cyan">SE2</Tag>
                <Tag color="cyan">SE2</Tag>
                <Tag color="cyan">SE2</Tag>
                <Tag color="cyan">SE2</Tag>
                <Tag color="cyan">SE2</Tag>
                <Tag color="cyan">SE2</Tag>
                <Tag color="cyan">SE2</Tag>
                <Tag color="cyan">SE2</Tag>
                <Tag color="cyan">SE2</Tag>
                <Tag color="cyan">SE2</Tag>
                <Tag color="cyan">SE2</Tag>
                <Tag color="cyan">SE2</Tag>
                <Tag color="cyan">SE2</Tag>
                <Tag color="cyan">SE2</Tag>
                <Tag color="cyan">SE2</Tag>
                <Tag color="cyan">SE2</Tag>
                <Tag color="cyan">SE2</Tag>
                <Tag color="cyan">SE2</Tag>
                <Tag color="cyan">SE2</Tag>
                <Tag color="cyan">SE2</Tag>
                <Tag color="cyan">SE2</Tag>
                <Tag color="cyan">SE2</Tag>
                <Tag color="cyan">SE2</Tag>
                <Tag color="cyan">SE2</Tag>
                <Tag color="cyan">SE2</Tag>
              </Col>
            </Row>
          );
        }}
        onPanelChange={onPanelChange}
        onSelect={onSelect}
        locale={locale}
      />
      <AddTrainScheduleModal date={date} open={open} onCancel={() => setOpen(false)} />
    </>
  );
};

const AddTrainScheduleModal = ({ date, open, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal title={`Danh sách tàu chạy ngày ${date?.format('DD-MM-YYYY')}`} open={open} onCancel={onCancel}>
      <Form form={form} layout="vertical" variant="filled">
        <Form.Item label="Tàu số" name="trainNumber">
          <Select
            placeholder="Chọn tàu"
            options={[
              {
                label: 'Tàu SE1',
                value: 'SE1',
              },
              {
                label: 'Tàu SE2',
                value: 'SE2',
              },
              {
                label: 'Tàu SE3',
                value: 'SE3',
              },
              {
                label: 'Tàu SE4',
                value: 'SE4',
              },
            ]}
            mode="multiple"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TrainScheDulesPage;
