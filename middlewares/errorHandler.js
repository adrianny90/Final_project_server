export const errorHandler = (err, req, res, next) => {
  process.env.NODE_ENV !== 'production' && console.log(err);

  res.status(err.statusCode || 500).json({ message: err.message });
};
