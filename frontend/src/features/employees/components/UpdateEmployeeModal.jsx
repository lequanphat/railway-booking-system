import { Button, Flex, Form, Input, message, Modal } from "antd";
import PropTypes from "prop-types";
import { useEffect } from "react";
import RULES from "~/config/rule";
import { useUpdateEmployee } from "../api/update-employee";

const UpdateEmployeeModal = ({ open, handleCancel, selectedEmployee }) => {
  const [form] = Form.useForm();

  const mutation = useUpdateEmployee({
    mutationConfig: {
      onSuccess: () => {
        message.success("Update employee successfully");
        handleCancel();
      },
      onError: (error) => {
        message.error(error?.response?.data?.detail);
      },
    },
  });

  // effect
  useEffect(() => {
    if (selectedEmployee) {
      form.setFieldsValue({
        id: selectedEmployee?.id,
        name: selectedEmployee?.name,
        username: selectedEmployee?.username,
        email: selectedEmployee?.email,
      });
    }
  }, [selectedEmployee, form]);

  // handle
  const onFinish = (values) => {
    mutation.mutate({
      data: { id: values?.id, name: values?.name },
    });
  };

  return (
    <Modal
      title="Update employee"
      open={open}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        form={form}
        className="pt-4"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          id: selectedEmployee?.id,
          name: selectedEmployee?.name,
          username: selectedEmployee?.username,
          email: selectedEmployee?.email,
        }}
      >
        <Flex vertical>
          <Form.Item label="ID" name="id">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Name" name="name" rules={RULES.createEmployee.name}>
            <Input placeholder="Enter employee name..." />
          </Form.Item>
          <Form.Item label="Username" name="username">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input disabled />
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

UpdateEmployeeModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  selectedEmployee: PropTypes.object.isRequired,
};
export default UpdateEmployeeModal;
