import 'intl';
import "intl/locale-data/jsonp/en";

/**
 * A utility function that formats a date
 * @param date
 * @returns string of date format
 */
export const formatDate = (date: any) => {
  const d = new Date(date);
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
  const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
  return `${day} ${month}, ${year}`;
}