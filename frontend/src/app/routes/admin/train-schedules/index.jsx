import { Calendar, Flex, Tag } from 'antd';
import { useState } from 'react';
import TrainScheduleModal from '~/features/train-schedules/components/TrainScheduleModal';
import dayjs from 'dayjs';
import PageHeader from '~/components/ui/page-header';
import { useCountScheduleBetween } from '~/features/train-schedules/api/count-schedule';

const TrainScheDulesPage = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(dayjs());

  const dateRange = (date) => {
    const start = date.startOf('month').startOf('week');
    const end = date.endOf('month').endOf('week').add(1, 'week');
    return { start: start.format('YYYY-MM-DD'), end: end.format('YYYY-MM-DD') };
  };

  console.log(dateRange(date));

  const { data } = useCountScheduleBetween(dateRange(date));

  return (
    <>
      <PageHeader
        heading="Quản lý lịch tàu"
        links={[{ title: 'Trang chủ', href: '/admin' }, { title: 'Lịch trình' }]}
      />
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
