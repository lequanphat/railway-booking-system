import { Timeline, Typography } from "antd";
import { useMemo } from "react";

const RouteTab = () => {
  const items = useMemo(
    () => [
      {
        label: "03:40 12/09/2024",
        children: (
          <Typography className="text-[16px] font-semibold">Sai Gon</Typography>
        ),
        color: "red",
      },
      {
        label: "03:40 12/09/2024",
        children: (
          <Typography className="text-[16px] font-semibold">
            Vung Tau
          </Typography>
        ),
      },
      {
        label: "03:40 12/09/2024",
        children: (
          <Typography className="text-[16px] font-semibold">
            Binh Thuan
          </Typography>
        ),
      },
      {
        label: "03:40 12/09/2024",
        children: (
          <Typography className="text-[16px] font-semibold">
            Nha Trang
          </Typography>
        ),
      },
      {
        label: "03:40 12/09/2024",
        children: (
          <Typography className="text-[16px] font-semibold">
            Khanh Hoa
          </Typography>
        ),
      },
      {
        label: "03:40 12/09/2024",
        children: (
          <Typography className="text-[16px] font-semibold">
            Thai Binh
          </Typography>
        ),
      },
      {
        label: "03:40 12/09/2024",
        children: (
          <Typography className="text-[16px] font-semibold">Ha Noi</Typography>
        ),
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
export default RouteTab;
