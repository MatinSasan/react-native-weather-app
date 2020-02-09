const dateBuilder = dateItem => {
  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  let day = days[dateItem.getDay()];
  let date = dateItem.getDate();
  let month = months[dateItem.getMonth()];
  let year = dateItem.getFullYear();

  return `${day} ${date} ${month} ${year}`;
};

export default dateBuilder;
