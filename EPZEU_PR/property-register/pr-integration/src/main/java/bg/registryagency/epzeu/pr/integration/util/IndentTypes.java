package bg.registryagency.epzeu.pr.integration.util;

public enum IndentTypes {
    Undefined(0),
    EGN(1),
    LNCH(2),
    BirthDate(3);

    private final int dbValue;
    IndentTypes(int dbValue) {
        this.dbValue = dbValue;
    }

}
