package bg.registryagency.epzeu.pr.integration.util;

public class CoreValidator {

    public static IdentTypes getIdentTypes(String identity){
        if (!identity.isEmpty()) {
            if (identity.length() == 8 && ValidatorHelper.validateBirthDate(identity)) {
                return IdentTypes.BirthDate;
            } else if (identity.length() == 10 && ValidatorHelper.validateEgn(identity)) {
                return IdentTypes.EGN;
            } else if (identity.length() == 10 && ValidatorHelper.validateLnch(identity)) {
                return IdentTypes.LNCH;
            } else {
                return IdentTypes.Undefined;
            }
        }
        return IdentTypes.Undefined;
    }
}


