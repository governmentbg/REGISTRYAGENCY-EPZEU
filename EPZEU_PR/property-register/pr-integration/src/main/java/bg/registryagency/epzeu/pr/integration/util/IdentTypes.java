package bg.registryagency.epzeu.pr.integration.util;

public enum IdentTypes {
    Undefined(0),
    EGN(1),
    LNCH(2),
    BirthDate(3);

    private final int dbValue;
    IdentTypes(int dbValue) {
        this.dbValue = dbValue;
    }

}
