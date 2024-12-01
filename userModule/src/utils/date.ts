export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const isDateInFuture = (date: string | Date): boolean => {
  return new Date(date) > new Date();
};