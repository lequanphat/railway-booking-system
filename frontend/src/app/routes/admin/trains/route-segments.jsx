import { App, Button, Flex } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { useState, useCallback, useMemo } from 'react';
import { useBoolean } from '~/hooks/useBoolean';
import dayjs from 'dayjs';
import { useLoaderData } from 'react-router-dom';
import { trainQuery } from '~/features/trains/api/get-route-segments';
import PageHeader from '~/components/ui/page-header';
import AddStopPointModal from '~/features/trains/components/route-segments/AddStopPointModal';
import RouteSegmentsTable from '~/features/trains/components/route-segments/RouteSegmentsTable';
import { useSaveRouteSegments } from '~/features/trains/api/save-route-segments';
import UpdateStopPointModal from '~/features/trains/components/route-segments/UpdateStopPointModal';

export const RouteSegmentsLoader =
  (queryClient) =>
  async ({ params }) => {
    const query = trainQuery(params.trainId);
    return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
  };

const RouteSegments = () => {
  const { id, route_segments } = useLoaderData();
  const { message } = App.useApp();
  const [dataSource, setDataSource] = useState(route_segments);
  const [selectedRow, setSelectedRow] = useState(null);
  const { value: isAddModalOpen, setTrue: openAddModal, setFalse: closeAddModal } = useBoolean();
  const { value: isUpdateModalOpen, setTrue: openUpdateModal, setFalse: closeUpdateModal } = useBoolean();

  const handleDeleteItem = useCallback((index) => {
    setDataSource((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleAddItem = useCallback(
    (values) => {
      setDataSource((prev) => [
        ...prev,
        {
          station: {
            id: values.station_id,
            name: values.station_name,
          },
          ...values,
        },
      ]);
      closeAddModal();
    },
    [closeAddModal],
  );

  const handleUpdateItem = useCallback(
    (values, index) => {
      setDataSource((prev) => {
        const updated = [...prev];
        updated[index] = {
          station: {
            id: values.station_id,
            name: values.station_name,
          },
          ...values,
        };
        return updated;
      });
      closeUpdateModal();
    },
    [closeUpdateModal],
  );

  const mutation = useSaveRouteSegments({
    mutationConfig: {
      onSuccess: () => message.success('Lưu thành công!'),
      onError: () => message.error('Có lỗi xảy ra!'),
    },
  });

  const handleSave = useCallback(() => {
    const data = dataSource.map((item) => ({
      station_id: item.station.id,
      distance: item.distance,
      day_number: item.day_number,
      arrival_time: dayjs(item.arrival_time, 'HH:mm').format('HH:mm:ss'),
      departure_time: dayjs(item.departure_time, 'HH:mm').format('HH:mm:ss'),
    }));

    mutation.mutate({ id, segments: data });
  }, [dataSource, id, mutation]);

  const pageHeaderLinks = useMemo(
    () => [
      { title: 'Trang chủ', href: '/admin' },
      { title: 'Tàu hoả', href: '/admin/trains' },
      { title: 'Lịch trình' },
    ],
    [],
  );

  return (
    <>
      <Flex align="center" justify="space-between" className="mb-4">
        <PageHeader heading="Lịch trình" links={pageHeaderLinks} />
        <Button type="primary" icon={<SaveOutlined />} onClick={handleSave} loading={mutation.isPending}>
          Lưu
        </Button>
      </Flex>
      <RouteSegmentsTable
        dataSource={dataSource}
        setDataSource={setDataSource}
        openAddModal={openAddModal}
        openUpdateModal={openUpdateModal}
        handleDelete={handleDeleteItem}
        setSelectedRow={setSelectedRow}
      />
      <AddStopPointModal
        open={isAddModalOpen}
        closeModal={closeAddModal}
        handleAddItem={handleAddItem}
        dataSource={dataSource}
      />
      <UpdateStopPointModal
        open={isUpdateModalOpen}
        closeModal={closeUpdateModal}
        handleUpdateItem={handleUpdateItem}
        selectedRow={selectedRow}
        dataSource={dataSource}
      />
    </>
  );
};

export default RouteSegments;
