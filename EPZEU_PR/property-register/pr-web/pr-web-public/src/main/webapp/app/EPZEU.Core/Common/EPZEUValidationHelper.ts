import { ObjectHelper } from 'Cnsys.Core'

export namespace EPZEUValidationHelper {
    export function validateBirthDate(inputeBirthDate: string, inEGN: boolean): boolean {
        if (inputeBirthDate.length != 6) return false;

        let digits: number[] = [];

        for (let i: number = 0; i < inputeBirthDate.length; i++) {

            let currDigit: number = +inputeBirthDate[i];

            if (!isNaN(currDigit))
                digits.push(currDigit);
            else
                return false;
        }

        let dd: number = digits[4] * 10 + digits[5];
        let mm: number = digits[2] * 10 + digits[3];
        let yy: number = digits[0] * 10 + digits[1];

        if (inEGN) {
            if (mm > 40) {
                if (!checkdate(dd, mm - 40, yy + 2000)) return false;
            } else {
                if (mm > 20) {
                    if (!checkdate(dd, mm - 20, yy + 1800)) return false;
                } else {
                    if (!checkdate(dd, mm, yy + 1900)) return false;
                }
            }

            return true;
        }

        return checkdate(dd, mm, yy)
    }

    function checkdate(d: number, m: number, y: number) {
        return m > 0 && m < 13 && y >= 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate();
    }

    export function hasAnyCharNotInSpecialCharCodes(input: string, onlyTrimedInDbProcedures: boolean = false): boolean {
        if (ObjectHelper.isStringNullOrEmpty(input)) return false;

        let charCodesOfTrimedCharsInDbProcedures: number[] = [32, 34, 39, 45, 47, 92, 95, 96, 132, 145, 147, 148, 150, 151];
        
        let allSpecialCharCodes: number[] = [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 58, 59, 60, 61,62, 63, 64, 91, 92, 93, 94, 95, 96, 123, 124, 125, 126, 132, 145, 146, 147, 148, 150, 151];

        for (var i: number = 0; i < input.length; i++) {
            let charCode: number = input.charCodeAt(i);

            if (onlyTrimedInDbProcedures) {
                if (charCodesOfTrimedCharsInDbProcedures.indexOf(charCode, 0) < 0)
                    return true;
            } else {
                if (allSpecialCharCodes.indexOf(charCode, 0) < 0)
                    return true;
            }
        }

        return false;
    }
}