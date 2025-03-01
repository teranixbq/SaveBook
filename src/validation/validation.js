const checkEmpty = (...args) => {
  for (const arg of args) {
    if (!arg && arg !== 0) {
      return false;
    }
  }
  return true;
};

module.exports = {
  checkEmpty
};
