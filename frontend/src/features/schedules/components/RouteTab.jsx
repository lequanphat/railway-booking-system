import { Flex, Timeline } from "antd";
import { useMemo } from "react";

const RouteTab = () => {
  const items = useMemo(
    () => [
      {
        children: <RouteItem name="Sai Gon" time="01:45 23/09/2024" />,
        color: "red",
      },
      {
        children: <RouteItem name="Somewhere" time="02:30 23/09/2024" />,
      },
      {
        children: <RouteItem name="Somewhere" time="03:45 23/09/2024" />,
      },
      {
        children: <RouteItem name="Somewhere" time="04:15 23/09/2024" />,
      },
      {
        children: <RouteItem name="Da Nang" time="05:05 23/09/2024" />,
      },
      {
        children: <RouteItem name="Somewhere" time="07:10 23/09/2024" />,
      },
      {
        children: <RouteItem name="Somewhere" time="07:10 23/09/2024" />,
      },
      {
        children: <RouteItem name="Somewhere" time="07:10 23/09/2024" />,
      },
      {
        children: <RouteItem name="Ha Noi" time="09:30 23/09/2024" />,
        color: "green",
      },
    ],
    []
  );
  return (
    <div className="py-4 ">
      <Timeline mode={"left"} items={items} />
    </div>
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

export default RouteTab;
