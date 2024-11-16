import { Card, Flex, Typography } from 'antd';
const { Text } = Typography;
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import { TripType } from '~/enums/trip-type';

const DateSelection = ({ params, type = TripType.OneWay, setParams }) => {
  const dates = useMemo(() => {
    let start = dayjs();
    const end =
      params.get('trip_type') === 'round-trip'
        ? dayjs(params.get('return_date'), 'YYYY-MM-DD')
        : dayjs(params.get('departure_date'), 'YYYY-MM-DD').add(10, 'day');
    const dateArray = [];

    while (start.isBefore(end) || start.isSame(end, 'day')) {
      dateArray.push(start.clone());
      start = start.add(1, 'day');
    }

    return dateArray;
  }, [params]);

  const handleChooseDate = (date) => {
    params.set('departure_date', date.format('YYYY-MM-DD'));
    setParams(params);
  };

  return (
    <Card
      title={type === TripType.OneWay ? 'Chọn ngày đi' : 'Chọn ngày về'}
      extra={<Text>Sài Gòn → Hà Nội</Text>}
      styles={{
        body: {
          padding: 8,
        },
      }}
      bordered={false}
      className="shadow-sm date-selection"
    >
      <Swiper
        spaceBetween={10}
        slidesPerView={8}
        breakpoints={{
          320: {
            slidesPerView: 3,
            spaceBetween: 8,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 8,
            spaceBetween: 10,
          },
        }}
        modules={[Navigation]}
        navigation
        pagination={{ clickable: true }}
        className="date-swiper"
      >
        {dates.map((date) => (
          <SwiperSlide key={date.format('YYYY-MM-DD')}>
            <DateItem
              date={date}
              selected={date.isSame(dayjs(params.get('departure_date'), 'YYYY-MM-DD'), 'day')}
              onClick={() => handleChooseDate(date)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Card>
  );
};

const DateItem = ({ date, selected, onClick }) => {
  return (
    <Flex
      align="center"
      className={`py-2 px-4 rounded-lg cursor-pointer transition-all duration-100   ${
        selected ? 'bg-primary bg-opacity-30 text-white' : 'bg-white hover:bg-neutral-100'
      }`}
      gap={2}
      onClick={onClick}
      vertical
    >
      <Text className="text-base" strong>
        {dayjs(date).format('DD/MM')}
      </Text>
      <Text type="secondary" className="capitalize">
        {dayjs(date).format('dddd')}
      </Text>
    </Flex>
  );
};

export default DateSelection;
