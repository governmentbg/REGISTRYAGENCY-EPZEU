package bg.registryagency.epzeu.pr.integration.payment.dto;

public enum ObligationStatus {
    REQUESTED(1), PAID(2), CANCELED(3);

    private int id;

    ObligationStatus(int id) {
        this.id = id;
    }

    public static ObligationStatus fromInteger(int id) {
        ObligationStatus status;
        switch (id) {
            case 1:
                status = REQUESTED;
                break;
            case 2:
                status = PAID;
                break;
            case 3:
                status = CANCELED;
                break;
            default:
                throw new EnumConstantNotPresentException(ObligationStatus.class, Integer.toString(id));
        }
        return status;
    }
}
