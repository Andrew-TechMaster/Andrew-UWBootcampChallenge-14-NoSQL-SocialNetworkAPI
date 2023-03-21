module.exports = {
  /**
   * Helper func to format the date
   *
   * @param {Date} d The date to be formatted.
   * @return {string} datestring, Month/Day/Year - H:M.
   */
  dateFormatter(d) {
    var datestring = `${
      d.getMonth() + 1
    }/${d.getDate()}/${d.getFullYear()} - ${d.getHours()}:${d.getMinutes()}`;

    return datestring;
  },
};
