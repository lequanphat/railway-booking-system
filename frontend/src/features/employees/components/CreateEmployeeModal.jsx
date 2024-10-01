import { Button, Flex, Form, Input, message, Modal } from 'antd';
import PropTypes from 'prop-types';
import { USER_ROLES } from '~/config/constants';
import RULES from '~/config/rule';
import { useCreateEmployee } from '../api/create-employee';

const CreateEmployeeModal = ({ open, handleCancel }) => {
  const [form] = Form.useForm();

  const mutation = useCreateEmployee({
    mutationConfig: {
      onSuccess: () => {
        message.success('Tạo nhân viên thành công!');
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
    <Modal title="Create employee" open={open} onCancel={handleCancel} footer={null}>
      <Form form={form} className="pt-4" onFinish={onFinish} layout="vertical">
        <Flex vertical>
          <Form.Item label="Name" name="name" rules={RULES.createEmployee.name} validateTrigger="onBlur">
            <Input placeholder="Enter employee name..." />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={RULES.createEmployee.email} validateTrigger="onBlur">
            <Input placeholder="Enter email address..." />
          </Form.Item>
          <Form.Item label="Phone" name="phone" rules={RULES.createEmployee.phone} validateTrigger="onBlur">
            <Input placeholder="Enter phone number..." />
          </Form.Item>
          <Form.Item label="Address" name="address" rules={RULES.createEmployee.address} validateTrigger="onBlur">
            <Input placeholder="Enter address..." />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={RULES.createEmployee.password} validateTrigger="onBlur">
            <Input.Password placeholder="Enter password..." />
          </Form.Item>
        </Flex>
        <Form.Item className="pt-4 m-0">
          <Flex justify="end" className="gap-3">
            <Button loading={mutation?.isPending} type="default" htmlType="reset">
              Reset
            </Button>
            <Button loading={mutation?.isPending} type="primary" htmlType="submit">
              Submit
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Modal>
  );
};

CreateEmployeeModal.propTypes = {
  open: PropTypes.bool,
  handleCancel: PropTypes.func,
};
export default CreateEmployeeModal;
