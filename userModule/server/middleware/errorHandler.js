export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error values
  let status = err.status || 500;
  let message = err.message || 'Internal Server Error';
  let details = null;

  // Handle specific error types
  if (err.name === 'ValidationError') {
    status = 400;
    message = 'Validation Error';
    details = Object.values(err.errors).map(e => e.message);
  } else if (err.name === 'CastError') {
    status = 400;
    message = 'Invalid ID format';
  } else if (err.code === 11000) {
    status = 409;
    message = 'Duplicate key error';
  }

  // In production, don't send the stack trace
  const error = {
    message,
    ...(details && { details }),
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  };
  
  res.status(status).json({ error });
};