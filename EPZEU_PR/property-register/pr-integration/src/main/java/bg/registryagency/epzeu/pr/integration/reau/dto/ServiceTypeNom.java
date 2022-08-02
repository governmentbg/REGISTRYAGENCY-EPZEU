package bg.registryagency.epzeu.pr.integration.reau.dto;

import lombok.Getter;

@Getter
public enum ServiceTypeNom {
    ORDINARY(1, "10001100000000016576"),
    FAST(2, "10001100000000016577"),
    EXPRESS(3, "10001100000000016578"),
    //Two values below are used only for mapping in Cache Manager
    ELECTRONICALLY(4, "20001100000000002002"),
    IKAR(5, "20001100000000002001");

    private final int epzeuId;
    private final String prId;

    ServiceTypeNom(int epzeuId, String prId) {
        this.epzeuId = epzeuId;
        this.prId = prId;
    }

    public static ServiceTypeNom fromPrId(String prId) {
        ServiceTypeNom type;
        switch (prId) {
            case "10001100000000016576":
                type = ORDINARY;
                break;
            case "10001100000000016577":
                type = FAST;
                break;
            case "10001100000000016578":
                type = EXPRESS;
                break;
            case "20001100000000002002":
                type = ELECTRONICALLY;
                break;
            case "20001100000000002001":
                type = IKAR;
            default:
                throw new EnumConstantNotPresentException(ServiceTypeNom.class, prId);
        }
        return type;
    }

    public static ServiceTypeNom fromEpzeuId(int epzeuId) {
        ServiceTypeNom type;
        switch (epzeuId) {
            case 1:
                type = ORDINARY;
                break;
            case 2:
                type = FAST;
                break;
            case 3:
                type = EXPRESS;
                break;
            case 4:
                type = ELECTRONICALLY;
                break;
            case 5:
                type = IKAR;
            default:
                throw new EnumConstantNotPresentException(ServiceTypeNom.class, Integer.toString(epzeuId));
        }
        return type;
    }
}
