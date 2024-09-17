import { Button, Flex, Form, Input, Modal } from "antd";
import RULES from "~/config/rule";
import { useCreateEmployee } from "../api/create-employee";
import { MESSAGE_TYPES, USER_ROLES } from "~/config/constants";
import { useMessage } from "~/hooks/useMessage";

const CreateEmployeeModal = ({ open, handleCancel }) => {
  const [form] = Form.useForm();
  const { showMessage, messageHolder } = useMessage();

  const mutation = useCreateEmployee({
    mutationConfig: {
      onSuccess: () => {
        showMessage("Create employee successfully", MESSAGE_TYPES.SUCCESS);
        handleCancel();
      },
      onError: (error) => {
        console.log(error);
        showMessage(error?.response?.data?.detail, MESSAGE_TYPES.ERROR);
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
      {messageHolder}
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
            <Button type="default" htmlType="reset">
              Reset
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default CreateEmployeeModal;
