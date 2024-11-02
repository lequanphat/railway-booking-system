const formatSeatCode = ({ layoutId, code, position }) => {
  return `L${layoutId}${code}${position}`;
};

const formatTicketsInformationData = (data) => {
  const result = Object.entries(data).reduce((acc, [key, value]) => {
    const match = key.match(/(fullName|object|identity)_(\d+)-(\d+)/);
    if (match) {
      const [, field, seatId, carriageId] = match;
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
          [field]: value,
        });
      } else {
        acc[seatIndex][field] = value;
      }
    }
    return acc;
  }, []);
  return result;
};

export { formatSeatCode, formatTicketsInformationData };
