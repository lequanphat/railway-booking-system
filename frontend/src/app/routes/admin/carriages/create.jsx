import { PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, Select, Space } from 'antd';
import { useEffect, useState } from 'react';
import CustomAsyncSelect from '~/components/ui/CustomAsyncSelect';
import PageHeader from '~/components/ui/page-header';
import CarriagesContainer from '~/features/carriages/components/CarriagesContainer';
import SeatItem from '~/features/carriages/components/SeatItem';
import { useSeatTypes } from '~/features/seat-types/api/get-seat-types';

const CreateCarriage = () => {
  const [form] = Form.useForm();
  const [seats, setSeats] = useState([]);

  const [selectedSeatType, setSelectedSeatType] = useState(null);

  const [selectedSeatTypes, setSelectedSeatTypes] = useState([]);

  const nameValue = Form.useWatch('name', form);

  useEffect(() => {
    const newSeats = selectedSeatTypes.reduce((acc, item) => {
      console.log(item);
      const newSeats = Array.from({ length: item.quantity }, (_, index) => ({
        name: `${item.children} ${index + 1}`,
      }));
      return [...acc, ...newSeats];
    }, []);

    setSeats(newSeats);
  }, [selectedSeatTypes]);

  function moveArrayItem(arr, fromIndex, toIndex) {
    const updatedArray = [...arr];

    if (fromIndex < 0 || fromIndex >= arr.length || toIndex < 0 || toIndex >= arr.length) {
      console.warn('Invalid indices');
      return arr;
    }

    const [movedItem] = updatedArray.splice(fromIndex, 1);

    updatedArray.splice(toIndex, 0, movedItem);

    return updatedArray;
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setSeats(moveArrayItem(seats, oldIndex, newIndex));
  };

  const handleSave = () => {
    const data = {
      ...form.getFieldsValue(),
      seats,
    };
    console.log(data);
  };

  const handleSelectSeatType = () => {
    if (selectedSeatType) {
      setSelectedSeatTypes((prev) => [
        ...prev,
        { ...selectedSeatType, quantity: form.getFieldValue('number_of_seats') },
      ]);
    }
  };

  return (
    <>
      <Flex align="center" justify="space-between" className="mb-2">
        <PageHeader
          heading="Quản lý toa tàu"
          links={[
            { title: 'Trang chủ', href: '/admin' },
            { title: 'Toa tàu', href: '/admin/carriages' },
            { title: 'Tạo toa tàu' },
          ]}
        />
        <Space>
          <Button onClick={handleSave} type="primary" icon={<PlusOutlined />}>
            Tạo ngay
          </Button>
        </Space>
      </Flex>
      <Flex className="" gap={20}>
        <Flex vertical align="center" className="w-[65%] bg-white border-[1px] border-[#ccc] rounded-lg p-4">
          <div className="py-4">
            <CarriagesContainer axis={'xy'} onSortEnd={onSortEnd} name={nameValue}>
              {seats.map((item, index) => (
                <SeatItem key={index} index={index} title={item.name} />
              ))}
            </CarriagesContainer>
          </div>
        </Flex>
        <Form
          form={form}
          onFinish={null}
          initialValues={{
            name: '',
            type: 'seat',
            number_of_seats: 1,
          }}
          layout="vertical"
          className="w-[35%] bg-white border-[1px] border-[#ccc] rounded-lg p-4"
        >
          <h1 className="text-[18px] font-semibold text-center">Thông tin toa tàu</h1>
          <Form.Item label="Tên toa tàu" name="name" rules={null} required={false} validateTrigger="onChange">
            <Input placeholder="Nhập tên toa tàu..." />
          </Form.Item>
          <Form.Item label="Loại toa" name="type" rules={null} required={false} validateTrigger="onBlur">
            <Select
              options={[
                {
                  label: 'Toa ghế ngồi có điều hòa',
                  value: 'seat',
                },
                {
                  label: 'Toa ghế ngồi không điều hòa',
                  value: 'seat-no-ac',
                },
                {
                  label: 'Toa giường nằm có điều hòa',
                  value: 'bed',
                },
                {
                  label: 'Toa giường nằm không điều hòa',
                  value: 'bed-no-ac',
                },
              ]}
              defaultValue={'seat'}
            ></Select>
          </Form.Item>
          <Form.Item label="Chọn loại ghế" name="number_of_seats">
            {/* <Flex vertical gap={10} className="w-full px-4 mt-4">
              <Flex justify="space-between" align="center">
                <div className="flex-1">
                  <p className="text-[15px] font-semibold">Ghế loại I</p>
                </div>
                <Input
                  placeholder="Số lượng"
                  className="w-[100px]"
                  value={seats.I}
                  onChange={(e) => {
                    setSeats((prev) => ({ ...prev, I: e.target.value }));
                  }}
                />
              </Flex>
              <Flex justify="space-between" align="center">
                <div className="flex-1">
                  <p className="text-[15px] font-semibold">Ghế loại II</p>
                </div>
                <Input
                  placeholder="Số lượng"
                  className="w-[100px]"
                  value={seats.II}
                  onChange={(e) => {
                    setSeats((prev) => ({ ...prev, II: e.target.value }));
                  }}
                />
              </Flex>
              <Flex justify="space-between" align="center">
                <div className="flex-1">
                  <p className="text-[15px] font-semibold">Ghế loại III</p>
                </div>
                <Input
                  placeholder="Số lượng"
                  className="w-[100px]"
                  value={seats.III}
                  onChange={(e) => {
                    setSeats((prev) => ({ ...prev, III: e.target.value }));
                  }}
                />
              </Flex>
              <Flex justify="space-between" align="center">
                <div className="flex-1">
                  <p className="text-[15px] font-semibold">Ghế loại IV</p>
                </div>
                <Input
                  placeholder="Số lượng"
                  className="w-[100px]"
                  value={seats.IV}
                  onChange={(e) => {
                    setSeats((prev) => ({ ...prev, IV: e.target.value }));
                  }}
                />
              </Flex>
              <Flex justify="space-between" align="center">
                <div className="flex-1">
                  <p className="text-[15px] font-semibold">Ghế loại V</p>
                </div>
                <Input
                  placeholder="Số lượng"
                  className="w-[100px]"
                  value={seats.V}
                  onChange={(e) => {
                    setSeats((prev) => ({ ...prev, V: e.target.value }));
                  }}
                />
              </Flex>
            </Flex> */}

            <Flex gap={8}>
              <CustomAsyncSelect loadQuery={useSeatTypes} setValue={setSelectedSeatType} />
              <Input className="w-[80px]" type="number" />
              <Button onClick={handleSelectSeatType} type="primary" icon={<PlusOutlined />} />
            </Flex>
          </Form.Item>
        </Form>
      </Flex>
    </>
  );
};

export default CreateCarriage;
