export function formatDate(date) {
  const array = date.split('-');
  const year = array[0];
  const mounth = array[1];
  const day = array[2];
  return day + '/' + mounth + '/' + year;
}
