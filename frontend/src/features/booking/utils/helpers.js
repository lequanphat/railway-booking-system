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
      console.log('field', field);

      if (seatIndex === -1) {
        acc.push({
          seat: {
            id: Number(seatId),
          },
          carriage: {
            id: Number(carriageId),
          },
          [field]: field === 'object' ? { id: value } : value,
        });
      } else {
        if (field === 'object') acc[seatIndex][field] = { id: value };
        else acc[seatIndex][field] = value;
      }
    }
    return acc;
  }, []);

  console.log('result', result);
  return result;
};

export { formatSeatCode, formatTicketsInformationData };
