import { Button, Flex, Form, Input, message, Modal } from 'antd';
import PropTypes from 'prop-types';
import { USER_ROLES } from '~/config/constants';
import { useCreateSeatType } from '../api/create-seat-type';
import { useEffect } from 'react';
import { convertToAbbreviation } from '~/utils/convert';

const CreateSeatTypeModal = ({ open, handleCancel }) => {
  const [form] = Form.useForm();

  const seatName = Form.useWatch('name', form);

  useEffect(() => {
    if (seatName && form) {
      form.setFieldsValue({ code: convertToAbbreviation(seatName) });
    }
  }, [seatName, form]);

  const mutation = useCreateSeatType({
    mutationConfig: {
      onSuccess: () => {
        message.success('Tạo loại ghế thành công!');
        form.resetFields();
        handleCancel();
      },
      onError: (error) => {
        message.error(error?.response?.data?.detail);
      },
    },
  });

  const onFinish = (values) => {
    mutation.mutate({ data: { ...values, userRole: USER_ROLES.ADMIN } });
  };
  return (
    <Modal title="Tạo loại ghế mới" open={open} onCancel={handleCancel} footer={null}>
      <Form form={form} className="pt-4" onFinish={onFinish} layout="vertical">
        <Flex vertical>
          <Form.Item label="Tên loại ghế" name="name" rules={null} validateTrigger="onBlur">
            <Input placeholder="Nhập tên loại ghế..." />
          </Form.Item>
          <Form.Item label="Mô tả" name="description" rules={null} validateTrigger="onBlur">
            <Input placeholder="Nhập mô tả..." />
          </Form.Item>
          <Form.Item label="Mã ghế" name="code" rules={null} validateTrigger="onBlur">
            <Input placeholder="Nhập mã ghế..." />
          </Form.Item>
          <Form.Item label="Giá / km" name="original_price_per_km" rules={null} validateTrigger="onBlur">
            <Input placeholder="Nhập giá gốc..." />
          </Form.Item>
        </Flex>
        <Form.Item className="pt-4 m-0">
          <Flex justify="end" className="gap-3">
            <Button loading={mutation?.isPending} type="default" htmlType="reset">
              Hoàn tác
            </Button>
            <Button loading={mutation?.isPending} type="primary" htmlType="submit">
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
