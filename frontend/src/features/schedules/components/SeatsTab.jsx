import { Col, Flex, Row } from "antd";
import { useState } from "react";

const SeatsTab = () => {
  return (
    <Flex vertical gap={20}>
      <TrainCarriage />
      <TrainCarriage />
      <TrainCarriage />
      <TrainCarriage />
    </Flex>
  );
};

const TrainCarriage = () => {
  return (
    <div>
      <h1 className="text-center text-[18px] font-semibold text-[#2b2b2b] mb-2">
        Carriage 1: Have many air conditioners
      </h1>
      <div className="border-[1px] border-[#ccc] p-4 rounded-2xl">
        <Row gutter={20}>
          {Array.apply(null, Array(36)).map((_, index) => (
            <Seat key={index} index={index} />
          ))}
        </Row>
      </div>
    </div>
  );
};
const Seat = ({ index }) => {
  const [active, setActive] = useState(false);
  return (
    <Col span={2} className="my-2">
      <div
        className={`border-[1px] border-[#ccc] rounded-lg w-[40px] h-[40px] flex items-center justify-center cursor-pointer
        ${active && "bg-primary border-primary text-white"}`}
        onClick={() => setActive(!active)}
      >
        <p> {index}</p>
      </div>
    </Col>
  );
};

export default SeatsTab;
