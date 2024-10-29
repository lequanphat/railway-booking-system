const formatSeatCode = ({ layoutId, code, position }) => {
  return `L${layoutId}${code}${position}`;
};

export { formatSeatCode };
