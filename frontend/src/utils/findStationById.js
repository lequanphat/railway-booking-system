export const findStationById = (stations, id) => {
  return stations?.flatMap((province) => province.stations).find((station) => station.id === id);
};
