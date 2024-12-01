import { AxiosError } from 'axios';

export const handleApiError = (error: unknown): Error => {
  if (isAxiosError(error)) {
    const message = error.response?.data?.message || error.message;
    return new Error(message);
  }
  return new Error('An unexpected error occurred');
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

const isAxiosError = (error: unknown): error is AxiosError => {
  return (error as AxiosError).isAxiosError === true;
};