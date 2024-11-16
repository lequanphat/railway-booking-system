const journeys = [
  {
    from: 'Ho Chi Minh City',
    to: 'Hanoi',
    image: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg',
  },
  {
    from: 'Hanoi',
    to: 'Haiphong',
    image: 'https://tructhang.vn/wp-content/uploads/2022/08/Vinh-Ha-Long.jpg',
  },
  {
    from: 'Ho Chi Minh City',
    to: 'Da Nang',
    image:
      'https://vcdn1-dulich.vnecdn.net/2022/06/01/CauVangDaNang-1654082224-7229-1654082320.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=MeVMb72UZA27ivcyB3s7Kg',
  },
  {
    from: 'Ho Chi Minh City',
    to: 'Nha Trang',
    image: 'https://i2.ex-cdn.com/crystalbay.com/files/content/2024/01/26/anh-nha-trang-dep-moi-nhat-1-1544.jpeg',
  },
];

const PopularJouneys = () => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-8">Tuyến phố biến</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {journeys.map((journey, index) => (
          <PopularJouneyItem key={index} {...journey} />
        ))}
      </div>
    </div>
  );
};

const PopularJouneyItem = ({ from, to, image }) => {
  return (
    <div className="overflow-hidden group cursor-pointer rounded-md">
      <div className="relative h-48">
        <img
          src={image}
          alt={`${from} to ${to}`}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex items-center justify-between">
            <span>{from}</span>
            <span className="mx-2">→</span>
            <span>{to}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularJouneys;
