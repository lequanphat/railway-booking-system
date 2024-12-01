import { Card } from 'antd';
import PopularJouneys from '~/features/home/components/PopularJouneys';
import SearchRoutesFormHomepage from '~/features/home/components/SearchRoutesFormHomepage';

const HomeRoute = () => {
  return (
    <div className="py-6">
      <Card className="rounded-2xl shadow-sm mt-[-200px]">
        <SearchRoutesFormHomepage />
      </Card>
      <PopularJouneys />
    </div>
  );
};

export default HomeRoute;
