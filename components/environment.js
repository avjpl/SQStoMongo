module.exports = () => {
  const start = (dependencies, cb) => {
    cb(null, { name: process.env.NODE_ENV || 'development' });
  }

  return {
    start: start
  };
}