import { Button, Popconfirm, Space, Table } from 'antd';
import { DeleteOutlined, EditOutlined, HolderOutlined, PlusSquareOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import React, { useContext, useMemo } from 'react';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const RowContext = React.createContext({});
const DragHandle = () => {
  const { setActivatorNodeRef, listeners } = useContext(RowContext);
  return (
    <Button
      type="text"
      size="small"
      icon={<HolderOutlined />}
      style={{
        cursor: 'move',
      }}
      ref={setActivatorNodeRef}
      {...listeners}
    />
  );
};

const Row = (props) => {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({
    id: props['data-row-key'],
  });

  const style = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging
      ? {
          position: 'relative',
          zIndex: 99,
        }
      : {}),
  };
  const contextValue = useMemo(
    () => ({
      setActivatorNodeRef,
      listeners,
    }),
    [setActivatorNodeRef, listeners],
  );
  return (
    <RowContext.Provider value={contextValue}>
      <tr {...props} ref={setNodeRef} style={style} {...attributes} />
    </RowContext.Provider>
  );
};

const RouteSegmentsTable = ({
  dataSource,
  setDataSource,
  openAddModal,
  openUpdateModal,
  setSelectedRow,
  handleDelete,
}) => {
  const columns = [
    {
      key: 'sort',
      align: 'center',
      width: 80,
      render: () => <DragHandle />,
    },
    {
      title: '#',
      dataIndex: 'stt',
      width: 60,
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Ga đi',
      dataIndex: ['station', 'name'],
    },
    {
      title: 'Cự ly (Km)',
      dataIndex: 'distance',
      align: 'center',
    },
    {
      title: 'Ngày thứ',
      dataIndex: 'day_number',
      align: 'center',
    },
    {
      title: 'Giờ đến',
      dataIndex: 'departure_time',
      align: 'center',
      render: (value) => dayjs(value, 'HH:mm:ss').format('HH:mm'),
    },
    {
      title: 'Giờ đi',
      dataIndex: 'arrival_time',
      align: 'center',
      render: (value) => dayjs(value, 'HH:mm:ss').format('HH:mm'),
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      align: 'center',
      render: (text, record, index) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => {
              setSelectedRow(record);
              openUpdateModal();
            }}
          />
          <PopconfirmDelete onConfirm={() => handleDelete(index)} />
        </Space>
      ),
    },
  ];

  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setDataSource((prevState) => {
        const activeIndex = prevState.findIndex((record) => record.station.id === active?.id);
        const overIndex = prevState.findIndex((record) => record.station.id === over?.id);
        return arrayMove(prevState, activeIndex, overIndex);
      });
    }
  };

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
      <SortableContext items={dataSource.map((i) => i.station.id)} strategy={verticalListSortingStrategy}>
        <Table
          dataSource={dataSource}
          columns={columns}
          size="small"
          footer={() => (
            <Button icon={<PlusSquareOutlined />} onClick={openAddModal}>
              Thêm điểm dừng
            </Button>
          )}
          rowKey={(record) => record.station.id}
          pagination={false}
          components={{
            body: {
              row: Row,
            },
          }}
        />
      </SortableContext>
    </DndContext>
  );
};

const PopconfirmDelete = ({ onConfirm }) => {
  return (
    <Popconfirm
      title="Bạn có chắc chắn muốn xóa điểm dừng?"
      onConfirm={onConfirm}
      okText="Có"
      cancelText="Không"
      placement="topRight"
    >
      <Button icon={<DeleteOutlined />} size="small" danger />
    </Popconfirm>
  );
};

export default RouteSegmentsTable;
