import { Watermark } from "antd";

const Contact = () => {
  return (
    <div>
      <Watermark content={["CONTACT", "phat.le@smartr.co"]}>
        <div className="h-[500px]"></div>
      </Watermark>
    </div>
  );
};

export default Contact;
