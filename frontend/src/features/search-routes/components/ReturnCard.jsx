import { Card, Typography } from 'antd';
import dayjs from 'dayjs';
const { Text, Title } = Typography;

const ReturnCard = ({ params, returnSchedules }) => {
  return (
    <>
      <Card
        title="Chọn chiều về"
        bordered={false}
        styles={{
          body: {
            paddingBottom: 12,
            paddingTop: 12,
          },
        }}
        className="shadow-sm"
      >
        <Title level={5}>
          {params.get('arrival_name')} → {params.get('departure_name')}
        </Title>
        <Text className="capitalize">{dayjs(params.get('return_date')).format('dddd, DD/MM/YYYY')}</Text>
      </Card>
    </>
  );
};

export default ReturnCard;
