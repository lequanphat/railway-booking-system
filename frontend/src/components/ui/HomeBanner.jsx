const HomeBanner = () => {
  return (
    <div className="relative h-[400px]">
      <div className="absolute inset-0">
        <img
          src="http://saigonrailway.com.vn/upload/images/2020/02/1349x565-1581300702-single_banner26-slidebanner20202.jpg"
          alt="Train journey through nature"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div
        className="relative pt-20 w-[90%] md:w-[90%] xl:w-[1228px] 2xl:w-[1228px] mx-auto"
        style={{
          textShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        }}
      >
        <h1 className="text-5xl font-bold text-white mb-4">Đặt vé tàu trực tuyến</h1>
        <p className="text-xl text-white drop-mb-8">
          Đặt vé tàu trực tuyến nhanh chóng, tiện lợi, an toàn và tiết kiệm thời gian
        </p>
      </div>
    </div>
  );
};

export default HomeBanner;
