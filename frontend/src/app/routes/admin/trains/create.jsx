import { PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, Space } from 'antd';
import { useMemo, useState } from 'react';
import CustomAsyncSelect from '~/components/ui/CustomAsyncSelect';
import PageHeader from '~/components/ui/page-header';
import { useCarriageLayouts } from '~/features/carriages/api/get-layouts';
import CarriageSortableItem from '~/features/trains/CarriageSortableItem';
import SelectedCarriagesTable from '~/features/trains/SelectedCarriagesTable';
import TrainContainer from '~/features/trains/TrainContainer';

const TrainsManagement = () => {
  const [form] = Form.useForm();

  const [carriages, setCarriages] = useState([]);

  const [selectedCarriage, setSelectedCarriage] = useState(null);

  function moveArrayItem(arr, fromIndex, toIndex) {
    const updatedArray = [...arr];

    if (fromIndex < 0 || fromIndex >= arr.length || toIndex < 0 || toIndex >= arr.length) {
      return arr;
    }
    const [movedItem] = updatedArray.splice(fromIndex, 1);

    updatedArray.splice(toIndex, 0, movedItem);

    return updatedArray;
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setCarriages(moveArrayItem(carriages, oldIndex, newIndex));
  };

  const handleAddCarriage = () => {
    setCarriages((prev) => [...prev, selectedCarriage]);
  };

  const handleRemoveCarriage = (index) => {
    setCarriages((prev) => prev.filter((_, i) => i !== index));
  };

  const formattedCarriages = useMemo(() => {
    return carriages.map((item, index) => ({
      index,
      key: item.id,
      name: item.label,
      structure: `${item.floors} tầng, ${item.row_count} hàng`,
      seats: item.seats.length,
    }));
  }, [carriages]);

  return (
    <>
      <Flex align="center" justify="space-between" className="mb-2">
        <PageHeader
          heading="Quản lý tàu hỏa"
          links={[
            { title: 'Trang chủ', href: '/admin' },
            { title: 'Tàu hỏa', href: '/admin/trains' },
            { title: 'Tạo tàu hỏa' },
          ]}
        />
        <Space>
          <Button onClick={null} type="primary" icon={<PlusOutlined />}>
            Tạo ngay
          </Button>
        </Space>
      </Flex>
      <Flex className="" gap={20}>
        <Flex vertical align="center" className="w-[50%] bg-white border-[1px] border-[#ccc] rounded-lg p-4">
          <Flex justify="center" className="py-4 w-full ">
            <TrainContainer axis={'xy'} onSortEnd={onSortEnd}>
              {carriages?.map((item, index) => (
                <CarriageSortableItem key={index} index={index} {...item} />
              ))}
            </TrainContainer>
          </Flex>
        </Flex>
        <Form
          form={form}
          initialValues={{
            name: '',
            carriages: [],
          }}
          layout="vertical"
          className="w-[50%]"
        >
          <Flex vertical className="w-full" gap={20}>
            <Flex vertical className="w-full  bg-white border-[1px] border-[#ccc] rounded-lg p-4">
              <h1 className="text-[18px] font-semibold text-center">Thông tin tàu hỏa</h1>
              <Form.Item label="Tên toa tàu" name="name" rules={null} required={true} validateTrigger="onChange">
                <Input placeholder="Nhập tên toa tàu..." />
              </Form.Item>

              <Form.Item label="Chọn toa tàu" name="number_of_seats">
                <Flex gap={8}>
                  <CustomAsyncSelect
                    loadQuery={useCarriageLayouts}
                    setValue={setSelectedCarriage}
                    config={{ value: 'id', label: 'name', floors: 'floors', row_count: 'row_count', seats: 'seats' }}
                  />
                  <Button onClick={handleAddCarriage} type="primary" icon={<PlusOutlined />} />
                </Flex>
              </Form.Item>
              <Flex vertical gap={12}>
                <h1>Các toa đã chọn</h1>
                <SelectedCarriagesTable data={formattedCarriages} handleRemoveItem={handleRemoveCarriage} />
              </Flex>
            </Flex>
            <Flex vertical className="w-full  bg-white border-[1px] border-[#ccc] rounded-lg p-4">
              <h1 className="text-[18px] font-semibold text-center">Thông tin giá ghế</h1>
            </Flex>
          </Flex>
        </Form>
      </Flex>
    </>
  );
};

export default TrainsManagement;
