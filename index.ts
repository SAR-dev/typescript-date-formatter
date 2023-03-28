function convertStringToDate(dateString: string): Date | null {
  // ISO 8601 format
  if (
    /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{1,3})?(Z|[+-]\d{2}:\d{2})?)?$/.test(
      dateString
    )
  ) {
    return new Date(dateString);
  }

  // RFC 2822 format
  const rfc2822Regex =
    /^\w{3},\s\d{2}\s\w{3}\s\d{4}\s\d{2}:\d{2}:\d{2}\s[+-]\d{4}$/;
  if (rfc2822Regex.test(dateString)) {
    return new Date(dateString);
  }

  // dd/MM/yyyy format
  const ddMMyyyyRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (ddMMyyyyRegex.test(dateString)) {
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
  }

  // dd-MM-yyyy format
  const ddMMyyyyHyphenRegex = /^\d{2}-\d{2}-\d{4}$/;
  if (ddMMyyyyHyphenRegex.test(dateString)) {
    const [day, month, year] = dateString.split('-');
    return new Date(`${year}-${month}-${day}`);
  }

  // yyyy/MM/dd format
  const yyyyMMddRegex = /^\d{4}\/\d{2}\/\d{2}$/;
  if (yyyyMMddRegex.test(dateString)) {
    return new Date(dateString.replace(/\//g, '-'));
  }

  // yyyy-MM-dd format
  const yyyyMMddHyphenRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (yyyyMMddHyphenRegex.test(dateString)) {
    return new Date(dateString);
  }

  // dd/MM/yyyy hh:mm:ss format
  const ddMMyyyyHhmmssRegex = /^\d{2}\/\d{2}\/\d{4}\s\d{2}:\d{2}:\d{2}$/;
  if (ddMMyyyyHhmmssRegex.test(dateString)) {
    const [date, time] = dateString.split(' ');
    const [day, month, year] = date.split('/');
    const [hours, minutes, seconds] = time.split(':');
    return new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}`);
  }

  // dd-MM-yyyy hh:mm:ss format
  const ddMMyyyyHyphenHhmmssRegex = /^\d{2}-\d{2}-\d{4}\s\d{2}:\d{2}:\d{2}$/;
  if (ddMMyyyyHyphenHhmmssRegex.test(dateString)) {
    const [date, time] = dateString.split(' ');
    const [day, month, year] = date.split('-');
    const [hours, minutes, seconds] = time.split(':');
    return new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}`);
  }

  // yyyy/MM/dd hh:mm:ss format
  const yyyyMMddHhmmssRegex = /^\d{4}\/\d{2}\/\d{2}\s\d{2}:\d{2}:\d{2}$/;
  if (yyyyMMddHhmmssRegex.test(dateString)) {
    return new Date(dateString.replace(/\//g, '-'));
  }

  // yyyy-MM-dd hh:mm:ss format
  const yyyyMMddHyphenHhmmssRegex = /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/;
  if (yyyyMMddHyphenHhmmssRegex.test(dateString)) {
    return new Date(dateString);
  }

  // dd/MM/yyyy/hh/mm/ss format
  const ddMMyyyyHhmmssRegexSlash = /^\d{2}\/\d{2}\/\d{4}\/\d{2}\/\d{2}\/\d{2}$/;
  if (ddMMyyyyHhmmssRegexSlash.test(dateString)) {
    const [day, month, year, hours, minutes, seconds] = dateString.split('/');
    return new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}`);
  }

  // yyyy/MM/dd/hh/mm/ss format
  const yyyyMMddHhmmssRegexSlash = /^\d{4}\/\d{2}\/\d{2}\/\d{2}\/\d{2}\/\d{2}$/;
  if (yyyyMMddHhmmssRegexSlash.test(dateString)) {
    const [year, month, day, hours, minutes, seconds] = dateString.split('/');
    return new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}`);
  }

  // dd-mm-yyyy-hh-mm-ss format
  const ddMMyyyyHhmmssRegexHyphen = /^\d{2}-\d{2}-\d{4}-\d{2}-\d{2}-\d{2}$/;
  if (ddMMyyyyHhmmssRegexHyphen.test(dateString)) {
    const [day, month, year, hours, minutes, seconds] = dateString.split('-');
    return new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}`);
  }

  // yyyy-mm-dd-hh-mm-ss format
  const yyyyMMddHhmmssRegexHyphen = /^\d{4}-\d{2}-\d{2}-\d{2}-\d{2}-\d{2}$/;
  if (yyyyMMddHhmmssRegexHyphen.test(dateString)) {
    const [year, month, day, hours, minutes, seconds] = dateString.split('-');
    return new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}`);
  }

  // Couldn't match any formats, return null
  return null;
}

const convertDateToString = (date: Date, pattern: string): string => {
  const yyyy = date.getFullYear().toString();
  const MM = (date.getMonth() + 1).toString().padStart(2, '0');
  const dd = date.getDate().toString().padStart(2, '0');
  const hh = date.getHours().toString().padStart(2, '0');
  const mm = date.getMinutes().toString().padStart(2, '0');
  const ss = date.getSeconds().toString().padStart(2, '0');
  return pattern
    .replace('yyyy', yyyy)
    .replace('MM', MM)
    .replace('dd', dd)
    .replace('hh', hh)
    .replace('mm', mm)
    .replace('ss', ss);
};

function convertStringPatternToDate(dateString: string, pattern: string): Date {
  const patternParts: string[] = pattern.split(/[^A-Za-z]/);
  const dateParts: string[] = dateString.split(/[^0-9]/);
  const dateObj: {
    year?: number;
    month?: number;
    day?: number;
    hour?: number;
    minute?: number;
    second?: number;
  } = {};

  for (let i = 0; i < patternParts.length; i++) {
    switch (patternParts[i]) {
      case 'dd':
        dateObj.day = parseInt(dateParts[i], 10);
        break;
      case 'MM':
        dateObj.month = parseInt(dateParts[i], 10) - 1;
        break;
      case 'yyyy':
        dateObj.year = parseInt(dateParts[i], 10);
        break;
      case 'hh':
        dateObj.hour = parseInt(dateParts[i], 10);
        break;
      case 'mm':
        dateObj.minute = parseInt(dateParts[i], 10);
        break;
      case 'ss':
        dateObj.second = parseInt(dateParts[i], 10);
        break;
    }
  }

  return new Date(
    dateObj.year,
    dateObj.month,
    dateObj.day,
    dateObj.hour,
    dateObj.minute,
    dateObj.second
  );
}
