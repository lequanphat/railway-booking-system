import { Card, Col, Flex, Row } from 'antd';
import PageHeader from '~/components/ui/page-header';
import { useTicketsReport } from '~/features/reports/api/get-ticket-report';
import { useMemo } from 'react';
import { useTrainsReport } from '~/features/reports/api/get-train-report';
import { convertToVnCurrency } from '~/utils/convert';
import dayjs from 'dayjs';
import BarChart from '~/components/ui/charts/BarChart';
import { useUserOrdersReport } from '~/features/reports/api/get-user-order-report';
import PieChart from '~/components/ui/charts/PieChart';

const ReportPage = () => {
  const { data: reportData } = useTicketsReport({
    startDate: dayjs().startOf('week').format('YYYY-MM-DD'),
    endDate: dayjs().endOf('week').format('YYYY-MM-DD'),
    queryConfig: {
      initialData: [],
    },
  });

  const { data: trainReportData } = useTrainsReport({
    startDate: dayjs().startOf('week').format('YYYY-MM-DD'),
    endDate: dayjs().endOf('week').format('YYYY-MM-DD'),
    queryConfig: {
      initialData: [],
    },
  });

  const { data: userOrdersReportData } = useUserOrdersReport({
    startDate: dayjs().startOf('week').format('YYYY-MM-DD'),
    endDate: dayjs().endOf('week').format('YYYY-MM-DD'),
    queryConfig: {
      initialData: {},
    },
  });

  const revenueReport = useMemo(() => {
    return {
      data: [
        {
          name: 'Doanh thu',
          data: reportData?.map((item) => item.totalPrice),
        },
      ],
      categories: reportData?.map((item) => item.date),
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

  return (
    <>
      <Flex align="center" justify="space-between" className="mb-2">
        <PageHeader heading="Trang chủ" links={[]} />
      </Flex>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Card>
            <PieChart
              title="Thống kê loại khách hàng"
              data={
                userOrdersReportData?.guestUser
                  ? [userOrdersReportData?.guestUser, userOrdersReportData?.internalUser]
                  : []
              }
              colors={['#00E396', '#008FFB']}
              labels={['Khách vãng lai', 'Khách nội bộ']}
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
