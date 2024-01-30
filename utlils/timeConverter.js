export const dateConverter = item => {
  const fireBaseTime = new Date(item.seconds * 1000 + item.nanoseconds / 1000000);
  const date2 = fireBaseTime?.toDateString();
  const atTime = fireBaseTime?.toLocaleTimeString();

  const day = fireBaseTime.getDate().toString().padStart(2, '0');
  const month = (fireBaseTime.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const year = fireBaseTime.getFullYear();

  const customFormat = `${day}.${month}.${year}`;
  const inputFormat = fireBaseTime.toISOString();

  let formatted = {
    date: date2,
    time: atTime,
    customFormat: customFormat,
    inputFormat: inputFormat,
  };

  return formatted;
};
