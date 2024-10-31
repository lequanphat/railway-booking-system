function convertToAbbreviation(phrase) {
  const words = phrase.split(' ').filter((word) => word.trim() !== '');
  const abbreviation = words.map((word) => word[0].toUpperCase()).join('');
  return abbreviation;
}

function convertToVnCurrency(value) {
  return value.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
}

export { convertToAbbreviation, convertToVnCurrency };
