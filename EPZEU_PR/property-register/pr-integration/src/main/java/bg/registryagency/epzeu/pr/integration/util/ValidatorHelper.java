package bg.registryagency.epzeu.pr.integration.util;

public final class ValidatorHelper {

    public static Boolean validateBirthDate(String date) {

        if(date == null) {
            return false;
        }
        date = date.replaceAll("-", "");

        //Validate format YYYYMMDD
        boolean valid = date.matches("([12]\\d{3}(0[1-9]|1[0-2])(0[1-9]|[12]\\d|3[01]))");
        if(valid) {
            //Validate that year is bigger than 1800
            valid = date.charAt(1) >= 8;
        }

        return valid;
    }

    public static Boolean validateEgn(String egn) {

        if(egn == null) {
            return false;
        }

        int[] weights = { 2, 4, 8, 5, 10, 9, 7, 3, 6 };

        int year = -1;
        int month = -1;
        int day = -1;
        int checkSum  = 0;

        if(egn.length() != 10) {
            return false;
        }

        if(!egn.matches("\\d*")) {
            return false;
        }

        year = Integer.parseInt(egn.substring(0,2));

        if(year < 0 || year > 99) {

            return false;
        }
        month = Integer.parseInt(egn.substring(2,4));

        if(month > 20 && month < 40) {
            month -= 20;
        } else if(month > 40) {
            month -=40;
        }

        if (month < 1 || month > 12) {
            return false;
        }

        day = Integer.parseInt(egn.substring(4, 6));

        if(day < 1 || day > 31) {
            return false;
        }

        for(int i = 0; i < egn.length() - 1; i++) {
            checkSum += (int)(egn.charAt(i) - '0')*weights[i];
        }
        checkSum %= 11;

        if (checkSum == 10) {
            checkSum = 0;
        }

        if(checkSum != (int)(egn.charAt(9) - '0')) {
            return false;
        }

        return true;
    }

    public static Boolean validateLnch(String lnch) {

        if(lnch == null) {
            return false;
        }

        int[] weights = { 21, 19, 17, 13, 11, 9, 7, 3, 1 };
        int checkSum  = 0;

        if(lnch.length() != 10) {
            return false;
        }

        if(!lnch.matches("\\d*")) {
            return false;
        }

        for(int i = 0; i < lnch.length() - 1; i++) {
            checkSum += (int)(lnch.charAt(i) - '0')*weights[i];
        }

        checkSum %= 10;

        if (checkSum == 10) {
            checkSum = 0;
        }

        if(checkSum != (int)(lnch.charAt(9) - '0')) {
            return false;
        }

        return true;
    }

    public static Boolean validateNineDigitsBulstat(String bulstat) {

        if(bulstat == null || bulstat.length() != 9) {
            return false;
        }

        int sum = 0;
        for (int i = 0; i < bulstat.length() - 1; i++) {
            sum+= Character.getNumericValue(bulstat.charAt(i)) * (i + 1);
        }

        sum%= 11;

        if(sum == 10) {
            sum  = 0;
            for (int i = 0; i < bulstat.length() - 1; i++) {
                sum+= Character.getNumericValue(bulstat.charAt(i)) * (i + 3);
            }

            sum%= 11;

            if(sum == 10) {
                sum = 0;
            }
        }

        return sum == Character.getNumericValue(bulstat.charAt(8));
    }

    public static Boolean validateThirteenDigitsBulstat(String bulstat) {

            if(bulstat == null || bulstat.length() != 13) {
                return false;
            }
            int sum = 0;

            int[] bulstatValues = bulstat.chars().map(Character::getNumericValue).toArray();

            sum = 2 * bulstatValues[8] + 7 * bulstatValues[9] + 3 * bulstatValues[10] + 5 * bulstatValues[11];

            sum %= 11;

        if (sum == 10) {
            sum = 4 * bulstatValues[8] + 9 * bulstatValues[9] + 5 * bulstatValues[10] + 7 * bulstatValues[11];
            sum %= 11;

            if(sum == 10) {
                sum = 0;
            }
        }

        return sum == bulstatValues[12];
    }

    public static Boolean validateEmailAddress(String email) {

        if(email != null && email.matches("([0-9a-zA-Z]([-.\\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\\w]*[0-9a-zA-Z]\\.)+[a-zA-Z]{2,9})")) {
            return true;
        }
        return false;
    }
}
