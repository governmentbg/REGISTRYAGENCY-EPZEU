package bg.registryagency.epzeu.pr.integration.epzeu.enums;

import lombok.Getter;

@Getter
public enum AuthenticationTypeEnum {
    USERNAME_PASSWORD(1), ACTIVE_DIRECTORY(2), CERTIFICATE(3), NRA(4);

    private int id;

    AuthenticationTypeEnum(int id) {
        this.id = id;
    }

    public static AuthenticationTypeEnum fromInteger(int intValue) {
        AuthenticationTypeEnum type;
        switch (intValue) {
            case 1:
                type = USERNAME_PASSWORD;
                break;
            case 2:
                type = ACTIVE_DIRECTORY;
                break;
            case 3:
                type = CERTIFICATE;
                break;
            case 4:
                type = NRA;
                break;
            default:
                throw new EnumConstantNotPresentException(AuthenticationTypeEnum.class, Integer.toString(intValue));
        }

        return type;
    }
}
