import { TripType } from '~/enums/trip-type';

const formatSeatCode = ({ layoutId, code, position }) => {
  return `L${layoutId}${code}${position}`;
};

const formatTicketsInformationData = (data, type = TripType.OneWay) => {
  const regex =
    type === TripType.OneWay
      ? /(oneWay_fullName|oneWay_object|oneWay_identity)_(\d+)-(\d+)/
      : /(roundTrip_fullName|roundTrip_object|roundTrip_identity)_(\d+)-(\d+)/;

  const objectField = type === TripType.OneWay ? 'oneWay_object' : 'roundTrip_object';

  const removePrefix = (field) => field.replace(/^(oneWay_|roundTrip_)/, '');

  const result = Object.entries(data).reduce((acc, [key, value]) => {
    const match = key.match(regex);
    if (match) {
      const [, field, seatId, carriageId] = match;
      const normalizedField = removePrefix(field); // Loại bỏ tiền tố
      const seatIndex = acc.findIndex(
        (obj) => obj.seat.id === Number(seatId) && obj.carriage.id === Number(carriageId),
      );

      if (seatIndex === -1) {
        acc.push({
          seat: {
            id: Number(seatId),
          },
          carriage: {
            id: Number(carriageId),
          },
          [normalizedField]: field === objectField ? { id: value } : value,
        });
      } else {
        if (field === objectField) acc[seatIndex][normalizedField] = { id: value };
        else acc[seatIndex][normalizedField] = value;
      }
    }
    return acc;
  }, []);

  return result;
};

export { formatSeatCode, formatTicketsInformationData };
