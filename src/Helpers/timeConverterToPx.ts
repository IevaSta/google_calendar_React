export function timeConverterToPixels(time: string) {
  const cellHeightInPixels = 48;
  const minPerHour = 60;
  const minHeightInPixels = cellHeightInPixels / minPerHour;

  const [hours, mins] = time.split(":");

  let hoursNumber = parseFloat(hours);
  let minNumber = parseFloat(mins);

  if (hoursNumber) hoursNumber = hoursNumber * cellHeightInPixels;
  if (minNumber) minNumber = minNumber * minHeightInPixels;

  return hoursNumber + minNumber;
}
