import { Button, Card, Flex, Form, Input, Space } from 'antd';
import { useState } from 'react';
import { stations } from '~/app/routes/admin/generate-route-segments/data';
import PageHeader from '~/components/ui/page-header';
import { searchWithoutDiacritics } from '~/utils/searchWithoutDiacritics';

const GenerateRouteSegments = () => {
  const [form] = Form.useForm();
  const [result, setResult] = useState('');

  const onFinish = (values) => {
    const { content, train_id } = values;
    const segments = JSON.parse(content);
    const result = segments.map((segment) => {
      const { TenGa, NgaySo, GioDen, GioDi, Km } = segment;

      console.log(TenGa);
      const station_id = stations.find((station) => searchWithoutDiacritics(station.name, TenGa)).id;

      return `INSERT INTO route_segments(train_id, station_id, arrival_time, departure_time, day_number, distance) VALUES (${train_id}, ${station_id}, "${GioDen}","${GioDi}",${NgaySo}, ${Km});`;
    });
    setResult(result.join('\n'));
  };

  const handleReset = () => {
    form.resetFields();
    setResult('');
  };

  return (
    <>
      <Flex align="center" justify="space-between" className="mb-2">
        <PageHeader
          heading="Generate hành trình"
          links={[{ title: 'Trang chủ', href: '/admin' }, { title: 'Tàu hỏa' }]}
        />
      </Flex>
      <Card>
        <Form form={form} layout="vertical" onFinish={onFinish} variant="filled">
          <Form.Item name="train_id" label="Nhập id tàu">
            <Input />
          </Form.Item>
          <Form.Item name="content" label="Nhập nội dung">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item>
            <Flex justify="end">
              <Space>
                <Button onClick={handleReset}>Reset</Button>
                <Button type="primary" htmlType="submit">
                  Generate
                </Button>
              </Space>
            </Flex>
          </Form.Item>
        </Form>

        <div className="mt-4">
          <Flex justify="space-between">
            <h4 className="text-lg font-semibold mb-4">Kết quả</h4>
            <Button
              type="default"
              onClick={() => {
                navigator.clipboard.writeText(result);
              }}
            >
              Copy to Clipboard
            </Button>
          </Flex>
          <Input.TextArea variant="filled" rows={5} value={result} />
        </div>
      </Card>
    </>
  );
};

export default GenerateRouteSegments;
