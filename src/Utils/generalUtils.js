export function formatDate(date = '') {
  var months = [
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
    'December',
  ];
  let DateArr = date.split('-');
  var day = DateArr[2];
  var month = months[parseInt(DateArr[1]) - 1];
  var year = DateArr[0];

  return month + ' ' + day + ', ' + year;
}
