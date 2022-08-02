package bg.registryagency.epzeu.pr.integration.reau.dto;

import lombok.Getter;

@Getter
public enum ApplicationStatusEnum {
    //Application statuses before Registration in Property Register(REAU statuses)
    ACCEPTED("Прието", "PR_APP_STATUS_ACCEPTED_L", 1),
    WAITING_FOR_REGISTRATION("Чака регистриране", "PR_APP_STATUS_WAIT_FOR_REGISTRATION_L", 2),
    IN_PROCESS("Обработва се", "PR_APP_STATUS_IN_PROGRESS_L", 3),
    WAITING_FOR_PAYMENT("Чака плащане", "PR_APP_STATUS_WAIT_FOR_PAYMENT_L", 4),
    TERMINATED("Прекратено", "PR_APP_STATUS_TERMINATED_L", 5),

    //Certificate Statuses
    REGISTERED_CERTIFICATE("Регистрирано", "PR_APP_STATUS_REGISTRATED_L", 301),//TODO there is typo in label
    WITHOUT_MOVEMENT("Без движение", "PR_APP_STATUS_WITHOUT_MOVEMENT_L", 305),
    WITHOUT_MOVEMENT_FOR_REVIEW("Без движение - за преразглеждане", "PR_APP_STATUS_WITHOUT_MOVEMENT_FOR_REVIEW_L", 306),
    CANCELED("Анулирано", "PR_APP_STATUS_CANCELED_L", 304),
    IN_PROCESS_OF_ISSUE("В процес на издаване", "PR_APP_STATUS_IN_PROCESS_OF_ISSUE_L", 302),
    ISSUED_CERTIFICATE("Издадено", "PR_APP_ISSUED_CERTIFICATE_L", 303),
    REFUSAL_TO_ISSUE_CERTIFICATE("Отказано", "PR_APP_STATUS_REFUSAL_TO_ISSUE_CERTIFICATE_L", 307),

    //Certified and Not Certified Copies Statuses
    REGISTERED_ACT("Регистриран", "PR_APP_STATUS_REGISTRATED1_L", 501),
    ISSUED_ACT("Издаден", "PR_APP_ISSUED_ACT_L", 502),
    WITH_A_REFUSAL("С постановен отказ", "PR_APP_STATUS_WITH_A_REFUSAL_L", 503),
    NO_DATA_FOUND("Няма намерени данни", "PR_APP_NO_DATA_FOUND_L", 504),

    //Upcoming deal
    REGISTERED_DEAL("Регистрирана", "", 7),
    REGISTERED("Регистриран", "PR_APP_STATUS_REGISTRATED1_L", 101),

    //OSS Reports
    COMPLETED("Изпълнено", "PR_APP_STATUS_COMPLETED_L", 6),
    PROCESS_TERMINATED("Прекратен процес", "PR_APP_STATUS_PROCESS_TERMINATED_L", 8);

    int id;
    String name;
    String label;

    ApplicationStatusEnum(String name, String label, int id) {
        this.name = name;
        this.label = label;
        this.id = id;
    }

    public static ApplicationStatusEnum fromInteger(int intValue) {
        ApplicationStatusEnum type;
        switch (intValue) {
            case 1:
                type = ACCEPTED;
                break;
            case 2:
                type = WAITING_FOR_REGISTRATION;
                break;
            case 3:
                type = IN_PROCESS;
                break;
            case 4:
                type = WAITING_FOR_PAYMENT;
                break;
            case 5:
                type = TERMINATED;
                break;
            case 6:
                type = COMPLETED;
                break;
            case 7:
                type = REGISTERED_DEAL;
                break;
            case 8:
                type = PROCESS_TERMINATED;
                break;
            case 101:
                type = REGISTERED;
                break;
            case 301:
                type = REGISTERED_CERTIFICATE;
                break;
            case 302:
                type = IN_PROCESS_OF_ISSUE;
                break;
            case 303:
                type = ISSUED_CERTIFICATE;
                break;
            case 304:
                type = CANCELED;
                break;
            case 305:
                type = WITHOUT_MOVEMENT;
                break;
            case 306:
                type = WITHOUT_MOVEMENT_FOR_REVIEW;
                break;
            case 307:
                type = REFUSAL_TO_ISSUE_CERTIFICATE;
                break;
            case 501:
                type = REGISTERED_ACT;
                break;
            case 502:
                type = ISSUED_ACT;
                break;
            case 503:
                type = WITH_A_REFUSAL;
                break;
            case 504:
                type = NO_DATA_FOUND;
                break;
            default:
                throw new EnumConstantNotPresentException(ApplicationStatusEnum.class, Integer.toString(intValue));
        }

        return type;
    }
}
