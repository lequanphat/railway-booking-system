import { Button, Flex, Form, Input, Modal } from 'antd';
import CustomAsyncSelect from '~/components/ui/CustomAsyncSelect';
import PropTypes from 'prop-types';
// import { USER_ROLES } from '~/config/constants';
// import { useCreateSeatType } from '../api/create-seat-type';
import { useEffect } from 'react';
import { convertToAbbreviation } from '~/utils/convert';

//test
import { useStations } from '~/features/station/api/get-stations';



const CreateSeatTypeModal = ({ open, handleCancel }) => {

  const [form] = Form.useForm();

  const seatName = Form.useWatch('name', form);

  useEffect(() => {
    if (seatName && form) {
      form.setFieldsValue({ code: convertToAbbreviation(seatName) });
    }
  }, [seatName, form]);

  // const mutation = useCreateSeatType({
  //   mutationConfig: {
  //     onSuccess: () => {
  //       message.success('Tạo loại ghế thành công!');
  //       form.resetFields();
  //       handleCancel();
  //     },
  //     onError: (error) => {
  //       message.error(error?.response?.data?.detail);
  //     },
  //   },
  // });


  // const { data: provinces = [], isLoading } = useProvinces() || {};
  // const provinceOptions = provinces.map((province) => ({
  //   value: province.id, // Hoặc bất kỳ giá trị duy nhất nào đại diện cho tỉnh
  //   label: province.name,
  // }));
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <Modal title="Tạo ga tàu mới" open={open} onCancel={handleCancel} footer={null}>
      <Form form={form} className="pt-4" layout="vertical" onFinish={onFinish}>
        <Flex vertical>
          <Form.Item label="Tên ga tàu" name="name" rules={null} validateTrigger="onBlur">
            <Input placeholder="Nhập tên ga tàu..." />
          </Form.Item>
          <Form.Item label="Chọn tỉnh" name="provinceId">
            <CustomAsyncSelect 
              loadQuery={useStations}
            />
          </Form.Item>
          
        </Flex>
        <Form.Item className="pt-4 m-0">
          <Flex justify="end" className="gap-3">
            <Button  type="default" htmlType="reset">
              Hoàn tác
            </Button>
            <Button  type="primary" htmlType="submit">
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
