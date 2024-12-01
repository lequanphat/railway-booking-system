import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const calculateTravelTime = (start, end) => {
  // Chênh lệch ngày
  if (!start || !end) {
    return '0 phút';
  }
  const dayDifference = end.day_number - start.day_number;

  // Tính giờ chênh lệch giữa departure_time của start và arrival_time của end
  const startTime = dayjs(start.departure_time, 'HH:mm:ss');
  const endTime = dayjs(end.arrival_time, 'HH:mm:ss');

  let timeDifferenceInHours;

  if (endTime.isBefore(startTime) && dayDifference === 0) {
    // Nếu arrival_time nhỏ hơn departure_time trong cùng ngày
    timeDifferenceInHours = dayjs.duration(endTime.add(1, 'day').diff(startTime)).asHours();
  } else {
    // Nếu ngày khác nhau hoặc arrival_time lớn hơn departure_time
    timeDifferenceInHours = dayjs.duration(endTime.diff(startTime)).asHours();
  }

  // Tổng thời gian di chuyển = số giờ chênh lệch trong ngày + chênh lệch ngày (số ngày * 24)
  const totalTravelTimeInHours = timeDifferenceInHours + dayDifference * 24;

  // Chuyển đổi tổng thời gian thành dạng ngày, giờ, phút
  const totalDuration = dayjs.duration(totalTravelTimeInHours, 'hours');

  const days = Math.floor(totalDuration.asDays());
  const hours = totalDuration.hours();
  const minutes = totalDuration.minutes();

  // Tạo mảng chứa các phần tử thời gian không rỗng
  let result = [];
  if (days > 0) {
    result.push(`${days} ngày`);
  }
  if (hours > 0) {
    result.push(`${hours} giờ`);
  }
  if (minutes > 0) {
    result.push(`${minutes} phút`);
  }

  // Trả về kết quả là chuỗi nối các phần tử
  return result.length > 0 ? result.join(' ') : '0 phút';
};
