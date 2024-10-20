function moveArrayItem(arr, fromIndex, toIndex) {
  const updatedArray = [...arr];

  if (fromIndex < 0 || fromIndex >= arr.length || toIndex < 0 || toIndex >= arr.length) {
    return arr;
  }

  const [movedItem] = updatedArray.splice(fromIndex, 1);

  updatedArray.splice(toIndex, 0, movedItem);

  return updatedArray;
}

function groupSeatsById(seats) {
  return seats.reduce((acc, seat) => {
    const { id, name, code } = seat.seatType;
    const existingSeat = acc.find((item) => item.value === id);

    if (existingSeat) existingSeat.quantity += 1;
    else acc.push({ label: name, value: id, code, quantity: 1 });

    return acc;
  }, []);
}

export { moveArrayItem, groupSeatsById };
