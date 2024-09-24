import { Watermark } from "antd";

const About = () => {
  return (
    <div>
      <Watermark content={["ABOUT", "phat.le@smartr.co"]}>
        <div className="h-[500px]"></div>
      </Watermark>
    </div>
  );
};

export default About;
