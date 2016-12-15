module.exports = options => {
  const start = (dependencies, cb) => {
    console.log('Logging at level', dependencies.config.level);
    cb(null, console);
  }

  return {
    start: start
  };
}
