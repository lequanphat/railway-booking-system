import { QRCode, Watermark } from "antd";

const DetailsTab = () => {
  return (
    <div>
      <QRCode value="https://youtube.com" />
      <Watermark content={["Le Quan Phat", "phat.le@smartr.co"]}>
        <div className="h-[500px]"></div>
      </Watermark>
    </div>
  );
};

export default DetailsTab;
