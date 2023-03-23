module.exports = {
  /**
   * Helper func to format the date
   *
   * @param {Date} dateStr The date to be formatted.
   * @return {string} datestring, Month/Day/Year - H:M.
   */
  dateFormatter(dateStr) {
    var date = new Date(dateStr); // dateStr you get from mongodb

    var y = date.getFullYear();
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var h = date.getHours();
    var m = date.getMonth();

    var datestring = `${m}/${d}/${y} \- ${h}:${m}`;

    return datestring;
  },
};
