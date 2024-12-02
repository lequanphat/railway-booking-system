import { Button, Calendar, Flex, Tag } from 'antd';
import { useState } from 'react';
import TrainScheduleModal from '~/features/train-schedules/components/TrainScheduleModal';
import dayjs from 'dayjs';
import PageHeader from '~/components/ui/page-header';
import { useCountScheduleBetween } from '~/features/train-schedules/api/count-schedule';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

const TrainScheDulesPage = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(dayjs());

  const dateRange = (date) => {
    const start = date.startOf('month').startOf('week');
    const end = date.endOf('month').endOf('week').add(1, 'week');
    return { start: start.format('YYYY-MM-DD'), end: end.format('YYYY-MM-DD') };
  };

  const { data } = useCountScheduleBetween(dateRange(date));

  return (
    <>
      <Flex align="center" justify="space-between">
        <PageHeader
          heading="Quản lý lịch tàu"
          links={[{ title: 'Trang chủ', href: '/admin' }, { title: 'Lịch trình' }]}
        />
        <Link to="/admin/generate-schedules">
          <Button type="primary" icon={<PlusOutlined />}>
            Tạo lịch trình
          </Button>
        </Link>
      </Flex>
      <Calendar
        cellRender={(date, info) => {
          if (info.type === 'date') {
            const count = data?.find((item) => item.date === date.format('YYYY-MM-DD'))?.count;
            return (
              <Flex align="flex-end" vertical>
                <Tag color={count >= 10 ? 'gold-inverse' : 'cyan-inverse'}>{count ?? 0} chuyến</Tag>
              </Flex>
            );
          }
        }}
        onSelect={(date, info) => {
          setDate(date);
          if (!(info.source === 'month' || info.source === 'year')) setOpen(true);
        }}
        className="mt-3"
      />
      <TrainScheduleModal date={date} open={open} onCancel={() => setOpen(false)} />
    </>
  );
};

export default TrainScheDulesPage;
