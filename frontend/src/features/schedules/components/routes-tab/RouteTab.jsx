import { Flex, Timeline } from 'antd';
import { useMemo } from 'react';
import PropTypes from 'prop-types';

const RouteTab = ({ routeSegments = [] }) => {
  const routes = useMemo(
    () =>
      routeSegments?.map((route, index) => ({
        children: <RouteItem name={route?.station?.name} time={`${route?.arrival_time} - ${route?.departure_time}`} />,
        color: index === 0 ? 'red' : index === routeSegments?.length - 1 ? 'green' : undefined,
      })),
    [routeSegments],
  );
  return (
    <Flex className="py-4 w-full" justify="space-between">
      <Timeline mode={'left'} items={routes} />
    </Flex>
  );
};

const RouteItem = ({ name, time }) => {
  return (
    <Flex vertical>
      <p className="text-[16px] font-semibold">{name}</p>
      <p className="text-[14px]">{time}</p>
    </Flex>
  );
};

RouteTab.propTypes = {
  routeSegments: PropTypes.array,
};

export default RouteTab;
