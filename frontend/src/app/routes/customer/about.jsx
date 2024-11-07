import { Avatar, Card, Col, Flex, Row } from 'antd';

const About = () => {
  return (
    <div className="py-12">
      <h1 className="text-[22px] text-center font-semibold">Liên hệ chúng tôi</h1>
      <h4 className="text-base text-center opacity-80 my-2">
        Mang lại cho bạn những chuyến đi tàu bất ổn. Đừng book vé của chúng tôi
      </h4>
      <Row gutter={[24, 24]} className="py-8">
        <Col span={8}>
          <Card
            styles={{
              body: {
                padding: 0,
              },
            }}
            className="rounded-lg overflow-hidden"
          >
            <Flex vertical align="center" className="p-4">
              <Avatar className="w-[80px] h-[80px]" src="https://avatars.githubusercontent.com/u/93178609?v=4" />
              <h1 className="text-lg font-semibold my-2">Le Quan Phat</h1>
              <p className="text-base text-center opacity-80 my-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab soluta id quae suscipit fugit officia
                recusandae reiciendis a quam placeat?
              </p>
            </Flex>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            styles={{
              body: {
                padding: 0,
              },
            }}
            className="rounded-lg overflow-hidden"
          >
            <Flex vertical align="center" className="p-4">
              <Avatar className="w-[80px] h-[80px] " src="https://avatars.githubusercontent.com/u/45101901?s=64&v=4" />
              <h1 className="text-lg font-semibold my-2">Tran Nhat Sinh</h1>
              <p className="text-base text-center opacity-80 my-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab soluta id quae suscipit fugit officia
                recusandae reiciendis a quam placeat?
              </p>
            </Flex>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            styles={{
              body: {
                padding: 0,
              },
            }}
            className="rounded-lg overflow-hidden"
          >
            <Flex vertical align="center" className="p-4">
              <Avatar className="w-[80px] h-[80px] " src="https://avatars.githubusercontent.com/u/117495162?s=64&v=4" />
              <h1 className="text-lg font-semibold my-2">Tang Hong Nguyen Dan</h1>
              <p className="text-base text-center opacity-80 my-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab soluta id quae suscipit fugit officia
                recusandae reiciendis a quam placeat?
              </p>
            </Flex>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default About;
