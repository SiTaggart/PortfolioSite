const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatPostDate(date: string): string {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    throw new RangeError(`Invalid post date: ${date}`);
  }

  const weekday = weekdays[parsedDate.getUTCDay()];
  const month = months[parsedDate.getUTCMonth()];
  const day = String(parsedDate.getUTCDate()).padStart(2, '0');
  const year = parsedDate.getUTCFullYear();

  return `${weekday} ${month} ${day} ${year}`;
}
