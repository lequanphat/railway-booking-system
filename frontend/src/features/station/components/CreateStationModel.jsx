import { Button, Flex, Form, Input, Modal, Select, message } from 'antd';
import PropTypes from 'prop-types';
import { useCreateStation } from '../api/Create-station';
import { useEffect } from 'react';
import { convertToAbbreviation } from '~/utils/convert';
import { useProvinces } from '~/features/station/api/get-provinces';

const CreateSeatTypeModal = ({ open, handleCancel }) => {
  const [form] = Form.useForm();

  const seatName = Form.useWatch('name', form);

  useEffect(() => {
    if (seatName && form) {
      form.setFieldsValue({ code: convertToAbbreviation(seatName) });
    }
  }, [seatName, form]);

  const { data: provinces = [] } = useProvinces();
  const provinceOptions = provinces.map((province) => ({
    value: province.id, // Hoặc bất kỳ giá trị duy nhất nào đại diện cho tỉnh
    label: province.name,
  }));

  const mutation = useCreateStation({
    mutationConfig: {
      onSuccess: () => {
        message.success('Thêm trạm thành công!');
        form.resetFields();
        handleCancel();
      },
      onError: (error) => {
        message.error(error?.response?.data?.detail);
      },
    },
  });

  const onFinish = (values) => {
    mutation.mutate({ data: { ...values, province: { id: values.province } } });
    console.log(values);
  };

  return (
    <Modal title="Tạo ga tàu mới" open={open} onCancel={handleCancel} footer={null}>
      <Form form={form} className="pt-4" layout="vertical" onFinish={onFinish}>
        <Flex vertical>
          <Form.Item label="Tên ga tàu" name="name" rules={null} validateTrigger="onBlur">
            <Input placeholder="Nhập tên ga tàu..." />
          </Form.Item>
          <Form.Item label="Chọn tỉnh" name="province">
            <Select options={provinceOptions} placeholder="Chọn tỉnh..." />
          </Form.Item>
        </Flex>
        <Form.Item className="pt-4 m-0">
          <Flex justify="end" className="gap-3">
            <Button type="default" htmlType="reset">
              Hoàn tác
            </Button>
            <Button type="primary" htmlType="submit">
              Tạo mới
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Modal>
  );
};

CreateSeatTypeModal.propTypes = {
  open: PropTypes.bool,
  handleCancel: PropTypes.func,
};
export default CreateSeatTypeModal;
