import ReactApexChart from 'react-apexcharts';

const PieChart = ({ data = [], labels = ['A', 'B'], xaxis = {}, yaxis = {}, title = '', colors = ['#008FFB'] }) => {
  return (
    <ReactApexChart
      options={{
        chart: {
          fontFamily: 'inherit',
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        xaxis,
        yaxis,
        dataLabels: {
          enabled: true,
        },
        colors,
        title: {
          text: title,
        },
        labels,
        legend: {
          show: true,
        },
      }}
      series={data}
      type="donut"
      height={300}
    />
  );
};

export default PieChart;
