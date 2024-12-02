import { Button, Flex, Form, Input, Modal } from 'antd';
import PropTypes from 'prop-types';
import RULES from '~/config/rule';

const UpdateEmployeeModal = ({ mutation, open, handleCancel, selectedEmployee }) => {
  const [form] = Form.useForm();

  const onFinish = () => {
    mutation.mutate({
      data: form.getFieldsValue(),
    });
    handleCancel();
  };

  return (
    <Modal title="Update employee" open={open} onCancel={handleCancel} footer={null} centered>
      <Form
        form={form}
        className="pt-4"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          ...selectedEmployee,
        }}
      >
        <Flex vertical>
          <Form.Item label="ID" name="id">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Name" name="name" rules={RULES.createEmployee.name}>
            <Input placeholder="Enter employee name..." />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Phone" name="phone" rules={RULES.createEmployee.phone}>
            <Input placeholder="Enter phone..." />
          </Form.Item>
          <Form.Item label="Address" name="address" rules={RULES.createEmployee.address}>
            <Input placeholder="Enter address..." />
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

UpdateEmployeeModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  selectedEmployee: PropTypes.object.isRequired,
};
export default UpdateEmployeeModal;
