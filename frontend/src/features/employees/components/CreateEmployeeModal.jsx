import { Button, Flex, Form, Input, message, Modal } from "antd";
import PropTypes from "prop-types";
import { USER_ROLES } from "~/config/constants";
import RULES from "~/config/rule";
import { useCreateEmployee } from "../api/create-employee";

const CreateEmployeeModal = ({ open, handleCancel }) => {
  const [form] = Form.useForm();

  const mutation = useCreateEmployee({
    mutationConfig: {
      onSuccess: () => {
        message.success("Create employee successfully");
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
    <Modal
      title="Create employee"
      open={open}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={form} className="pt-4" onFinish={onFinish} layout="vertical">
        <Flex vertical>
          <Form.Item label="Name" name="name" rules={RULES.createEmployee.name}>
            <Input placeholder="Enter employee name..." />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={RULES.createEmployee.username}
          >
            <Input placeholder="Enter username..." />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={RULES.createEmployee.email}
          >
            <Input placeholder="Enter email address..." />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={RULES.createEmployee.password}
          >
            <Input.Password placeholder="Enter password..." />
          </Form.Item>
        </Flex>
        <Form.Item className="pt-4 m-0">
          <Flex justify="end" className="gap-3">
            <Button
              loading={mutation?.isPending}
              type="default"
              htmlType="reset"
            >
              Reset
            </Button>
            <Button
              loading={mutation?.isPending}
              type="primary"
              htmlType="submit"
            >
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
