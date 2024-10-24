import { PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, message, Space } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomAsyncSelect from '~/components/ui/CustomAsyncSelect';
import PageHeader from '~/components/ui/page-header';
import RULES from '~/config/rule';
import { useCarriageLayouts } from '~/features/carriages/api/get-layouts';
import { moveArrayItem } from '~/features/carriages/utils/helpers';
import { useCreateTrain } from '~/features/trains/api/create-train';
import { useAllSeatTypes } from '~/features/trains/api/get-all-seat-types';
import CarriageSortableItem from '~/features/trains/components/CarriageSortableItem';
import SelectedCarriagesTable from '~/features/trains/components/SelectedCarriagesTable';
import TrainContainer from '~/features/trains/components/TrainContainer';

const TrainsManagement = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const [carriages, setCarriages] = useState([]);

  const [selectedCarriage, setSelectedCarriage] = useState(null);

  const [seatPrices, setSeatPrices] = useState([]);

  const { data: allSeatTypes } = useAllSeatTypes({
    retry: false,
  });

  const mutation = useCreateTrain({
    mutationConfig: {
      onSuccess: ({ id }) => {
        navigate(`/admin/trains/${id}`);
        message.success('OK bro!');
      },
      onError: () => {
        message.error('Something went wrong!');
      },
    },
  });

  useEffect(() => {
    if (allSeatTypes) {
      setSeatPrices(
        allSeatTypes?.map((seatType) => ({ seat_type_id: seatType.id, price: seatType.original_price_per_km })),
      );
    }
  }, [allSeatTypes]);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setCarriages(moveArrayItem(carriages, oldIndex, newIndex));
  };

  const handleAddCarriage = () => {
    setCarriages((prev) => [...prev, selectedCarriage]);
  };

  const handleRemoveCarriage = (index) => {
    setCarriages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      try {
        const validatedSeatPrices = seatPrices.map((item) => ({
          seat_type_id: item.seat_type_id,
          price: parseFloat(item.price) > 0 ? parseFloat(item.price) : 0,
        }));
        const data = {
          name: values.name,
          carriagesList: carriages.map((item) => item.value),
          seatPricesList: validatedSeatPrices,
        };
        mutation.mutate({ data });
      } catch (error) {
        console.log(error);
        message.error('Vui lòng nhập giá vé cho tất cả các loại ghế');
      }
    });
  };

  const handleChangePriceOfItem = (id, price) => {
    setSeatPrices((prev) => prev.map((item) => (item.seat_type_id === id ? { ...item, price } : item)));
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
          heading="Tạo tàu"
          links={[
            { title: 'Trang chủ', href: '/admin' },
            { title: 'Tàu hỏa', href: '/admin/trains' },
            { title: 'Tạo tàu hỏa' },
          ]}
        />
        <Space>
          <Button onClick={handleSave} type="primary" icon={<SaveOutlined />}>
            Tạo ngay
          </Button>
        </Space>
      </Flex>
      <Flex className="" gap={20}>
        <Flex vertical align="center" className="w-[40%] bg-white border-[1px] border-[#ccc] rounded-lg p-4">
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
            seat_prices: [],
          }}
          layout="vertical"
          className="w-[60%]"
        >
          <Flex vertical className="w-full" gap={20}>
            <Flex vertical className="w-full  bg-white border border-[#ccc] rounded-lg p-4">
              <h1 className="text-lg font-semibold text-center">Thông tin tàu hỏa</h1>
              <Form.Item
                label="Tên tàu"
                name="name"
                rules={RULES.createTrain.name}
                required={true}
                validateTrigger="onChange"
              >
                <Input placeholder="Nhập tên toa tàu..." />
              </Form.Item>

              <Form.Item label="Chọn toa tàu">
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
                <SelectedCarriagesTable
                  data={formattedCarriages}
                  handleRemoveItem={handleRemoveCarriage}
                  isEdit={true}
                />
              </Flex>
            </Flex>
            <Flex vertical className="w-full  bg-white border border-[#ccc] rounded-lg p-4" gap={10}>
              <h1 className="text-lg font-semibold text-center">Thông tin giá ghế</h1>
              <Flex vertical gap={10}>
                {allSeatTypes?.map((item) => (
                  <Form.Item
                    key={item.id}
                    label={item.name}
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập giá vé',
                      },
                    ]}
                    required={true}
                    validateTrigger="onChange"
                  >
                    <Input
                      placeholder="Nhập giá vé..."
                      type="number"
                      defaultValue={item.original_price_per_km}
                      onChange={(e) => {
                        handleChangePriceOfItem(item.id, e.target.value);
                      }}
                    />
                  </Form.Item>
                ))}
              </Flex>
            </Flex>
          </Flex>
        </Form>
      </Flex>
    </>
  );
};

export default TrainsManagement;
