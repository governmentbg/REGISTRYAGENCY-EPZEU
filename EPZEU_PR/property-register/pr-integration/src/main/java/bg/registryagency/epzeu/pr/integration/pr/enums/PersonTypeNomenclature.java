package bg.registryagency.epzeu.pr.integration.pr.enums;

import lombok.Getter;

@Getter
public enum PersonTypeNomenclature {
    INDIVIDUAL(1),
    LEGAL_ENTITY(2);

    private final int key;

    PersonTypeNomenclature(int key) {
        this.key = key;
    }

    public static PersonTypeNomenclature fromInteger(int intValue) {
        PersonTypeNomenclature type;
        switch (intValue) {
            case 1:
                type = INDIVIDUAL;
                break;
            case 2:
                type = LEGAL_ENTITY;
                break;
            default:
                throw new EnumConstantNotPresentException(PersonTypeNomenclature.class, Integer.toString(intValue));
        }
        return type;
    }
}
