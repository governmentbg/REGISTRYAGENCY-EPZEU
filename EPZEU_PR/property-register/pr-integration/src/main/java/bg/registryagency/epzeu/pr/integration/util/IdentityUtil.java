package bg.registryagency.epzeu.pr.integration.util;

public class IdentityUtil {
    public static String maskIdentity(String identity) {

        if(ValidatorHelper.validateEgn(identity)) {
            return identity.substring(0, 4) + "******";
        } else if(ValidatorHelper.validateLnch(identity)) {
            return identity.substring(0, 4) + "*****" + identity.substring(9);
        } else if(ValidatorHelper.validateBirthDate(identity)) {
            return identity.substring(0, 4) + "****";
        } else {
            //If identity is not valid identifier do not mask it(in Property Register DB there are some persons with not valid identifiers)
            return identity;
        }

    }
}
