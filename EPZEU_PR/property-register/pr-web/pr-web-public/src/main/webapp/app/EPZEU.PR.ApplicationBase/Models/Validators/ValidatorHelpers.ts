export namespace ValidatorHelpers {

  export function validateBirthDate(inputeBirthDate: string, inEGN: boolean): boolean {
    if(!inEGN && inputeBirthDate.length != 8) return false;
    if(inEGN && inputeBirthDate.length !=6) return false;

    let digits: number[] = [];

    for (let i: number = 0; i < inputeBirthDate.length; i++) {

      let currDigit: number = +inputeBirthDate[i];

      if (!isNaN(currDigit))
        digits.push(currDigit);
      else
        return false;
    }
    let dd: number = inEGN ? digits[4] * 10 + digits[5] : digits[6] * 10 + digits[7] ;
    let mm: number = inEGN ? digits[2] * 10 + digits[3] : digits[4] * 10 + digits[5];
    let yy: number = inEGN ? digits[0] * 10 + digits[1] : digits[0] * 1000 + digits[1] * 100 + digits[2] * 10 + digits[3];

    if (inEGN) {
      if (mm > 40) {
        if (!checkDate(dd, mm - 40, yy + 2000)) return false;
      } else {
        if (mm > 20) {
          if (!checkDate(dd, mm - 20, yy + 1800)) return false;
        } else {
          if (!checkDate(dd, mm, yy + 1900)) return false;
        }
      }

      return true;
    } else {
      //Months in Date starts from 0 so January is 0, February is 1 and so on.
      let date = new Date(yy, mm - 1, dd);
      let currDate = new Date();

      if(date > currDate || yy < 1800) {
        return false;
      }
    }

    return checkDate(dd, mm, yy)
  }

  export function isLeapYear(yyyy: number): boolean {
    if (yyyy % 400 == 0) { return true; }
    if (yyyy % 100 == 0) { return false; }
    if (yyyy % 4 == 0) { return true; }
    return false;
  }

  export function isValidLNCH(ident: string): boolean {
    let coeffs: number[] = [21, 19, 17, 13, 11, 9, 7, 3, 1];
    let checksum: number = 0;

    for (let i: number = 0; i < coeffs.length; i++) {
      let currDigit: number = Number(ident[i]);
      if (isNaN(currDigit))
        return false;

      checksum += currDigit * coeffs[i];
    }

    checksum %= 10;
    if (checksum == 10) checksum = 0;

    return isNaN(Number(ident[9])) || checksum != Number(ident[9]) ? false : true;
  }

  export function isValidEGN(ident: string): boolean {

    if (ident == null || ident == undefined || ident.length != 10)
      return false;

    if (!validateBirthDate(ident.substr(0, 6), true))
      return false;

    let coeffs: number[] = [2, 4, 8, 5, 10, 9, 7, 3, 6];

    let checksum: number = 0;

    for (let i: number = 0; i < coeffs.length; i++) {
      let currDigit: number = Number(ident[i]);
      if (isNaN(currDigit))
        return false;

      checksum += currDigit * coeffs[i];
    }

    checksum %= 11;
    if (checksum == 10) checksum = 0;

    return isNaN(Number(ident[9])) || checksum != Number(ident[9]) ? false : true;
  }

  export function isValidUIC(ident: string): boolean {
    let checksum: number = 0;

    for (let i: number = 0; i < (ident.length - 1); i++) {
      let currDigit: number = Number(ident[i]);
      if (isNaN(currDigit))
        return false;

      checksum += currDigit * (i + 1);
    }

    checksum %= 11;
    if (checksum == 10) {
      checksum = 0;

      for (let i: number = 0; i < (ident.length - 1); i++) {
        let currDigit: number = Number(ident[i]);

        checksum += currDigit * (i + 3);
      }

      checksum %= 11;
      if (checksum == 10) checksum = 0;
    }

    return isNaN(Number(ident[8])) || checksum != Number(ident[8]) ? false : true;
  }

  export function isValidDate(date: any): boolean {
    if (date == null || date == undefined || (typeof date == "string"))
      return false;

    return date.isValid();
  }

  function checkDate(d: number, m: number, y: number) {
    //(new Date(y, m, 0)).getDate() this returns days for month for corresponding year it can be 31 for normal month for february it can be 28 or 29 for leap year
    return m > 0 && m < 13 && y >= 0 && y < 32768 && d > 0 && (d <= (new Date(y, m, 0)).getDate() || (y==0 && m==2 && d==29))
  }
}
