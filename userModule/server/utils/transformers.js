export const transformStudentResponse = (student) => {
  if (!student) return null;
  
  const transformed = student.toObject ? student.toObject() : student;
  return {
    ...transformed,
    id: transformed._id.toString(),
    _id: undefined,
    __v: undefined
  };
};

export const transformError = (error) => {
  if (error.name === 'ValidationError') {
    return {
      status: 400,
      message: 'Validation Error',
      details: Object.values(error.errors).map(err => err.message)
    };
  }

  if (error.name === 'CastError') {
    return {
      status: 400,
      message: 'Invalid ID format'
    };
  }

  if (error.status && error.message) {
    return {
      status: error.status,
      message: error.message
    };
  }

  return {
    status: 500,
    message: process.env.NODE_ENV === 'development' 
      ? error.message 
      : 'Internal Server Error'
  };
};