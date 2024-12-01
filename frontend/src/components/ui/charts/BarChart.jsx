import ReactApexChart from 'react-apexcharts';

const BarChart = ({ data = [], xaxis = {}, yaxis = {}, title = '', colors = ['#008FFB'] }) => {
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
          enabled: false,
        },
        colors,
        title: {
          text: title,
        },
      }}
      series={data}
      type="bar"
      height={300}
    />
  );
};

export default BarChart;
