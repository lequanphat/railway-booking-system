import { Card, Col, DatePicker, Flex, Row, Select, Space } from 'antd';
import PageHeader from '~/components/ui/page-header';
import { useTicketsReport } from '~/features/reports/api/get-ticket-report';
import { useEffect, useMemo, useState } from 'react';
import { useTrainsReport } from '~/features/reports/api/get-train-report';
import { convertToVnCurrency } from '~/utils/convert';
import dayjs from 'dayjs';
import BarChart from '~/components/ui/charts/BarChart';

const { RangePicker } = DatePicker;

const FILTER_OPTIONS = [
  {
    value: 'WEEK',
    label: 'Tuần này',
  },
  {
    value: 'MONTH',
    label: 'Tháng này',
  },
  {
    value: 'CUSTOM',
    label: 'Tùy chỉnh',
  },
];

const ReportPage = () => {
  const [filter, setFilter] = useState(FILTER_OPTIONS[0].value);
  const [dateRange, setDateRange] = useState({
    startDate: dayjs().startOf('week').format('YYYY-MM-DD'),
    endDate: dayjs().endOf('week').format('YYYY-MM-DD'),
  });
  const { data: reportData } = useTicketsReport({ startDate: dateRange.startDate, endDate: dateRange.endDate });

  const { data: trainReportData } = useTrainsReport({ startDate: dateRange.startDate, endDate: dateRange.endDate });

  const { ticketReport, revenueReport } = useMemo(() => {
    return {
      ticketReport: {
        data: [
          {
            name: 'Số lượng vé',
            data: reportData?.map((item) => item.totalTickets),
          },
        ],
        categories: reportData?.map((item) => item.date),
      },
      revenueReport: {
        data: [
          {
            name: 'Doanh thu',
            data: reportData?.map((item) => item.totalPrice),
          },
        ],
        categories: reportData?.map((item) => item.date),
      },
    };
  }, [reportData]);

  const trainReport = useMemo(() => {
    return {
      data: [
        {
          name: 'Số lượng vé',
          data: trainReportData?.map((item) => item.totalTickets),
        },
        {
          name: 'Doanh thu',
          data: trainReportData?.map((item) => item.totalPrice),
        },
      ],
      categories: trainReportData?.map((item) => item.train),
    };
  }, [trainReportData]);

  useEffect(() => {
    switch (filter) {
      case 'WEEK':
        setDateRange({
          startDate: dayjs().startOf('week').format('YYYY-MM-DD'),
          endDate: dayjs().endOf('week').format('YYYY-MM-DD'),
        });
        break;
      case 'MONTH':
        setDateRange({
          startDate: dayjs().startOf('month').format('YYYY-MM-DD'),
          endDate: dayjs().endOf('month').format('YYYY-MM-DD'),
        });
        break;
      case 'CUSTOM':
        break;
      default:
        break;
    }
  }, [filter]);

  return (
    <>
      <Flex align="center" justify="space-between" className="mb-2">
        <PageHeader
          heading="Thống kê"
          links={[{ title: 'Trang chủ', href: '/admin' }, { title: 'Báo cáo và thống kê' }]}
        />
        <Space>
          <Select
            defaultValue={FILTER_OPTIONS[0].value}
            style={{
              width: 220,
            }}
            options={FILTER_OPTIONS}
            value={filter}
            onChange={(value) => setFilter(value)}
          />
          <RangePicker
            disabled={filter !== 'CUSTOM'}
            value={[dayjs(dateRange.startDate), dayjs(dateRange.endDate)]}
            onChange={(dates) => {
              setDateRange({
                startDate: dates[0]?.format('YYYY-MM-DD'),
                endDate: dates[1]?.format('YYYY-MM-DD'),
              });
            }}
          />
        </Space>
      </Flex>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Card>
            <BarChart
              title="Thống kê đặt vé"
              data={ticketReport?.data || []}
              xaxis={{ categories: ticketReport?.categories || [] }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <BarChart
              title="Thống kê doanh thu"
              data={revenueReport?.data || []}
              xaxis={{ categories: revenueReport?.categories || [] }}
              yaxis={[
                {
                  opposite: true,
                  labels: {
                    formatter: (val) => convertToVnCurrency(val),
                  },
                },
              ]}
            />
          </Card>
        </Col>
        <Col span={24}>
          <Card>
            <BarChart
              title="Thống kê số vé và doanh thu theo tàu"
              data={trainReport?.data || []}
              xaxis={{ categories: trainReport?.categories || [] }}
              yaxis={[
                {
                  labels: {
                    formatter: (val) => val,
                  },
                },
                {
                  opposite: true,
                  labels: {
                    formatter: (val) => convertToVnCurrency(val),
                  },
                },
              ]}
              colors={['#008FFB', '#00E396']}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ReportPage;
