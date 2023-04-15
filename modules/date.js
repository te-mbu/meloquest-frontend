function formatDate(dateString) {
  let date = new Date(dateString);
  let formattedDate =
    date.getDate().toString().padStart(2, "0") +
    "-" +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    date.getFullYear();

  return formattedDate;
}

function formatHour(dateString) {
    let date = new Date(dateString);
    let formattedTime =
      date.getUTCHours().toString().padStart(2, "0") +
      ":" +
      date.getUTCMinutes().toString().padStart(2, "0");
    return formattedTime;
  }


module.exports = { formatDate, formatHour }
