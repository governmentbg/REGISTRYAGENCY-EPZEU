import { ObjectHelper } from './ObjectHelper';
import { Helper } from './Helper'

//TODO: Може да се преизползват тези функции в BaseValidator.ts
export namespace ValidationHelper {
    export function isValidEGN(x: string): boolean {

      if (ObjectHelper.isStringNullOrEmpty(x) || x.length != 10 || !/^\d{10}$/.test(x))
            return false;

        var year = Number(x.slice(0, 2));
        var month = Number(x.slice(2, 4));
        var day = Number(x.slice(4, 6));

        if (month >= 40) {
            year += 2000;
            month -= 40;
        } else if (month >= 20) {
            year += 1800;
            month -= 20;
        } else {
            year += 1900;
        }

        var date = new Date(year, month - 1, day);

        if (!(date && (date.getMonth() + 1) == month && date.getDate() == Number(day)))
            return false;

        var checkSum = 0;
        var weights = [2, 4, 8, 5, 10, 9, 7, 3, 6];

        for (var ii = 0; ii < weights.length; ++ii) {
            checkSum += weights[ii] * Number(x.charAt(ii));
        }

        checkSum %= 11;
        checkSum %= 10;

        if (checkSum !== Number(x.charAt(9)))
            return false;

        return true;
    }

    export function isValidLNCh(x: string): boolean {
        if (ObjectHelper.isStringNullOrEmpty(x) || x.length != 10 || !/\d{10}/.test(x))
            return false;

        var digits: Array<number> = [];
        for (var index = 0; index < x.length; index++) {
            var number = Number(x[index]);

            if (number != NaN)
                digits.push(number)
            else
                return false
        }

        var coeffs = [21, 19, 17, 13, 11, 9, 7, 3, 1]
        var checkSum = 0;

        coeffs.forEach(function (coeff, index) {
            checkSum += digits[index] * coeff
        })

        checkSum %= 10;
        if (checkSum == 10) checkSum = 0;

        if (checkSum != digits[9])
            return false;

        return true;
    }

    export function isValidEGNLNCh(x: string): boolean {
        return (isValidEGN(x) || isValidLNCh(x));
    }

    export function isValidPhone(x: string): boolean {
        var phoneNumPattern = '^([+#*]?)([0-9]{4,20})$';

        if (ObjectHelper.isStringNullOrEmpty(x))
            return false;

        return Helper.regex.isMatch(x, phoneNumPattern, 'i');
    }

    export function isEmailAddress(x: string) {
        const emailAddressPattern = /(?=^.{1,64}@)^[a-zA-Z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*@(?=.{1,255}$|.{1,255};)(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])(;(?=.{1,64}@)[a-zA-Z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*@(?=.{1,255}$|.{1,255};)(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9]))*$/i;

        if (ObjectHelper.isStringNullOrEmpty(x))
            return false;

        return emailAddressPattern.test(x);
    }
}
