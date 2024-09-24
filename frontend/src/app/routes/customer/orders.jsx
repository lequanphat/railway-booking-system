import { Watermark } from "antd";

const OrdersPage = () => {
  return (
    <div>
      <Watermark content={["ORDERS", "phat.le@smartr.co"]}>
        <div className="h-[500px]"></div>
      </Watermark>
    </div>
  );
};

export default OrdersPage;
