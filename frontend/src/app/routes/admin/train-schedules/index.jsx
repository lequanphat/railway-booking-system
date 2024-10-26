import { Button, Calendar, Flex } from 'antd';
import { useState } from 'react';
import { EyeOutlined } from '@ant-design/icons';
import TrainScheduleModal from '~/features/train-schedules/components/TrainScheduleModal';
import dayjs from 'dayjs';
import PageHeader from '~/components/ui/page-header';

const TrainScheDulesPage = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(null);

  return (
    <>
      <PageHeader
        heading="Quản lý lịch tàu"
        links={[{ title: 'Trang chủ', href: '/admin' }, { title: 'Lịch trình' }]}
      />
      <Calendar
        cellRender={(date, info) => {
          if (info.type === 'date') {
            return (
              <Flex align="flex-end" vertical>
                <Button
                  size="small"
                  className="mt-2"
                  icon={<EyeOutlined />}
                  color="default"
                  variant="filled"
                  onClick={() => {
                    console.log(dayjs(date).format('YYYY-MM-DD'));
                    setDate(date);
                    setOpen(true);
                  }}
                >
                  Chi tiết
                </Button>
              </Flex>
            );
          }
        }}
        className="mt-3"
      />
      <TrainScheduleModal date={date} open={open} onCancel={() => setOpen(false)} />
    </>
  );
};

export default TrainScheDulesPage;
