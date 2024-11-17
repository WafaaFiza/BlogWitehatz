import { format, parseISO } from 'date-fns';

export function formatDate(date: string) {
  try {
    return format(parseISO(date), 'MMMM d, yyyy');
  } catch (error) {
    console.error('Invalid date:', date);
    return 'Date unavailable';
  }
} 