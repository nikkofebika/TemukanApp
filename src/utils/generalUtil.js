export const formatDate = date => {
  var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return date.toLocaleDateString('id-ID', options);
};
export const getDateNow = () => {
  var today = new Date();
  var yyyy = today.getFullYear();
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var dd = String(today.getDate()).padStart(2, '0');
  var hour = String(today.getHours());
  var minute = String(today.getMinutes());
  var second = String(today.getSeconds());

  today = yyyy + '-' + mm + '-' + dd + ' ' + hour + ':' + minute + ':' + second;
  return today;
};
export const ucWords = str => {
  str = str.toLowerCase().replace(/\b[a-z]/g, function (letter) {
    return letter.toUpperCase();
  });
  return str;
};

export const filterToString = data => {
  let queryString = '?';
  data.keyword != '' && (queryString += 'keyword=' + data.keyword + '&');
  data.locationId != null &&
    (queryString += 'location_id=' + data.locationId + '&');
  data.provinceId != null &&
    (queryString += 'province_id=' + data.provinceId + '&');
  data.regencyId != null && (queryString += 'regency_id=' + data.regencyId);
  return queryString;
};

export const getColorList = () => {
  return [
    'Abu-abu',
    'Biru',
    'Coklat',
    'Emas',
    'Hijau',
    'Hitam',
    'Kuning',
    'Merah',
    'Perak',
    'Putih',
    'Ungu',
  ];
};
